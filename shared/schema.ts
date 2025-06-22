import { pgTable, text, serial, numeric, timestamp, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").array().notNull(),
  isDeleted: boolean("is_deleted").default(false).notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),
  phoneNumber: text("phone_number").notNull(),
  total: decimal("total", {precision: 10, scale: 2}).notNull(),
  items: text("items").array().notNull(),
  date: timestamp("date").notNull().defaultNow(),
  status: text("status").default("Pending").notNull(),
  paymentId: text("payment_id").default("UNPAID").notNull(),
});

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  resetToken: text("reset_token"),
  resetTokenExpiry: timestamp("reset_token_expiry"),
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  price: true,
  category: true,
  imageUrl: true
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  customerName: true,
  email: true,
  address: true,
  phoneNumber: true,
  total: true,
  items: true,
  date: true,
  status: true,
  paymentId: true,
});

export const insertAdminSchema = createInsertSchema(admins).pick({
  username: true,
  password: true,
  email: true,
});

export type Category = typeof categories.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type Admin = typeof admins.$inferSelect;

export const CATEGORIES = ["Dupattas", "Kurtis", "Jewellery"] as const;