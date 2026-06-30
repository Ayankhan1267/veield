'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

const LABEL_MAP: Record<string, string> = {
  collections: 'Collections',
  categories: 'Categories',
  products: 'Products',
  'new-arrivals': 'New Arrivals',
  'gift-boxes': 'Gift Boxes',
  hijabs: 'Hijabs',
  scarves: 'Scarves',
  accessories: 'Accessories',
  account: 'Account',
  orders: 'Orders',
  wishlist: 'Wishlist',
  rewards: 'Rewards',
  wallet: 'Wallet',
  settings: 'Settings',
  cart: 'Cart',
  checkout: 'Checkout',
  sale: 'Sale',
  search: 'Search',
}

function segmentToLabel(segment: string): string {
  if (LABEL_MAP[segment]) return LABEL_MAP[segment]
  return segment
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

interface BreadcrumbProps {
  className?: string
}

export default function Breadcrumb({ className }: BreadcrumbProps) {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) return null

  const crumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    return {
      label: segmentToLabel(segment),
      href,
      isLast: index === segments.length - 1,
    }
  })

  return (
    <nav aria-label="Breadcrumb" className={cn('px-4 py-4 sm:px-6 lg:px-8', className)}>
      <ol className="flex items-center gap-1.5 text-sm">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 text-neutral-400 transition-colors hover:text-neutral-700"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-neutral-300" />
            {crumb.isLast ? (
              <span className="font-medium text-neutral-900">{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                className="text-neutral-500 transition-colors hover:text-neutral-700"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
