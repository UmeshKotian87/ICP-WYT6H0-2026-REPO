import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductById, products } from '@/lib/products';
import AddToCartButton from '@/components/AddToCartButton';

interface Props {
  params: { id: string };
}

// SSR: generateMetadata runs on server for every product — great for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductById(params.id);
  if (!product) return { title: 'Not Found' };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

// SSG: Pre-generate all product pages at build time
export async function generateStaticParams() {
  return products.map(p => ({ id: p.id }));
}

export default function ProductPage({ params }: Props) {
  const product = getProductById(params.id);
  if (!product) notFound();

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex gap-2 text-xs text-stone-400 tracking-wider">
        <Link href="/" className="hover:text-stone-900 transition-colors">HOME</Link>
        <span>/</span>
        <Link href={`/?category=${product.category}`} className="hover:text-stone-900 transition-colors uppercase">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-stone-600 uppercase">{product.name}</span>
      </nav>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 pb-20">
        {/* Image */}
        <div className="relative aspect-square bg-stone-100 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-stone-900 text-white text-xs tracking-widest px-2 py-1">
              {product.badge.toUpperCase()}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <p className="text-xs text-stone-400 tracking-widest uppercase mb-2">{product.category}</p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-stone-900 mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-medium text-stone-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-stone-400 line-through">${product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <span className="text-sm text-green-700 font-medium">
                  Save ${product.originalPrice - product.price}
                </span>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 text-sm text-stone-500">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-stone-800 fill-stone-800' : 'text-stone-300 fill-stone-300'}`}
                  viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span>{product.rating} ({product.reviews} reviews)</span>
          </div>

          <p className="text-stone-600 leading-relaxed">{product.longDescription}</p>

          <div className="flex flex-wrap gap-2">
            {product.tags.map(tag => (
              <span key={tag} className="text-xs text-stone-400 border border-stone-200 px-3 py-1 tracking-wider uppercase">
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-3 pt-2">
            <AddToCartButton product={product} />
            <Link href="/cart" className="btn-secondary w-full text-center block">
              VIEW CART
            </Link>
          </div>

          <div className="border-t border-stone-100 pt-6 grid grid-cols-3 gap-4 text-center text-xs text-stone-500">
            <div>
              <p className="text-stone-900 font-medium mb-1">Free Shipping</p>
              <p>On orders over $150</p>
            </div>
            <div>
              <p className="text-stone-900 font-medium mb-1">30-Day Returns</p>
              <p>Hassle-free policy</p>
            </div>
            <div>
              <p className="text-stone-900 font-medium mb-1">Authentic</p>
              <p>Verified products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="bg-stone-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-2xl font-light text-stone-900 mb-8">
              More from {product.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map(rp => (
                <Link key={rp.id} href={`/product/${rp.id}`} className="group">
                  <div className="relative aspect-square bg-stone-100 overflow-hidden mb-3">
                    <Image
                      src={rp.image}
                      alt={rp.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="font-display text-lg">{rp.name}</h3>
                  <p className="text-stone-600">${rp.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
