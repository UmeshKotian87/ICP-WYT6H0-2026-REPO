'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { useCart } from '@/lib/CartContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="product-card group">
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden bg-stone-100 aspect-square mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="product-card-img object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-stone-900 text-white text-xs tracking-widest px-2 py-1">
              {product.badge.toUpperCase()}
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="text-stone-500 text-xs tracking-widest uppercase">Sold Out</span>
            </div>
          )}
        </div>
      </Link>
      <div className="space-y-1">
        <p className="text-xs text-stone-400 tracking-widest uppercase">{product.category}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-display text-lg font-medium text-stone-900 hover:text-stone-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-stone-500 line-clamp-1">{product.description}</p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-stone-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-stone-400 line-through">${product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={() => product.inStock && addItem(product)}
            disabled={!product.inStock}
            className="text-xs tracking-widest uppercase text-stone-600 hover:text-stone-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-b border-transparent hover:border-stone-900 pb-0.5"
          >
            {product.inStock ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );
}
