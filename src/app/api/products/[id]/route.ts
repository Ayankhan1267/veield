import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = {
    id,
    name: 'Premium Jersey Hijab',
    slug: 'premium-jersey-hijab',
    description: 'Luxurious premium jersey hijab crafted from the finest modal blend fabric. Ultra-soft, breathable, and wrinkle-resistant for all-day comfort.',
    shortDescription: 'Ultra-soft premium jersey hijab',
    price: 39.00,
    comparePrice: 49.00,
    stock: 45,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 124,
    soldCount: 200,
    fabric: 'Jersey',
    color: 'Black',
    careInstructions: 'Hand wash cold. Hang dry. Do not bleach.',
    images: [
      { id: 'img-1', url: '/images/product-1.jpg', alt: 'Front view', isPrimary: true },
      { id: 'img-2', url: '/images/product-2.jpg', alt: 'Side view', isPrimary: false },
    ],
    variants: [
      { id: 'var-1', name: 'Black', sku: 'JER-BLK-001', price: 39.00, stock: 20, color: 'Black' },
      { id: 'var-2', name: 'White', sku: 'JER-WHT-001', price: 39.00, stock: 15, color: 'White' },
      { id: 'var-3', name: 'Beige', sku: 'JER-BEG-001', price: 39.00, stock: 10, color: 'Beige' },
    ],
    category: { id: 'cat-1', name: 'Jersey Hijabs', slug: 'jersey-hijabs' },
    reviews: [
      { id: 'rev-1', rating: 5, title: 'Absolutely love it!', content: 'The fabric is so soft and flows beautifully.', userName: 'Amina K.', createdAt: '2026-06-14', isVerified: true },
    ],
  }
  return NextResponse.json({ data: product })
}