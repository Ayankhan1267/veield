'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Grid3X3, List, SlidersHorizontal, X, Star, ChevronDown } from 'lucide-react'

const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Best Selling', 'Most Popular']

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState('grid')
  const [priceRange, setPriceRange] = useState([0, 200])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const filters = [
    { title: 'Color', options: ['Black', 'White', 'Beige', 'Navy', 'Emerald', 'Dusty Rose', 'Blush Pink', 'Mocha'] },
    { title: 'Fabric', options: ['Jersey', 'Chiffon', 'Modal', 'Silk', 'Cotton', 'Satin', 'Crepe'] },
    { title: 'Size', options: ['One Size', 'Standard', 'Oversized', 'Square'] },
    { title: 'Occasion', options: ['Everyday', 'Formal', 'Casual', 'Work', 'Wedding', 'Travel'] },
    { title: 'Price', options: [] },
    { title: 'Rating', options: ['4★ & above', '3★ & above', '2★ & above'] },
  ]

  return (
    <div className="min-h-screen">
      <div className="bg-stone-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-3">Hijabs</h1>
          <div className="flex items-center gap-3 text-sm text-stone-500">
            <Link href="/" className="hover:text-stone-900">Home</Link>
            <span>/</span>
            <span className="text-stone-900">Hijabs</span>
            <span className="ml-auto text-stone-400">Showing 24 of 48 products</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border-2 border-stone-200 rounded-xl text-sm font-medium hover:border-stone-400 transition-colors">
              <SlidersHorizontal className="h-4 w-4" /> Filters {showFilters ? <ChevronDown className="h-3 w-3 rotate-180" /> : <ChevronDown className="h-3 w-3" />}
            </button>
            <select className="text-sm border-2 border-stone-200 rounded-xl px-4 py-2 bg-white focus:outline-none focus:border-stone-400">
              {sortOptions.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-black text-white' : 'text-stone-400 hover:text-stone-600'}`}><Grid3X3 className="h-5 w-5" /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-black text-white' : 'text-stone-400 hover:text-stone-600'}`}><List className="h-5 w-5" /></button>
          </div>
        </div>

        <div className="flex gap-8">
          {showFilters && (
            <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-64 flex-shrink-0 hidden lg:block">
              <div className="space-y-8">
                {filters.map((filter) => (
                  <div key={filter.title}>
                    <h3 className="text-sm font-semibold text-stone-900 mb-3 uppercase tracking-wider">{filter.title}</h3>
                    {filter.title === 'Price' ? (
                      <div className="px-2">
                        <Slider defaultValue={[0, 200]} max={500} step={10} onValueChange={(v) => setPriceRange(v)} className="mb-3" />
                        <div className="flex items-center justify-between text-sm text-stone-500">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    ) : filter.title === 'Rating' ? (
                      <div className="space-y-2">
                        {filter.options.map((o) => (
                          <label key={o} className="flex items-center gap-2 cursor-pointer text-sm text-stone-600 hover:text-stone-900"><Checkbox />{o}</label>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {filter.options.map((o) => (
                          <label key={o} className="flex items-center gap-2 cursor-pointer text-sm text-stone-600 hover:text-stone-900"><Checkbox />{o}</label>
                        ))}
                      </div>
                    )}
                    <Separator className="mt-6 bg-stone-100" />
                  </div>
                ))}
              </div>
            </motion.aside>
          )}

          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 6) * 0.05 }}>
                  <Link href={"/products/premium-jersey-hijab-" + i} className="group block">
                    <div className="aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden luxury-shadow-hover mb-3 relative">
                      <div className={`absolute top-3 left-3 z-10 ${i % 3 === 0 ? '' : 'hidden'}`}><Badge variant="sale">-20%</Badge></div>
                      <div className={`absolute top-3 right-3 z-10 ${i % 4 === 0 ? '' : 'hidden'}`}><Badge variant="new">New</Badge></div>
                      <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                    </div>
                    <h3 className="font-medium text-stone-900 group-hover:text-emerald-600 transition-colors text-sm">Premium Jersey Hijab</h3>
                    <div className="flex items-center gap-0.5 mt-1">{ [1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />) }<span className="text-xs text-stone-400 ml-1">(24)</span></div>
                    <div className="flex items-center gap-2 mt-1.5"><span className="text-stone-900 font-semibold">$39.00</span>{i % 3 === 0 ? <span className="text-stone-400 line-through text-sm">$49.00</span> : ''}</div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((p) => (
                <button key={p} className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${p === 1 ? 'bg-black text-white' : 'border border-stone-200 text-stone-600 hover:border-stone-400'}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}