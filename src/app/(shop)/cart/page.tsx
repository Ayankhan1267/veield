'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Shield } from 'lucide-react'
import { useCartStore } from '@/lib/store'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, couponCode, setCoupon, removeCoupon } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6"><ShoppingBag className="h-8 w-8 text-stone-400" /></div>
          <h1 className="text-2xl font-serif text-stone-900 mb-3">Your cart is empty</h1>
          <p className="text-stone-500 mb-8">Looks like you haven't added anything yet. Let's find your perfect hijab!</p>
          <Button asChild size="lg" className="rounded-full"><Link href="/products">Shop Now <ArrowRight className="ml-2 h-5 w-5" /></Link></Button>
        </div>
      </div>
    )
  }

  const subtotal = getSubtotal()
  const shipping = subtotal >= 100 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen">
      <div className="bg-stone-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-3">Shopping Cart</h1>
          <p className="text-stone-500">{items.reduce((s, i) => s + i.quantity, 0)} items in your cart</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 md:gap-6 p-4 md:p-6 bg-white rounded-2xl border border-stone-100 luxury-shadow">
                <div className="w-20 h-24 md:w-24 md:h-28 bg-stone-100 rounded-xl overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link href={"/products/" + item.slug} className="text-sm md:text-base font-medium text-stone-900 hover:text-emerald-600 transition-colors line-clamp-1">{item.name}</Link>
                      {item.color && <p className="text-xs text-stone-400 mt-0.5">Color: {item.color} | Size: {item.size}</p>}
                    </div>
                    <p className="text-sm md:text-base font-semibold text-stone-900 whitespace-nowrap">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-stone-200 rounded-lg">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-stone-50"><Minus className="h-3 w-3" /></button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-stone-50"><Plus className="h-3 w-3" /></button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-stone-400 hover:text-red-500 transition-colors p-1"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-stone-50 rounded-2xl p-6 md:p-8 sticky top-28">
              <h2 className="font-serif text-xl text-stone-900 mb-6">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-stone-500">Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Shipping</span><span className="font-medium">{shipping === 0 ? <span className="text-emerald-600">Free</span> : '$' + shipping.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Tax (8%)</span><span className="font-medium">${tax.toFixed(2)}</span></div>
                <Separator className="bg-stone-200" />
                <div className="flex justify-between text-base"><span className="font-semibold text-stone-900">Total</span><span className="font-semibold text-stone-900">${total.toFixed(2)}</span></div>
              </div>
              {subtotal < 100 && <div className="mt-4 p-3 bg-emerald-50 rounded-xl text-xs text-emerald-700">Add ${(100 - subtotal).toFixed(2)} more for free shipping!</div>}
              <Button asChild size="lg" className="w-full mt-6 rounded-xl h-13"><Link href="/checkout">Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" /></Link></Button>
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-stone-400"><Shield className="h-3 w-3" /> Secure checkout with Stripe & Razorpay</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}