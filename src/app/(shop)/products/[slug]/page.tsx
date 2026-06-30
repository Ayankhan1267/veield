'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Heart, Share2, ShoppingBag, Minus, Plus, Star, Truck, Shield, RefreshCw, Ruler, Info, Check } from 'lucide-react'
import { useCartStore, useWishlistStore } from '@/lib/store'
import toast from 'react-hot-toast'
import Breadcrumb from '@/components/layout/breadcrumb'

const colors = [
  { name: 'Black', hex: '#0a0a0a' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Beige', hex: '#f5f0e8' },
  { name: 'Navy', hex: '#1a2744' },
  { name: 'Emerald', hex: '#059669' },
  { name: 'Dusty Rose', hex: '#c9a9a6' },
]

const sizes = ['One Size', 'Standard', 'Oversized']

const reviews = [
  { name: 'Amina K.', rating: 5, date: '2 weeks ago', content: 'Absolutely stunning quality! The fabric is so soft and flows beautifully.', verified: true },
  { name: 'Sarah M.', rating: 5, date: '1 month ago', content: 'My go-to hijab for everyday wear. So comfortable and stays in place all day.', verified: true },
  { name: 'Layla R.', rating: 4, date: '1 month ago', content: 'Beautiful color and great quality. Slightly sheer but perfect for layering.', verified: true },
]

const faqs = [
  { q: 'What fabric is this hijab made of?', a: 'This premium jersey hijab is made from high-quality modal blend fabric that is soft, breathable, and wrinkle-resistant.' },
  { q: 'Is this hijab pre-stitched?', a: 'No, this is an unstitched rectangular hijab that gives you flexibility in styling.' },
  { q: 'How do I care for this hijab?', a: 'Hand wash cold or machine wash gentle cycle. Hang dry. Do not bleach. Iron on low heat if needed.' },
]

export default function ProductDetailPage() {
  const [selectedColor, setSelectedColor] = useState("Black")
  const [selectedSize, setSelectedSize] = useState("One Size")
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((s) => s.addItem)
  const toggleWishlist = useWishlistStore((s) => s.toggleItem)
  const isWishlisted = useWishlistStore((s) => s.isInWishlist("1"))

  const handleAddToCart = () => {
    addItem({
      id: crypto.randomUUID(),
      productId: "1",
      variantId: selectedColor + selectedSize,
      name: "Premium Jersey Hijab",
      image: "/images/product-1.jpg",
      price: 39.00,
      comparePrice: 49.00,
      quantity,
      color: selectedColor,
      size: selectedSize,
      slug: "premium-jersey-hijab",
      maxQuantity: 10,
    })
    toast.success("Added to cart!")
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
        <Breadcrumb />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="aspect-[4/5] bg-stone-100 rounded-3xl overflow-hidden relative group cursor-crosshair">
              <div className="w-full h-full bg-gradient-to-br from-stone-50 to-stone-200" />
              <button onClick={() => { toggleWishlist("1"); toast.success(isWishlisted ? "Removed" : "Added to wishlist") }}
                className="absolute top-6 right-6 w-11 h-11 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg z-10">
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-stone-600"}`} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((_, i) => (
                <button key={i} className="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-stone-200 transition-all">
                  <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-300" />
                </button>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="new" className="text-xs">New</Badge>
              <Badge variant="sale" className="text-xs">20% Off</Badge>
              <Badge variant="emerald" className="text-xs">Best Seller</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-stone-900 mb-3 leading-tight">Premium Jersey Hijab</h1>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (<Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />))}
              </div>
              <span className="text-sm text-stone-500">124 reviews</span>
              <span className="text-sm text-emerald-600 font-medium">| 200+ sold</span>
            </div>
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-semibold text-stone-900">$39.00</span>
              <span className="text-lg text-stone-400 line-through">$49.00</span>
              <Badge variant="sale" className="text-xs">Save $10</Badge>
            </div>
            <div className="mb-8">
              <span className="text-sm font-medium text-stone-700 mb-3 block">Color: <span className="text-stone-900">{selectedColor}</span></span>
              <div className="flex gap-3">
                {colors.map((c) => (
                  <button key={c.name} onClick={() => setSelectedColor(c.name)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === c.name ? "border-emerald-500 scale-110 shadow-md" : "border-stone-200 hover:border-stone-400"}`}
                    style={{ backgroundColor: c.hex }} title={c.name}>
                    {selectedColor === c.name && <Check className={`h-4 w-4 m-auto ${c.name === "White" ? "text-black" : "text-white"}`} />}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-stone-700">Size</span>
                <button className="text-xs text-emerald-600 flex items-center gap-1 hover:underline"><Ruler className="h-3 w-3" /> Size Guide</button>
              </div>
              <div className="flex gap-3">
                {sizes.map((s) => (
                  <button key={s} onClick={() => setSelectedSize(s)}
                    className={`px-5 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${selectedSize === s ? "border-black bg-black text-white" : "border-stone-200 text-stone-600 hover:border-stone-400"}`}>{s}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border-2 border-stone-200 rounded-xl">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-stone-50 transition-colors rounded-l-xl"><Minus className="h-4 w-4 text-stone-600" /></button>
                <span className="w-14 text-center font-medium text-stone-900">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(10, quantity + 1))} className="w-12 h-12 flex items-center justify-center hover:bg-stone-50 transition-colors rounded-r-xl"><Plus className="h-4 w-4 text-stone-600" /></button>
              </div>
              <Button size="lg" onClick={handleAddToCart} className="flex-1 rounded-xl h-12"><ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart</Button>
            </div>
            <div className="bg-stone-50 rounded-2xl p-6 space-y-4 mb-8">
              <div className="flex items-center gap-3"><Truck className="h-5 w-5 text-emerald-600 flex-shrink-0" /><div><p className="text-sm font-medium text-stone-900">Free shipping on orders over $100</p><p className="text-xs text-stone-500">Estimated delivery: 3-7 business days</p></div></div>
              <Separator className="bg-stone-200" />
              <div className="flex items-center gap-3"><RefreshCw className="h-5 w-5 text-emerald-600 flex-shrink-0" /><div><p className="text-sm font-medium text-stone-900">Free 30-day returns</p><p className="text-xs text-stone-500">Hassle-free returns and exchanges</p></div></div>
              <Separator className="bg-stone-200" />
              <div className="flex items-center gap-3"><Shield className="h-5 w-5 text-emerald-600 flex-shrink-0" /><p className="text-sm text-stone-900">Secure checkout with <span className="font-medium">Stripe</span> & <span className="font-medium">Razorpay</span></p></div>
            </div>
            <Tabs defaultValue="details">
              <TabsList className="w-full border-b border-stone-200 rounded-none bg-transparent h-auto gap-8">
                <TabsTrigger value="details" className="text-sm data-[state=active]:border-black data-[state=active]:text-black rounded-none border-b-2 border-transparent pb-3 text-stone-400">Details</TabsTrigger>
                <TabsTrigger value="care" className="text-sm data-[state=active]:border-black data-[state=active]:text-black rounded-none border-b-2 border-transparent pb-3 text-stone-400">Care</TabsTrigger>
                <TabsTrigger value="shipping" className="text-sm data-[state=active]:border-black data-[state=active]:text-black rounded-none border-b-2 border-transparent pb-3 text-stone-400">Shipping</TabsTrigger>
                <TabsTrigger value="faq" className="text-sm data-[state=active]:border-black data-[state=active]:text-black rounded-none border-b-2 border-transparent pb-3 text-stone-400">FAQ</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="pt-6">
                <div className="text-sm text-stone-600 leading-relaxed space-y-3">
                  <p>Our Premium Jersey Hijab is crafted from the finest modal blend fabric, offering unparalleled softness and a graceful drape.</p>
                  <ul className="space-y-1.5 list-disc pl-5"><li>Premium modal blend jersey fabric</li><li>Ultra-soft, breathable, lightweight</li><li>Wrinkle-resistant for all-day wear</li><li>Generous sizing: 70" x 26"</li><li>Available in 12 stunning colors</li></ul>
                </div>
              </TabsContent>
              <TabsContent value="care" className="pt-6">
                <div className="text-sm text-stone-600 space-y-2"><p>To keep your hijab looking its best:</p><ul className="space-y-1.5 list-disc pl-5"><li>Hand wash cold or gentle machine cycle</li><li>Use mild detergent, avoid bleach</li><li>Hang dry or tumble dry low</li><li>Iron on low heat if needed</li></ul></div>
              </TabsContent>
              <TabsContent value="shipping" className="pt-6">
                <div className="text-sm text-stone-600 space-y-2">
                  <p>We ship worldwide with tracking.</p>
                  <ul className="space-y-1.5 list-disc pl-5"><li>Standard (5-8 days): $5.99</li><li>Express (2-3 days): $14.99</li><li>Free standard over $100</li><li>International (7-14 days): $24.99</li></ul>
                </div>
              </TabsContent>
              <TabsContent value="faq" className="pt-6">
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i}><p className="text-sm font-medium text-stone-900 mb-1 flex items-center gap-2"><Info className="h-3 w-3 text-emerald-600" /> {faq.q}</p><p className="text-sm text-stone-600 ml-5">{faq.a}</p></div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
        <section className="mt-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-stone-900">Customer Reviews</h2>
              <div className="flex items-center gap-2 mt-2"><div className="flex items-center gap-0.5">{ [1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />) }</div><span className="text-sm text-stone-500">4.9 out of 5 (124 reviews)</span></div>
            </div>
            <Button variant="outline" className="rounded-full">Write a Review</Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-stone-50 rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-3">{ [1,2,3,4,5].map(s => <Star key={s} className={`h-3.5 w-3.5 ${s <= r.rating ? "fill-amber-400 text-amber-400" : "text-stone-200"}`} />) }</div>
                <p className="text-sm text-stone-700 mb-4">{r.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><span className="text-sm font-medium text-stone-900">{r.name}</span>{r.verified && <Badge variant="emerald" className="text-[10px] px-1.5 py-0">Verified</Badge>}</div>
                  <span className="text-xs text-stone-400">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-24">
          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mb-10">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Link key={i} href={"/products/related-" + i} className="group block">
                <div className="aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden mb-4"><div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 group-hover:scale-105 transition-transform duration-500" /></div>
                <h3 className="text-sm font-medium text-stone-900 group-hover:text-emerald-600 transition-colors">Related Style Hijab</h3>
                <p className="text-sm text-stone-900 font-semibold mt-1">$44.00</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}