'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react'

const posts = [
  { title: '5 Ways to Style Your Chiffon Hijab', excerpt: 'Discover versatile styling techniques that transform your look.', category: 'Styling', date: 'Jun 28, 2026', read: '4 min read', slug: 'style-chiffon-hijab' },
  { title: 'The Ultimate Hijab Fabric Guide', excerpt: 'From jersey to silk, learn which fabric suits every occasion.', category: 'Guide', date: 'Jun 25, 2026', read: '6 min read', slug: 'hijab-fabric-guide' },
  { title: 'Modest Fashion Trends for Summer 2026', excerpt: 'Stay ahead with the latest modest fashion trends.', category: 'Trends', date: 'Jun 22, 2026', read: '5 min read', slug: 'summer-trends-2026' },
  { title: 'How to Care for Your Silk Hijabs', excerpt: 'Extend the life of your silk hijabs with expert care tips.', category: 'Care', date: 'Jun 18, 2026', read: '3 min read', slug: 'care-silk-hijabs' },
  { title: 'The Art of Layering Hijabs', excerpt: 'Master layering for a sophisticated and unique look.', category: 'Styling', date: 'Jun 15, 2026', read: '5 min read', slug: 'layering-hijabs' },
  { title: 'Sustainable Fashion in Modest Wear', excerpt: 'How Veiled is committed to sustainable fashion.', category: 'Sustainability', date: 'Jun 12, 2026', read: '4 min read', slug: 'sustainable-modest-fashion' },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-stone-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24">
          <div className="max-w-2xl">
            <Badge variant="emerald" className="mb-4">Journal</Badge>
            <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-4">The Veiled Journal</h1>
            <p className="text-stone-500 text-lg">Style guides, fashion insights, and stories from our community.</p>
          </div>
          <div className="relative max-w-md mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
            <input type="text" placeholder="Search articles..." className="w-full h-13 pl-12 pr-4 rounded-full border border-stone-200 bg-white text-sm focus:outline-none focus:border-stone-400" />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="flex gap-3 mb-12 overflow-x-auto pb-2">
          {['All', 'Styling', 'Guide', 'Trends', 'Care', 'Sustainability'].map((cat) => (
            <button key={cat} className='px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all hover:bg-stone-200'>{cat}</button>
          ))}
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {posts.map((post, i) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link href={'/blog/' + post.slug} className='group block'>
                <div className='aspect-[16/10] bg-stone-100 rounded-2xl overflow-hidden luxury-shadow-hover mb-5'>
                  <div className='w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 group-hover:scale-105 transition-transform duration-500' />
                </div>
                <div className='flex items-center gap-3 text-xs text-stone-400 mb-3'>
                  <Badge variant='secondary' className='text-[10px]'>{post.category}</Badge>
                  <span className='flex items-center gap-1'><Calendar className='h-3 w-3' /> {post.date}</span>
                  <span className='flex items-center gap-1'><Clock className='h-3 w-3' /> {post.read}</span>
                </div>
                <h2 className='font-serif text-lg md:text-xl text-stone-900 group-hover:text-emerald-600 transition-colors mb-2'>{post.title}</h2>
                <p className='text-sm text-stone-500 leading-relaxed'>{post.excerpt}</p>
                <span className='inline-flex items-center gap-1 text-sm font-medium text-emerald-600 mt-4 group-hover:gap-2 transition-all'>Read More <ArrowRight className='h-3 w-3' /></span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}