import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { Admin } from "@shared/schema";
import MemoryStore from "memorystore";

const MemoryStoreSession = MemoryStore(session);
const scryptAsync = promisify(scrypt);

declare global {
  namespace Express {
    interface User extends Admin {}
  }
}

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const sessionStore = new MemoryStoreSession({
    checkPeriod: 86400000 // prune expired entries every 24h
  });

  app.use(
    session({
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: { secure: false }, // set to true in production with HTTPS
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const admin = await storage.getAdminByUsername(username);
        if (!admin || !(await comparePasswords(password, admin.password))) {
          return done(null, false, { message: "Invalid credentials" });
        }
        return done(null, admin);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const admin = await storage.getAdmin(id);
      done(null, admin);
    } catch (error) {
      done(error);
    }
  });

  // Initialize admin user if not exists
  storage.initializeAdmin({
    username: "admin",
    password: await hashPassword("p@ssw0rd"),
    email: "hitoishi.das@gmail.com"
  }).catch(console.error);

  return {
    hashPassword,
    isAuthenticated: (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
      if (req.isAuthenticated()) {
        return next();
      }
      res.status(401).json({ message: "Unauthorized" });
    }
  };
}
