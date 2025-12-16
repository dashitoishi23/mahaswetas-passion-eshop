import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema, insertProductSchema, insertCategorySchema, Product } from "@shared/schema";
import { z } from "zod";
import { setupAuth } from "./auth";
import Razorpay from 'razorpay';
import config from "./config";
import { constants } from "@/lib/utils";
import crypto from "crypto";
import { purchaseEmailTemplate } from "./utils/emailComposer";
import { sendEmail } from "./utils/sendgrid";
import { deleteFileFromS3, uploadFileToS3 } from "./utils/aws";
import multer from "multer";
import { generateSignedUrl } from "./utils/signedURLGenerator";

export interface CategoryData {
  name: string;
  imageUrl: string;
}

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

function generateRandomNumericString() {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function registerRoutes(app: Express): Promise<Server> {
  const auth = await setupAuth(app);

  app.get("/api/categories/", async (req, res) => {
    const categories = await storage.getCategories();
    const categoryData = [];
    for (const category of categories) {
      const product = (await storage.getProductsByCategory(category.name))[0];
      if(product) {
        categoryData.push({
          name: category.name,
          imageUrl: (await generateSignedUrl(product.imageUrl))[0], // Assuming the first image is the category image
        });
      }
    }
    console.log(categoryData);
    res.json(categoryData);
  })

  app.get("/api/categories/all", async (req, res) => {
    const categories = await storage.getCategories();
    res.json(categories)
  });

  app.get("/api/products", async (_req, res) => {
    let products = await storage.getProducts();
    products = await Promise.all(
      products.map(async (product) => {
        product.imageUrl = await generateSignedUrl(product.imageUrl);
        return product;
    })
  );
    res.json(products);
  });

  app.get("/api/products/all", async (_req, res) => {
    let products = await storage.getAllProducts();
    products = await Promise.all(
      products.map(async (product) => {
        product.imageUrl = await generateSignedUrl(product.imageUrl);
        return product;
    })
  );
    res.json(products);
  });

  app.get("/api/products/category/:category", async (req, res) => {
    let products = await storage.getProductsByCategory(req.params.category);
    products = await Promise.all(
      products.map(async (product) => {
        product.imageUrl = await generateSignedUrl(product.imageUrl);
        return product;
    })
  );
    res.json(products);
  });

  app.get("/api/products/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    let product = await storage.getProduct(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.imageUrl = await generateSignedUrl(product.imageUrl);

    res.json(product);
  });

  // Protected admin routes

  app.post("/api/categories", auth.jwtAuth, async (req, res) => {
    const category = insertCategorySchema.parse(req.body);
    await storage.addCategory(category);
    res.json(category);
  });

  app.get("/api/orders", auth.jwtAuth, async (_req, res) => {
    const orders = await storage.getOrders();
    res.json(orders);
  });

  app.patch("/api/orders/:id", auth.jwtAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await storage.getOrder(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const orderData = {
      ...order,
      status: req.body.status,
    }

    await storage.updateOrder(orderData);
    res.json(orderData);
  });

  app.post("/api/products", auth.jwtAuth, upload.array("imageFiles", 4), async (req, res) => {
    const files = req.files;
    try {
      const productExists = await storage.productExists(req.body.name, req.body.category);
      if (productExists) {
        return res.status(400).json({ message: "Product already exists" });
      }
      const awsUrls = await Promise.all((files as Express.Multer.File[]).map((file, idx) => uploadFileToS3(file, `${req.body.category}/${req.body.name}-${idx}`))
      )
      const newProductData = {
        ...req.body,
        imageUrl: awsUrls,
      }
      //deleting imageFiles to prevent unnecessary data being passed around
      delete newProductData.imageFiles;
      const productData = insertProductSchema.parse(newProductData);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data" });
      }
      //delete uploaded files from S3 if there was an error
      if (files) {
        await Promise.all((files as Express.Multer.File[]).map((_, idx) => {
          return deleteFileFromS3(`${req.body.category}/${req.body.name}-${idx}`);
        }));
      }
      throw error;
    }
  });

  app.delete("/api/products/:id", auth.jwtAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await storage.getProduct(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await storage.deleteProduct(id);
    res.json({ message: "Product deleted successfully" });
  });

  app.patch("/api/products/:id/restore", auth.jwtAuth, async (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await storage.getProduct(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await storage.restoreProduct(id);
    res.json(id);
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = req.body;
      
      // Create an order in database
      const instance = new Razorpay({
        key_id: config.RAZORPAY_KEY_ID,
        key_secret: config.RAZORPAY_KEY_SECRET,
      });

      const productPromises = orderData.items.map((item: any) => storage.getProduct(item.id));
      const products: Product[] = await Promise.all(productPromises);
      
      const orderTotal = products.reduce((total, product, index) => {
        if (product) {
          const item = orderData.items[index];
          return total + Number(product.price) * item.quantity;
        }
        return total;
      }, 0.0);

      if (orderTotal !== Number.parseFloat(orderData.total)) {
        return res.status(400).json({ message: "Invalid order data" });
      }

      const razorpayOrder = await instance.orders.create({
        amount: Math.round(Number.parseFloat(orderData.total) * 100),
        currency: "INR",
        receipt: generateRandomNumericString(),
      });

      res.status(201).json({
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        razorpayKeyId: process.env.RAZORPAY_KEY_ID,
      });
    } catch (error) {
      console.log(error)
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data" });
      }
      throw error;
    }
  });

app.post("/api/orders/verify", async (req, res) => {
    const { orderId, paymentId, signature, orderMetaData } = req.body;
    const text = orderId + "|" + paymentId;

    console.log({ orderId, paymentId, signature, orderMetaData });

    const orderData = insertOrderSchema.parse({
      ...orderMetaData,
      paymentId: paymentId,
      status: constants.orderStatuses.pending,
    });

    const productPromises = orderMetaData.items.map((item: any) => storage.getProduct(item.id));
    const products: Product[] = await Promise.all(productPromises);
    
    const orderTotal = products.reduce((total, product, index) => {
      if (product) {
        const item = orderMetaData.items[index];
        return total + Number(product.price) * item.quantity;
      }
      return total;
    }, 0.0);

    if (orderTotal !== Number.parseFloat(orderMetaData.total)) {
      return res.status(400).json({ verified: false });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(text)
      .digest("hex");
      
    if (generatedSignature === signature) {
      await storage.createOrder(orderData);
      // Send email to customer
      const emailHtml = purchaseEmailTemplate(orderId,
        orderMetaData.items, orderMetaData.total, orderMetaData.customerName);
      await sendEmail(orderMetaData.email, "Order Confirmation", emailHtml);z
      res.json({ verified: true });
    } else {
      res.status(400).json({ verified: false });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}