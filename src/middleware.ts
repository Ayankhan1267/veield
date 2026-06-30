import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    if (path.startsWith('/admin') && token?.role !== 'super_admin' && token?.role !== 'admin' && token?.role !== 'manager') {
      if (!token) {
        return NextResponse.redirect(new URL('/login?callbackUrl=' + encodeURIComponent(path), req.url))
      }
      return NextResponse.redirect(new URL('/', req.url))
    }

    if (path.startsWith('/account') && !token) {
      return NextResponse.redirect(new URL('/login?callbackUrl=' + encodeURIComponent(path), req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/account/:path*', '/api/admin/:path*'],
}
