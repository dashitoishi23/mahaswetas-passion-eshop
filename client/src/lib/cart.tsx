import { create } from 'zustand';
import type { Product } from '@shared/schema';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCart = create<CartState>((set, get) => ({
  items: [],

  addItem: (product: Product) => {
    set((state: CartState) => {
      const existing = state.items.find(item => item.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    });
  },

  removeItem: (productId: number) => {
    set((state: CartState) => ({
      items: state.items.filter(item => item.product.id !== productId),
    }));
  },

  updateQuantity: (productId: number, quantity: number) => {
    set((state: CartState) => ({
      items: state.items.map(item =>
        item.product.id === productId
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