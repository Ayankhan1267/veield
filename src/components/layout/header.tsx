'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useCartStore, useWishlistStore, useUIStore } from '@/lib/store'
import { NAVIGATION, SITE_CONFIG } from '@/lib/constants'
import MegaMenu from './mega-menu'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const { openSearch, toggleMobileMenu } = useUIStore()
  const { getItemCount, toggleDrawer } = useCartStore()
  const { items: wishlistItems } = useWishlistStore()

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const itemCount = getItemCount()
  const wishlistCount = wishlistItems.length

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-white/80 backdrop-blur-md'
      )}
    >
      <div
        className={cn(
          'mx-auto flex items-center justify-between transition-all duration-300',
          scrolled ? 'h-16 px-4 sm:px-6 lg:px-8' : 'h-20 px-4 sm:px-6 lg:px-8'
        )}
      >
        <div className="flex items-center gap-8">
          <button
            onClick={toggleMobileMenu}
            className="rounded-lg p-2 text-neutral-700 transition-colors hover:bg-neutral-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link
            href="/"
            className="font-serif text-2xl font-bold tracking-tight text-neutral-900"
          >
            {SITE_CONFIG.name}
          </Link>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAVIGATION.main.map((item) => {
            if ('megaMenu' in item && item.megaMenu && 'columns' in item) {
              return (
                <MegaMenu
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  columns={item.columns || []}
                >
                  <div className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100">
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
                  </div>
                </MegaMenu>
              )
            }
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
              >
                {item.label}
                {'badge' in item && item.badge && (
                  <Badge
                    variant={item.label === 'Sale' ? 'sale' : 'new'}
                    className="ml-1.5 text-[10px]"
                  >
                    {item.badge as string}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={openSearch}
            className="rounded-lg p-2.5 text-neutral-700 transition-colors hover:bg-neutral-100"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="hidden rounded-lg p-2.5 text-neutral-700 transition-colors hover:bg-neutral-100 sm:block"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {NAVIGATION.account.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href} className="cursor-pointer">
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/auth/signin" className="cursor-pointer text-emerald-600">
                  Sign In
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={() => router.push('/account/wishlist')}
            className="relative rounded-lg p-2.5 text-neutral-700 transition-colors hover:bg-neutral-100"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[9px] font-bold text-white">
                {wishlistCount > 9 ? '9+' : wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={toggleDrawer}
            className="relative rounded-lg p-2.5 text-neutral-700 transition-colors hover:bg-neutral-100"
            aria-label="Shopping cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[9px] font-bold text-white">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
      {scrolled && (
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
      )}
    </motion.header>
  )
}
