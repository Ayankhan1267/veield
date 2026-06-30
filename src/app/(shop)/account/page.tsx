'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Package, Heart, Wallet, Gift, Settings, MapPin, LogOut, User, ChevronRight } from 'lucide-react'

const quickLinks = [
  { icon: Package, label: 'My Orders', desc: 'View & track orders', href: '/account/orders', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Heart, label: 'Wishlist', desc: 'Your saved items', href: '/account/wishlist', color: 'text-red-500', bg: 'bg-red-50' },
  { icon: Wallet, label: 'Wallet', desc: 'Balance: $0.00', href: '/account/wallet', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: Gift, label: 'Rewards', desc: '100 points available', href: '/account/rewards', color: 'text-purple-600', bg: 'bg-purple-50' },
  { icon: MapPin, label: 'Addresses', desc: 'Manage addresses', href: '/account/addresses', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Settings, label: 'Settings', desc: 'Profile & preferences', href: '/account/settings', color: 'text-stone-600', bg: 'bg-stone-100' },
]

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 luxury-shadow mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-stone-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-serif text-stone-900">Welcome back!</h1>
              <p className="text-stone-500 mt-1">john.doe@example.com</p>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant="emerald" className="text-xs">Gold Member</Badge>
                <span className="text-xs text-stone-400">500 reward points</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {quickLinks.map((link) => (
            <Link key={link.label} href={link.href}
              className="bg-white rounded-2xl p-6 luxury-shadow-hover group">
              <div className={`w-12 h-12 rounded-xl ${link.bg} flex items-center justify-center mb-4`}>
                <link.icon className={`h-6 w-6 ${link.color}`} />
              </div>
              <h3 className="font-medium text-stone-900 text-sm group-hover:text-emerald-600 transition-colors">{link.label}</h3>
              <p className="text-xs text-stone-400 mt-1">{link.desc}</p>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 luxury-shadow">
          <h2 className="font-medium text-stone-900 mb-4">Recent Orders</h2>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b border-stone-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-stone-900">Order #VL-{1000 + i}</p>
                <p className="text-xs text-stone-400">June {20 + i}, 2026 — $89.00</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={i === 1 ? 'emerald' : 'secondary'} className="text-xs">{i === 1 ? 'Delivered' : i === 2 ? 'Shipped' : 'Processing'}</Badge>
                <ChevronRight className="h-4 w-4 text-stone-300" />
              </div>
            </div>
          ))}
          <Link href="/account/orders" className="block text-center text-sm text-emerald-600 hover:underline mt-4">View All Orders</Link>
        </div>
      </div>
    </div>
  )
}