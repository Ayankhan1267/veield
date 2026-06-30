'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const ANNOUNCEMENTS = [
  { id: 1, text: 'Free shipping on orders over $100', link: '/collections/all' },
  { id: 2, text: 'New Collection Available — Shop Now', link: '/collections/new-arrivals' },
  { id: 3, text: 'Use code VEILED20 for 20% off your first order', link: '/collections/all' },
]

const INTERVAL = 5000

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0)
  const [dismissed, setDismissed] = useState(false)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % ANNOUNCEMENTS.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, INTERVAL)
    return () => clearInterval(timer)
  }, [next])

  if (dismissed) return null

  return (
    <div className="relative h-10 overflow-hidden bg-black text-white">
      <AnimatePresence mode="wait">
        <motion.a
          key={ANNOUNCEMENTS[current].id}
          href={ANNOUNCEMENTS[current].link}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex h-full items-center justify-center gap-2 text-center text-xs font-medium tracking-wide sm:text-sm"
        >
          {ANNOUNCEMENTS[current].text}
        </motion.a>
      </AnimatePresence>
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-white/60 transition-colors hover:text-white"
        aria-label="Previous announcement"
      >
        <ChevronLeft className="h-3 w-3" />
      </button>
      <button
        onClick={next}
        className="absolute right-8 top-1/2 -translate-y-1/2 text-white/60 transition-colors hover:text-white"
        aria-label="Next announcement"
      >
        <ChevronRight className="h-3 w-3" />
      </button>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 transition-colors hover:text-white"
        aria-label="Dismiss announcement"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  )
}
