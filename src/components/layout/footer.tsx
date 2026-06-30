'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  CreditCard,
  Globe,
  Camera,
  Film,
  Music,
  Mail,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { SITE_CONFIG } from '@/lib/constants'

const FOOTER_LINKS = {
  shop: [
    { label: 'New Arrivals', href: '/collections/new-arrivals' },
    { label: 'Hijabs', href: '/categories/hijabs' },
    { label: 'Scarves', href: '/categories/scarves' },
    { label: 'Accessories', href: '/categories/accessories' },
    { label: 'Gift Boxes', href: '/collections/gift-boxes' },
    { label: 'Sale', href: '/collections/sale' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping Information', href: '/shipping' },
    { label: 'Returns & Exchanges', href: '/returns' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Track Order', href: '/account/orders' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

const PAYMENT_ICONS = [
  { name: 'Visa', icon: CreditCard },
  { name: 'Mastercard', icon: CreditCard },
  { name: 'Amex', icon: CreditCard },
  { name: 'PayPal', icon: CreditCard },
  { name: 'Razorpay', icon: CreditCard },
]

const SOCIAL_ICONS = [
  { label: 'Instagram', icon: Camera, href: SITE_CONFIG.social.instagram },
  { label: 'Pinterest', icon: Globe, href: SITE_CONFIG.social.pinterest },
  { label: 'TikTok', icon: Music, href: SITE_CONFIG.social.tiktok },
  { label: 'YouTube', icon: Film, href: SITE_CONFIG.social.youtube },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="border-t border-neutral-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="font-serif text-2xl font-bold tracking-tight text-neutral-900"
            >
              {SITE_CONFIG.name}
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_ICONS.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Shop
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-600 transition-colors hover:text-emerald-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Support
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-600 transition-colors hover:text-emerald-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Company
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-600 transition-colors hover:text-emerald-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Newsletter
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-neutral-500">
              Subscribe for exclusive access to new collections, early sale access, and 10% off your first order.
            </p>
            {subscribed ? (
              <p className="text-sm font-medium text-emerald-700">
                Thank you for subscribing!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="h-11 flex-1 text-sm"
                  required
                />
                <Button type="submit" size="icon" className="h-11 w-11 shrink-0">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {PAYMENT_ICONS.map((payment) => {
              const Icon = payment.icon
              return (
                <div
                  key={payment.name}
                  className="flex h-8 w-10 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 text-neutral-500"
                  title={payment.name}
                >
                  <Icon className="h-4 w-4" />
                  <span className="sr-only">{payment.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
