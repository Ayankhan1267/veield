'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Star, Truck, Shield, RefreshCw, HeadphonesIcon } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
}

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 },
}

const categories = [
  { name: 'Jersey Hijabs', image: '/images/category-jersey.jpg', count: 24, href: '/categories/jersey-hijabs' },
  { name: 'Chiffon Hijabs', image: '/images/category-chiffon.jpg', count: 18, href: '/categories/chiffon-hijabs' },
  { name: 'Silk Hijabs', image: '/images/category-silk.jpg', count: 12, href: '/categories/silk-hijabs' },
  { name: 'Premium Scarves', image: '/images/category-scarves.jpg', count: 15, href: '/categories/premium-scarves' },
  { name: 'Accessories', image: '/images/category-accessories.jpg', count: 30, href: '/categories/accessories' },
  { name: 'Gift Boxes', image: '/images/category-gifts.jpg', count: 8, href: '/collections/gift-boxes' },
]

const collections = [
  { title: 'Everyday Elegance', description: 'Effortless styles for daily wear', image: '/images/collection-everyday.jpg', href: '/collections/everyday' },
  { title: 'Formal Luxe', description: 'Opulent designs for special occasions', image: '/images/collection-formal.jpg', href: '/collections/formal' },
  { title: 'Sport Collection', description: 'Activewear hijabs for movement', image: '/images/collection-sport.jpg', href: '/collections/sport' },
]

const features = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $100' },
  { icon: Shield, title: 'Premium Quality', desc: '100% satisfaction guaranteed' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
  { icon: HeadphonesIcon, title: '24/7 Support', desc: 'Dedicated customer care' },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-[url('/images/hero-1.jpg')] bg-cover bg-center scale-105 animate-fade-in" />
        <div className="relative z-20 flex items-center h-full max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-2xl"
          >
            <Badge variant="emerald" className="mb-6 text-sm px-4 py-1.5">
              New Collection 2026
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight mb-6">
              Elegance in
              <br />
              <span className="text-gradient-gold">Every Thread</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-300 mb-10 max-w-lg leading-relaxed">
              Discover premium hijabs and scarves crafted for the modern Muslim woman. Luxury that speaks to your soul.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="xl" className="bg-white text-black hover:bg-white/90 rounded-full px-10">
                Shop New Arrivals
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-10">
                Explore Collections
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-12 bg-stone-50 border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <f.icon className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-stone-900 text-sm">{f.title}</p>
                  <p className="text-xs text-stone-500">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="text-center mb-16">
            <Badge variant="emerald" className="mb-4">Categories</Badge>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Shop by Category</h2>
            <p className="text-stone-500 max-w-xl mx-auto">Explore our curated collection of premium hijabs and accessories</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link href={cat.href} className="group block">
                  <div className="aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden luxury-shadow-hover mb-3">
                    <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-stone-200 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                      <span className="text-4xl opacity-30 font-serif">{cat.name.charAt(0)}</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-sm text-stone-900 group-hover:text-emerald-600 transition-colors">{cat.name}</h3>
                  <p className="text-xs text-stone-400">{cat.count} Products</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-24 lg:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="text-center mb-16">
            <Badge variant="gold" className="mb-4">Collections</Badge>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Curated for You</h2>
            <p className="text-stone-500 max-w-xl mx-auto">Handpicked collections designed to elevate your style</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {collections.map((col, i) => (
              <motion.div key={col.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <Link href={col.href} className="group block relative h-80 md:h-96 rounded-3xl overflow-hidden luxury-shadow-hover">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <div className="absolute inset-0 bg-stone-200 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                    <h3 className="text-2xl font-serif text-white mb-2">{col.title}</h3>
                    <p className="text-stone-300 text-sm mb-4">{col.description}</p>
                    <span className="text-white text-sm font-medium group-hover:underline underline-offset-4 inline-flex items-center gap-1">
                      Explore <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <motion.div {...fadeUp}>
              <Badge variant="emerald" className="mb-4">Best Sellers</Badge>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-900">Most Loved</h2>
            </motion.div>
            <Link href="/collections/best-sellers" className="text-sm text-stone-500 hover:text-stone-900 transition-colors hidden sm:flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link href={`/products/premium-jersey-hijab-${i}`} className="group block">
                  <div className="aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden luxury-shadow-hover mb-4 relative">
                    <div className="absolute top-3 left-3 z-10">
                      <Badge variant="sale">-20%</Badge>
                    </div>
                    <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <h3 className="font-medium text-stone-900 group-hover:text-emerald-600 transition-colors text-sm">
                    Premium Jersey Hijab
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs text-stone-400 ml-1">(24)</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-stone-900 font-semibold">$39.00</span>
                    <span className="text-stone-400 line-through text-sm">$49.00</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 via-emerald-800 to-stone-900" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <motion.div {...fadeUp}>
            <Badge variant="gold" className="mb-6">Join the Community</Badge>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
              Become a Veiled Insider
            </h2>
            <p className="text-emerald-100/80 text-lg mb-10 max-w-lg mx-auto">
              Subscribe for exclusive access to new collections, early sale previews, and 15% off your first order.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-13 px-6 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
              />
              <Button className="bg-white text-emerald-900 hover:bg-white/90 rounded-full px-8 h-13">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <motion.div {...fadeUp}>
              <Badge variant="emerald" className="mb-4">Journal</Badge>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-900">From the Blog</h2>
            </motion.div>
            <Link href="/blog" className="text-sm text-stone-500 hover:text-stone-900 transition-colors hidden sm:flex items-center gap-1">
              Read More <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: '5 Ways to Style Your Chiffon Hijab', date: 'Jun 28, 2026', read: '4 min read' },
              { title: 'The Ultimate Hijab Fabric Guide', date: 'Jun 25, 2026', read: '6 min read' },
              { title: 'Modest Fashion Trends for Summer 2026', date: 'Jun 22, 2026', read: '5 min read' },
            ].map((post, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`} className="group block">
                  <div className="aspect-[16/10] bg-stone-100 rounded-2xl overflow-hidden luxury-shadow-hover mb-5">
                    <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-stone-400 mb-2">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-stone-300" />
                    <span>{post.read}</span>
                  </div>
                  <h3 className="font-serif text-lg text-stone-900 group-hover:text-emerald-600 transition-colors">
                    {post.title}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div {...fadeUp}>
            <Badge variant="emerald" className="mb-4">Follow Us</Badge>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">@veiled</h2>
            <p className="text-stone-500 mb-12">Tag us in your looks for a chance to be featured</p>
          </motion.div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-stone-200 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-300" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
