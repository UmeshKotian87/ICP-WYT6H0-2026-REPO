import { Metadata } from 'next';
import CartPageClient from './CartPageClient';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Your shopping cart',
};

export default function CartPage() {
  return <CartPageClient />;
}
