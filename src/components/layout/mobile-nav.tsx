'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  X,
  Search,
  ChevronDown,
  User,
  Heart,
  Package,
  Gift,
  Percent,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useUIStore } from '@/lib/store'
import { NAVIGATION } from '@/lib/constants'

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.25, ease: 'easeOut' as const },
  }),
}

interface AccordionSection {
  title: string
  href: string
  children?: Array<{ label: string; href: string }>
}

function AccordionGroup({
  section,
  onClose,
}: {
  section: AccordionSection
  onClose: () => void
}) {
  const [open, setOpen] = useState(false)

  if (!section.children) {
    return (
      <Link
        href={section.href}
        onClick={onClose}
        className="flex items-center justify-between px-4 py-3 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
      >
        {section.title}
      </Link>
    )
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
      >
        {section.title}
        <ChevronDown
          className={cn(
            'h-4 w-4 text-neutral-400 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-neutral-50"
          >
            <div className="py-1">
              {section.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onClose}
                  className="block px-8 py-2.5 text-sm text-neutral-600 transition-colors hover:text-emerald-700"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const accountLinks = [
  { label: 'My Account', href: '/account', icon: User },
  { label: 'Orders', href: '/account/orders', icon: Package },
  { label: 'Wishlist', href: '/account/wishlist', icon: Heart },
  { label: 'Gift Boxes', href: '/collections/gift-boxes', icon: Gift },
  { label: 'Rewards', href: '/account/rewards', icon: Percent },
]

export default function MobileNav() {
  const { isMobileMenuOpen, toggleMobileMenu, closeSearch } = useUIStore()
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      toggleMobileMenu()
      setQuery('')
    }
  }

  const mainSections: AccordionSection[] = (NAVIGATION.main as unknown as any[]).map((item: any) => ({
    title: item.label,
    href: item.href,
    children: item.columns ? item.columns.flatMap((c: any) => c.links) : undefined,
  }))

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={toggleMobileMenu}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-4">
              <Link
                href="/"
                onClick={toggleMobileMenu}
                className="font-serif text-xl font-bold tracking-tight text-neutral-900"
              >
                Veiled
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSearch} className="border-b border-neutral-100 px-4 py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-neutral-400 focus:bg-white"
                />
              </div>
            </form>

            <div className="flex-1 overflow-y-auto py-2">
              {mainSections.map((section, i) => (
                <motion.div
                  key={section.title}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <AccordionGroup section={section} onClose={toggleMobileMenu} />
                </motion.div>
              ))}
            </div>

            <div className="border-t border-neutral-100 px-4 py-4">
              {accountLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={toggleMobileMenu}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-700 transition-colors hover:bg-neutral-50"
                  >
                    <Icon className="h-4 w-4 text-neutral-400" />
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
