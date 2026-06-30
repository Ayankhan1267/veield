'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Search, Eye } from 'lucide-react'

const orders = [
  { id: 'VL-8A2F1', customer: 'Amina Khan', status: 'Delivered', amount: 89.00, date: 'Jun 28, 2026', items: 3, payment: 'Paid' },
  { id: 'VL-9B3G2', customer: 'Sarah Ali', status: 'Shipped', amount: 145.00, date: 'Jun 27, 2026', items: 2, payment: 'Paid' },
  { id: 'VL-1C4H3', customer: 'Fatima Hassan', status: 'Processing', amount: 67.00, date: 'Jun 27, 2026', items: 1, payment: 'Paid' },
  { id: 'VL-4D5I4', customer: 'Layla Rahman', status: 'Pending', amount: 234.00, date: 'Jun 26, 2026', items: 4, payment: 'Pending' },
  { id: 'VL-7E6J5', customer: 'Zainab Malik', status: 'Cancelled', amount: 112.00, date: 'Jun 26, 2026', items: 2, payment: 'Refunded' },
]

export default function AdminOrdersPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-stone-900">Orders</h1>
        <p className="text-sm text-stone-500 mt-1">View and manage all orders</p>
      </div>
      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden luxury-shadow">
        <div className="p-4 border-b border-stone-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" /><input type="text" placeholder="Search orders..." className="w-full pl-9 pr-4 h-10 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-400" /></div>
          <select className="text-sm border border-stone-200 rounded-xl px-3 py-2 h-10"><option>All Status</option><option>Pending</option><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option></select>
        </div>
        <table className="w-full">
          <thead><tr className="border-b border-stone-100 text-xs text-stone-400 uppercase tracking-wider">
            <th className="text-left py-4 px-6 font-medium">Order</th><th className="text-left py-4 px-6 font-medium">Customer</th><th className="text-left py-4 px-6 font-medium">Date</th><th className="text-left py-4 px-6 font-medium">Items</th><th className="text-left py-4 px-6 font-medium">Total</th><th className="text-left py-4 px-6 font-medium">Payment</th><th className="text-left py-4 px-6 font-medium">Status</th><th className="text-right py-4 px-6 font-medium">Action</th>
          </tr></thead>
          <tbody>{orders.map((o) => (
            <tr key={o.id} className="border-b border-stone-50 hover:bg-stone-50/50">
              <td className="py-4 px-6 text-sm font-medium text-stone-900">{o.id}</td>
              <td className="py-4 px-6 text-sm text-stone-500">{o.customer}</td>
              <td className="py-4 px-6 text-sm text-stone-500">{o.date}</td>
              <td className="py-4 px-6 text-sm text-stone-500">{o.items}</td>
              <td className="py-4 px-6 text-sm font-medium">${o.amount.toFixed(2)}</td>
              <td className="py-4 px-6"><Badge variant={o.payment === 'Paid' ? 'emerald' : 'gold'} className="text-[10px]">{o.payment}</Badge></td>
              <td className="py-4 px-6"><Badge variant={
                o.status === 'Delivered' ? 'emerald' : o.status === 'Shipped' ? 'blue' : o.status === 'Processing' ? 'gold' : o.status === 'Pending' ? 'secondary' : 'red'
              } className="text-[10px]">{o.status}</Badge></td>
              <td className="py-4 px-6 text-right"><Link href={'/admin/orders/' + o.id} className="p-2 rounded-lg hover:bg-stone-100 inline-block"><Eye className="h-4 w-4 text-stone-400" /></Link></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}