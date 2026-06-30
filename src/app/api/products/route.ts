import { NextRequest, NextResponse } from 'next/server'

const mockProducts = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  name: 'Premium Jersey Hijab ' + (i + 1),
  slug: 'premium-jersey-hijab-' + (i + 1),
  description: 'Luxurious premium jersey hijab crafted from the finest modal blend fabric. Ultra-soft, breathable, and wrinkle-resistant for all-day comfort.',
  shortDescription: 'Ultra-soft premium jersey hijab',
  price: 39.00,
  comparePrice: i % 3 === 0 ? 49.00 : null,
  stock: Math.floor(Math.random() * 50) + 5,
  isFeatured: i < 4,
  isTrending: i >= 4 && i < 8,
  isBestSeller: i >= 8,
  isNew: i < 3,
  rating: (4 + Math.random()).toFixed(1),
  reviewCount: Math.floor(Math.random() * 100) + 10,
  soldCount: Math.floor(Math.random() * 300) + 20,
  images: [{ id: 'img-1', url: '/images/product-' + (i + 1) + '.jpg', alt: 'Premium Jersey Hijab', isPrimary: true }],
  variants: [
    { id: 'var-1', name: 'Black', sku: 'JER-BLK-001', price: 39.00, stock: 20, color: 'Black' },
    { id: 'var-2', name: 'White', sku: 'JER-WHT-001', price: 39.00, stock: 15, color: 'White' },
  ],
  fabric: 'Jersey',
  color: 'Black',
  category: { id: 'cat-1', name: 'Jersey Hijabs', slug: 'jersey-hijabs' },
}))

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '12')
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const sort = searchParams.get('sort')

  let filtered = [...mockProducts]
  if (category) filtered = filtered.filter(p => p.category.slug === category)
  if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  const total = filtered.length
  const start = (page - 1) * limit
  const products = filtered.slice(start, start + limit)

  return NextResponse.json({ data: products, total, page, totalPages: Math.ceil(total / limit) })
}