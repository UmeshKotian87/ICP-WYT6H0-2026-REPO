import { Metadata } from 'next';
import { products, categories } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'MAISON — Curated Objects',
  description: 'A curated collection of exceptional everyday objects.',
};

interface PageProps {
  searchParams: { category?: string };
}

// This page is Server-Side Rendered: runs on every request
export default async function HomePage({ searchParams }: PageProps) {
  const activeCategory = searchParams.category || 'All';
  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <>
      {/* Hero - SSR: rendered on server with no client JS needed */}
      <section className="min-h-screen flex items-center justify-center bg-stone-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-200/40 via-transparent to-transparent" />
        <div className="text-center relative z-10 px-6">
          <p className="text-xs tracking-[0.4em] text-stone-400 uppercase mb-6">New Collection 2024</p>
          <h1 className="font-display text-6xl md:text-8xl font-light text-stone-900 leading-tight mb-8">
            Objects of<br /><em>Consequence</em>
          </h1>
          <p className="text-stone-500 text-lg max-w-md mx-auto mb-12 leading-relaxed">
            A curated selection of design-forward everyday objects, chosen for material integrity and enduring form.
          </p>
          <a href="#products" className="btn-primary inline-block">EXPLORE THE COLLECTION</a>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="max-w-7xl mx-auto px-6 py-20">
        {/* Category Filter — uses server-side URL params, no client JS */}
        <div className="flex flex-wrap gap-3 mb-12 items-center">
          <span className="text-xs text-stone-400 tracking-widest uppercase mr-2">Filter:</span>
          {['All', ...categories].map(cat => (
            <a
              key={cat}
              href={cat === 'All' ? '/' : `/?category=${cat}`}
              className={`px-4 py-2 text-xs tracking-widest uppercase transition-colors ${
                activeCategory === cat
                  ? 'bg-stone-900 text-white'
                  : 'border border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-900'
              }`}
            >
              {cat}
            </a>
          ))}
          <span className="ml-auto text-xs text-stone-400">{filtered.length} items</span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
