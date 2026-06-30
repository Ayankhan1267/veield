'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Edit, Trash2 } from 'lucide-react'

const coupons = [
  { code: 'WELCOME20', type: 'Percentage', value: 20, minOrder: 50, used: 145, limit: 500, status: 'Active', ends: 'Jul 15, 2026' },
  { code: 'FREESHIP', type: 'Fixed', value: 5.99, minOrder: 75, used: 89, limit: 200, status: 'Active', ends: 'Jul 31, 2026' },
  { code: 'SUMMER15', type: 'Percentage', value: 15, minOrder: 100, used: 234, limit: 1000, status: 'Active', ends: 'Aug 15, 2026' },
  { code: 'VIP30', type: 'Percentage', value: 30, minOrder: 150, used: 12, limit: 100, status: 'Active', ends: 'Jun 30, 2026' },
  { code: 'HOLIDAY25', type: 'Fixed', value: 25, minOrder: 120, used: 67, limit: 300, status: 'Expired', ends: 'Jun 01, 2026' },
]

export default function AdminCouponsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-stone-900">Coupons</h1>
          <p className="text-sm text-stone-500 mt-1">Manage promotional coupons and discounts</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" /> Create Coupon</Button>
      </div>
      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden luxury-shadow">
        <div className="p-4 border-b border-stone-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input type="text" placeholder="Search coupons..." className="w-full pl-9 pr-4 h-10 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-400" />
          </div>
          <select className="text-sm border border-stone-200 rounded-xl px-3 py-2 h-10"><option>All Status</option><option>Active</option><option>Expired</option><option>Scheduled</option></select>
        </div>
        <table className="w-full">
          <thead><tr className="border-b border-stone-100 text-xs text-stone-400 uppercase tracking-wider">
            <th className="text-left py-4 px-6 font-medium">Code</th><th className="text-left py-4 px-6 font-medium">Type</th><th className="text-left py-4 px-6 font-medium">Value</th><th className="text-left py-4 px-6 font-medium">Min Order</th><th className="text-left py-4 px-6 font-medium">Usage</th><th className="text-left py-4 px-6 font-medium">Ends</th><th className="text-left py-4 px-6 font-medium">Status</th><th className="text-right py-4 px-6 font-medium">Actions</th>
          </tr></thead>
          <tbody>{coupons.map((c) => (
            <tr key={c.code} className="border-b border-stone-50 hover:bg-stone-50/50">
              <td className="py-4 px-6"><span className="text-sm font-mono font-medium text-stone-900">{c.code}</span></td>
              <td className="py-4 px-6 text-sm text-stone-500">{c.type}</td>
              <td className="py-4 px-6 text-sm font-medium">{c.type === 'Percentage' ? `${c.value}%` : `$${c.value.toFixed(2)}`}</td>
              <td className="py-4 px-6 text-sm text-stone-500">${c.minOrder}</td>
              <td className="py-4 px-6 text-sm text-stone-500">{c.used}/{c.limit}</td>
              <td className="py-4 px-6 text-sm text-stone-500">{c.ends}</td>
              <td className="py-4 px-6"><Badge variant={c.status === 'Active' ? 'emerald' : 'red'} className="text-[10px]">{c.status}</Badge></td>
              <td className="py-4 px-6 text-right"><div className="flex items-center justify-end gap-1">
                <button className="p-2 rounded-lg hover:bg-stone-100"><Edit className="h-4 w-4 text-stone-400" /></button>
                <button className="p-2 rounded-lg hover:bg-red-50"><Trash2 className="h-4 w-4 text-red-400" /></button>
              </div></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}