'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Download, TrendingUp, DollarSign, ShoppingCart, Users, Package } from 'lucide-react'

export default function AdminReportsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-stone-900">Reports & Analytics</h1>
          <p className="text-sm text-stone-500 mt-1">Track your store performance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl text-sm"><Download className="h-4 w-4" /> Export Report</button>
      </div>
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-stone-100"><div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center"><TrendingUp className="h-5 w-5 text-emerald-600" /></div><div><p className="text-sm text-stone-500">Revenue</p><p className="text-2xl font-semibold">,430</p></div></div><div className="h-20 bg-stone-50 rounded-lg flex items-center justify-center"><span className="text-xs text-stone-300">Chart</span></div></div>
        <div className="bg-white rounded-2xl p-6 border border-stone-100"><div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center"><ShoppingCart className="h-5 w-5 text-blue-600" /></div><div><p className="text-sm text-stone-500">Orders</p><p className="text-2xl font-semibold">1,429</p></div></div><div className="h-20 bg-stone-50 rounded-lg flex items-center justify-center"><span className="text-xs text-stone-300">Chart</span></div></div>
        <div className="bg-white rounded-2xl p-6 border border-stone-100"><div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center"><Users className="h-5 w-5 text-purple-600" /></div><div><p className="text-sm text-stone-500">Conversion Rate</p><p className="text-2xl font-semibold">3.2%</p></div></div><div className="h-20 bg-stone-50 rounded-lg flex items-center justify-center"><span className="text-xs text-stone-300">Chart</span></div></div>
      </div>
      <div className="bg-white rounded-2xl p-6 border border-stone-100">
        <h2 className="font-medium text-stone-900 mb-6">Revenue Over Time</h2>
        <div className="h-80 bg-stone-50 rounded-xl flex items-center justify-center"><p className="text-stone-300 text-sm">Revenue chart will render here (recharts integration)</p></div>
      </div>
    </div>
  )
}
