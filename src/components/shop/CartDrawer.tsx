'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/shopify'
import { useLang } from '@/lib/language'

export default function CartDrawer() {
  const { lang } = useLang()
  const {
    lines, isOpen, isLoading,
    closeCart, removeItem, updateQty,
    subtotal, currencyCode, itemCount, goToCheckout,
  } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-navy-900/30 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-[400px] bg-white shadow-2xl flex flex-col"
            aria-label={lang === 'es' ? 'Carrito de compras' : 'Shopping cart'}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <h2 className="text-[15px] font-bold text-navy-900">{lang === 'es' ? 'Tu Carrito' : 'Your Cart'}</h2>
                {itemCount > 0 && (
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                    style={{ backgroundColor: '#5BC4F8' }}
                  >
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-stone-100 transition-colors"
                aria-label={lang === 'es' ? 'Cerrar carrito' : 'Close cart'}
              >
                <svg className="w-4 h-4 text-navy-900/50" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
            </div>

            {/* Line items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-navy-900/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </div>
                  <p className="text-[14px] font-semibold text-navy-900/40 mb-1">{lang === 'es' ? 'Tu carrito está vacío' : 'Your cart is empty'}</p>
                  <p className="text-[13px] text-navy-800/30">{lang === 'es' ? 'Elige un producto para comenzar.' : 'Choose a product to get started.'}</p>
                </div>
              ) : (
                <div className="divide-y divide-stone-100">
                  {lines.map(line => {
                    const img   = line.merchandise.product.images.edges[0]?.node
                    const title = line.merchandise.product.title
                    const variant = line.merchandise.title !== 'Default Title'
                      ? line.merchandise.title
                      : null
                    const lineTotal = formatPrice(
                      (parseFloat(line.merchandise.price.amount) * line.quantity).toFixed(2),
                      currencyCode
                    )
                    return (
                      <div key={line.id} className="flex gap-4 py-4">
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-stone-100 bg-stone-50">
                          {img ? (
                            <Image
                              src={img.url}
                              alt={img.altText ?? title}
                              width={64} height={64}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'rgba(91,196,248,0.10)' }}>
                              <svg className="w-7 h-7" style={{ color: '#5BC4F8' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-navy-900 leading-snug">{title}</p>
                          {variant && <p className="text-[11px] text-navy-800/40 mt-0.5">{variant}</p>}

                          <div className="flex items-center justify-between mt-2.5">
                            {/* Qty */}
                            <div className="flex items-center border border-stone-200 rounded-full">
                              <button
                                onClick={() => updateQty(line.id, line.quantity - 1)}
                                disabled={isLoading}
                                className="w-7 h-7 flex items-center justify-center text-navy-800/40 hover:text-navy-900 transition-colors disabled:opacity-40"
                                aria-label={lang === 'es' ? 'Disminuir' : 'Decrease'}
                              >
                                <svg className="w-3 h-3" viewBox="0 0 12 2" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M1 1h10" /></svg>
                              </button>
                              <span className="text-[13px] font-semibold text-navy-900 w-6 text-center">
                                {line.quantity}
                              </span>
                              <button
                                onClick={() => updateQty(line.id, line.quantity + 1)}
                                disabled={isLoading}
                                className="w-7 h-7 flex items-center justify-center text-navy-800/40 hover:text-navy-900 transition-colors disabled:opacity-40"
                                aria-label={lang === 'es' ? 'Aumentar' : 'Increase'}
                              >
                                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M6 1v10M1 6h10" /></svg>
                              </button>
                            </div>
                            <p className="text-[14px] font-bold text-navy-900">{lineTotal}</p>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(line.id)}
                          disabled={isLoading}
                          className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-navy-800/20 hover:text-navy-800/60 transition-colors disabled:opacity-40 mt-0.5"
                          aria-label={lang === 'es' ? 'Eliminar artículo' : 'Remove item'}
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M1 1l12 12M13 1L1 13" /></svg>
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {lines.length > 0 && (
              <div className="px-6 py-5 border-t border-stone-100 flex-shrink-0 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] text-navy-800/50">{lang === 'es' ? 'Subtotal' : 'Subtotal'}</p>
                  <p className="text-[17px] font-bold text-navy-900">
                    {formatPrice(subtotal, currencyCode)}
                  </p>
                </div>
                <p className="text-[11px] text-navy-800/30 text-center">{lang === 'es' ? 'Los impuestos y el envío se calculan en el checkout' : 'Taxes and shipping calculated at checkout'}</p>
                <button
                  onClick={goToCheckout}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 text-[14px] font-bold text-navy-900 py-4 rounded-2xl transition-all duration-150 hover:translate-y-[-1px] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#FFE030', boxShadow: '0 4px 0 #C4A800, 0 6px 14px rgba(0,0,0,0.08)' }}
                >
                  {isLoading ? (lang === 'es' ? 'Actualizando…' : 'Updating…') : (lang === 'es' ? 'Continuar al Pago' : 'Proceed to Checkout')}
                  <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
