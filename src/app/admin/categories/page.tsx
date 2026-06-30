'use client'

import { useState } from 'react'
import { Search, Plus, Edit, Trash2, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const categories = [
  { name: 'Jersey Hijabs', slug: 'jersey-hijabs', products: 45, status: 'Active', order: 1 },
  { name: 'Chiffon Hijabs', slug: 'chiffon-hijabs', products: 38, status: 'Active', order: 2 },
  { name: 'Modal Hijabs', slug: 'modal-hijabs', products: 29, status: 'Active', order: 3 },
  { name: 'Silk Hijabs', slug: 'silk-hijabs', products: 18, status: 'Active', order: 4 },
  { name: 'Cotton Hijabs', slug: 'cotton-hijabs', products: 22, status: 'Inactive', order: 5 },
  { name: 'Accessories', slug: 'accessories', products: 15, status: 'Active', order: 6 },
  { name: 'Gift Boxes', slug: 'gift-boxes', products: 8, status: 'Active', order: 7 },
]

export default function AdminCategoriesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-stone-900">Categories</h1>
          <p className="text-sm text-stone-500 mt-1">Organize your product categories</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" /> Add Category</Button>
      </div>
      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden luxury-shadow">
        <div className="p-4 border-b border-stone-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input type="text" placeholder="Search categories..." className="w-full pl-9 pr-4 h-10 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-400" />
          </div>
          <select className="text-sm border border-stone-200 rounded-xl px-3 py-2 h-10">
            <option>All Status</option><option>Active</option><option>Inactive</option>
          </select>
        </div>
        <table className="w-full">
          <thead><tr className="border-b border-stone-100 text-xs text-stone-400 uppercase tracking-wider">
            <th className="text-left py-4 px-6 font-medium">Category</th>
            <th className="text-left py-4 px-6 font-medium">Slug</th>
            <th className="text-left py-4 px-6 font-medium">Products</th>
            <th className="text-left py-4 px-6 font-medium">Order</th>
            <th className="text-left py-4 px-6 font-medium">Status</th>
            <th className="text-right py-4 px-6 font-medium">Actions</th>
          </tr></thead>
          <tbody>{categories.map((c) => (
            <tr key={c.slug} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
              <td className="py-4 px-6"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-stone-100 rounded-lg" /><span className="text-sm font-medium text-stone-900">{c.name}</span></div></td>
              <td className="py-4 px-6 text-sm text-stone-500">{c.slug}</td>
              <td className="py-4 px-6 text-sm text-stone-500">{c.products}</td>
              <td className="py-4 px-6 text-sm text-stone-500">{c.order}</td>
              <td className="py-4 px-6"><Badge variant={c.status === 'Active' ? 'emerald' : 'secondary'} className="text-[10px]">{c.status}</Badge></td>
              <td className="py-4 px-6 text-right"><div className="flex items-center justify-end gap-1">
                <button className="p-2 rounded-lg hover:bg-stone-100"><Edit className="h-4 w-4 text-stone-400" /></button>
                <button className="p-2 rounded-lg hover:bg-red-50"><Trash2 className="h-4 w-4 text-red-400" /></button>
                <button className="p-2 rounded-lg hover:bg-stone-100"><MoreHorizontal className="h-4 w-4 text-stone-400" /></button>
              </div></td>
            </tr>
          ))}</tbody>
        </table>
        <div className="p-4 border-t border-stone-100 flex items-center justify-between text-sm text-stone-500">
          <span>Showing 1-7 of 12 categories</span>
        </div>
      </div>
    </div>
  )
}