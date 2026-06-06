'use client'

import { useEffect } from 'react'
import { useCart } from '@/context/CartContext'

/**
 * /checkout — redirects to Shopify's hosted checkout.
 * Shopify handles payment, tax, and order confirmation.
 * Cart is created/managed via Storefront API (CartContext).
 */
export default function CheckoutRedirectPage() {
  const { cart } = useCart()

  useEffect(() => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl
    }
  }, [cart])

  return (
    <main className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-sky-400/30 border-t-sky-400 animate-spin" />
        <p className="text-[14px] text-navy-800/40 font-medium">Redirecting to checkout…</p>
      </div>
    </main>
  )
}
