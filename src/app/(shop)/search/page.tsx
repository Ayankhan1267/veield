'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search as SearchIcon, Star, X, TrendingUp, Clock } from 'lucide-react'

const trending = ['Jersey Hijab', 'Chiffon Scarf', 'Silk Hijab', 'Magnetic Pins', 'Gift Boxes']
const recent = ['Everyday Hijab', 'Black Hijab', 'Modal Hijab']

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results] = useState([1, 2, 3, 4, 5, 6])

  return (
    <div className="min-h-screen">
      <div className="bg-stone-50 border-b border-stone-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
          <div className="relative">
            <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for hijabs, scarves, accessories..."
              className="w-full h-16 pl-16 pr-12 text-xl bg-white rounded-2xl border border-stone-200 focus:outline-none focus:border-stone-400 luxury-shadow"
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        {!query ? (
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-medium text-stone-900 mb-4"><TrendingUp className="h-4 w-4 text-emerald-600" /> Trending Searches</h3>
              <div className="flex flex-wrap gap-2">
                {trending.map((t) => (
                  <button key={t} onClick={() => setQuery(t)} className="px-4 py-2 bg-stone-50 rounded-full text-sm text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-all">{t}</button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-sm font-medium text-stone-900 mb-4"><Clock className="h-4 w-4 text-stone-400" /> Recent Searches</h3>
              <div className="flex flex-wrap gap-2">
                {recent.map((r) => (
                  <button key={r} onClick={() => setQuery(r)} className="px-4 py-2 bg-stone-50 rounded-full text-sm text-stone-600 hover:bg-stone-100 transition-all">{r}</button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm text-stone-500 mb-8">Showing {results.length} results for "<span className="font-medium text-stone-900">{query}</span>"</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map((i) => (
                <Link key={i} href={'/products/product-' + i} className="group block">
                  <div className="aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden luxury-shadow-hover mb-3">
                    <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-sm font-medium text-stone-900 group-hover:text-emerald-600 transition-colors">Premium Jersey Hijab</h3>
                  <div className="flex items-center gap-0.5 mt-1">{ [1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />) }<span className="text-xs text-stone-400 ml-1">(24)</span></div>
                  <p className="text-sm font-semibold mt-1.5">.00</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}