'use client'

import { Search, MoreHorizontal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

const customers = [
  { name: 'Amina Khan', email: 'amina@example.com', orders: 12, spent: 1250.00, joined: 'Jan 2026', status: 'Active' },
  { name: 'Sarah Ali', email: 'sarah@example.com', orders: 8, spent: 890.00, joined: 'Feb 2026', status: 'Active' },
  { name: 'Fatima Hassan', email: 'fatima@example.com', orders: 3, spent: 234.00, joined: 'Apr 2026', status: 'Active' },
  { name: 'Layla Rahman', email: 'layla@example.com', orders: 0, spent: 0, joined: 'Jun 2026', status: 'New' },
  { name: 'Zainab Malik', email: 'zainab@example.com', orders: 15, spent: 2100.00, joined: 'Dec 2025', status: 'VIP' },
]

export default function AdminCustomersPage() {
  return (
    <div>
      <div className="mb-8"><h1 className="text-2xl font-serif text-stone-900">Customers</h1><p className="text-sm text-stone-500 mt-1">{customers.length} total customers</p></div>
      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden luxury-shadow">
        <div className="p-4 border-b border-stone-100"><div className="relative max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" /><input type="text" placeholder="Search customers..." className="w-full pl-9 pr-4 h-10 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-400" /></div></div>
        <table className="w-full">
          <thead><tr className="border-b border-stone-100 text-xs text-stone-400 uppercase tracking-wider">
            <th className="text-left py-4 px-6 font-medium">Customer</th><th className="text-left py-4 px-6 font-medium">Orders</th><th className="text-left py-4 px-6 font-medium">Total Spent</th><th className="text-left py-4 px-6 font-medium">Joined</th><th className="text-left py-4 px-6 font-medium">Status</th><th className="text-right py-4 px-6 font-medium">Action</th>
          </tr></thead>
          <tbody>{customers.map((c) => (
            <tr key={c.email} className="border-b border-stone-50 hover:bg-stone-50/50">
              <td className="py-4 px-6"><div className="flex items-center gap-3"><div className="w-9 h-9 bg-stone-100 rounded-full flex items-center justify-center"><span className="text-xs font-medium text-stone-500">{c.name.split(' ').map(n=>n[0]).join('')}</span></div><div><p className="text-sm font-medium text-stone-900">{c.name}</p><p className="text-xs text-stone-400">{c.email}</p></div></div></td>
              <td className="py-4 px-6 text-sm text-stone-500">{c.orders}</td>
              <td className="py-4 px-6 text-sm font-medium">${c.spent.toFixed(2)}</td>
              <td className="py-4 px-6 text-sm text-stone-500">{c.joined}</td>
              <td className="py-4 px-6"><Badge variant={c.status === 'VIP' ? 'gold' : c.status === 'New' ? 'blue' : 'emerald'} className="text-[10px]">{c.status}</Badge></td>
              <td className="py-4 px-6 text-right"><Link href={'/admin/customers/' + c.email.split('@')[0]} className="p-2 rounded-lg hover:bg-stone-100 inline-block"><MoreHorizontal className="h-4 w-4 text-stone-400" /></Link></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}