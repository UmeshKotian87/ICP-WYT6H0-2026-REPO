export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <p className="font-display text-2xl text-white tracking-widest mb-4">MAISON</p>
          <p className="text-sm leading-relaxed text-stone-400 max-w-xs">
            A curated collection of exceptional everyday objects. Each piece is chosen for its design integrity, material quality, and longevity.
          </p>
        </div>
        <div>
          <p className="text-xs tracking-widest text-stone-500 mb-4 uppercase">Shop</p>
          <ul className="space-y-2 text-sm">
            {['Watches', 'Accessories', 'Home', 'Apparel', 'Stationery'].map(c => (
              <li key={c}><a href={`/?category=${c}`} className="hover:text-white transition-colors">{c}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-widest text-stone-500 mb-4 uppercase">Info</p>
          <ul className="space-y-2 text-sm">
            {['About', 'Shipping', 'Returns', 'Contact', 'Sustainability'].map(p => (
              <li key={p}><a href="#" className="hover:text-white transition-colors">{p}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-800 px-6 py-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-stone-600">© 2024 MAISON. All rights reserved.</p>
        <p className="text-xs text-stone-600">Built with Next.js · Server Side Rendering · Week 6 Capstone</p>
      </div>
    </footer>
  );
}
