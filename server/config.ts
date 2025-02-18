import { z } from "zod";

const configSchema = z.object({
  // Database configuration
  DATABASE_URL: z.string(),

  // Admin configuration
  ADMIN_PASSWORD: z.string().min(8),
  ADMIN_EMAIL: z.string().email(),

  // JWT configuration
  JWT_SECRET: z.string().default("your-jwt-secret-key"),
  JWT_EXPIRY: z.string().default("48h"),
});

// Validate environment variables
const config = configSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
});

export default config;