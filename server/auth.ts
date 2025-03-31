import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import { storage } from "./storage";
import { Admin } from "@shared/schema";
import MemoryStore from "memorystore";
import config from "./config";

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

function generateToken(admin: Admin) {
  return jwt.sign(
    { id: admin.id, username: admin.username },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRY }
  );
}

function verifyToken(token: string) {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function setupAuth(app: Express) {
  const sessionStore = new MemoryStoreSession({
    checkPeriod: 86400000 // prune expired entries every 24h
  });

  app.use(
    session({
      secret: process.env.JWT_SECRET as string,
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

  // Initialize admin user
  const hashedPassword = await hashPassword(config.ADMIN_PASSWORD);
  await storage.initializeAdmin({
    username: process.env.ADMIN_USERNAME as string,
    password: hashedPassword,
    email: config.ADMIN_EMAIL
  });

  app.post("/api/admin/login", passport.authenticate("local"), (req, res) => {
    const token = generateToken(req.user as Admin);
    res.json({ token, user: req.user });
  });

  app.post("/api/admin/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    next();
  };

  return { jwtAuth };
}