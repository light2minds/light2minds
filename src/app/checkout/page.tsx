'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'

const WARM_BG = '#F8F5EF'

const STEPS = ['Contact', 'Billing', 'Payment', 'Review']

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((label, i) => {
        const done    = i < step
        const current = i === step
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300"
                style={
                  done    ? { backgroundColor: '#2EBB50', color: '#fff' } :
                  current ? { backgroundColor: '#0D1B2E', color: '#fff' } :
                            { backgroundColor: '#e5e7eb', color: '#9ca3af' }
                }
              >
                {done
                  ? <svg className="w-3.5 h-3.5" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  : i + 1
                }
              </div>
              <span className={`text-[10px] font-semibold tracking-[0.04em] ${current ? 'text-navy-900' : done ? 'text-green-600' : 'text-navy-800/30'}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-[1.5px] mx-2 mb-4 rounded-full transition-all duration-300" style={{ backgroundColor: done ? '#2EBB50' : '#e5e7eb' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function TrustRow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 py-4">
      {[
        { icon: '🔒', label: '256-bit SSL Encryption' },
        { icon: '⚡', label: 'Instant Digital Delivery' },
        { icon: '↩', label: '7-Day Money-Back Guarantee' },
      ].map(t => (
        <span key={t.label} className="flex items-center gap-1.5 text-[11px] text-navy-800/40 font-medium">
          <span>{t.icon}</span>
          {t.label}
        </span>
      ))}
    </div>
  )
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCart()
  const [step, setStep] = useState(0)

  const [contact, setContact] = useState({ email: '', marketing: false })
  const [billing, setBilling] = useState({ firstName: '', lastName: '', address: '', city: '', state: '', zip: '', country: 'US' })
  const [card,    setCard]    = useState({ number: '', expiry: '', cvv: '', name: '' })

  const tax   = subtotal * 0.07
  const total = subtotal + tax

  const handleComplete = () => {
    clearCart()
    router.push('/checkout/success')
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: WARM_BG }}>
        <div className="text-center">
          <p className="text-[15px] text-navy-800/40 mb-4">Your cart is empty.</p>
          <a href="/shop" className="text-[13px] font-semibold text-navy-900 underline underline-offset-2">Back to Shop</a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: WARM_BG }}>

      {/* Header */}
      <div className="bg-white border-b border-stone-200/60">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <a href="/" className="font-black text-[1.1rem] tracking-tight">
            <span style={{ color: '#5BC4F8' }}>Light</span><span style={{ color: '#FFE030' }}>2</span><span style={{ color: '#2EBB50' }}>Minds</span>
          </a>
          <div className="flex items-center gap-1.5 text-[11.5px] text-navy-800/40">
            <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M7 1s5 2 5 6v4.5a.5.5 0 0 1-.5.5h-9A.5.5 0 0 1 2 11.5V7c0-4 5-6 5-6z" /></svg>
            Secure Checkout
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12">

          {/* ── Left: Steps ── */}
          <div>
            {/* Progress */}
            <div className="mb-10">
              <ProgressBar step={step} />
            </div>

            <AnimatePresence mode="wait">

              {/* Step 0: Contact */}
              {step === 0 && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-[1.3rem] font-bold text-navy-900 mb-6">Contact information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[12px] font-semibold text-navy-800/60 mb-1.5 tracking-[0.04em]">Email address *</label>
                      <input
                        type="email" required
                        value={contact.email}
                        onChange={e => setContact({ ...contact, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3.5 rounded-xl border border-stone-200 text-[14px] text-navy-900 placeholder-navy-800/25 outline-none focus:border-navy-400 transition-colors bg-white"
                      />
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={contact.marketing}
                        onChange={e => setContact({ ...contact, marketing: e.target.checked })}
                        className="mt-0.5 rounded"
                      />
                      <span className="text-[13px] text-navy-800/55 leading-relaxed">
                        Send me new resources, guides, and updates. No spam — unsubscribe anytime.
                      </span>
                    </label>
                  </div>
                  <TrustRow />
                  <button
                    onClick={() => contact.email && setStep(1)}
                    disabled={!contact.email}
                    className="mt-2 w-full flex items-center justify-center gap-2 text-[14px] font-bold py-4 rounded-xl transition-all duration-150 hover:translate-y-[-1px] disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#FFE030', color: '#0D1B2E', boxShadow: contact.email ? '0 4px 0 #C4A800' : 'none' }}
                  >
                    Continue to Billing
                    <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
                  </button>
                </motion.div>
              )}

              {/* Step 1: Billing */}
              {step === 1 && (
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-[1.3rem] font-bold text-navy-900 mb-6">Billing information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] font-semibold text-navy-800/60 mb-1.5">First name *</label>
                        <input type="text" value={billing.firstName} onChange={e => setBilling({ ...billing, firstName: e.target.value })}
                          placeholder="First name"
                          className="w-full px-4 py-3.5 rounded-xl border border-stone-200 text-[14px] text-navy-900 placeholder-navy-800/25 outline-none focus:border-navy-400 transition-colors bg-white" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-semibold text-navy-800/60 mb-1.5">Last name *</label>
                        <input type="text" value={billing.lastName} onChange={e => setBilling({ ...billing, lastName: e.target.value })}
                          placeholder="Last name"
                          className="w-full px-4 py-3.5 rounded-xl border border-stone-200 text-[14px] text-navy-900 placeholder-navy-800/25 outline-none focus:border-navy-400 transition-colors bg-white" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-navy-800/60 mb-1.5">Address *</label>
                      <input type="text" value={billing.address} onChange={e => setBilling({ ...billing, address: e.target.value })}
                        placeholder="Street address"
                        className="w-full px-4 py-3.5 rounded-xl border border-stone-200 text-[14px] text-navy-900 placeholder-navy-800/25 outline-none focus:border-navy-400 transition-colors bg-white" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <label className="block text-[12px] font-semibold text-navy-800/60 mb-1.5">City *</label>
                        <input type="text" value={billing.city} onChange={e => setBilling({ ...billing, city: e.target.value })}
                          placeholder="City"
                          className="w-full px-4 py-3.5 rounded-xl border border-stone-200 text-[14px] text-navy-900 placeholder-navy-800/25 outline-none focus:border-navy-400 transition-colors bg-white" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-semibold text-navy-800/60 mb-1.5">State</label>
                        <input type="text" value={billing.state} onChange={e => setBilling({ ...billing, state: e.target.value })}
                          placeholder="FL"
                          className="w-full px-4 py-3.5 rounded-xl border border-stone-200 text-[14px] text-navy-900 placeholder-navy-800/25 outline-none focus:border-navy-400 transition-colors bg-white" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-semibold text-navy-800/60 mb-1.5">ZIP *</label>
                        <input type="text" value={billing.zip} onChange={e => setBilling({ ...billing, zip: e.target.value })}
                          placeholder="33101"
                          className="w-full px-4 py-3.5 rounded-xl border border-stone-200 text-[14px] text-navy-900 placeholder-navy-800/25 outline-none focus:border-navy-400 transition-colors bg-white" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-navy-800/60 mb-1.5">Country</label>
                      <select value={billing.country} onChange={e => setBilling({ ...billing, country: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-stone-200 text-[14px] text-navy-900 outline-none focus:border-navy-400 transition-colors bg-white">
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="MX">Mexico</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button onClick={() => setStep(0)} className="px-6 py-3.5 rounded-xl text-[13px] font-semibold text-navy-800/50 hover:text-navy-900 border border-stone-200 transition-colors">
                      ← Back
                    </button>
                    <button
                      onClick={() => billing.firstName && billing.lastName && billing.zip ? setStep(2) : null}
                      className="flex-1 flex items-center justify-center gap-2 text-[14px] font-bold py-3.5 rounded-xl transition-all duration-150 hover:translate-y-[-1px]"
                      style={{ backgroundColor: '#FFE030', color: '#0D1B2E', boxShadow: '0 4px 0 #C4A800' }}
                    >
                      Continue to Payment
                      <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-[1.3rem] font-bold text-navy-900 mb-6">Payment</h2>

                  {/* Express options */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { label: 'Apple Pay', icon: '🍎' },
                      { label: 'Google Pay', icon: '🔵' },
                      { label: 'Shop Pay',   icon: '🛍' },
                    ].map(p => (
                      <button key={p.label} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-stone-200 text-[12.5px] font-semibold text-navy-900/60 hover:border-navy-300 hover:text-navy-900 transition-all bg-white">
                        <span>{p.icon}</span> {p.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-px bg-stone-200" />
                    <span className="text-[11px] font-semibold text-navy-800/35 tracking-[0.06em] uppercase">Or pay with card</span>
                    <div className="flex-1 h-px bg-stone-200" />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[12px] font-semibold text-navy-800/60 mb-1.5">Card number *</label>
                      <input type="text" value={card.number} onChange={e => setCard({ ...card, number: e.target.value })}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-4 py-3.5 rounded-xl border border-stone-200 text-[14px] text-navy-900 placeholder-navy-800/25 outline-none focus:border-navy-400 transition-colors bg-white font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] font-semibold text-navy-800/60 mb-1.5">Expiry date *</label>
                        <input type="text" value={card.expiry} onChange={e => setCard({ ...card, expiry: e.target.value })}
                          placeholder="MM / YY"
                          className="w-full px-4 py-3.5 rounded-xl border border-stone-200 text-[14px] text-navy-900 placeholder-navy-800/25 outline-none focus:border-navy-400 transition-colors bg-white font-mono" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-semibold text-navy-800/60 mb-1.5">CVV *</label>
                        <input type="text" value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })}
                          placeholder="123"
                          maxLength={4}
                          className="w-full px-4 py-3.5 rounded-xl border border-stone-200 text-[14px] text-navy-900 placeholder-navy-800/25 outline-none focus:border-navy-400 transition-colors bg-white font-mono" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-navy-800/60 mb-1.5">Name on card *</label>
                      <input type="text" value={card.name} onChange={e => setCard({ ...card, name: e.target.value })}
                        placeholder="Full name as on card"
                        className="w-full px-4 py-3.5 rounded-xl border border-stone-200 text-[14px] text-navy-900 placeholder-navy-800/25 outline-none focus:border-navy-400 transition-colors bg-white" />
                    </div>
                  </div>

                  <TrustRow />

                  <div className="flex gap-3 mt-2">
                    <button onClick={() => setStep(1)} className="px-6 py-3.5 rounded-xl text-[13px] font-semibold text-navy-800/50 hover:text-navy-900 border border-stone-200 transition-colors">
                      ← Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 flex items-center justify-center gap-2 text-[14px] font-bold py-3.5 rounded-xl transition-all duration-150 hover:translate-y-[-1px]"
                      style={{ backgroundColor: '#FFE030', color: '#0D1B2E', boxShadow: '0 4px 0 #C4A800' }}
                    >
                      Review Order
                      <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-[1.3rem] font-bold text-navy-900 mb-6">Review your order</h2>

                  {/* Summary recap */}
                  <div className="bg-white rounded-2xl border border-stone-200/70 p-6 mb-6">
                    <div className="space-y-3 mb-5">
                      {items.map(item => (
                        <div key={item.id} className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(91,196,248,0.10)' }}>
                              <svg className="w-4 h-4" style={{ color: '#5BC4F8' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                              </svg>
                            </div>
                            <div className="min-w-0">
                              <p className="text-[13px] font-semibold text-navy-900 truncate">{item.name}</p>
                              <p className="text-[11px] text-navy-800/40">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="text-[13px] font-bold text-navy-900 flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-stone-100 pt-4 space-y-2">
                      <div className="flex justify-between text-[13px]">
                        <span className="text-navy-800/50">Subtotal</span>
                        <span className="font-semibold text-navy-900">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-[13px]">
                        <span className="text-navy-800/50">Estimated tax</span>
                        <span className="font-semibold text-navy-900">${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-[15px] font-bold text-navy-900 pt-2 border-t border-stone-100">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact recap */}
                  <div className="bg-white rounded-2xl border border-stone-200/70 p-5 mb-6 space-y-2">
                    <p className="text-[12px] font-semibold text-navy-800/40 uppercase tracking-[0.08em] mb-3">Order details</p>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-navy-800/50">Email</span>
                      <span className="font-medium text-navy-900">{contact.email}</span>
                    </div>
                    {billing.firstName && (
                      <div className="flex justify-between text-[13px]">
                        <span className="text-navy-800/50">Name</span>
                        <span className="font-medium text-navy-900">{billing.firstName} {billing.lastName}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[13px]">
                      <span className="text-navy-800/50">Delivery</span>
                      <span className="font-medium text-navy-900">Instant digital download</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="px-6 py-3.5 rounded-xl text-[13px] font-semibold text-navy-800/50 hover:text-navy-900 border border-stone-200 transition-colors">
                      ← Back
                    </button>
                    <button
                      onClick={handleComplete}
                      className="flex-1 flex items-center justify-center gap-2 text-[15px] font-bold py-4 rounded-xl transition-all duration-150 hover:translate-y-[-1px]"
                      style={{ backgroundColor: '#0D1B2E', color: '#FFE030', boxShadow: '0 4px 0 rgba(0,0,0,0.4)' }}
                    >
                      Complete Purchase — ${total.toFixed(2)}
                      <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
                    </button>
                  </div>
                  <p className="text-[11px] text-navy-800/30 text-center mt-3">
                    By completing your purchase you agree to our terms of service.
                  </p>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* ── Right: Order Summary (sticky) ── */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="bg-white rounded-2xl border border-stone-200/70 overflow-hidden">
                <div className="px-6 py-5 border-b border-stone-100">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-navy-800/40">Order Summary</p>
                </div>
                <div className="px-6 py-5">
                  <div className="space-y-3 mb-5">
                    {items.map(item => (
                      <div key={item.id} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(91,196,248,0.08)' }}>
                          <svg className="w-5 h-5" style={{ color: '#5BC4F8' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          {item.tag && <p className="text-[10px] font-bold uppercase tracking-[0.06em] mb-0.5" style={{ color: '#5BC4F8' }}>{item.tag}</p>}
                          <p className="text-[12.5px] font-semibold text-navy-900 leading-snug">{item.name}</p>
                          <p className="text-[11px] text-navy-800/35">Qty {item.quantity}</p>
                        </div>
                        <p className="text-[13px] font-bold text-navy-900 flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-stone-100 pt-4 space-y-2">
                    <div className="flex justify-between text-[13px]">
                      <span className="text-navy-800/45">Subtotal</span>
                      <span className="font-medium text-navy-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-navy-800/45">Tax (est.)</span>
                      <span className="font-medium text-navy-900">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[15px] font-bold text-navy-900 pt-2 border-t border-stone-100">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Trust */}
                <div className="px-6 pb-5 space-y-2.5">
                  {[
                    'Instant digital delivery after purchase',
                    'Secure 256-bit SSL encryption',
                    '7-day satisfaction guarantee',
                  ].map(t => (
                    <div key={t} className="flex items-center gap-2 text-[11.5px] text-navy-800/40">
                      <svg className="w-3.5 h-3.5 flex-shrink-0 text-green-500" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5L4.5 8.5L11 1" stroke="#2EBB50" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
