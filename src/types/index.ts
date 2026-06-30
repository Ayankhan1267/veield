import { User as PrismaUser } from '@/generated/prisma/client'

export type User = PrismaUser

export type CartItem = {
  id: string
  productId: string
  variantId: string
  name: string
  image: string
  price: number
  comparePrice?: number
  quantity: number
  color?: string
  size?: string
  fabric?: string
  slug: string
  maxQuantity: number
}

export type Cart = {
  items: CartItem[]
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  couponCode?: string
  couponDiscount: number
}

export type Address = {
  id?: string
  fullName: string
  street: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  isDefault?: boolean
  label?: string
}

export type Review = {
  id: string
  rating: number
  title: string
  content: string
  userName: string
  userImage?: string
  createdAt: Date
  isVerified: boolean
  likes: number
  images?: string[]
}

export type Product = {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  comparePrice?: number
  costPrice?: number
  sku: string
  barcode?: string
  stock: number
  isActive: boolean
  isFeatured: boolean
  isTrending: boolean
  isBestSeller: boolean
  isNew: boolean
  onSale: boolean
  saleEnds?: Date
  weight?: number
  dimensions?: string
  fabric?: string
  material?: string
  pattern?: string
  careInstructions?: string
  size?: string
  color?: string
  occasion?: string
  metaTitle?: string
  metaDescription?: string
  images: ProductImage[]
  variants: ProductVariant[]
  category: Category
  tags: string[]
  reviews: Review[]
  rating: number
  reviewCount: number
  soldCount: number
  createdAt: Date
}

export type ProductImage = {
  id: string
  url: string
  alt: string
  isPrimary: boolean
  width?: number
  height?: number
}

export type ProductVariant = {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  color?: string
  size?: string
  fabric?: string
  image?: string
  isActive: boolean
}

export type Category = {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
  children?: Category[]
  productCount?: number
}

export type Order = {
  id: string
  orderNumber: string
  status: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  paymentMethod: string
  paymentStatus: string
  shippingAddress: Address
  billingAddress: Address
  trackingNumber?: string
  carrier?: string
  estimatedDelivery?: Date
  deliveredAt?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export type OrderItem = {
  id: string
  productId: string
  productName: string
  productImage: string
  quantity: number
  price: number
  variant?: string
}

export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  author: string
  category: string
  tags: string[]
  readTime: number
  publishedAt: Date
  isFeatured: boolean
  metaTitle?: string
  metaDescription?: string
}

export type Coupon = {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  minOrder: number
  maxDiscount?: number
  usageLimit?: number
  usedCount: number
  startsAt: Date
  expiresAt: Date
  isActive: boolean
}

export type FlashSale = {
  id: string
  name: string
  discount: number
  startsAt: Date
  endsAt: Date
  products: string[]
  isActive: boolean
}

export type Notification = {
  id: string
  type: 'order' | 'wishlist' | 'promotion' | 'review' | 'system'
  title: string
  message: string
  read: boolean
  createdAt: Date
  link?: string
}

export type DashboardStats = {
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  averageOrderValue: number
  conversionRate: number
  revenueToday: number
  ordersToday: number
  pendingOrders: number
  lowStockProducts: number
  revenueLast30Days: { date: string; revenue: number }[]
  ordersLast30Days: { date: string; orders: number }[]
  topProducts: { id: string; name: string; revenue: number; units: number }[]
  topCategories: { id: string; name: string; revenue: number }[]
  orderStatusBreakdown: { status: string; count: number }[]
}
