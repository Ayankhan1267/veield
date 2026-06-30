'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Search, Upload, Trash2, Download, Grid3X3, List, FolderOpen } from 'lucide-react'

const mediaItems = [
  { name: 'product-main.jpg', type: 'Image', size: '2.4 MB', dimensions: '1200x1600', uploaded: 'Jun 28, 2026', folder: 'Products' },
  { name: 'banner-hero.jpg', type: 'Image', size: '4.8 MB', dimensions: '1920x800', uploaded: 'Jun 25, 2026', folder: 'Banners' },
  { name: 'blog-featured.jpg', type: 'Image', size: '1.2 MB', dimensions: '800x600', uploaded: 'Jun 22, 2026', folder: 'Blog' },
  { name: 'product-thumb-1.jpg', type: 'Image', size: '0.6 MB', dimensions: '400x500', uploaded: 'Jun 20, 2026', folder: 'Products' },
  { name: 'lookbook-spring.mp4', type: 'Video', size: '24.5 MB', dimensions: '1920x1080', uploaded: 'Jun 15, 2026', folder: 'Videos' },
  { name: 'logo-dark.svg', type: 'SVG', size: '0.1 MB', dimensions: '-', uploaded: 'Jun 10, 2026', folder: 'Brand' },
  { name: 'category-hijabs.jpg', type: 'Image', size: '1.8 MB', dimensions: '800x800', uploaded: 'Jun 08, 2026', folder: 'Categories' },
  { name: 'gift-card-bg.jpg', type: 'Image', size: '3.2 MB', dimensions: '1200x800', uploaded: 'Jun 05, 2026', folder: 'Marketing' },
]

export default function AdminMediaPage() {
  const [view, setView] = useState('grid')

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-stone-900">Media Library</h1>
          <p className="text-sm text-stone-500 mt-1">Manage your images, videos, and files</p>
        </div>
        <Button><Upload className="h-4 w-4 mr-2" /> Upload Files</Button>
      </div>
      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden luxury-shadow">
        <div className="p-4 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" /><input type="text" placeholder="Search media..." className="w-full pl-9 pr-4 h-10 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-400" /></div>
            <select className="text-sm border border-stone-200 rounded-xl px-3 py-2 h-10"><option>All Files</option><option>Images</option><option>Videos</option><option>SVGs</option></select>
            <select className="text-sm border border-stone-200 rounded-xl px-3 py-2 h-10"><option>All Folders</option><option>Products</option><option>Banners</option><option>Blog</option><option>Brand</option><option>Marketing</option></select>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setView('grid')} className={`p-2 rounded-lg ${view === 'grid' ? 'bg-black text-white' : 'text-stone-400 hover:text-stone-600'}`}><Grid3X3 className="h-4 w-4" /></button>
            <button onClick={() => setView('list')} className={`p-2 rounded-lg ${view === 'list' ? 'bg-black text-white' : 'text-stone-400 hover:text-stone-600'}`}><List className="h-4 w-4" /></button>
          </div>
        </div>
        {view === 'grid' ? (
          <div className="p-6">
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {mediaItems.map((m) => (
                <div key={m.name} className="group relative bg-stone-50 rounded-xl overflow-hidden border border-stone-100 hover:border-stone-300 transition-colors cursor-pointer">
                  <div className="aspect-square bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
                    {m.type === 'Video' ? <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center"><div className="w-0 h-0 border-t-6 border-b-6 border-l-8 border-transparent border-l-stone-500 ml-1" /></div> : <FolderOpen className="h-8 w-8 text-stone-300" />}
                  </div>
                  <div className="p-2">
                    <p className="text-[10px] text-stone-600 truncate">{m.name}</p>
                    <p className="text-[9px] text-stone-400">{m.size}</p>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button className="p-1.5 bg-white rounded-lg"><Download className="h-3.5 w-3.5 text-stone-700" /></button>
                    <button className="p-1.5 bg-white rounded-lg"><Trash2 className="h-3.5 w-3.5 text-red-500" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <table className="w-full">
            <thead><tr className="border-b border-stone-100 text-xs text-stone-400 uppercase tracking-wider">
              <th className="text-left py-4 px-6 font-medium">File</th><th className="text-left py-4 px-6 font-medium">Type</th><th className="text-left py-4 px-6 font-medium">Size</th><th className="text-left py-4 px-6 font-medium">Dimensions</th><th className="text-left py-4 px-6 font-medium">Uploaded</th><th className="text-left py-4 px-6 font-medium">Folder</th><th className="text-right py-4 px-6 font-medium">Actions</th>
            </tr></thead>
            <tbody>{mediaItems.map((m) => (
              <tr key={m.name} className="border-b border-stone-50 hover:bg-stone-50/50">
                <td className="py-4 px-6"><div className="flex items-center gap-3"><div className="w-8 h-8 bg-stone-100 rounded" /><span className="text-sm text-stone-900">{m.name}</span></div></td>
                <td className="py-4 px-6 text-sm text-stone-500">{m.type}</td>
                <td className="py-4 px-6 text-sm text-stone-500">{m.size}</td>
                <td className="py-4 px-6 text-sm text-stone-500">{m.dimensions}</td>
                <td className="py-4 px-6 text-sm text-stone-500">{m.uploaded}</td>
                <td className="py-4 px-6 text-sm text-stone-500">{m.folder}</td>
                <td className="py-4 px-6 text-right"><div className="flex items-center justify-end gap-1">
                  <button className="p-2 rounded-lg hover:bg-stone-100"><Download className="h-4 w-4 text-stone-400" /></button>
                  <button className="p-2 rounded-lg hover:bg-red-50"><Trash2 className="h-4 w-4 text-red-400" /></button>
                </div></td>
              </tr>
            ))}</tbody>
          </table>
        )}
      </div>
    </div>
  )
}