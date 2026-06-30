'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Edit, Trash2, Timer } from 'lucide-react'

const flashSales = [
  { name: 'Midnight Madness', discount: 30, products: 12, status: 'Active', starts: 'Jun 28, 2026 12:00 AM', ends: 'Jun 29, 2026 6:00 AM', sold: 234 },
  { name: 'Weekend Flash', discount: 25, products: 8, status: 'Scheduled', starts: 'Jul 02, 2026 12:00 AM', ends: 'Jul 04, 2026 11:59 PM', sold: 0 },
  { name: 'Eid Special', discount: 40, products: 15, status: 'Scheduled', starts: 'Jul 15, 2026 12:00 AM', ends: 'Jul 20, 2026 11:59 PM', sold: 0 },
  { name: 'Summer Clearance', discount: 50, products: 20, status: 'Ended', starts: 'Jun 15, 2026 12:00 AM', ends: 'Jun 22, 2026 11:59 PM', sold: 567 },
  { name: 'Flash Friday', discount: 20, products: 6, status: 'Ended', starts: 'Jun 23, 2026 12:00 AM', ends: 'Jun 23, 2026 11:59 PM', sold: 89 },
]

export default function AdminFlashSalePage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-stone-900">Flash Sales</h1>
          <p className="text-sm text-stone-500 mt-1">Create and manage time-limited flash sales</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" /> New Flash Sale</Button>
      </div>
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-stone-100 luxury-shadow">
          <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center"><Timer className="h-5 w-5 text-emerald-500" /></div><div><p className="text-2xl font-semibold text-stone-900">1</p><p className="text-xs text-stone-500">Active Sales</p></div></div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-stone-100 luxury-shadow">
          <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center"><Timer className="h-5 w-5 text-amber-500" /></div><div><p className="text-2xl font-semibold text-stone-900">2</p><p className="text-xs text-stone-500">Scheduled</p></div></div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-stone-100 luxury-shadow">
          <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center"><Timer className="h-5 w-5 text-blue-500" /></div><div><p className="text-2xl font-semibold text-stone-900">890</p><p className="text-xs text-stone-500">Units Sold</p></div></div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden luxury-shadow">
        <div className="p-4 border-b border-stone-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" /><input type="text" placeholder="Search flash sales..." className="w-full pl-9 pr-4 h-10 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-400" /></div>
          <select className="text-sm border border-stone-200 rounded-xl px-3 py-2 h-10"><option>All Status</option><option>Active</option><option>Scheduled</option><option>Ended</option></select>
        </div>
        <table className="w-full">
          <thead><tr className="border-b border-stone-100 text-xs text-stone-400 uppercase tracking-wider">
            <th className="text-left py-4 px-6 font-medium">Name</th><th className="text-left py-4 px-6 font-medium">Discount</th><th className="text-left py-4 px-6 font-medium">Products</th><th className="text-left py-4 px-6 font-medium">Starts</th><th className="text-left py-4 px-6 font-medium">Ends</th><th className="text-left py-4 px-6 font-medium">Sold</th><th className="text-left py-4 px-6 font-medium">Status</th><th className="text-right py-4 px-6 font-medium">Actions</th>
          </tr></thead>
          <tbody>{flashSales.map((fs) => (
            <tr key={fs.name} className="border-b border-stone-50 hover:bg-stone-50/50">
              <td className="py-4 px-6 text-sm font-medium text-stone-900">{fs.name}</td>
              <td className="py-4 px-6 text-sm font-medium text-red-500">-{fs.discount}%</td>
              <td className="py-4 px-6 text-sm text-stone-500">{fs.products}</td>
              <td className="py-4 px-6 text-sm text-stone-500">{fs.starts}</td>
              <td className="py-4 px-6 text-sm text-stone-500">{fs.ends}</td>
              <td className="py-4 px-6 text-sm text-stone-500">{fs.sold}</td>
              <td className="py-4 px-6"><Badge variant={fs.status === 'Active' ? 'emerald' : fs.status === 'Scheduled' ? 'blue' : 'secondary'} className="text-[10px]">{fs.status}</Badge></td>
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