import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Build connection options with password if provided
const connectionOptions: any = { 
  connectionString: process.env.DATABASE_URL 
};

// Add password if provided
if (process.env.DATABASE_PASSWORD) {
  connectionOptions.password = process.env.DATABASE_PASSWORD;
}

export const pool = new Pool(connectionOptions);
export const db = drizzle({ client: pool, schema });
