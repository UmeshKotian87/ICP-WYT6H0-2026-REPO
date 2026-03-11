'use client';

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { CartItem, calcCartTotal, calcCartCount } from './cart';
import { Product } from './products';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType | null>(null);

type Action =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] };

function cartReducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'LOAD_CART':
      return action.items;
    case 'ADD_ITEM': {
      const existing = state.find(i => i.product.id === action.product.id);
      if (existing) {
        return state.map(i =>
          i.product.id === action.product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...state, { product: action.product, quantity: 1 }];
    }
    case 'REMOVE_ITEM':
      return state.filter(i => i.product.id !== action.productId);
    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return state.filter(i => i.product.id !== action.productId);
      }
      return state.map(i =>
        i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
      );
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  // FIX: Use mounted state to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);

  // Load cart from localStorage only on client after mount
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('cart');
      if (saved) {
        dispatch({ type: 'LOAD_CART', items: JSON.parse(saved) });
      }
    } catch {}
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, mounted]);

  const addItem = (product: Product) => dispatch({ type: 'ADD_ITEM', product });
  const removeItem = (productId: string) => dispatch({ type: 'REMOVE_ITEM', productId });
  const updateQuantity = (productId: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      total: calcCartTotal(items),
      count: calcCartCount(items),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
