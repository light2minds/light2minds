'use client'

import {
  createContext, useContext, useEffect, useState, useCallback, ReactNode
} from 'react'
import {
  ShopifyCart, CartLine,
  cartCreate, cartLinesAdd, cartLinesRemove, cartLinesUpdate, getCart
} from '@/lib/shopify'

const CART_STORAGE_KEY = 'l2m_cart_id'

type CartContextValue = {
  cart: ShopifyCart | null
  lines: CartLine[]
  isOpen: boolean
  isLoading: boolean
  itemCount: number
  subtotal: string
  currencyCode: string
  openCart: () => void
  closeCart: () => void
  addItem: (variantId: string, quantity?: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  updateQty: (lineId: string, quantity: number) => Promise<void>
  goToCheckout: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart,      setCart]      = useState<ShopifyCart | null>(null)
  const [isOpen,    setIsOpen]    = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Restore cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (!stored) return
    getCart(stored).then(c => {
      if (c) setCart(c)
      else localStorage.removeItem(CART_STORAGE_KEY)
    })
  }, [])

  const persist = (c: ShopifyCart) => {
    setCart(c)
    localStorage.setItem(CART_STORAGE_KEY, c.id)
  }

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    setIsLoading(true)
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      const updated = stored
        ? await cartLinesAdd(stored, [{ merchandiseId: variantId, quantity }])
        : await cartCreate([{ merchandiseId: variantId, quantity }])
      persist(updated)
      setIsOpen(true)
    } catch (err) {
      console.error('[Cart] addItem error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const removeItem = useCallback(async (lineId: string) => {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (!stored) return
    setIsLoading(true)
    try {
      persist(await cartLinesRemove(stored, [lineId]))
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateQty = useCallback(async (lineId: string, quantity: number) => {
    if (quantity < 1) { await removeItem(lineId); return }
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (!stored) return
    setIsLoading(true)
    try {
      persist(await cartLinesUpdate(stored, [{ id: lineId, quantity }]))
    } finally {
      setIsLoading(false)
    }
  }, [removeItem])

  const goToCheckout = useCallback(() => {
    if (cart?.checkoutUrl) window.location.href = cart.checkoutUrl
  }, [cart])

  const lines        = cart?.lines.edges.map(e => e.node) ?? []
  const itemCount    = cart?.totalQuantity ?? 0
  const subtotal     = cart?.cost.subtotalAmount.amount    ?? '0.00'
  const currencyCode = cart?.cost.subtotalAmount.currencyCode ?? 'USD'

  return (
    <CartContext.Provider value={{
      cart, lines, isOpen, isLoading, itemCount, subtotal, currencyCode,
      openCart:     () => setIsOpen(true),
      closeCart:    () => setIsOpen(false),
      addItem, removeItem, updateQty, goToCheckout,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
