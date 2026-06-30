import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/shared/providers'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import AnnouncementBar from '@/components/layout/announcement-bar'
import CartDrawer from '@/components/layout/cart-drawer'
import MobileNav from '@/components/layout/mobile-nav'
import SearchOverlay from '@/components/layout/search-overlay'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Veiled | Premium Luxury Hijabs & Scarves',
    template: '%s | Veiled',
  },
  description:
    'Discover Veiled — a luxury hijab brand offering premium hijabs, scarves, and accessories for the modern Muslim woman.',
  keywords: ['hijab', 'luxury hijab', 'premium scarf', 'muslim fashion', 'modest fashion', 'hijab store'],
  authors: [{ name: 'Veiled' }],
  creator: 'Veiled',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Veiled',
    title: 'Veiled | Premium Luxury Hijabs & Scarves',
    description:
      'Discover Veiled — a luxury hijab brand offering premium hijabs, scarves, and accessories for the modern Muslim woman.',
    images: [
      {
        url: '/images/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Veiled',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veiled | Premium Luxury Hijabs & Scarves',
    description:
      'Discover Veiled — a luxury hijab brand offering premium hijabs, scarves, and accessories for the modern Muslim woman.',
    images: ['/images/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  other: {
    'theme-color': '#ffffff',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-white font-sans text-stone-900 antialiased">
        <Providers>
          <AnnouncementBar />
          <Header />
          <MobileNav />
          <SearchOverlay />
          <CartDrawer />
          <main className="relative">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
