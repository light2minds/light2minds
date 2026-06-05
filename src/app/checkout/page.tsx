'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'

/* ── Brand logos ───────────────────────────────────────────────────────────── */

function ApplePayMark() {
  return (
    <svg viewBox="0 0 50 20" fill="white" className="h-5 w-auto">
      <path d="M9.87 3.56c.5-.6.84-1.42.75-2.25-.73.04-1.62.49-2.14 1.09-.47.52-.88 1.38-.77 2.19.81.06 1.64-.39 2.16-.03zM10.6 4.7c-1.19-.07-2.2.67-2.77.67-.57 0-1.44-.64-2.38-.62C4.18 4.77 3.01 5.45 2.37 6.54c-1.3 2.24-.34 5.55.92 7.37.61.9 1.35 1.88 2.32 1.85.92-.04 1.28-.6 2.4-.6 1.11 0 1.43.6 2.4.58 1 0 1.63-.9 2.24-1.8.69-1.01.98-2 1-2.04-.02 0-1.91-.73-1.93-2.9-.02-1.82 1.48-2.68 1.55-2.73-.85-1.25-2.17-1.38-2.67-1.42v-.15z" />
      <path d="M20.3 2.55v13.3h2.06v-4.56h2.85c2.6 0 4.43-1.79 4.43-4.38 0-2.59-1.79-4.36-4.36-4.36H20.3zm2.06 1.74h2.37c1.78 0 2.8.95 2.8 2.63 0 1.68-1.02 2.64-2.81 2.64h-2.36V4.29zM34.98 15.98c1.28 0 2.47-.65 3.01-1.67h.04v1.57h1.9V9.54c0-1.9-1.52-3.13-3.86-3.13-2.17 0-3.77 1.25-3.83 2.97h1.85c.15-.82.9-1.36 1.93-1.36 1.25 0 1.95.58 1.95 1.64v.72l-2.55.15c-2.37.14-3.65 1.11-3.65 2.79 0 1.7 1.32 2.66 3.21 2.66zm.55-1.55c-1.09 0-1.79-.52-1.79-1.32 0-.83.67-1.31 1.96-1.39l2.27-.14v.73c0 1.23-1.04 2.12-2.44 2.12zM42.5 19.6c2 0 2.95-.77 3.77-3.08L50 6.54h-2.1l-2.3 7.44h-.04l-2.3-7.44H41.1l3.54 9.8-.19.6c-.32.99-.84 1.37-1.77 1.37-.16 0-.48-.02-.61-.04v1.61c.12.04.46.12.43.72z" />
    </svg>
  )
}

function GooglePayMark() {
  return (
    <svg viewBox="0 0 60 24" className="h-5 w-auto">
      <path d="M28.8 12.2c0 3.4-2.6 5.8-5.8 5.8s-5.8-2.4-5.8-5.8 2.6-5.8 5.8-5.8 5.8 2.5 5.8 5.8zm-2.5 0c0-2.1-1.5-3.6-3.3-3.6S19.7 10 19.7 12.2s1.5 3.6 3.3 3.6 3.3-1.5 3.3-3.6z" fill="#EA4335"/>
      <path d="M40.5 12.2c0 3.4-2.6 5.8-5.8 5.8s-5.8-2.4-5.8-5.8 2.6-5.8 5.8-5.8 5.8 2.5 5.8 5.8zm-2.5 0c0-2.1-1.5-3.6-3.3-3.6s-3.3 1.5-3.3 3.6 1.5 3.6 3.3 3.6 3.3-1.5 3.3-3.6z" fill="#FBBC05"/>
      <path d="M51.5 6.7v10.6c0 4.4-2.6 6.2-5.6 6.2-2.9 0-4.6-1.9-5.3-3.5l2.2-.9c.4 1 1.4 2.1 3 2.1 2 0 3.2-1.2 3.2-3.5v-.9h-.1c-.6.7-1.7 1.3-3.1 1.3-2.9 0-5.6-2.5-5.6-5.8s2.7-5.9 5.6-5.9c1.4 0 2.5.6 3.1 1.3h.1v-.9h2.5v-.1zm-2.3 5.6c0-2.1-1.4-3.6-3.1-3.6-1.8 0-3.3 1.5-3.3 3.6s1.5 3.6 3.3 3.6c1.7 0 3.1-1.5 3.1-3.6z" fill="#4285F4"/>
      <path d="M56 17.6h-2.5V1.2H56v16.4z" fill="#34A853"/>
      <path d="M9.7 10.7v2.4h5.8c-.2 1.4-.6 2.4-1.3 3.1-.8.8-2.1 1.7-4.5 1.7-3.6 0-6.4-2.9-6.4-6.5s2.8-6.5 6.4-6.5c1.9 0 3.3.8 4.4 1.8L15.7 5c-1.4-1.4-3.3-2.4-6-2.4-4.8 0-8.9 3.9-8.9 8.8s4.1 8.8 8.9 8.8c2.6 0 4.6-.9 6.1-2.4 1.6-1.6 2.1-3.8 2.1-5.6 0-.6 0-1.1-.1-1.5H9.7z" fill="#4285F4"/>
    </svg>
  )
}

function ShopPayMark() {
  return (
    <svg viewBox="0 0 80 24" className="h-4 w-auto" fill="white">
      <path d="M9.13 5.5c-2.1 0-3.76 1.65-3.76 3.7 0 2.04 1.66 3.7 3.76 3.7s3.76-1.66 3.76-3.7c0-2.05-1.66-3.7-3.76-3.7zm0 5.9c-1.22 0-2.2-.98-2.2-2.2 0-1.22.98-2.2 2.2-2.2s2.2.98 2.2 2.2c0 1.22-.98 2.2-2.2 2.2z"/>
      <path d="M17.8 5.6h-1.56v7.08h1.56V9.52c0-1.16.7-1.88 1.73-1.88.95 0 1.5.62 1.5 1.7v3.34h1.56V9.1c0-1.9-1.08-3.07-2.78-3.07-.84 0-1.56.38-2.01.97V5.6z"/>
      <path d="M26.42 5.5c-2.1 0-3.56 1.55-3.56 3.7 0 2.13 1.47 3.7 3.6 3.7 1.26 0 2.3-.52 2.94-1.4v1.18h1.54V5.6h-1.54v1.18c-.64-.88-1.68-1.4-2.94-1.28h-.04zm.22 5.9c-1.22 0-2.2-.98-2.2-2.2 0-1.22.98-2.2 2.2-2.2s2.2.98 2.2 2.2c0 1.22-.98 2.2-2.2 2.2z"/>
      <path d="M33.1 14.48c.74 1.74 2.2 2.72 4.12 2.72 2.5 0 4.2-1.62 4.2-4.1V5.6h-1.56v1.22c-.62-.88-1.64-1.4-2.88-1.4-2.12 0-3.6 1.6-3.6 3.76 0 2.12 1.48 3.7 3.6 3.7 1.24 0 2.26-.52 2.88-1.4v.66c0 1.52-.9 2.48-2.6 2.48-1.06 0-1.9-.5-2.34-1.36l-1.42.72zm4.12-3.08c-1.22 0-2.1-.92-2.1-2.14s.88-2.14 2.1-2.14 2.1.92 2.1 2.14-.88 2.14-2.1 2.14z"/>
      <path d="M46.96 5.5c-2.12 0-3.7 1.58-3.7 3.7s1.58 3.7 3.7 3.7 3.7-1.58 3.7-3.7-1.58-3.7-3.7-3.7zm0 5.9c-1.22 0-2.2-.98-2.2-2.2 0-1.22.98-2.2 2.2-2.2s2.2.98 2.2 2.2c0 1.22-.98 2.2-2.2 2.2z"/>
      <path d="M55.82 5.6L53.7 11.1l-2.12-5.5h-1.66l3.04 7.38-1.6 3.92h1.6l5-11.3h-1.14z"/>
      <path d="M63.42 5.5c-2.12 0-3.7 1.58-3.7 3.7s1.58 3.7 3.7 3.7 3.7-1.58 3.7-3.7-1.58-3.7-3.7-3.7zm0 5.9c-1.22 0-2.2-.98-2.2-2.2 0-1.22.98-2.2 2.2-2.2s2.2.98 2.2 2.2c0 1.22-.98 2.2-2.2 2.2z"/>
      <path d="M71.54 5.5c-1.28 0-2.34.54-3 1.44V2.4h-1.56v10.28h1.54v-1.22c.66.9 1.72 1.44 3.02 1.44 2.12 0 3.6-1.58 3.6-3.7s-1.48-3.7-3.6-3.7zm-.22 5.9c-1.22 0-2.2-.98-2.2-2.2 0-1.22.98-2.2 2.2-2.2s2.2.98 2.2 2.2c0 1.22-.98 2.2-2.2 2.2z"/>
    </svg>
  )
}

/* ── Input component ───────────────────────────────────────────────────────── */
function Field({
  label, id, type = 'text', placeholder, value, onChange, required, autoComplete, half
}: {
  label: string; id: string; type?: string; placeholder?: string
  value: string; onChange: (v: string) => void
  required?: boolean; autoComplete?: string; half?: boolean
}) {
  return (
    <div className={half ? '' : 'col-span-2'}>
      <label htmlFor={id} className="block text-[12px] font-semibold text-navy-800/55 mb-1.5 tracking-[0.03em]">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        id={id} type={type} autoComplete={autoComplete}
        value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} required={required}
        className="w-full px-3.5 py-3 rounded-xl border border-stone-200 text-[14px] text-navy-900 placeholder-navy-800/25 bg-white outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all"
      />
    </div>
  )
}

/* ── Main ──────────────────────────────────────────────────────────────────── */
export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCart()

  const [summaryOpen, setSummaryOpen] = useState(false)
  const [form, setForm] = useState({
    email: '', marketing: false,
    firstName: '', lastName: '',
    address: '', apt: '', city: '', state: '', zip: '', country: 'United States',
    cardNumber: '', expiry: '', cvv: '', cardName: '',
    sameAsShipping: true,
  })
  const f = (key: keyof typeof form) => (v: string) => setForm(s => ({ ...s, [key]: v }))

  const tax   = subtotal * 0.07
  const total = subtotal + tax

  const canSubmit = form.email && form.firstName && form.lastName && form.address && form.zip && form.cardNumber && form.expiry && form.cvv

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault()
    clearCart()
    router.push('/checkout/success')
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <p className="text-[15px] text-navy-800/40 mb-4">Your cart is empty.</p>
          <Link href="/shop" className="text-[13px] font-semibold text-navy-900 underline underline-offset-2">Back to Shop</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-stone-50">

      {/* ── Header ── */}
      <header className="bg-white border-b border-stone-200/70">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 h-[60px] flex items-center justify-between">
          <Link href="/" className="font-black text-[1.1rem] tracking-tight select-none">
            <span style={{ color: '#5BC4F8' }}>Light</span>
            <span style={{ color: '#FFE030' }}>2</span>
            <span style={{ color: '#2EBB50' }}>Minds</span>
          </Link>
          <div className="flex items-center gap-1.5 text-[12px] text-navy-800/40 font-medium">
            <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <rect x="2" y="6" width="10" height="7" rx="1" />
              <path d="M4.5 6V4a2.5 2.5 0 0 1 5 0v2" />
            </svg>
            Secure checkout
          </div>
        </div>
      </header>

      {/* ── Mobile order summary toggle ── */}
      <button
        className="lg:hidden w-full flex items-center justify-between px-5 py-4 bg-white border-b border-stone-200 text-[13px] font-semibold text-navy-900"
        onClick={() => setSummaryOpen(o => !o)}
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 text-navy-800/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {summaryOpen ? 'Hide' : 'Show'} order summary
          <svg className={`w-3.5 h-3.5 text-navy-800/40 transition-transform ${summaryOpen ? 'rotate-180' : ''}`} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M2 5l5 5 5-5" /></svg>
        </span>
        <span className="font-bold">${total.toFixed(2)}</span>
      </button>
      <AnimatePresence>
        {summaryOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden"
          >
            <MobileSummary items={items} subtotal={subtotal} tax={tax} total={total} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main grid ── */}
      <div className="max-w-5xl mx-auto px-5 lg:px-8 py-8 lg:grid lg:grid-cols-[1fr_380px] lg:gap-12">

        {/* ── LEFT: Form ── */}
        <form onSubmit={handlePay} className="space-y-8">

          {/* Express checkout */}
          <div>
            <p className="text-[11px] font-semibold text-center uppercase tracking-[0.1em] text-navy-800/35 mb-4">Express checkout</p>
            <div className="grid grid-cols-3 gap-3">

              {/* Shop Pay */}
              <button
                type="button"
                className="h-11 rounded-xl flex items-center justify-center px-3 transition-all hover:brightness-90 active:scale-[0.98]"
                style={{ backgroundColor: '#5A31F4' }}
              >
                <ShopPayMark />
              </button>

              {/* Apple Pay */}
              <button
                type="button"
                className="h-11 rounded-xl flex items-center justify-center px-3 transition-all hover:bg-neutral-800 active:scale-[0.98]"
                style={{ backgroundColor: '#000000' }}
              >
                <ApplePayMark />
              </button>

              {/* Google Pay */}
              <button
                type="button"
                className="h-11 rounded-xl flex items-center justify-center px-3 border border-stone-200 bg-white transition-all hover:bg-stone-50 active:scale-[0.98]"
              >
                <GooglePayMark />
              </button>

            </div>

            {/* OR divider */}
            <div className="flex items-center gap-3 mt-5">
              <div className="flex-1 h-px bg-stone-200" />
              <span className="text-[11px] font-semibold text-navy-800/30 tracking-[0.08em] uppercase">Or</span>
              <div className="flex-1 h-px bg-stone-200" />
            </div>
          </div>

          {/* Contact */}
          <section className="bg-white rounded-2xl border border-stone-200/70 overflow-hidden">
            <div className="px-5 py-4 border-b border-stone-100">
              <h2 className="text-[13px] font-bold text-navy-900 tracking-[0.02em]">Contact</h2>
            </div>
            <div className="px-5 py-5 space-y-3">
              <Field label="Email" id="email" type="email" placeholder="you@example.com" value={form.email} onChange={f('email')} required autoComplete="email" />
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.marketing}
                  onChange={e => setForm(s => ({ ...s, marketing: e.target.checked }))}
                  className="mt-0.5 w-4 h-4 rounded border-stone-300 text-sky-500 focus:ring-sky-400/30"
                />
                <span className="text-[12.5px] text-navy-800/50 leading-relaxed">
                  Email me with new resources and updates
                </span>
              </label>
            </div>
          </section>

          {/* Delivery */}
          <section className="bg-white rounded-2xl border border-stone-200/70 overflow-hidden">
            <div className="px-5 py-4 border-b border-stone-100">
              <h2 className="text-[13px] font-bold text-navy-900 tracking-[0.02em]">Delivery</h2>
            </div>
            <div className="px-5 py-5">
              <div className="grid grid-cols-2 gap-3">
                <Field label="First name" id="firstName" placeholder="Jane" value={form.firstName} onChange={f('firstName')} required autoComplete="given-name" half />
                <Field label="Last name"  id="lastName"  placeholder="Smith" value={form.lastName}  onChange={f('lastName')}  required autoComplete="family-name" half />
                <Field label="Address"    id="address"   placeholder="123 Main St" value={form.address} onChange={f('address')} required autoComplete="street-address" />
                <Field label="Apt, suite, etc. (optional)" id="apt" placeholder="Apt 4B" value={form.apt} onChange={f('apt')} autoComplete="address-line2" />
                <Field label="City"  id="city"  placeholder="Miami" value={form.city}  onChange={f('city')}  required autoComplete="address-level2" half />
                <Field label="State" id="state" placeholder="FL"    value={form.state} onChange={f('state')} autoComplete="address-level1" half />
                <div className="col-span-2 grid grid-cols-2 gap-3">
                  <Field label="ZIP code" id="zip" placeholder="33101" value={form.zip} onChange={f('zip')} required autoComplete="postal-code" half />
                  <div>
                    <label htmlFor="country" className="block text-[12px] font-semibold text-navy-800/55 mb-1.5 tracking-[0.03em]">Country</label>
                    <select
                      id="country"
                      value={form.country}
                      onChange={e => setForm(s => ({ ...s, country: e.target.value }))}
                      autoComplete="country-name"
                      className="w-full px-3.5 py-3 rounded-xl border border-stone-200 text-[14px] text-navy-900 bg-white outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="bg-white rounded-2xl border border-stone-200/70 overflow-hidden">
            <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
              <h2 className="text-[13px] font-bold text-navy-900 tracking-[0.02em]">Payment</h2>
              <div className="flex items-center gap-1 text-[11px] text-navy-800/35">
                <svg className="w-3 h-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="2" y="6" width="10" height="7" rx="1" />
                  <path d="M4.5 6V4a2.5 2.5 0 0 1 5 0v2" />
                </svg>
                Secure & encrypted
              </div>
            </div>
            <div className="px-5 py-5">
              <div className="grid grid-cols-2 gap-3">
                {/* Card number — full width */}
                <div className="col-span-2">
                  <label htmlFor="cardNumber" className="block text-[12px] font-semibold text-navy-800/55 mb-1.5 tracking-[0.03em]">Card number<span className="text-red-400 ml-0.5">*</span></label>
                  <div className="relative">
                    <input
                      id="cardNumber" type="text" inputMode="numeric" autoComplete="cc-number"
                      value={form.cardNumber} onChange={e => setForm(s => ({ ...s, cardNumber: e.target.value }))}
                      placeholder="1234 5678 9012 3456" maxLength={19} required
                      className="w-full pl-3.5 pr-28 py-3 rounded-xl border border-stone-200 text-[14px] text-navy-900 placeholder-navy-800/25 bg-white outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all font-mono"
                    />
                    {/* Card brand icons */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      {['VISA', 'MC', 'AMEX', 'DISC'].map(b => (
                        <span key={b} className="text-[8px] font-bold text-navy-800/30 border border-stone-200 rounded px-1 py-0.5 leading-none">{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <Field label="Expiration date" id="expiry" placeholder="MM / YY" value={form.expiry} onChange={f('expiry')} required autoComplete="cc-exp" half />
                <Field label="Security code" id="cvv" type="text" placeholder="CVV" value={form.cvv} onChange={f('cvv')} required autoComplete="cc-csc" half />
                <Field label="Name on card" id="cardName" placeholder="Jane Smith" value={form.cardName} onChange={f('cardName')} autoComplete="cc-name" />
              </div>

              {/* Billing address */}
              <div className="mt-4 pt-4 border-t border-stone-100">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.sameAsShipping}
                    onChange={e => setForm(s => ({ ...s, sameAsShipping: e.target.checked }))}
                    className="w-4 h-4 rounded border-stone-300 text-sky-500"
                  />
                  <span className="text-[13px] text-navy-800/65 font-medium">Billing address same as delivery</span>
                </label>
              </div>
            </div>
          </section>

          {/* Pay button */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full flex items-center justify-center gap-2.5 text-[15px] font-bold py-4 rounded-2xl transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:translate-y-[-1px]"
            style={{
              backgroundColor: canSubmit ? '#0D1B2E' : '#9ca3af',
              color: '#FFE030',
              boxShadow: canSubmit ? '0 4px 0 rgba(0,0,0,0.4), 0 8px 20px rgba(0,0,0,0.12)' : 'none',
            }}
          >
            <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <rect x="2" y="6" width="10" height="7" rx="1" />
              <path d="M4.5 6V4a2.5 2.5 0 0 1 5 0v2" />
            </svg>
            Pay now — ${total.toFixed(2)}
          </button>

          {/* Bottom trust */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 pb-4">
            {[
              { icon: '⚡', label: 'Instant digital delivery' },
              { icon: '↩', label: '7-day money-back guarantee' },
              { icon: '🔒', label: 'SSL encrypted' },
            ].map(t => (
              <span key={t.label} className="flex items-center gap-1.5 text-[11px] text-navy-800/35 font-medium">
                {t.icon} {t.label}
              </span>
            ))}
          </div>
        </form>

        {/* ── RIGHT: Order Summary (desktop sticky) ── */}
        <aside className="hidden lg:block">
          <div className="sticky top-8">
            <DesktopSummary items={items} subtotal={subtotal} tax={tax} total={total} />
          </div>
        </aside>

      </div>
    </main>
  )
}

/* ── Order Summary helpers ─────────────────────────────────────────────────── */

type SummaryProps = {
  items: import('@/context/CartContext').CartItem[]
  subtotal: number; tax: number; total: number
}

function SummaryItems({ items }: Pick<SummaryProps, 'items'>) {
  return (
    <div className="space-y-3">
      {items.map(item => (
        <div key={item.id} className="flex items-start gap-3">
          <div className="relative flex-shrink-0">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center border border-stone-200/60"
              style={{ backgroundColor: 'rgba(91,196,248,0.08)' }}
            >
              <svg className="w-5 h-5" style={{ color: '#5BC4F8' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            {item.quantity > 1 && (
              <span
                className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{ backgroundColor: '#5BC4F8', width: '18px', height: '18px', fontSize: '10px' }}
              >
                {item.quantity}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12.5px] font-semibold text-navy-900 leading-snug">{item.name}</p>
            {item.tier && <p className="text-[11px] text-navy-800/35">{item.tier}</p>}
          </div>
          <p className="text-[13px] font-bold text-navy-900 flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}
    </div>
  )
}

function SummaryTotals({ subtotal, tax, total }: Omit<SummaryProps, 'items'>) {
  return (
    <div className="border-t border-stone-200/70 pt-4 space-y-2.5">
      <div className="flex justify-between text-[13px]">
        <span className="text-navy-800/50">Subtotal</span>
        <span className="font-medium text-navy-900">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-[13px]">
        <span className="text-navy-800/50">Taxes</span>
        <span className="font-medium text-navy-900">${tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-[16px] font-bold text-navy-900 pt-2 border-t border-stone-200/70">
        <span>Total</span>
        <span>${total.toFixed(2)} <span className="text-[11px] font-normal text-navy-800/35">USD</span></span>
      </div>
    </div>
  )
}

function DesktopSummary({ items, subtotal, tax, total }: SummaryProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200/70 overflow-hidden">
      <div className="px-6 py-5 border-b border-stone-100">
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-navy-800/40">Order Summary</p>
      </div>
      <div className="px-6 py-5 space-y-5">
        <SummaryItems items={items} />
        <SummaryTotals subtotal={subtotal} tax={tax} total={total} />
      </div>
      {/* Trust */}
      <div className="px-6 pb-5 space-y-2">
        {['Instant digital delivery after purchase', 'Secure 256-bit SSL encryption', '7-day satisfaction guarantee'].map(t => (
          <div key={t} className="flex items-center gap-2 text-[11.5px] text-navy-800/38">
            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 12 10" fill="none">
              <path d="M1 5L4.5 8.5L11 1" stroke="#2EBB50" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t}
          </div>
        ))}
      </div>
    </div>
  )
}

function MobileSummary({ items, subtotal, tax, total }: SummaryProps) {
  return (
    <div className="bg-white border-b border-stone-200 px-5 py-5 space-y-4">
      <SummaryItems items={items} />
      <SummaryTotals subtotal={subtotal} tax={tax} total={total} />
    </div>
  )
}
