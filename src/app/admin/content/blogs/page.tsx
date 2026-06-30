'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Edit, Trash2, Eye, Calendar } from 'lucide-react'

const blogs = [
  { title: 'The Ultimate Guide to Choosing the Perfect Hijab Fabric', author: 'Amina Khan', status: 'Published', views: 2341, comments: 12, published: 'Jun 25, 2026', readTime: 5 },
  { title: '5 Ways to Style Your Chiffon Scarf for Summer', author: 'Sarah Ali', status: 'Published', views: 1876, comments: 8, published: 'Jun 22, 2026', readTime: 4 },
  { title: 'Caring for Your Silk Hijabs: A Complete Guide', author: 'Fatima Hassan', status: 'Draft', views: 0, comments: 0, published: '-', readTime: 6 },
  { title: 'Hijab Trends to Watch This Season', author: 'Amina Khan', status: 'Published', views: 3452, comments: 24, published: 'Jun 15, 2026', readTime: 3 },
  { title: 'The Art of Layering: Hijab Styling Tips', author: 'Layla Rahman', status: 'Draft', views: 0, comments: 0, published: '-', readTime: 4 },
]

export default function AdminBlogsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-stone-900">Blog Posts</h1>
          <p className="text-sm text-stone-500 mt-1">Manage your blog content</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" /> New Post</Button>
      </div>
      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden luxury-shadow">
        <div className="p-4 border-b border-stone-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" /><input type="text" placeholder="Search posts..." className="w-full pl-9 pr-4 h-10 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-400" /></div>
          <select className="text-sm border border-stone-200 rounded-xl px-3 py-2 h-10"><option>All Status</option><option>Published</option><option>Draft</option><option>Scheduled</option></select>
        </div>
        <table className="w-full">
          <thead><tr className="border-b border-stone-100 text-xs text-stone-400 uppercase tracking-wider">
            <th className="text-left py-4 px-6 font-medium">Title</th><th className="text-left py-4 px-6 font-medium">Author</th><th className="text-left py-4 px-6 font-medium">Views</th><th className="text-left py-4 px-6 font-medium">Comments</th><th className="text-left py-4 px-6 font-medium">Published</th><th className="text-left py-4 px-6 font-medium">Status</th><th className="text-right py-4 px-6 font-medium">Actions</th>
          </tr></thead>
          <tbody>{blogs.map((b) => (
            <tr key={b.title} className="border-b border-stone-50 hover:bg-stone-50/50">
              <td className="py-4 px-6"><div><p className="text-sm font-medium text-stone-900">{b.title}</p><p className="text-xs text-stone-400">{b.readTime} min read</p></div></td>
              <td className="py-4 px-6 text-sm text-stone-500">{b.author}</td>
              <td className="py-4 px-6 text-sm text-stone-500">{b.views.toLocaleString()}</td>
              <td className="py-4 px-6 text-sm text-stone-500">{b.comments}</td>
              <td className="py-4 px-6 text-sm text-stone-500">{b.published}</td>
              <td className="py-4 px-6"><Badge variant={b.status === 'Published' ? 'emerald' : 'secondary'} className="text-[10px]">{b.status}</Badge></td>
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