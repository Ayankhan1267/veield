'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, ShoppingBag, Star, Trash2 } from 'lucide-react'
import { useWishlistStore, useCartStore } from '@/lib/store'
import toast from 'react-hot-toast'

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()
  const addItem = useCartStore((s) => s.addItem)

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6"><Heart className="h-8 w-8 text-stone-400" /></div>
          <h1 className="text-2xl font-serif text-stone-900 mb-3">Your wishlist is empty</h1>
          <p className="text-stone-500 mb-8">Save your favorite items and come back to them later.</p>
          <Button asChild size="lg" className="rounded-full"><Link href="/products">Discover Products</Link></Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="bg-stone-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-3">My Wishlist</h1>
          <p className="text-stone-500">{items.length} items saved</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group">
              <div className="aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden luxury-shadow-hover mb-3 relative">
                <div className="absolute top-3 left-3 z-10"><Badge variant="sale">-20%</Badge></div>
                <button onClick={() => { removeItem(i.toString()); toast.success('Removed from wishlist') }}
                  className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white">
                  <Trash2 className="h-4 w-4 text-stone-600" />
                </button>
                <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200" />
              </div>
              <h3 className="text-sm font-medium text-stone-900">Premium Jersey Hijab</h3>
              <div className="flex items-center gap-0.5 mt-1">{ [1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />) }<span className="text-xs text-stone-400 ml-1">(24)</span></div>
              <div className="flex items-center gap-2 mt-1.5"><span className="font-semibold text-stone-900">$39.00</span><span className="text-sm text-stone-400 line-through">$49.00</span></div>
              <Button size="sm" className="w-full mt-3 rounded-xl" onClick={() => { addItem({ id: crypto.randomUUID(), productId: i.toString(), variantId: 'default', name: 'Premium Jersey Hijab', image: '', price: 39, comparePrice: 49, quantity: 1, slug: 'premium-jersey-hijab', maxQuantity: 10 }); toast.success('Added to cart!') }}>
                <ShoppingBag className="mr-1.5 h-3.5 w-3.5" /> Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}