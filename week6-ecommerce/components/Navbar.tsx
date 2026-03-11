'use client';

import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl font-semibold tracking-widest text-stone-900">
          MAISON
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-wider text-stone-600">
          <Link href="/?category=Watches" className="hover:text-stone-900 transition-colors">WATCHES</Link>
          <Link href="/?category=Accessories" className="hover:text-stone-900 transition-colors">ACCESSORIES</Link>
          <Link href="/?category=Home" className="hover:text-stone-900 transition-colors">HOME</Link>
          <Link href="/?category=Apparel" className="hover:text-stone-900 transition-colors">APPAREL</Link>
        </nav>
        <Link href="/cart" className="relative flex items-center gap-2 text-stone-900 hover:text-stone-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="text-sm tracking-wider">CART</span>
          {/* FIX: Only render count after mount to prevent hydration mismatch */}
          {mounted && count > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-stone-900 text-white text-xs rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
