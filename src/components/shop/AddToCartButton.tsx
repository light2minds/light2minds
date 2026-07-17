'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useLang } from '@/lib/language'

type Props = {
  variantId: string
  available?: boolean
  label?: string
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export default function AddToCartButton({
  variantId, available = true, label, size = 'md', fullWidth = false,
}: Props) {
  const { lang } = useLang()
  const { addItem, isLoading } = useCart()
  const [added, setAdded] = useState(false)
  const resolvedLabel = label ?? (lang === 'es' ? 'Añadir al Carrito' : 'Add to Cart')

  const handleClick = async () => {
    if (!available || isLoading) return
    await addItem(variantId)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const padding = size === 'sm' ? 'px-5 py-2.5 text-[12.5px]' : size === 'lg' ? 'px-8 py-4 text-[15px]' : 'px-6 py-3.5 text-[13.5px]'

  if (!available) {
    return (
      <button
        disabled
        className={`${fullWidth ? 'w-full' : ''} ${padding} rounded-xl font-semibold text-navy-800/30 bg-stone-100 border border-stone-200 cursor-not-allowed`}
      >
        {lang === 'es' ? 'Agotado' : 'Out of stock'}
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`${fullWidth ? 'w-full' : ''} ${padding} rounded-xl font-bold text-navy-900 flex items-center justify-center gap-2 transition-all duration-150 hover:translate-y-[-1px] disabled:opacity-60`}
      style={{
        backgroundColor: added ? '#2EBB50' : '#FFE030',
        color: added ? '#fff' : '#0D1B2E',
        boxShadow: added
          ? '0 4px 0 #1E8E3E'
          : '0 4px 0 #C4A800, 0 6px 14px rgba(0,0,0,0.08)',
      }}
    >
      {added ? (
        <>
          <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 7l4 4 8-7" /></svg>
          {lang === 'es' ? '¡Añadido!' : 'Added!'}
        </>
      ) : isLoading ? (
        lang === 'es' ? 'Añadiendo…' : 'Adding…'
      ) : (
        <>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {resolvedLabel}
        </>
      )}
    </button>
  )
}
