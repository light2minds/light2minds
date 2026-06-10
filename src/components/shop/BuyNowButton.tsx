'use client'

import { useState } from 'react'
import { cartCreate } from '@/lib/shopify'

type Props = {
  variantId: string
  available?: boolean
  label?: string
}

export default function BuyNowButton({ variantId, available = true, label = 'Buy Now' }: Props) {
  const [loading, setLoading] = useState(false)

  if (!available) {
    return (
      <button
        disabled
        className="w-full py-3 rounded-xl text-[13px] font-semibold text-navy-800/30 bg-stone-100 border border-stone-200 cursor-not-allowed"
      >
        Sold Out
      </button>
    )
  }

  const handleClick = async () => {
    if (loading) return
    setLoading(true)
    try {
      const cart = await cartCreate([{ merchandiseId: variantId, quantity: 1 }])
      window.location.href = cart.checkoutUrl
    } catch {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full py-3 rounded-xl text-[13.5px] font-bold text-navy-900 flex items-center justify-center gap-2 transition-all duration-150 hover:-translate-y-px disabled:opacity-70 disabled:cursor-not-allowed"
      style={{
        backgroundColor: '#FFE030',
        boxShadow: loading ? 'none' : '0 4px 0 #C4A800, 0 6px 14px rgba(0,0,0,0.07)',
      }}
    >
      {loading ? (
        <>
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          Processing…
        </>
      ) : label}
    </button>
  )
}
