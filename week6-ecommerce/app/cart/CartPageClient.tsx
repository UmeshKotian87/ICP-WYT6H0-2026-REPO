'use client';

import { useCart } from '@/lib/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPageClient() {
  const { items, removeItem, updateQuantity, total, count } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-6">
        <svg className="w-16 h-16 text-stone-200 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <h1 className="font-display text-3xl font-light mb-4">Your Cart is Empty</h1>
        <p className="text-stone-500 mb-8">Add some objects of consequence to your collection.</p>
        <Link href="/" className="btn-primary">EXPLORE THE COLLECTION</Link>
      </div>
    );
  }

  const shipping = total >= 150 ? 0 : 12;
  const tax = total * 0.08;
  const orderTotal = total + shipping + tax;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="font-display text-4xl font-light mb-10">
          Your Cart <span className="text-stone-400 text-2xl">({count} items)</span>
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-6 pb-6 border-b border-stone-100">
                <Link href={`/product/${product.id}`} className="flex-shrink-0">
                  <div className="relative w-24 h-24 bg-stone-100 overflow-hidden">
                    <Image src={product.image} alt={product.name} fill
                      className="object-cover hover:scale-105 transition-transform duration-300" sizes="96px" />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-xs text-stone-400 tracking-widest uppercase mb-1">{product.category}</p>
                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-display text-lg font-medium hover:text-stone-600 transition-colors">{product.name}</h3>
                      </Link>
                    </div>
                    <p className="font-medium text-stone-900 whitespace-nowrap">${(product.price * quantity).toFixed(2)}</p>
                  </div>
                  <p className="text-sm text-stone-500 mt-1">${product.price} each</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center border border-stone-200">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-stone-50 transition-colors text-stone-600">−</button>
                      <span className="w-8 text-center text-sm">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-stone-50 transition-colors text-stone-600">+</button>
                    </div>
                    <button onClick={() => removeItem(product.id)}
                      className="text-xs text-stone-400 hover:text-red-500 transition-colors tracking-wider uppercase">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-stone-50 p-8 sticky top-24">
              <h2 className="font-display text-2xl font-light mb-6">Order Summary</h2>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-stone-600"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-700">Free</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && <p className="text-xs text-stone-400">Free shipping on orders over $150</p>}
                <div className="flex justify-between text-stone-600"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                <div className="border-t border-stone-200 pt-3 flex justify-between font-medium text-stone-900 text-base">
                  <span>Total</span><span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/checkout" className="btn-primary w-full text-center block mb-3">PROCEED TO CHECKOUT</Link>
              <Link href="/" className="btn-secondary w-full text-center block text-xs">CONTINUE SHOPPING</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
