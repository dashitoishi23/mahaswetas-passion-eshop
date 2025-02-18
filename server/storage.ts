import { products, orders, type Product, type InsertProduct, type Order, type InsertOrder } from "@shared/schema";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private currentProductId: number;
  private currentOrderId: number;

  constructor() {
    this.products = new Map();
    this.orders = new Map();
    this.currentProductId = 1;
    this.currentOrderId = 1;
    this.initializeProducts();
  }

  private initializeProducts() {
    const sampleProducts: InsertProduct[] = [
      {
        name: "Traditional Silk Dupatta",
        description: "Hand-woven silk dupatta with intricate embroidery",
        price: "49.99",
        category: "Dupattas",
        imageUrl: "https://images.unsplash.com/photo-1717585679395-bbe39b5fb6bc"
      },
      {
        name: "Embroidered Georgette Dupatta",
        description: "Light georgette dupatta with floral patterns",
        price: "39.99",
        category: "Dupattas",
        imageUrl: "https://images.unsplash.com/photo-1597380281502-80858032f5bd"
      },
      {
        name: "Designer Kurti",
        description: "Modern cut kurti with traditional prints",
        price: "79.99",
        category: "Kurtis",
        imageUrl: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960"
      },
      {
        name: "Recycled Paper Necklace",
        description: "Handcrafted necklace made from recycled paper",
        price: "29.99",
        category: "Jewelry",
        imageUrl: "https://images.unsplash.com/photo-1737998874193-8f6da6cad870"
      }
    ];

    sampleProducts.forEach(product => {
      const id = this.currentProductId++;
      this.products.set(id, { ...product, id });
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = { ...insertOrder, id };
    this.orders.set(id, order);
    return order;
  }
}

export const storage = new MemStorage();
