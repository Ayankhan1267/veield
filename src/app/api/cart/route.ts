import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ data: { items: [], subtotal: 0, total: 0 } })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    return NextResponse.json({ data: { message: 'Item added to cart', item: body } }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}