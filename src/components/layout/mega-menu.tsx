'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NAVIGATION } from '@/lib/constants'

interface MegaMenuColumn {
  title: string
  links: readonly { label: string; href: string }[]
}

interface MegaMenuProps {
  label: string
  href: string
  columns: readonly MegaMenuColumn[]
  children: React.ReactNode
}

export default function MegaMenu({ label, href, columns, children }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      ref={triggerRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {children}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              style={{ top: 0 }}
            />
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute left-1/2 z-50 mt-0 w-screen max-w-5xl -translate-x-1/2"
            >
              <div className="mx-auto overflow-hidden rounded-2xl border border-neutral-100 bg-white/95 backdrop-blur-md shadow-2xl shadow-black/10">
                <div className="grid grid-cols-4 gap-0">
                  {columns.map((column) => (
                    <div key={column.title} className="border-r border-neutral-100 p-8 last:border-r-0">
                      <h3 className="mb-4 font-serif text-xs font-semibold uppercase tracking-widest text-neutral-500">
                        {column.title}
                      </h3>
                      <ul className="space-y-2.5">
                        {column.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="group flex items-center gap-1 text-sm text-neutral-700 transition-all hover:text-emerald-700"
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="relative">
                                {link.label}
                                <span className="absolute -bottom-px left-0 h-px w-0 bg-emerald-600 transition-all group-hover:w-full" />
                              </span>
                              <ChevronRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="relative overflow-hidden bg-neutral-50 p-8">
                    <div className="flex h-full flex-col justify-between">
                      <div>
                        <h3 className="mb-3 font-serif text-lg font-semibold text-neutral-900">
                          Featured
                        </h3>
                        <p className="mb-4 text-sm leading-relaxed text-neutral-600">
                          Discover our latest premium collection, crafted from the finest fabrics.
                        </p>
                        <Link
                          href={href}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
                        >
                          Shop All {label}
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                      <div className="mt-6 aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
