'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Edit, Trash2, Eye, ToggleLeft, ToggleRight } from 'lucide-react'

const banners = [
  { title: 'Summer Collection 2026', placement: 'Homepage Hero', status: 'Active', clicks: 1234, impressions: 45230, starts: 'Jun 01, 2026', ends: 'Aug 31, 2026' },
  { title: 'New Arrivals - Modal', placement: 'Homepage Mid', status: 'Active', clicks: 567, impressions: 23450, starts: 'Jun 15, 2026', ends: 'Jul 15, 2026' },
  { title: 'Eid Collection Banner', placement: 'Homepage Hero', status: 'Scheduled', clicks: 0, impressions: 0, starts: 'Jul 20, 2026', ends: 'Aug 10, 2026' },
  { title: 'Sale Up to 40% Off', placement: 'Sidebar', status: 'Active', clicks: 892, impressions: 18900, starts: 'Jun 01, 2026', ends: 'Jul 01, 2026' },
  { title: 'Gift Boxes Promo', placement: 'Homepage Bottom', status: 'Inactive', clicks: 345, impressions: 12100, starts: 'May 01, 2026', ends: 'Jun 01, 2026' },
]

export default function AdminBannersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-stone-900">Banners</h1>
          <p className="text-sm text-stone-500 mt-1">Manage homepage and promotional banners</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" /> Add Banner</Button>
      </div>
      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden luxury-shadow">
        <div className="p-4 border-b border-stone-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input type="text" placeholder="Search banners..." className="w-full pl-9 pr-4 h-10 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-400" />
          </div>
          <select className="text-sm border border-stone-200 rounded-xl px-3 py-2 h-10"><option>All Placements</option><option>Homepage Hero</option><option>Homepage Mid</option><option>Sidebar</option><option>Homepage Bottom</option></select>
        </div>
        <table className="w-full">
          <thead><tr className="border-b border-stone-100 text-xs text-stone-400 uppercase tracking-wider">
            <th className="text-left py-4 px-6 font-medium">Banner</th><th className="text-left py-4 px-6 font-medium">Placement</th><th className="text-left py-4 px-6 font-medium">Impressions</th><th className="text-left py-4 px-6 font-medium">Clicks</th><th className="text-left py-4 px-6 font-medium">Period</th><th className="text-left py-4 px-6 font-medium">Status</th><th className="text-right py-4 px-6 font-medium">Actions</th>
          </tr></thead>
          <tbody>{banners.map((b) => (
            <tr key={b.title} className="border-b border-stone-50 hover:bg-stone-50/50">
              <td className="py-4 px-6"><div className="flex items-center gap-3"><div className="w-20 h-12 bg-stone-100 rounded-lg" /><span className="text-sm font-medium text-stone-900">{b.title}</span></div></td>
              <td className="py-4 px-6 text-sm text-stone-500">{b.placement}</td>
              <td className="py-4 px-6 text-sm text-stone-500">{b.impressions.toLocaleString()}</td>
              <td className="py-4 px-6 text-sm text-stone-500">{b.clicks.toLocaleString()}</td>
              <td className="py-4 px-6 text-sm text-stone-500">{b.starts} - {b.ends}</td>
              <td className="py-4 px-6"><Badge variant={b.status === 'Active' ? 'emerald' : b.status === 'Scheduled' ? 'blue' : 'secondary'} className="text-[10px]">{b.status}</Badge></td>
              <td className="py-4 px-6 text-right"><div className="flex items-center justify-end gap-1">
                <button className="p-2 rounded-lg hover:bg-stone-100"><Eye className="h-4 w-4 text-stone-400" /></button>
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