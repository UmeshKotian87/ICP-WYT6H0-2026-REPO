import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Order Confirmed',
};

function generateOrderNumber(): string {
  return `MSN-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

// SSR: Fresh order number generated on every request
export default function OrderConfirmationPage() {
  const orderNumber = generateOrderNumber();

  return (
    <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-6">
      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-xs text-stone-400 tracking-[0.3em] uppercase mb-4">Order Confirmed</p>
      <h1 className="font-display text-4xl font-light text-stone-900 mb-4">Thank You</h1>
      <p className="text-stone-500 max-w-md mb-2">
        Your order has been received and is being prepared with care.
      </p>
      <p className="text-sm font-medium text-stone-700 mb-8">Order #{orderNumber}</p>
      <p className="text-sm text-stone-500 mb-10 max-w-sm">
        A confirmation email has been sent to your inbox. Expected delivery in 3–5 business days.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="btn-primary">CONTINUE SHOPPING</Link>
        <Link href="/" className="btn-secondary">TRACK YOUR ORDER</Link>
      </div>
    </div>
  );
}
