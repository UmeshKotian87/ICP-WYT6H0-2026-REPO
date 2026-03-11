'use client';

import { useCart } from '@/lib/CartContext';
import { Product } from '@/lib/products';
import { useState } from 'react';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (!product.inStock) {
    return (
      <button disabled className="btn-primary w-full opacity-40 cursor-not-allowed">
        OUT OF STOCK
      </button>
    );
  }

  return (
    <button onClick={handleAdd} className="btn-primary w-full">
      {added ? '✓ ADDED TO CART' : 'ADD TO CART'}
    </button>
  );
}
