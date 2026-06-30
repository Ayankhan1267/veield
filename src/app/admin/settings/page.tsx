'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Save, Store, Globe, Mail, Shield, CreditCard } from 'lucide-react'

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState('Veiled')
  const [email, setEmail] = useState('hello@veiled.com')
  const [phone, setPhone] = useState('+1-800-VEILED')
  const [currency, setCurrency] = useState('USD')
  const [language, setLanguage] = useState('English')

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-stone-900">Settings</h1>
          <p className="text-sm text-stone-500 mt-1">Manage your store configuration</p>
        </div>
        <Button><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-stone-100 luxury-shadow">
            <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center"><Store className="h-5 w-5 text-white" /></div><div><h2 className="font-medium text-stone-900">Store Information</h2><p className="text-xs text-stone-400">Basic store details</p></div></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-xs font-medium text-stone-500 mb-1.5 block">Store Name</label><Input value={storeName} onChange={(e) => setStoreName(e.target.value)} /></div>
              <div><label className="text-xs font-medium text-stone-500 mb-1.5 block">Store Email</label><Input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              <div><label className="text-xs font-medium text-stone-500 mb-1.5 block">Phone</label><Input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
              <div><label className="text-xs font-medium text-stone-500 mb-1.5 block">Currency</label><select className="w-full h-10 rounded-xl border border-stone-200 text-sm px-3 focus:outline-none focus:border-stone-400" value={currency} onChange={(e) => setCurrency(e.target.value)}><option>USD</option><option>EUR</option><option>GBP</option></select></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-stone-100 luxury-shadow">
            <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center"><Globe className="h-5 w-5 text-blue-500" /></div><div><h2 className="font-medium text-stone-900">Localization</h2><p className="text-xs text-stone-400">Language and regional settings</p></div></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-xs font-medium text-stone-500 mb-1.5 block">Default Language</label><select className="w-full h-10 rounded-xl border border-stone-200 text-sm px-3 focus:outline-none focus:border-stone-400" value={language} onChange={(e) => setLanguage(e.target.value)}><option>English</option><option>Arabic</option><option>French</option></select></div>
              <div><label className="text-xs font-medium text-stone-500 mb-1.5 block">Time Zone</label><select className="w-full h-10 rounded-xl border border-stone-200 text-sm px-3 focus:outline-none focus:border-stone-400"><option>EST (UTC-5)</option><option>PST (UTC-8)</option><option>GMT (UTC+0)</option></select></div>
              <div><label className="text-xs font-medium text-stone-500 mb-1.5 block">Date Format</label><select className="w-full h-10 rounded-xl border border-stone-200 text-sm px-3 focus:outline-none focus:border-stone-400"><option>MM/DD/YYYY</option><option>DD/MM/YYYY</option><option>YYYY-MM-DD</option></select></div>
              <div><label className="text-xs font-medium text-stone-500 mb-1.5 block">Weight Unit</label><select className="w-full h-10 rounded-xl border border-stone-200 text-sm px-3 focus:outline-none focus:border-stone-400"><option>Ounces (oz)</option><option>Grams (g)</option></select></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-stone-100 luxury-shadow">
            <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center"><Shield className="h-5 w-5 text-purple-500" /></div><div><h2 className="font-medium text-stone-900">Store Preferences</h2><p className="text-xs text-stone-400">Feature toggles and settings</p></div></div>
            <div className="space-y-4">
              {[
                { label: 'Enable customer reviews', desc: 'Allow customers to review products' },
                { label: 'Enable wishlist', desc: 'Let customers save products to wishlist' },
                { label: 'Enable gift wrapping', desc: 'Offer gift wrapping at checkout' },
                { label: 'Show out of stock products', desc: 'Display products even when stock is zero' },
                { label: 'Enable newsletter signup', desc: 'Show email signup forms throughout the site' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-stone-50 last:border-0">
                  <div><p className="text-sm font-medium text-stone-900">{item.label}</p><p className="text-xs text-stone-400">{item.desc}</p></div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-stone-100 luxury-shadow">
            <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center"><CreditCard className="h-5 w-5 text-emerald-500" /></div><div><h2 className="font-medium text-stone-900">Payment</h2><p className="text-xs text-stone-400">Payment methods</p></div></div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl"><span className="text-sm font-medium text-stone-900">Stripe</span><Badge variant="emerald" className="text-[10px]">Connected</Badge></div>
              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl"><span className="text-sm font-medium text-stone-900">Razorpay</span><Button variant="outline" size="sm">Connect</Button></div>
              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl"><span className="text-sm font-medium text-stone-900">Cash on Delivery</span><Switch defaultChecked /></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-stone-100 luxury-shadow">
            <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center"><Mail className="h-5 w-5 text-amber-500" /></div><div><h2 className="font-medium text-stone-900">Notifications</h2><p className="text-xs text-stone-400">Email alerts</p></div></div>
            <div className="space-y-3">
              {['New order', 'Low stock alert', 'New customer registration', 'Order cancellation'].map((n) => (
                <div key={n} className="flex items-center justify-between py-2"><span className="text-sm text-stone-600">{n}</span><Switch defaultChecked={n !== 'Order cancellation'} /></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}