import { z } from "zod";

const configSchema = z.object({
  // Database configuration
  DATABASE_URL: z.string(),
  
  // Admin configuration
  ADMIN_PASSWORD: z.string().min(8),
  ADMIN_EMAIL: z.string().email().default("hitoishi.das@gmail.com"),
});

// Validate environment variables
const config = configSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
});

export default config;