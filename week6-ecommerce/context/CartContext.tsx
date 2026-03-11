'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';
import type { Product } from '@/lib/products';

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; size?: string }
  | { type: 'REMOVE_ITEM'; productId: number; size?: string }
  | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number; size?: string }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const key = `${action.product.id}-${action.size ?? 'default'}`;
      const existing = state.items.find(
        (i) => `${i.product.id}-${i.size ?? 'default'}` === key
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            `${i.product.id}-${i.size ?? 'default'}` === key
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { product: action.product, quantity: 1, size: action.size }],
      };
    }
    case 'REMOVE_ITEM': {
      const key = `${action.productId}-${action.size ?? 'default'}`;
      return {
        items: state.items.filter(
          (i) => `${i.product.id}-${i.size ?? 'default'}` !== key
        ),
      };
    }
    case 'UPDATE_QUANTITY': {
      const key = `${action.productId}-${action.size ?? 'default'}`;
      if (action.quantity <= 0) {
        return {
          items: state.items.filter(
            (i) => `${i.product.id}-${i.size ?? 'default'}` !== key
          ),
        };
      }
      return {
        items: state.items.map((i) =>
          `${i.product.id}-${i.size ?? 'default'}` === key
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };
    }
    case 'CLEAR_CART':
      return { items: [] };
    case 'LOAD_CART':
      return { items: action.items };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, size?: string) => void;
  removeItem: (productId: number, size?: string) => void;
  updateQuantity: (productId: number, quantity: number, size?: string) => void;
  clearCart: () => void;
  isHydrated: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  // KEY: Track hydration to prevent SSR/Client HTML mismatch
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage only after hydration (client-side only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('cart');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          dispatch({ type: 'LOAD_CART', items: parsed });
        }
      }
    } catch {
      // Ignore parse errors
    }
    setIsHydrated(true);
  }, []);

  // Persist to localStorage whenever cart changes (after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('cart', JSON.stringify(state.items));
    }
  }, [state.items, isHydrated]);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        itemCount,
        subtotal,
        addItem: (product, size) => dispatch({ type: 'ADD_ITEM', product, size }),
        removeItem: (id, size) => dispatch({ type: 'REMOVE_ITEM', productId: id, size }),
        updateQuantity: (id, qty, size) =>
          dispatch({ type: 'UPDATE_QUANTITY', productId: id, quantity: qty, size }),
        clearCart: () => dispatch({ type: 'CLEAR_CART' }),
        isHydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
