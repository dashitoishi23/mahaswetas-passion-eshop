import { products, orders, admins, type Product, type InsertProduct, type Order, type InsertOrder, type Admin, type InsertAdmin, Category, categories, InsertCategory } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getCategories(): Promise<Category[]>;
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  createOrder(order: InsertOrder): Promise<Order>;
  getOrders(): Promise<Order[]>;
  getAdmin(id: number): Promise<Admin | undefined>;
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  getAdminByEmail(email: string): Promise<Admin | undefined>;
  updateAdminResetToken(id: number, token: string | null, expiry: Date | null): Promise<void>;
  initializeAdmin(admin: InsertAdmin): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getCategories(): Promise<Category[]> {
    return await db.select()
      .from(categories);
  }

  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select()
      .from(products)
      .where(and(eq(products.category, category), 
      eq(products.isDeleted, false)));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select()
      .from(products)
      .where(eq(products.id, id));
    return product;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products)
      .values(insertProduct)
      .returning();
    return product;
  }

  async productExists(name: string, category: string): Promise<boolean> {
    const [product] = await db.select()
      .from(products)
      .where(and(eq(products.name, name), eq(products.category, category), eq(products.isDeleted, false)));
    return !!product;
  }

  async deleteProduct(id: number): Promise<void> {
    await db.update(products)
    .set({
      isDeleted: true,
    })
    .where(eq(products.id, id));
  }

  async restoreProduct(id: number): Promise<void> {
    console.log(id)
    await db.update(products)
      .set({
        isDeleted: false,
      })
      .where(eq(products.id, id));
  }

  async getOrders(): Promise<Order[]> {
    return await db.select().from(orders);
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select()
      .from(orders)
      .where(eq(orders.id, id));
    return order;
  }

  async updateOrder(order: Order): Promise<void> {
    console.log("Updating order", order);
    await db.update(orders)
      .set({        
        status: order.status,
      })
      .where(eq(orders.id, order.id));
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    console.log("order", insertOrder);
    const [order] = await db.insert(orders)
      .values(insertOrder)
      .returning();
    return order;
  }

  async getAdmin(id: number): Promise<Admin | undefined> {
    const [admin] = await db.select()
      .from(admins)
      .where(eq(admins.id, id));
    return admin;
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    const [admin] = await db.select()
      .from(admins)
      .where(eq(admins.username, username));
    return admin;
  }

  async getAdminByEmail(email: string): Promise<Admin | undefined> {
    const [admin] = await db.select()
      .from(admins)
      .where(eq(admins.email, email));
    return admin;
  }

  async addCategory(category: InsertCategory): Promise<void> {
    await db.insert(categories).values(category);
  }

  async updateAdminResetToken(id: number, token: string | null, expiry: Date | null): Promise<void> {
    await db.update(admins)
      .set({ resetToken: token, resetTokenExpiry: expiry })
      .where(eq(admins.id, id));
  }

  async initializeAdmin(admin: InsertAdmin): Promise<void> {
    const existingAdmin = await this.getAdminByUsername(admin.username);
    if (!existingAdmin) {
      throw new Error(`Admin user ${admin.username} not found`);
    }
  }

  // Initialize sample products if none exist
  async initializeProducts() {
    const existingProducts = await this.getProducts();
    if (existingProducts.length === 0) {
      const sampleProducts: InsertProduct[] = [
        {
          name: "Traditional Silk Dupatta",
          description: "Hand-woven silk dupatta with intricate embroidery",
          price: "3999.00",
          category: "Dupattas",
          imageUrl: ["https://images.unsplash.com/photo-1717585679395-bbe39b5fb6bc"]
        },
        {
          name: "Embroidered Georgette Dupatta",
          description: "Light georgette dupatta with floral patterns",
          price: "2999.00",
          category: "Dupattas",
          imageUrl: ["https://images.unsplash.com/photo-1597380281502-80858032f5bd"]
        },
        {
          name: "Designer Kurti",
          description: "Modern cut kurti with traditional prints",
          price: "5999.00",
          category: "Kurtis",
          imageUrl: ["https://images.unsplash.com/photo-1609921212029-bb5a28e60960"]
        },
        {
          name: "Recycled Paper Necklace",
          description: "Handcrafted necklace made from recycled paper",
          price: "1999.00",
          category: "Jewelry",
          imageUrl: ["https://images.unsplash.com/photo-1737998874193-8f6da6cad870"]
        }
      ];

      await db.insert(products).values(sampleProducts);
    }
  }
}

export const storage = new DatabaseStorage();
// Initialize sample products
storage.initializeProducts().catch(console.error);