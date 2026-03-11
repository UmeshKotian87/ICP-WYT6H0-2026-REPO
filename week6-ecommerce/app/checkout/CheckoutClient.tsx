'use client';

import { useCart } from '@/lib/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

type Step = 'shipping' | 'payment' | 'review';

export default function CheckoutClient() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<Step>('shipping');
  const [loading, setLoading] = useState(false);

  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'US',
  });

  const [payment, setPayment] = useState({
    cardNumber: '', cardName: '', expiry: '', cvv: '',
  });

  const shippingCost = total >= 150 ? 0 : 12;
  const tax = total * 0.08;
  const orderTotal = total + shippingCost + tax;

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShipping(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    }
    if (e.target.name === 'expiry') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
    }
    if (e.target.name === 'cvv') value = value.replace(/\D/g, '').slice(0, 4);
    setPayment(prev => ({ ...prev, [e.target.name]: value }));
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    clearCart();
    router.push('/order-confirmation');
  };

  if (items.length === 0 && !loading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-display text-3xl font-light mb-4">Nothing to Check Out</h1>
        <Link href="/" className="btn-primary mt-6">SHOP NOW</Link>
      </div>
    );
  }

  const steps: Step[] = ['shipping', 'payment', 'review'];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="font-display text-4xl font-light mb-8">Checkout</h1>

        {/* Step Indicator */}
        <div className="flex items-center gap-0 mb-12">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center gap-2 text-sm tracking-wider uppercase ${
                step === s ? 'text-stone-900' : steps.indexOf(step) > i ? 'text-stone-400' : 'text-stone-300'
              }`}>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border ${
                  step === s ? 'border-stone-900 bg-stone-900 text-white'
                  : steps.indexOf(step) > i ? 'border-stone-400 text-stone-400'
                  : 'border-stone-200 text-stone-300'
                }`}>{i + 1}</span>
                <span className="hidden md:inline">{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-12 md:w-20 h-px mx-3 ${steps.indexOf(step) > i ? 'bg-stone-400' : 'bg-stone-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Shipping Step */}
            {step === 'shipping' && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-light">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'firstName', label: 'First Name', col: 1 },
                    { name: 'lastName', label: 'Last Name', col: 1 },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="text-xs text-stone-500 tracking-widest uppercase block mb-1">{f.label}</label>
                      <input type="text" name={f.name}
                        value={shipping[f.name as keyof typeof shipping]}
                        onChange={handleShippingChange}
                        className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:border-stone-900 transition-colors"
                      />
                    </div>
                  ))}
                </div>
                {[
                  { name: 'email', label: 'Email Address', type: 'email' },
                  { name: 'phone', label: 'Phone Number', type: 'tel' },
                  { name: 'address', label: 'Street Address', type: 'text' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="text-xs text-stone-500 tracking-widest uppercase block mb-1">{f.label}</label>
                    <input type={f.type} name={f.name}
                      value={shipping[f.name as keyof typeof shipping]}
                      onChange={handleShippingChange}
                      className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:border-stone-900 transition-colors"
                    />
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: 'city', label: 'City' },
                    { name: 'state', label: 'State' },
                    { name: 'zip', label: 'ZIP Code' },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="text-xs text-stone-500 tracking-widest uppercase block mb-1">{f.label}</label>
                      <input type="text" name={f.name}
                        value={shipping[f.name as keyof typeof shipping]}
                        onChange={handleShippingChange}
                        className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:border-stone-900 transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep('payment')} className="btn-primary">
                  CONTINUE TO PAYMENT
                </button>
              </div>
            )}

            {/* Payment Step */}
            {step === 'payment' && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-light">Payment Details</h2>
                <div className="bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-700 flex gap-2">
                  <span>🔒</span>
                  <span>Your payment information is encrypted and secure. This is a demo — no real charges.</span>
                </div>
                {[
                  { name: 'cardName', label: 'Name on Card', placeholder: 'John Doe' },
                  { name: 'cardNumber', label: 'Card Number', placeholder: '4242 4242 4242 4242' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="text-xs text-stone-500 tracking-widest uppercase block mb-1">{f.label}</label>
                    <input type="text" name={f.name} placeholder={f.placeholder}
                      value={payment[f.name as keyof typeof payment]}
                      onChange={handlePaymentChange}
                      className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:border-stone-900 transition-colors"
                    />
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-stone-500 tracking-widest uppercase block mb-1">Expiry Date</label>
                    <input type="text" name="expiry" placeholder="MM/YY"
                      value={payment.expiry} onChange={handlePaymentChange}
                      className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:border-stone-900 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-stone-500 tracking-widest uppercase block mb-1">CVV</label>
                    <input type="text" name="cvv" placeholder="123"
                      value={payment.cvv} onChange={handlePaymentChange}
                      className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:border-stone-900 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep('shipping')} className="btn-secondary">BACK</button>
                  <button onClick={() => setStep('review')} className="btn-primary">REVIEW ORDER</button>
                </div>
              </div>
            )}

            {/* Review Step */}
            {step === 'review' && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-light">Review Your Order</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-stone-50 p-4">
                    <p className="text-xs tracking-widest text-stone-500 uppercase mb-2">Ship To</p>
                    <p className="text-sm text-stone-800">{shipping.firstName} {shipping.lastName}</p>
                    <p className="text-sm text-stone-600">{shipping.address}</p>
                    <p className="text-sm text-stone-600">{shipping.city}, {shipping.state} {shipping.zip}</p>
                  </div>
                  <div className="bg-stone-50 p-4">
                    <p className="text-xs tracking-widest text-stone-500 uppercase mb-2">Payment</p>
                    <p className="text-sm text-stone-800">{payment.cardName}</p>
                    <p className="text-sm text-stone-600">
                      **** **** **** {payment.cardNumber.replace(/\s/g, '').slice(-4) || '????'}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center gap-4 py-3 border-b border-stone-100">
                      <div className="relative w-14 h-14 bg-stone-100 flex-shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="56px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-stone-500">Qty: {quantity}</p>
                      </div>
                      <p className="font-medium">${(product.price * quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep('payment')} className="btn-secondary">BACK</button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="btn-primary flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        PROCESSING...
                      </>
                    ) : `PLACE ORDER · $${orderTotal.toFixed(2)}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-stone-50 p-6 h-fit sticky top-24">
            <h3 className="font-display text-xl font-light mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm mb-4">
              {items.slice(0, 3).map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-stone-600">
                  <span className="truncate mr-2">{product.name} ×{quantity}</span>
                  <span className="whitespace-nowrap">${(product.price * quantity).toFixed(2)}</span>
                </div>
              ))}
              {items.length > 3 && (
                <p className="text-stone-400 text-xs">+{items.length - 3} more items</p>
              )}
            </div>
            <div className="border-t border-stone-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-stone-600"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-stone-600"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="border-t border-stone-200 pt-2 flex justify-between font-medium text-stone-900 text-base">
                <span>Total</span><span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
