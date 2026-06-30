'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Edit, Trash2, ChevronDown, ChevronRight } from 'lucide-react'

const faqs = [
  { question: 'How do I choose the right hijab size?', category: 'Sizing', status: 'Published', order: 1 },
  { question: 'What fabrics are best for everyday wear?', category: 'Fabrics', status: 'Published', order: 2 },
  { question: 'How should I care for my silk hijabs?', category: 'Care', status: 'Published', order: 3 },
  { question: 'Do you offer international shipping?', category: 'Shipping', status: 'Published', order: 4 },
  { question: 'What is your return policy?', category: 'Returns', status: 'Published', order: 5 },
  { question: 'How long does delivery take?', category: 'Shipping', status: 'Draft', order: 6 },
]

export default function AdminFAQsPage() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-stone-900">FAQs</h1>
          <p className="text-sm text-stone-500 mt-1">Manage frequently asked questions</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" /> Add FAQ</Button>
      </div>
      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden luxury-shadow">
        <div className="p-4 border-b border-stone-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" /><input type="text" placeholder="Search FAQs..." className="w-full pl-9 pr-4 h-10 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-400" /></div>
          <select className="text-sm border border-stone-200 rounded-xl px-3 py-2 h-10"><option>All Categories</option><option>Sizing</option><option>Fabrics</option><option>Care</option><option>Shipping</option><option>Returns</option></select>
        </div>
        <div className="divide-y divide-stone-50">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <button onClick={() => setExpanded(expanded === faq.question ? null : faq.question)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-stone-50/50 transition-colors text-left">
                <div className="flex items-center gap-4 flex-1">
                  {expanded === faq.question ? <ChevronDown className="h-4 w-4 text-stone-400" /> : <ChevronRight className="h-4 w-4 text-stone-400" />}
                  <span className="text-sm font-medium text-stone-900">{faq.question}</span>
                  <Badge variant="secondary" className="text-[10px]">{faq.category}</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={faq.status === 'Published' ? 'emerald' : 'secondary'} className="text-[10px]">{faq.status}</Badge>
                  <span className="text-xs text-stone-400">#{faq.order}</span>
                  <button className="p-1.5 rounded-lg hover:bg-stone-100"><Edit className="h-3.5 w-3.5 text-stone-400" /></button>
                  <button className="p-1.5 rounded-lg hover:bg-red-50"><Trash2 className="h-3.5 w-3.5 text-red-400" /></button>
                </div>
              </button>
              {expanded === faq.question && (
                <div className="px-6 pb-4 ml-8"><p className="text-sm text-stone-500">Sample answer for &ldquo;{faq.question}&rdquo; will appear here. Edit the FAQ to set the full answer content.</p></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}