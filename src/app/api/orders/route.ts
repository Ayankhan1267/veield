import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const orders = [
    { id: '1', orderNumber: 'VL-8A2F1', status: 'delivered', total: 89.00, items: 3, createdAt: '2026-06-28' },
    { id: '2', orderNumber: 'VL-9B3G2', status: 'shipped', total: 145.00, items: 2, createdAt: '2026-06-27' },
  ]
  return NextResponse.json({ data: orders })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    return NextResponse.json({ data: { message: 'Order created', orderNumber: 'VL-' + Date.now().toString(36).toUpperCase() } }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}