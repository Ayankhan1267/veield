'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Edit, Eye, Copy, Trash2, MoreHorizontal } from 'lucide-react'

const products = [
  { name: 'Premium Jersey Hijab', sku: 'JER-BLK-001', price: 39.00, stock: 45, status: 'Active', sales: 234 },
  { name: 'Chiffon Silk Scarf', sku: 'CHI-WHT-002', price: 59.00, stock: 28, status: 'Active', sales: 189 },
  { name: 'Modal Everyday Hijab', sku: 'MOD-BEG-003', price: 34.00, stock: 0, status: 'Out of Stock', sales: 312 },
  { name: 'Silk Embroidered Hijab', sku: 'SIL-NAV-004', price: 89.00, stock: 12, status: 'Active', sales: 67 },
  { name: 'Cotton Prayer Hijab', sku: 'COT-WHT-005', price: 24.00, stock: 78, status: 'Active', sales: 456 },
]

export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-stone-900">Products</h1>
          <p className="text-sm text-stone-500 mt-1">Manage your product catalog</p>
        </div>
        <Link href="/admin/products/new">
          <Button><Plus className="h-4 w-4 mr-2" /> Add Product</Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden luxury-shadow">
        <div className="p-4 border-b border-stone-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input type="text" placeholder="Search products..." className="w-full pl-9 pr-4 h-10 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-400" />
          </div>
          <select className="text-sm border border-stone-200 rounded-xl px-3 py-2 h-10">
            <option>All Status</option><option>Active</option><option>Draft</option><option>Out of Stock</option>
          </select>
          <select className="text-sm border border-stone-200 rounded-xl px-3 py-2 h-10">
            <option>All Categories</option><option>Hijabs</option><option>Scarves</option><option>Accessories</option>
          </select>
        </div>
        <table className="w-full">
          <thead><tr className="border-b border-stone-100 text-xs text-stone-400 uppercase tracking-wider">
            <th className="text-left py-4 px-6 font-medium">Product</th>
            <th className="text-left py-4 px-6 font-medium">SKU</th>
            <th className="text-left py-4 px-6 font-medium">Price</th>
            <th className="text-left py-4 px-6 font-medium">Stock</th>
            <th className="text-left py-4 px-6 font-medium">Sales</th>
            <th className="text-left py-4 px-6 font-medium">Status</th>
            <th className="text-right py-4 px-6 font-medium">Actions</th>
          </tr></thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.sku} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                <td className="py-4 px-6"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-stone-100 rounded-lg" /><span className="text-sm font-medium text-stone-900">{p.name}</span></div></td>
                <td className="py-4 px-6 text-sm text-stone-500">{p.sku}</td>
                <td className="py-4 px-6 text-sm font-medium">${p.price.toFixed(2)}</td>
                <td className="py-4 px-6"><span className={`text-sm font-medium ${p.stock === 0 ? 'text-red-500' : 'text-stone-900'}`}>{p.stock === 0 ? 'Out of Stock' : p.stock}</span></td>
                <td className="py-4 px-6 text-sm text-stone-500">{p.sales}</td>
                <td className="py-4 px-6"><Badge variant={p.status === 'Active' ? 'emerald' : 'red'} className="text-[10px]">{p.status}</Badge></td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-2 rounded-lg hover:bg-stone-100"><Eye className="h-4 w-4 text-stone-400" /></button>
                    <button className="p-2 rounded-lg hover:bg-stone-100"><Edit className="h-4 w-4 text-stone-400" /></button>
                    <button className="p-2 rounded-lg hover:bg-stone-100"><Copy className="h-4 w-4 text-stone-400" /></button>
                    <button className="p-2 rounded-lg hover:bg-red-50"><Trash2 className="h-4 w-4 text-red-400" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 border-t border-stone-100 flex items-center justify-between text-sm text-stone-500">
          <span>Showing 1-5 of 248 products</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-stone-200 rounded-lg hover:bg-stone-50">Previous</button>
            <button className="px-3 py-1.5 bg-black text-white rounded-lg">1</button>
            <button className="px-3 py-1.5 border border-stone-200 rounded-lg hover:bg-stone-50">2</button>
            <button className="px-3 py-1.5 border border-stone-200 rounded-lg hover:bg-stone-50">3</button>
            <button className="px-3 py-1.5 border border-stone-200 rounded-lg hover:bg-stone-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}