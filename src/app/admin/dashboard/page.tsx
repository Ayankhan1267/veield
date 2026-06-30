'use client'

import { motion } from 'framer-motion'
import { DollarSign, ShoppingCart, Users, Package, TrendingUp, TrendingDown, MoreHorizontal, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { label: 'Total Revenue', value: '$128,430', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'bg-emerald-500' },
  { label: 'Total Orders', value: '1,429', change: '+8.2%', trend: 'up', icon: ShoppingCart, color: 'bg-blue-500' },
  { label: 'Total Customers', value: '5,832', change: '+18.7%', trend: 'up', icon: Users, color: 'bg-purple-500' },
  { label: 'Total Products', value: '248', change: '-3.2%', trend: 'down', icon: Package, color: 'bg-amber-500' },
]

const recentOrders = [
  { id: 'VL-8A2F1', customer: 'Amina Khan', status: 'Delivered', amount: '$89.00', date: '2 hours ago', items: 3 },
  { id: 'VL-9B3G2', customer: 'Sarah Ali', status: 'Shipped', amount: '$145.00', date: '4 hours ago', items: 2 },
  { id: 'VL-1C4H3', customer: 'Fatima Hassan', status: 'Processing', amount: '$67.00', date: '6 hours ago', items: 1 },
  { id: 'VL-4D5I4', customer: 'Layla Rahman', status: 'Pending', amount: '$234.00', date: '8 hours ago', items: 4 },
  { id: 'VL-7E6J5', customer: 'Zainab Malik', status: 'Delivered', amount: '$112.00', date: '10 hours ago', items: 2 },
]

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif text-stone-900">Dashboard</h1>
          <p className="text-stone-500 text-sm mt-1">Welcome back, Admin. Here's your store overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="text-sm border border-stone-200 rounded-lg px-3 py-2 bg-white">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl p-6 border border-stone-100 luxury-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-11 h-11 ${s.color} rounded-xl flex items-center justify-center`}><s.icon className="h-5 w-5 text-white" /></div>
              <span className={`flex items-center gap-0.5 text-xs font-medium ${s.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                {s.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}{s.change}
              </span>
            </div>
            <p className="text-2xl font-semibold text-stone-900">{s.value}</p>
            <p className="text-sm text-stone-500 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-stone-100 luxury-shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-medium text-stone-900">Revenue Overview</h2>
            <Link href="/admin/reports" className="text-xs text-emerald-600 hover:underline">View Report</Link>
          </div>
          <div className="h-64 flex items-center justify-center bg-stone-50 rounded-xl">
            <p className="text-stone-300 text-sm">Chart will render here (recharts)</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-100 luxury-shadow">
          <h2 className="font-medium text-stone-900 mb-6">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b border-stone-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-stone-900">{order.customer}</p>
                  <p className="text-xs text-stone-400">{order.id} • {order.items} items</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{order.amount}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' :
                    order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' :
                    order.status === 'Processing' ? 'bg-amber-50 text-amber-600' : 'bg-stone-100 text-stone-500'
                  }`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
          <Link href="/admin/orders" className="block text-center text-sm text-emerald-600 hover:underline mt-4">View All Orders</Link>
        </div>
      </div>
    </div>
  )
}