import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    return NextResponse.json({
      data: {
        message: 'Order placed successfully',
        orderId: 'VL-' + Date.now().toString(36).toUpperCase(),
        redirectUrl: '/account/orders'
      }
    }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}