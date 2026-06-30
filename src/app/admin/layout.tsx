'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Package, ShoppingCart, Users, Tags, BarChart3, Image, Settings, ChevronLeft,
  Menu, Megaphone, FileText, Gift, Truck, Percent, X, LogOut, Bell, Search
} from 'lucide-react'

const navItems = [
  { section: 'Main', items: [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { label: 'Customers', href: '/admin/customers', icon: Users },
    { label: 'Categories', href: '/admin/categories', icon: Tags },
  ]},
  { section: 'Marketing', items: [
    { label: 'Coupons', href: '/admin/marketing/coupons', icon: Percent },
    { label: 'Gift Cards', href: '/admin/marketing/gift-cards', icon: Gift },
    { label: 'Flash Sales', href: '/admin/marketing/flash-sale', icon: Megaphone },
    { label: 'Banners', href: '/admin/marketing/banners', icon: Image },
  ]},
  { section: 'Content', items: [
    { label: 'Homepage', href: '/admin/content/homepage', icon: FileText },
    { label: 'Blog Posts', href: '/admin/content/blogs', icon: FileText },
    { label: 'FAQs', href: '/admin/content/faqs', icon: FileText },
  ]},
  { section: 'Management', items: [
    { label: 'Media', href: '/admin/media', icon: Image },
    { label: 'Reports', href: '/admin/reports', icon: BarChart3 },
    { label: 'Shipping', href: '/admin/shipping', icon: Truck },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ]},
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-stone-50 flex">
      <aside className={cn(
        'fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-stone-100 transition-all duration-300 flex flex-col',
        sidebarOpen ? 'w-64' : 'w-0 lg:w-16 overflow-hidden'
      )}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-stone-100">
          {sidebarOpen && <Link href="/admin/dashboard" className="font-serif text-xl text-stone-900">Veiled</Link>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400">
            {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-3">
          {navItems.map((group) => (
            <div key={group.section} className="mb-6">
              {sidebarOpen && <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-3 px-3">{group.section}</p>}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                  return (
                    <Link key={item.href} href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all',
                        isActive ? 'bg-black text-white font-medium' : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'
                      )}>
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {sidebarOpen && <span>{item.label}</span>}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-stone-100">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-all">
            <LogOut className="h-4 w-4" />{sidebarOpen && <span>Back to Store</span>}
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-100">
          <div className="flex items-center justify-between h-16 px-6">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-stone-100">
              <Menu className="h-5 w-5 text-stone-600" />
            </button>
            <div className="hidden md:flex items-center gap-2 flex-1 max-w-md ml-4">
              <Search className="h-4 w-4 text-stone-400" />
              <input type="text" placeholder="Search orders, customers, products..." className="flex-1 bg-transparent border-none outline-none text-sm text-stone-600 placeholder:text-stone-400" />
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-stone-100"><Bell className="h-5 w-5 text-stone-500" /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" /></button>
              <div className="w-8 h-8 bg-stone-200 rounded-full flex items-center justify-center"><span className="text-xs font-medium text-stone-600">A</span></div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}