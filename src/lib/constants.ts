export const SITE_CONFIG = {
  name: 'Veiled',
  tagline: 'Premium Luxury Hijabs & Scarves',
  description:
    'Discover Veiled — a luxury hijab brand offering premium hijabs, scarves, and accessories for the modern Muslim woman.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/images/og.jpg',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@veiled.com',
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+1-800-VEILED',
  social: {
    instagram: 'https://instagram.com/veiled',
    pinterest: 'https://pinterest.com/veiled',
    tiktok: 'https://tiktok.com/@veiled',
    youtube: 'https://youtube.com/@veiled',
  },
} as const

export const CURRENCY = {
  code: 'USD',
  symbol: '$',
  locale: 'en-US',
} as const

export const SHIPPING = {
  freeThreshold: 100,
  standard: 5.99,
  express: 14.99,
  international: 24.99,
} as const

export const TAX_RATES = {
  default: 0.08,
  international: 0.0,
} as const

export const PRODUCT_SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Selling', value: 'bestselling' },
  { label: 'Most Popular', value: 'popular' },
  { label: 'Highest Rated', value: 'rating' },
] as const

export const PRODUCT_FILTERS = {
  colors: [
    { label: 'Black', value: 'black' },
    { label: 'White', value: 'white' },
    { label: 'Beige', value: 'beige' },
    { label: 'Navy', value: 'navy' },
    { label: 'Burgundy', value: 'burgundy' },
    { label: 'Emerald', value: 'emerald' },
    { label: 'Dusty Rose', value: 'dusty-rose' },
    { label: 'Blush Pink', value: 'blush-pink' },
    { label: 'Mocha', value: 'mocha' },
    { label: 'Charcoal', value: 'charcoal' },
    { label: 'Sage Green', value: 'sage-green' },
    { label: 'Lavender', value: 'lavender' },
  ],
  fabrics: [
    { label: 'Jersey', value: 'jersey' },
    { label: 'Chiffon', value: 'chiffon' },
    { label: 'Modal', value: 'modal' },
    { label: 'Silk', value: 'silk' },
    { label: 'Cotton', value: 'cotton' },
    { label: 'Satin', value: 'satin' },
    { label: 'Crepe', value: 'crepe' },
    { label: 'Velvet', value: 'velvet' },
  ],
  sizes: [
    { label: 'One Size', value: 'one-size' },
    { label: 'Standard', value: 'standard' },
    { label: 'Oversized', value: 'oversized' },
    { label: 'Square', value: 'square' },
    { label: 'Rectangle', value: 'rectangle' },
  ],
  occasions: [
    { label: 'Everyday', value: 'everyday' },
    { label: 'Formal', value: 'formal' },
    { label: 'Casual', value: 'casual' },
    { label: 'Work', value: 'work' },
    { label: 'Wedding', value: 'wedding' },
    { label: 'Travel', value: 'travel' },
    { label: 'Sport', value: 'sport' },
  ],
  priceRanges: [
    { label: 'Under $25', value: '0-25' },
    { label: '$25 - $50', value: '25-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $200', value: '100-200' },
    { label: 'Over $200', value: '200-9999' },
  ],
} as const

export const NAVIGATION: {
  main: {
    label: string
    href: string
    featured?: boolean
    megaMenu?: boolean
    badge?: string
    columns?: { title: string; links: { label: string; href: string }[] }[]
  }[]
  account: { label: string; href: string }[]
} = {
  main: [
    {
      label: 'New Arrivals',
      href: '/collections/new-arrivals',
      featured: true,
    },
    {
      label: 'Hijabs',
      href: '/categories/hijabs',
      megaMenu: true,
      columns: [
        {
          title: 'By Fabric',
          links: [
            { label: 'Jersey Hijabs', href: '/categories/jersey-hijabs' },
            { label: 'Chiffon Hijabs', href: '/categories/chiffon-hijabs' },
            { label: 'Modal Hijabs', href: '/categories/modal-hijabs' },
            { label: 'Silk Hijabs', href: '/categories/silk-hijabs' },
            { label: 'Cotton Hijabs', href: '/categories/cotton-hijabs' },
            { label: 'Satin Hijabs', href: '/categories/satin-hijabs' },
          ],
        },
        {
          title: 'By Style',
          links: [
            { label: 'Everyday Hijabs', href: '/collections/everyday' },
            { label: 'Formal Hijabs', href: '/collections/formal' },
            { label: 'Sport Hijabs', href: '/collections/sport' },
            { label: 'Prayer Hijabs', href: '/collections/prayer' },
            { label: 'Premium Collection', href: '/collections/premium' },
          ],
        },
        {
          title: 'Trending',
          links: [
            { label: 'Best Sellers', href: '/collections/best-sellers' },
            { label: 'New This Week', href: '/collections/new-arrivals' },
            { label: 'Limited Edition', href: '/collections/limited-edition' },
            { label: 'Gift Sets', href: '/collections/gift-sets' },
          ],
        },
      ],
    },
    {
      label: 'Scarves',
      href: '/categories/scarves',
      megaMenu: true,
      columns: [
        {
          title: 'Premium Scarves',
          links: [
            { label: 'Cashmere Scarves', href: '/categories/cashmere-scarves' },
            { label: 'Wool Scarves', href: '/categories/wool-scarves' },
            { label: 'Silk Scarves', href: '/categories/silk-scarves' },
            { label: 'Cotton Scarves', href: '/categories/cotton-scarves' },
          ],
        },
      ],
    },
    {
      label: 'Accessories',
      href: '/categories/accessories',
      megaMenu: true,
      columns: [
        {
          title: 'Essentials',
          links: [
            { label: 'Caps', href: '/categories/caps' },
            { label: 'Underscarves', href: '/categories/underscarves' },
            { label: 'Pins & Brooches', href: '/categories/pins' },
            { label: 'Magnetic Pins', href: '/categories/magnets' },
            { label: 'Hijab Bands', href: '/categories/hijab-bands' },
          ],
        },
      ],
    },
    {
      label: 'Gift Boxes',
      href: '/collections/gift-boxes',
      badge: 'New',
    },
    {
      label: 'Sale',
      href: '/collections/sale',
      badge: 'Up to 40% Off',
    },
  ],
  account: [
    { label: 'My Account', href: '/account' },
    { label: 'Orders', href: '/account/orders' },
    { label: 'Wishlist', href: '/account/wishlist' },
    { label: 'Rewards', href: '/account/rewards' },
    { label: 'Wallet', href: '/account/wallet' },
    { label: 'Settings', href: '/account/settings' },
  ],
}

export const REWARDS = {
  signUp: 100,
  review: 50,
  purchasePerDollar: 1,
  referral: 200,
  birthday: 200,
  socialShare: 25,
  redemptionRate: 100,
} as const

export const ORDER_STATUS = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  PROCESSING: 'Processing',
  PACKED: 'Packed',
  SHIPPED: 'Shipped',
  IN_TRANSIT: 'In Transit',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  REFUNDED: 'Refunded',
  RETURNED: 'Returned',
} as const

export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  SUPPORT: 'support',
  WAREHOUSE: 'warehouse',
  DELIVERY: 'delivery',
  FINANCE: 'finance',
  MARKETING: 'marketing',
} as const

export const PAYMENT_METHODS = {
  STRIPE: 'stripe',
  RAZORPAY: 'razorpay',
  PHONEPE: 'phonepe',
  COD: 'cod',
} as const
