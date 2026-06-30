import { NextResponse } from 'next/server'

const categories = [
  { id: 'cat-1', name: 'Jersey Hijabs', slug: 'jersey-hijabs', description: 'Soft, stretchy, and perfect for everyday wear', productCount: 24, image: '/images/cat-jersey.jpg' },
  { id: 'cat-2', name: 'Chiffon Hijabs', slug: 'chiffon-hijabs', description: 'Elegant and flowy for formal occasions', productCount: 18, image: '/images/cat-chiffon.jpg' },
  { id: 'cat-3', name: 'Silk Hijabs', slug: 'silk-hijabs', description: 'Luxurious silk for premium elegance', productCount: 12, image: '/images/cat-silk.jpg' },
  { id: 'cat-4', name: 'Cotton Hijabs', slug: 'cotton-hijabs', description: 'Breathable cotton for everyday comfort', productCount: 15, image: '/images/cat-cotton.jpg' },
  { id: 'cat-5', name: 'Premium Scarves', slug: 'premium-scarves', description: 'Designer scarves for a sophisticated look', productCount: 15, image: '/images/cat-scarves.jpg' },
  { id: 'cat-6', name: 'Accessories', slug: 'accessories', description: 'Pins, magnets, caps and more', productCount: 30, image: '/images/cat-accessories.jpg' },
]

export async function GET() {
  return NextResponse.json({ data: categories })
}