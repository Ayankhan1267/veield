'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  ArrowRight,
  Heart,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import { useCartStore, useUIStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'

const RECENTLY_VIEWED = [
  { name: 'Premium Jersey Hijab', price: 39.99, slug: 'premium-jersey-hijab' },
  { name: 'Chiffon Hijab - Emerald', price: 49.99, slug: 'chiffon-hijab-emerald' },
  { name: 'Modal Everyday Hijab', price: 29.99, slug: 'modal-everyday-hijab' },
]

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    toggleDrawer,
    removeItem,
    updateQuantity,
    getSubtotal,
    couponCode,
    couponDiscount,
    setCoupon,
    removeCoupon,
  } = useCartStore()
  const { recentlyViewed } = useUIStore()
  const router = useRouter()
  const [couponInput, setCouponInput] = useState('')
  const [couponError, setCouponError] = useState('')

  const subtotal = getSubtotal()
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) {
      setCouponError('Please enter a coupon code')
      return
    }
    if (couponInput.trim().toUpperCase() === 'VEILED20') {
      setCoupon('VEILED20', 0.2)
      setCouponError('')
      setCouponInput('')
    } else {
      setCouponError('Invalid coupon code')
    }
  }

  const handleCheckout = () => {
    toggleDrawer()
    router.push('/checkout')
  }

  const handleQuantityChange = (id: string, delta: number) => {
    const item = items.find((i) => i.id === id)
    if (item) {
      updateQuantity(id, item.quantity + delta)
    }
  }

  return (
    <Sheet open={isDrawerOpen} onOpenChange={toggleDrawer}>
      <SheetContent className="flex flex-col p-0">
        <SheetHeader className="px-6 py-4">
          <SheetTitle>
            Shopping Cart
            {itemCount > 0 && (
              <span className="ml-2 text-sm font-normal text-neutral-500">
                ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-neutral-50">
              <ShoppingBag className="h-8 w-8 text-neutral-300" />
            </div>
            <h3 className="mb-1 font-serif text-lg font-semibold text-neutral-900">
              Your cart is empty
            </h3>
            <p className="mb-6 text-center text-sm text-neutral-500">
              Discover our premium collection of hijabs, scarves, and accessories.
            </p>
            <Button
              onClick={() => {
                toggleDrawer()
                router.push('/collections/all')
              }}
            >
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4"
                  >
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={toggleDrawer}
                      className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100"
                    />
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={toggleDrawer}
                            className="block truncate text-sm font-medium text-neutral-900 transition-colors hover:text-emerald-700"
                          >
                            {item.name}
                          </Link>
                          {item.color && (
                            <p className="text-xs text-neutral-500">{item.color}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="shrink-0 rounded-lg p-1 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 rounded-lg border border-neutral-200">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="flex h-7 w-7 items-center justify-center text-neutral-500 transition-colors hover:bg-neutral-100 disabled:opacity-30"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="flex h-7 w-8 items-center justify-center text-xs font-medium text-neutral-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            disabled={item.quantity >= item.maxQuantity}
                            className="flex h-7 w-7 items-center justify-center text-neutral-500 transition-colors hover:bg-neutral-100 disabled:opacity-30"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-sm font-medium text-neutral-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <Separator />
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Coupon Code
                  </h4>
                  {couponCode ? (
                    <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Tag className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-700">
                          {couponCode}
                        </span>
                        <span className="text-xs text-emerald-600">
                          ({Math.round(couponDiscount * 100)}% off)
                        </span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value)
                          setCouponError('')
                        }}
                        placeholder="Enter code"
                        className="h-9 flex-1 text-sm"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleApplyCoupon}
                        className="h-9 shrink-0"
                      >
                        Apply
                      </Button>
                    </div>
                  )}
                  {couponError && (
                    <p className="mt-1 text-xs text-red-500">{couponError}</p>
                  )}
                </div>
              </div>
            </ScrollArea>

            <SheetFooter className="px-6 py-4">
              <div className="w-full space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700">Subtotal</span>
                  <span className="text-lg font-semibold text-neutral-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  Shipping and taxes calculated at checkout
                </p>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCheckout}
                >
                  Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={toggleDrawer}
                >
                  Continue Shopping
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
