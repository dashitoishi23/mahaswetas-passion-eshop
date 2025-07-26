import { create } from 'zustand';
import type { Product } from '@shared/schema';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number, productName: string) => void;
  updateQuantity: (productId: number, quantity: number, productName: string) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCart = create<CartState>((set, get) => ({
  items: [],

  addItem: (product: Product) => {
    set((state: CartState) => {
      const existing = state.items.find(item => item.product.id === product.id
        && item.product.name === product.name // adds check for different sizes too 
      );
      if (existing) {
        return {
          items: state.items.map(item =>
            item.product.id === product.id && item.product.name === product.name
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    });
  },

  removeItem: (productId: number, productName: string) => {
    set((state: CartState) => ({
      items: state.items.filter(item => item.product.id !== productId 
        && item.product.name !== productName),
    }));
  },

  updateQuantity: (productId: number, quantity: number, productName: string) => {
    set((state: CartState) => ({
      items: state.items.map(item =>
        item.product.id === productId && item.product.name === productName
          ? { ...item, quantity }
          : item
      ),
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },

  total: () => {
    const { items } = get();
    return items.reduce(
      (sum: number, item: CartItem) => sum + Number(item.product.price) * item.quantity,
      0
    );
  },
}));