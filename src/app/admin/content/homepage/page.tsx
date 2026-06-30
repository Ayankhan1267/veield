'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Eye, GripVertical, ArrowUpDown } from 'lucide-react'

const sections = [
  { title: 'Hero Banner', type: 'Banner', status: 'Active', lastEdited: 'Jun 28, 2026' },
  { title: 'Featured Categories', type: 'Category Grid', status: 'Active', lastEdited: 'Jun 25, 2026' },
  { title: 'Best Sellers', type: 'Product Carousel', status: 'Active', lastEdited: 'Jun 20, 2026' },
  { title: 'New Arrivals', type: 'Product Grid', status: 'Active', lastEdited: 'Jun 18, 2026' },
  { title: 'Testimonials', type: 'Review Carousel', status: 'Inactive', lastEdited: 'Jun 10, 2026' },
  { title: 'Newsletter Signup', type: 'Form', status: 'Active', lastEdited: 'Jun 5, 2026' },
]

export default function AdminHomepagePage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-stone-900">Homepage Editor</h1>
          <p className="text-sm text-stone-500 mt-1">Drag to reorder sections on your homepage</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" /> Add Section</Button>
      </div>
      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden luxury-shadow">
        <table className="w-full">
          <thead><tr className="border-b border-stone-100 text-xs text-stone-400 uppercase tracking-wider">
            <th className="w-12 py-4 px-4"></th>
            <th className="text-left py-4 px-6 font-medium">Section</th>
            <th className="text-left py-4 px-6 font-medium">Type</th>
            <th className="text-left py-4 px-6 font-medium">Last Edited</th>
            <th className="text-left py-4 px-6 font-medium">Status</th>
            <th className="text-right py-4 px-6 font-medium">Actions</th>
          </tr></thead>
          <tbody>{sections.map((s) => (
            <tr key={s.title} className="border-b border-stone-50 hover:bg-stone-50/50">
              <td className="py-4 px-4 text-stone-300"><GripVertical className="h-4 w-4" /></td>
              <td className="py-4 px-6"><p className="text-sm font-medium text-stone-900">{s.title}</p></td>
              <td className="py-4 px-6"><span className="text-xs text-stone-400 bg-stone-50 px-2.5 py-1 rounded-lg">{s.type}</span></td>
              <td className="py-4 px-6 text-sm text-stone-500">{s.lastEdited}</td>
              <td className="py-4 px-6"><Badge variant={s.status === 'Active' ? 'emerald' : 'secondary'} className="text-[10px]">{s.status}</Badge></td>
              <td className="py-4 px-6 text-right"><div className="flex items-center justify-end gap-1">
                <button className="p-2 rounded-lg hover:bg-stone-100"><Eye className="h-4 w-4 text-stone-400" /></button>
                <button className="p-2 rounded-lg hover:bg-stone-100"><Edit className="h-4 w-4 text-stone-400" /></button>
                <button className="p-2 rounded-lg hover:bg-stone-100"><ArrowUpDown className="h-4 w-4 text-stone-400" /></button>
              </div></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}
