import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema, insertProductSchema } from "@shared/schema";
import { z } from "zod";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  const auth = await setupAuth(app);

  app.get("/api/products", async (_req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get("/api/products/category/:category", async (req, res) => {
    const products = await storage.getProductsByCategory(req.params.category);
    res.json(products);
  });

  app.get("/api/products/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await storage.getProduct(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  });

  // Protected admin routes
  app.get("/api/orders", auth.jwtAuth, async (_req, res) => {
    const orders = await storage.getOrders();
    res.json(orders);
  });

  app.post("/api/products", auth.jwtAuth, async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data" });
      }
      throw error;
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const razorpayOrder = await instance.orders.create({
        amount: Math.round(orderData.total * 100),
        currency: "INR",
        receipt: order.id.toString(),
      });

      res.status(201).json({
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        razorpayKeyId: process.env.RAZORPAY_KEY_ID,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data" });
      }
      throw error;
    }
  });

app.post("/api/orders/verify", async (req, res) => {
    const { orderId, paymentId, signature } = req.body;
    const text = orderId + "|" + paymentId;
    
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest("hex");
      
    if (generatedSignature === signature) {
      res.json({ verified: true });
    } else {
      res.status(400).json({ verified: false });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}