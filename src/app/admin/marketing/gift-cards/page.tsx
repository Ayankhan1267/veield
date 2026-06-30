'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Edit, Trash2, Gift, Copy } from 'lucide-react'

const giftCards = [
  { code: 'GC-8A2F-1B3C', amount: 50, balance: 50, recipient: 'amina@example.com', status: 'Active', created: 'Jun 20, 2026', expires: 'Dec 20, 2026' },
  { code: 'GC-9B3G-2C4D', amount: 100, balance: 45, recipient: 'sarah@example.com', status: 'Partially Redeemed', created: 'May 15, 2026', expires: 'Nov 15, 2026' },
  { code: 'GC-1C4H-3D5E', amount: 200, balance: 0, recipient: 'fatima@example.com', status: 'Redeemed', created: 'Jan 10, 2026', expires: 'Jul 10, 2026' },
  { code: 'GC-4D5I-4E6F', amount: 75, balance: 75, recipient: 'layla@example.com', status: 'Active', created: 'Jun 25, 2026', expires: 'Dec 25, 2026' },
  { code: 'GC-7E6J-5F7G', amount: 150, balance: 150, recipient: 'zainab@example.com', status: 'Active', created: 'Jun 28, 2026', expires: 'Dec 28, 2026' },
]

export default function AdminGiftCardsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-stone-900">Gift Cards</h1>
          <p className="text-sm text-stone-500 mt-1">Manage digital gift cards</p>
        </div>
        <Button><Gift className="h-4 w-4 mr-2" /> Issue Gift Card</Button>
      </div>
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-stone-100 luxury-shadow"><p className="text-2xl font-semibold text-stone-900">$2,450</p><p className="text-xs text-stone-500 mt-1">Total Issued</p></div>
        <div className="bg-white rounded-2xl p-6 border border-stone-100 luxury-shadow"><p className="text-2xl font-semibold text-stone-900">$1,320</p><p className="text-xs text-stone-500 mt-1">Active Balance</p></div>
        <div className="bg-white rounded-2xl p-6 border border-stone-100 luxury-shadow"><p className="text-2xl font-semibold text-stone-900">48</p><p className="text-xs text-stone-500 mt-1">Active Cards</p></div>
        <div className="bg-white rounded-2xl p-6 border border-stone-100 luxury-shadow"><p className="text-2xl font-semibold text-stone-900">$890</p><p className="text-xs text-stone-500 mt-1">Redeemed</p></div>
      </div>
      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden luxury-shadow">
        <div className="p-4 border-b border-stone-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" /><input type="text" placeholder="Search gift cards..." className="w-full pl-9 pr-4 h-10 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-400" /></div>
        </div>
        <table className="w-full">
          <thead><tr className="border-b border-stone-100 text-xs text-stone-400 uppercase tracking-wider">
            <th className="text-left py-4 px-6 font-medium">Code</th><th className="text-left py-4 px-6 font-medium">Amount</th><th className="text-left py-4 px-6 font-medium">Balance</th><th className="text-left py-4 px-6 font-medium">Recipient</th><th className="text-left py-4 px-6 font-medium">Created</th><th className="text-left py-4 px-6 font-medium">Expires</th><th className="text-left py-4 px-6 font-medium">Status</th><th className="text-right py-4 px-6 font-medium">Actions</th>
          </tr></thead>
          <tbody>{giftCards.map((gc) => (
            <tr key={gc.code} className="border-b border-stone-50 hover:bg-stone-50/50">
              <td className="py-4 px-6"><span className="text-sm font-mono font-medium text-stone-900">{gc.code}</span></td>
              <td className="py-4 px-6 text-sm font-medium">${gc.amount.toFixed(2)}</td>
              <td className="py-4 px-6 text-sm text-stone-500">${gc.balance.toFixed(2)}</td>
              <td className="py-4 px-6 text-sm text-stone-500">{gc.recipient}</td>
              <td className="py-4 px-6 text-sm text-stone-500">{gc.created}</td>
              <td className="py-4 px-6 text-sm text-stone-500">{gc.expires}</td>
              <td className="py-4 px-6"><Badge variant={gc.status === 'Active' ? 'emerald' : gc.status === 'Partially Redeemed' ? 'gold' : 'secondary'} className="text-[10px]">{gc.status}</Badge></td>
              <td className="py-4 px-6 text-right"><div className="flex items-center justify-end gap-1">
                <button className="p-2 rounded-lg hover:bg-stone-100"><Copy className="h-4 w-4 text-stone-400" /></button>
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