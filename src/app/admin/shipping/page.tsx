'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Truck, Plus, Edit, Trash2, Globe, Zap } from 'lucide-react'

const shippingZones = [
  { name: 'United States', methods: 3, countries: 1, status: 'Active' },
  { name: 'Canada', methods: 2, countries: 1, status: 'Active' },
  { name: 'United Kingdom', methods: 2, countries: 1, status: 'Active' },
  { name: 'Europe', methods: 2, countries: 27, status: 'Active' },
  { name: 'Middle East', methods: 1, countries: 12, status: 'Inactive' },
  { name: 'International', methods: 1, countries: 180, status: 'Active' },
]

const shippingMethods = [
  { name: 'Standard Shipping', zone: 'United States', price: 5.99, minOrder: 0, freeAfter: 100, estimated: '5-8 business days' },
  { name: 'Express Shipping', zone: 'United States', price: 14.99, minOrder: 0, freeAfter: 0, estimated: '2-3 business days' },
  { name: 'Free Shipping', zone: 'United States', price: 0, minOrder: 0, freeAfter: 0, estimated: '5-8 business days' },
  { name: 'Standard International', zone: 'International', price: 24.99, minOrder: 0, freeAfter: 200, estimated: '10-15 business days' },
]

export default function AdminShippingPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-stone-900">Shipping Settings</h1>
          <p className="text-sm text-stone-500 mt-1">Manage shipping zones, methods, and rates</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" /> Add Shipping Zone</Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-stone-100 luxury-shadow">
          <div className="flex items-center gap-3"><div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center"><Globe className="h-5 w-5 text-emerald-500" /></div><div><p className="text-2xl font-semibold text-stone-900">{shippingZones.length}</p><p className="text-xs text-stone-500">Shipping Zones</p></div></div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-stone-100 luxury-shadow">
          <div className="flex items-center gap-3"><div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center"><Truck className="h-5 w-5 text-blue-500" /></div><div><p className="text-2xl font-semibold text-stone-900">{shippingMethods.length}</p><p className="text-xs text-stone-500">Shipping Methods</p></div></div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-stone-100 luxury-shadow">
          <div className="flex items-center gap-3"><div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center"><Zap className="h-5 w-5 text-amber-500" /></div><div><p className="text-2xl font-semibold text-stone-900">$100</p><p className="text-xs text-stone-500">Free Shipping Threshold</p></div></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden luxury-shadow">
          <div className="p-4 border-b border-stone-100 flex items-center justify-between"><h2 className="font-medium text-stone-900">Shipping Zones</h2><Button variant="outline" size="sm"><Plus className="h-3.5 w-3.5 mr-1" /> Add</Button></div>
          <div className="divide-y divide-stone-50">
            {shippingZones.map((z) => (
              <div key={z.name} className="flex items-center justify-between px-6 py-4 hover:bg-stone-50/50">
                <div><p className="text-sm font-medium text-stone-900">{z.name}</p><p className="text-xs text-stone-400">{z.countries} country{(z.countries) > 1 ? 'ies' : 'y'} · {z.methods} methods</p></div>
                <div className="flex items-center gap-3"><Badge variant={z.status === 'Active' ? 'emerald' : 'secondary'} className="text-[10px]">{z.status}</Badge><button className="p-1.5 rounded-lg hover:bg-stone-100"><Edit className="h-3.5 w-3.5 text-stone-400" /></button></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden luxury-shadow">
          <div className="p-4 border-b border-stone-100 flex items-center justify-between"><h2 className="font-medium text-stone-900">Shipping Methods</h2><Button variant="outline" size="sm"><Plus className="h-3.5 w-3.5 mr-1" /> Add</Button></div>
          <table className="w-full">
            <thead><tr className="border-b border-stone-100 text-xs text-stone-400 uppercase tracking-wider">
              <th className="text-left py-3 px-6 font-medium">Method</th><th className="text-left py-3 px-6 font-medium">Zone</th><th className="text-left py-3 px-6 font-medium">Price</th><th className="text-left py-3 px-6 font-medium">Est. Delivery</th>
            </tr></thead>
            <tbody>{shippingMethods.map((m) => (
              <tr key={m.name + m.zone} className="border-b border-stone-50 hover:bg-stone-50/50">
                <td className="py-3 px-6 text-sm font-medium text-stone-900">{m.name}</td>
                <td className="py-3 px-6 text-sm text-stone-500">{m.zone}</td>
                <td className="py-3 px-6 text-sm">{m.price === 0 ? <span className="text-emerald-600 font-medium">Free</span> : <span className="font-medium">${m.price.toFixed(2)}</span>}</td>
                <td className="py-3 px-6 text-sm text-stone-500">{m.estimated}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-2xl p-6 border border-stone-100 luxury-shadow">
        <h2 className="font-medium text-stone-900 mb-4">Free Shipping Settings</h2>
        <div className="grid grid-cols-2 gap-4 max-w-lg">
          <div><label className="text-xs font-medium text-stone-500 mb-1.5 block">Free Shipping Threshold ($)</label><Input type="number" defaultValue={100} /></div>
          <div><label className="text-xs font-medium text-stone-500 mb-1.5 block">Free Shipping Label</label><Input defaultValue="Free Shipping" /></div>
        </div>
      </div>
    </div>
  )
}