'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, X, TrendingUp, Clock, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'

const TRENDING_SEARCHES = [
  'Everyday Hijabs',
  'Chiffon',
  'Jersey',
  'Silk Scarves',
  'Gift Sets',
  'Premium Collection',
  'Magnetic Pins',
  'Formal Hijabs',
]

const RECENT_SEARCHES_KEY = 'veiled-recent-searches'

function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveRecentSearch(query: string) {
  try {
    const recent = getRecentSearches().filter((s) => s !== query)
    recent.unshift(query)
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recent.slice(0, 6)))
  } catch {}
}

function clearRecentSearches() {
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY)
  } catch {}
}

const SUGGESTIONS = [
  { label: 'Premium Jersey Hijab - Black', href: '/products/premium-jersey-hijab-black' },
  { label: 'Chiffon Hijab - Emerald', href: '/products/chiffon-hijab-emerald' },
  { label: 'Silk Scarf - Ivory', href: '/products/silk-scarf-ivory' },
  { label: 'Magnetic Pin Set - Gold', href: '/products/magnetic-pin-set-gold' },
  { label: 'Everyday Modal Hijab - Beige', href: '/products/everyday-modal-hijab-beige' },
]

const POPULAR_PRODUCTS = [
  { name: 'Premium Jersey Hijab', price: 39.99, image: null },
  { name: 'Chiffon Hijab - Emerald', price: 49.99, image: null },
  { name: 'Silk Scarf - Ivory', price: 79.99, image: null },
  { name: 'Modal Everyday Hijab', price: 29.99, image: null },
]

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUIStore()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('')
      setRecentSearches(getRecentSearches())
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isSearchOpen])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch()
      }
      if (
        e.key === '/' &&
        !e.ctrlKey &&
        !e.metaKey &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault()
        useUIStore.getState().openSearch()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen, closeSearch])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (query.trim()) {
        saveRecentSearch(query.trim())
        closeSearch()
        router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      }
    },
    [query, closeSearch, router]
  )

  const handleSuggestionClick = useCallback(
    (href: string) => {
      closeSearch()
      router.push(href)
    },
    [closeSearch, router]
  )

  const handleRecentClick = useCallback(
    (q: string) => {
      setQuery(q)
      saveRecentSearch(q)
      closeSearch()
      router.push(`/search?q=${encodeURIComponent(q)}`)
    },
    [closeSearch, router]
  )

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-white"
        >
          <div className="mx-auto max-w-4xl px-4 pt-16 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <p className="font-serif text-2xl font-bold tracking-tight text-neutral-900">
                Search
              </p>
              <button
                onClick={closeSearch}
                className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                aria-label="Close search"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="relative mb-8">
              <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-neutral-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setShowSuggestions(e.target.value.length > 0)
                }}
                onFocus={() => setShowSuggestions(query.length > 0)}
                placeholder="Search products, fabrics, collections..."
                className="w-full border-b-2 border-neutral-200 bg-transparent py-4 pl-14 pr-12 text-2xl font-light text-neutral-900 outline-none placeholder:text-neutral-300 focus:border-neutral-900"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    inputRef.current?.focus()
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </form>

            <div className="grid gap-8 md:grid-cols-2">
              {!query && recentSearches.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                      <Clock className="h-3.5 w-3.5" />
                      Recent Searches
                    </h3>
                    <button
                      onClick={() => {
                        clearRecentSearches()
                        setRecentSearches([])
                      }}
                      className="text-xs text-neutral-400 hover:text-neutral-600"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleRecentClick(q)}
                        className="rounded-full border border-neutral-200 px-4 py-1.5 text-sm text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {!query && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Trending Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {TRENDING_SEARCHES.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleRecentClick(q)}
                        className="rounded-full border border-neutral-200 px-4 py-1.5 text-sm text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="md:col-span-2"
                >
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Suggestions
                  </h3>
                  <div className="space-y-1">
                    {SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion.href}
                        onClick={() => handleSuggestionClick(suggestion.href)}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-neutral-700 transition-colors hover:bg-neutral-50"
                      >
                        <span>{suggestion.label}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {!query && !showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-10"
              >
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  Popular Products
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {POPULAR_PRODUCTS.map((product) => (
                    <button
                      key={product.name}
                      onClick={() => {
                        closeSearch()
                        router.push('/collections/all')
                      }}
                      className="group text-left"
                    >
                      <div className="aspect-square w-full overflow-hidden rounded-xl bg-neutral-100 transition-all group-hover:bg-neutral-200" />
                      <p className="mt-2 text-sm font-medium text-neutral-800">{product.name}</p>
                      <p className="text-sm text-neutral-500">{formatPrice(product.price)}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
