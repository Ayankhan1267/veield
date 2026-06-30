'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ChevronLeft, Shield, Lock, Truck } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const { items, getSubtotal } = useCartStore()
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('stripe')

  const subtotal = getSubtotal()
  const shipping = subtotal >= 100 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handlePlaceOrder = () => {
    toast.success('Order placed successfully!')
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-8">
        <Link href="/cart" className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-900 mb-8"><ChevronLeft className="h-4 w-4" /> Back to Cart</Link>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 luxury-shadow">
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h1 className="text-2xl font-serif text-stone-900 mb-8">Shipping Information</h1>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4"><Input label="First Name" placeholder="John" /><Input label="Last Name" placeholder="Doe" /></div>
                    <Input label="Email" type="email" placeholder="john@example.com" />
                    <Input label="Phone" placeholder="+1 (555) 000-0000" />
                    <Input label="Address" placeholder="123 Main Street" />
                    <div className="grid grid-cols-2 gap-4"><Input label="City" placeholder="New York" /><Input label="State" placeholder="NY" /></div>
                    <div className="grid grid-cols-2 gap-4"><Input label="ZIP Code" placeholder="10001" /><Input label="Country" placeholder="United States" /></div>
                    <Button size="lg" onClick={() => setStep(2)} className="w-full mt-4 rounded-xl">Continue to Shipping Method</Button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h1 className="text-2xl font-serif text-stone-900 mb-8">Shipping Method</h1>
                  <div className="space-y-3 mb-8">
                    {[
                      { name: 'Standard', desc: '5-8 business days', price: 5.99, free: subtotal >= 100 },
                      { name: 'Express', desc: '2-3 business days', price: 14.99 },
                      { name: 'International', desc: '7-14 business days', price: 24.99 },
                    ].map((m) => (
                      <label key={m.name} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${m.free || false ? 'border-emerald-500 bg-emerald-50' : 'border-stone-200 hover:border-stone-400'}`}>
                        <div className="flex items-center gap-3">
                          <input type="radio" name="shipping" className="accent-emerald-600" />
                          <div><p className="font-medium text-stone-900 text-sm">{m.name}{m.free ? ' (Free)' : ''}</p><p className="text-xs text-stone-500">{m.desc}</p></div>
                        </div>
                        <span className="font-medium text-sm">{m.free ? 'FREE' : '$' + m.price.toFixed(2)}</span>
                      </label>
                    ))}
                  </div>
                  <Button size="lg" onClick={() => setStep(3)} className="w-full rounded-xl">Continue to Payment</Button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h1 className="text-2xl font-serif text-stone-900 mb-8">Payment Method</h1>
                  <div className="space-y-3 mb-8">
                    {[
                      { id: 'stripe', name: 'Credit/Debit Card', desc: 'Visa, Mastercard, Amex', icon: '💳' },
                      { id: 'razorpay', name: 'Razorpay', desc: 'UPI, Cards, Net Banking, Wallet', icon: '🏦' },
                      { id: 'phonepe', name: 'PhonePe', desc: 'UPI Payments', icon: '📱' },
                      { id: 'cod', name: 'Cash on Delivery', desc: 'Pay when you receive', icon: '💵' },
                    ].map((m) => (
                      <label key={m.id} onClick={() => setPaymentMethod(m.id)}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === m.id ? 'border-black bg-stone-50' : 'border-stone-200 hover:border-stone-400'}`}>
                        <div className="flex items-center gap-3">
                          <input type="radio" name="payment" checked={paymentMethod === m.id} readOnly className="accent-black" />
                          <div><p className="font-medium text-stone-900 text-sm">{m.name}</p><p className="text-xs text-stone-500">{m.desc}</p></div>
                        </div>
                        <span className="text-lg">{m.icon}</span>
                      </label>
                    ))}
                  </div>
                  <Button size="lg" onClick={handlePlaceOrder} className="w-full rounded-xl h-13 text-base">Place Order — ${total.toFixed(2)}</Button>
                  <div className="flex items-center justify-center gap-2 mt-4 text-xs text-stone-400"><Lock className="h-3 w-3" /> Your payment info is secure and encrypted</div>
                </motion.div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 luxury-shadow sticky top-28">
              <h2 className="font-medium text-stone-900 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-16 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0"><div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-stone-900 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-stone-400">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="bg-stone-200 mb-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-stone-500">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Shipping</span><span>{shipping === 0 ? <span className="text-emerald-600">Free</span> : '$' + shipping.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Tax</span><span>${tax.toFixed(2)}</span></div>
                <Separator className="bg-stone-200" />
                <div className="flex justify-between text-base font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-stone-400"><Truck className="h-3 w-3" /> Estimated delivery: 3-7 business days</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}