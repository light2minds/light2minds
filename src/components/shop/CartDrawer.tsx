'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, subtotal, itemCount } = useCart()

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
            className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-[380px] bg-white shadow-2xl flex flex-col"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <h2 className="text-[15px] font-bold text-navy-900">Your Cart</h2>
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
                aria-label="Close cart"
              >
                <svg className="w-4 h-4 text-navy-900/50" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-navy-900/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </div>
                  <p className="text-[14px] font-semibold text-navy-900/40 mb-1">Your cart is empty</p>
                  <p className="text-[13px] text-navy-800/30">Choose a bundle to get started.</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4 border-b border-stone-100 last:border-b-0">
                      {/* Icon */}
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(91,196,248,0.10)' }}
                      >
                        <svg className="w-6 h-6" style={{ color: '#5BC4F8' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                      </div>

                      <div className="flex-1 min-w-0">
                        {item.tag && (
                          <p className="text-[10px] font-bold tracking-[0.08em] uppercase mb-0.5" style={{ color: '#5BC4F8' }}>
                            {item.tag}
                          </p>
                        )}
                        <p className="text-[13px] font-semibold text-navy-900 leading-snug mb-2">{item.name}</p>

                        <div className="flex items-center justify-between">
                          {/* Qty controls */}
                          <div className="flex items-center border border-stone-200 rounded-full overflow-hidden">
                            <button
                              onClick={() => updateQty(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-navy-800/40 hover:text-navy-900 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <svg className="w-3 h-3" viewBox="0 0 12 2" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M1 1h10" /></svg>
                            </button>
                            <span className="text-[13px] font-semibold text-navy-900 w-5 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQty(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-navy-800/40 hover:text-navy-900 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M6 1v10M1 6h10" /></svg>
                            </button>
                          </div>
                          <p className="text-[14px] font-bold text-navy-900">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-navy-800/20 hover:text-navy-800/60 transition-colors mt-1"
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M1 1l12 12M13 1L1 13" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-stone-100 flex-shrink-0 space-y-3">
                {/* Trust */}
                <div className="flex items-center justify-center gap-4 mb-1">
                  {['Instant Download', 'Secure Checkout', 'Satisfaction Guaranteed'].map(t => (
                    <span key={t} className="text-[10px] text-navy-800/35 font-medium flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-current" />
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between py-2">
                  <p className="text-[13px] text-navy-800/50">Subtotal</p>
                  <p className="text-[16px] font-bold text-navy-900">${subtotal.toFixed(2)}</p>
                </div>
                <p className="text-[11px] text-navy-800/30 text-center -mt-1">Taxes calculated at checkout</p>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-2 w-full text-[14px] font-bold text-navy-900 py-4 rounded-2xl transition-all duration-150 hover:translate-y-[-1px]"
                  style={{ backgroundColor: '#FFE030', boxShadow: '0 4px 0 #C4A800, 0 6px 14px rgba(0,0,0,0.08)' }}
                >
                  Proceed to Checkout
                  <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
