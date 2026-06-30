'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Grid3X3, List, Star, SlidersHorizontal, ChevronDown } from 'lucide-react'

const collections: Record<string, { name: string; desc: string }> = {
  'new-arrivals': { name: 'New Arrivals', desc: 'Discover our latest hijab collections, fresh from the design studio.' },
  'best-sellers': { name: 'Best Sellers', desc: 'Our most loved hijabs and scarves, chosen by customers like you.' },
  'sale': { name: 'Sale', desc: 'Exclusive discounts on premium hijabs — limited time only.' },
  'premium': { name: 'Premium Collection', desc: 'Our finest selection of luxury hijabs crafted from the highest quality fabrics.' },
  'everyday': { name: 'Everyday Essentials', desc: 'Comfortable, breathable hijabs perfect for daily wear.' },
  'formal': { name: 'Formal Collection', desc: 'Elegant hijabs for weddings, events, and special occasions.' },
  'gift-boxes': { name: 'Gift Boxes', desc: 'Curated gift sets for the hijabi in your life.' },
  'limited-edition': { name: 'Limited Edition', desc: 'Exclusive designs available for a limited time only.' },
}

const products = Array(12).fill(0).map((_, i) => ({
  name: ['Premium Jersey Hijab', 'Chiffon Silk Scarf', 'Modal Everyday Hijab', 'Silk Embroidered Hijab', 'Cotton Prayer Hijab', 'Satin Evening Scarf'][i % 6],
  price: [39, 59, 34, 89, 24, 45][i % 6],
  comparePrice: i % 3 === 0 ? [49, 69, 44, 99, 34, 55][i % 6] : undefined,
  rating: [4.8, 4.6, 4.9, 4.7, 4.5, 4.3][i % 6],
  reviews: [24, 18, 31, 12, 42, 9][i % 6],
  badge: i % 4 === 0 ? 'Sale' : i % 4 === 1 ? 'New' : '',
}))

export default function CollectionPage() {
  const { slug } = useParams<{ slug: string }>()
  const [viewMode, setViewMode] = useState('grid')
  const collection = collections[slug] || { name: 'Collection', desc: 'Browse our curated collection.' }

  return (
    <div className="min-h-screen">
      <div className="bg-stone-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="flex items-center gap-3 text-sm text-stone-500 mb-4">
            <Link href="/" className="hover:text-stone-900">Home</Link><span>/</span>
            <Link href="/products" className="hover:text-stone-900">Products</Link><span>/</span>
            <span className="text-stone-900 capitalize">{slug.replace(/-/g, ' ')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-3">{collection.name}</h1>
          <p className="text-stone-500 text-lg max-w-2xl">{collection.desc}</p>
          <p className="text-sm text-stone-400 mt-4">Showing 12 of 48 products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-stone-200 rounded-xl text-sm font-medium hover:border-stone-400 transition-colors">
              <SlidersHorizontal className="h-4 w-4" /> Filters <ChevronDown className="h-3 w-3" />
            </button>
            <select className="text-sm border-2 border-stone-200 rounded-xl px-4 py-2 bg-white focus:outline-none focus:border-stone-400">
              <option>Newest</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Best Selling</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setViewMode('grid')} className={'p-2 rounded-lg ' + (viewMode === 'grid' ? 'bg-black text-white' : 'text-stone-400 hover:text-stone-600')}><Grid3X3 className="h-5 w-5" /></button>
            <button onClick={() => setViewMode('list')} className={'p-2 rounded-lg ' + (viewMode === 'list' ? 'bg-black text-white' : 'text-stone-400 hover:text-stone-600')}><List className="h-5 w-5" /></button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 6) * 0.05 }}>
              <Link href={'/products/' + product.name.toLowerCase().replace(/\s+/g, '-') + '-' + i} className="group block">
                <div className="aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden luxury-shadow-hover mb-3 relative">
                  {product.badge && <div className="absolute top-3 left-3 z-10"><Badge variant={product.badge === 'Sale' ? 'sale' : 'new'}>{product.badge}</Badge></div>}
                  <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </div>
                <h3 className="font-medium text-stone-900 group-hover:text-emerald-600 transition-colors text-sm">{product.name}</h3>
                <div className="flex items-center gap-0.5 mt-1">{Array(5).fill(0).map((_, s) => <Star key={s} className={'h-3 w-3 ' + (s < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-200')} />)}<span className="text-xs text-stone-400 ml-1">({product.reviews})</span></div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-stone-900 font-semibold"></span>
                  {product.comparePrice && <span className="text-stone-400 line-through text-sm"></span>}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5].map((p) => (
            <button key={p} className={'w-10 h-10 rounded-xl text-sm font-medium transition-all ' + (p === 1 ? 'bg-black text-white' : 'border border-stone-200 text-stone-600 hover:border-stone-400')}>{p}</button>
          ))}
        </div>
      </div>
    </div>
  )
}