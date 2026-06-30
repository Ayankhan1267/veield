import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Address, Review, Notification } from '@/types'

interface CartStore {
  items: CartItem[]
  couponCode: string | null
  couponDiscount: number
  isDrawerOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  setCoupon: (code: string, discount: number) => void
  removeCoupon: () => void
  toggleDrawer: () => void
  getSubtotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      couponDiscount: 0,
      isDrawerOpen: false,
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.variantId === item.variantId && i.productId === item.productId
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.variantId === item.variantId && i.productId === item.productId
                  ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.maxQuantity) }
                  : i
              ),
            }
          }
          return { items: [...state.items, item] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, Math.min(quantity, i.maxQuantity)) } : i
          ),
        })),
      clearCart: () => set({ items: [], couponCode: null, couponDiscount: 0 }),
      setCoupon: (code, discount) => set({ couponCode: code, couponDiscount: discount }),
      removeCoupon: () => set({ couponCode: null, couponDiscount: 0 }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
      getSubtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'veiled-cart' }
  )
)

interface WishlistStore {
  items: string[]
  addItem: (id: string) => void
  removeItem: (id: string) => void
  toggleItem: (id: string) => void
  isInWishlist: (id: string) => boolean
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (id) => set((state) => ({ items: [...state.items, id] })),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i !== id) })),
      toggleItem: (id) => {
        const isIn = get().items.includes(id)
        if (isIn) get().removeItem(id)
        else get().addItem(id)
      },
      isInWishlist: (id) => get().items.includes(id),
    }),
    { name: 'veiled-wishlist' }
  )
)

interface CompareStore {
  items: string[]
  addItem: (id: string) => void
  removeItem: (id: string) => void
  clearAll: () => void
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (id) =>
        set((state) => {
          if (state.items.length >= 4) return state
          if (state.items.includes(id)) return state
          return { items: [...state.items, id] }
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i !== id) })),
      clearAll: () => set({ items: [] }),
    }),
    { name: 'veiled-compare' }
  )
)

interface UIStore {
  isSearchOpen: boolean
  isMobileMenuOpen: boolean
  isQuickViewOpen: boolean
  quickViewProduct: string | null
  recentlyViewed: string[]
  openSearch: () => void
  closeSearch: () => void
  toggleMobileMenu: () => void
  openQuickView: (id: string) => void
  closeQuickView: () => void
  addRecentlyViewed: (id: string) => void
}

export const useUIStore = create<UIStore>()((set, get) => ({
  isSearchOpen: false,
  isMobileMenuOpen: false,
  isQuickViewOpen: false,
  quickViewProduct: null,
  recentlyViewed: [],
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  openQuickView: (id) => set({ isQuickViewOpen: true, quickViewProduct: id }),
  closeQuickView: () => set({ isQuickViewOpen: false, quickViewProduct: null }),
  addRecentlyViewed: (id) => {
    const items = get().recentlyViewed.filter((i) => i !== id)
    set({ recentlyViewed: [id, ...items].slice(0, 12) })
  },
}))

interface NotificationStore {
  notifications: Notification[]
  unreadCount: number
  addNotification: (n: Notification) => void
  markRead: (id: string) => void
  markAllRead: () => void
}

export const useNotificationStore = create<NotificationStore>()((set, get) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (n) =>
    set((state) => ({
      notifications: [n, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    })),
  markRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
}))
