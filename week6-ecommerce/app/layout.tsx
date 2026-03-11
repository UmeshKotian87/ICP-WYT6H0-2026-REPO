import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'MAISON — Curated Objects',
    template: '%s | MAISON',
  },
  description: 'A curated collection of exceptional everyday objects. Thoughtfully designed, built to last.',
  keywords: ['luxury', 'design', 'accessories', 'home', 'watches'],
  openGraph: {
    title: 'MAISON — Curated Objects',
    description: 'A curated collection of exceptional everyday objects.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
