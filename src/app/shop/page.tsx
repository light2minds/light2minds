'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '@/context/CartContext'

const WARM_BG = '#F8F5EF'

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
})

type Audience = 'families' | 'professionals'
type Tier = 'starter' | 'complete' | 'all-access'

type Bundle = {
  id: string
  audience: Audience
  tier: Tier
  tierLabel: string
  name: string
  tagline: string
  price: number
  includes: string[]
  badge?: string
  color: string
  tag: string
}

const BUNDLES: Bundle[] = [
  {
    id: 'fam-starter',
    audience: 'families',
    tier: 'starter',
    tierLabel: 'Starter',
    name: 'Diagnosis Starter Bundle',
    tagline: 'Everything you need in the first weeks after a diagnosis.',
    price: 29,
    color: '#5BC4F8',
    tag: 'For Families',
    includes: [
      'First 90 Days After Diagnosis Guide (20 pages)',
      'ABA Terms for Parents Glossary (60+ terms)',
      'Calm Corner Printables Set (12 pages)',
    ],
  },
  {
    id: 'fam-complete',
    audience: 'families',
    tier: 'complete',
    tierLabel: 'Complete',
    name: 'School & IEP Success Bundle',
    tagline: 'Walk into every IEP meeting prepared and confident.',
    price: 49,
    color: '#2EBB50',
    tag: 'For Families',
    badge: 'Most Popular',
    includes: [
      'Everything in the Starter Bundle',
      'IEP Meeting Organizer (40+ pages)',
      'Visual Daily Schedule Templates (28 pages)',
      'Parent Rights Reference Card',
    ],
  },
  {
    id: 'fam-all',
    audience: 'families',
    tier: 'all-access',
    tierLabel: 'All-Access',
    name: 'Complete Family Toolkit',
    tagline: 'The full resource library — for every stage of the journey.',
    price: 89,
    color: '#FFE030',
    tag: 'For Families',
    badge: 'Best Value',
    includes: [
      'Everything in both bundles above',
      'Behavior Charts & Token Board Bundle (16 designs)',
      'Communication Card Starter Pack (120 cards)',
      'Family Funding Guide (20 pages)',
      'Provider Interview Question Guide',
    ],
  },
  {
    id: 'pro-starter',
    audience: 'professionals',
    tier: 'starter',
    tierLabel: 'Starter',
    name: 'RBT Exam Prep Bundle',
    tagline: 'Everything you need to pass the RBT exam on the first attempt.',
    price: 39,
    color: '#5BC4F8',
    tag: 'For Professionals',
    badge: 'Most Popular',
    includes: [
      'RBT Task List Study Guide (BACB-aligned)',
      'Ethics Code Quick Reference Sheet',
      'Key ABA Terms Flashcard Set (200+ terms)',
    ],
  },
  {
    id: 'pro-complete',
    audience: 'professionals',
    tier: 'complete',
    tierLabel: 'Complete',
    name: 'ABA Practice Toolkit',
    tagline: 'Clinical forms and documentation systems for daily practice.',
    price: 59,
    color: '#2EBB50',
    tag: 'For Professionals',
    includes: [
      'Everything in the Starter Bundle',
      'ABA Data Collection Forms Pack (15 forms)',
      'Session Documentation Templates',
      'Preference Assessment & Reinforcer Menu',
    ],
  },
  {
    id: 'pro-all',
    audience: 'professionals',
    tier: 'all-access',
    tierLabel: 'All-Access',
    name: 'Complete Professional Bundle',
    tagline: 'From RBT exam to career advancement — the complete toolkit.',
    price: 89,
    color: '#FFE030',
    tag: 'For Professionals',
    badge: 'Best Value',
    includes: [
      'Everything in both bundles above',
      'Career Pathway Map (RBT → BCaBA → BCBA)',
      'Resume & Interview Guide',
      'Behavior Intervention Plan Template',
      'ABA Center Startup Checklist',
    ],
  },
]

const SINGLES = [
  { id: 'dp-schedule', name: 'Visual Schedule Printable Pack', desc: 'Morning, school, and evening schedule cards — print, laminate, and use the same day.', price: 12, pages: '28 pages' },
  { id: 'dp-iep', name: 'IEP Meeting Organizer', desc: 'Complete printable IEP binder system — meeting tracker, rights checklist, goal log, and more.', price: 19, pages: '42 pages' },
  { id: 'dp-behavior', name: 'Behavior Chart & Token Board Bundle', desc: 'Ten editable behavior charts + 6 token board designs for home and classroom.', price: 12, pages: '16 designs' },
  { id: 'dp-funding', name: 'Family Funding Guide', desc: 'Step-by-step guide to financial resources and funding programs for families.', price: 19, pages: '20 pages' },
]

const TRUST = [
  { icon: '⚡', title: 'Instant Download', body: 'Access your files immediately after purchase — no waiting, no shipping.' },
  { icon: '🔒', title: 'Secure Checkout', body: '256-bit SSL encryption. Your payment information is always protected.' },
  { icon: '✓', title: 'BCBA-Reviewed Content', body: 'Every resource is developed and reviewed by credentialed behavioral health professionals.' },
  { icon: '↩', title: 'Satisfaction Guaranteed', body: 'Not satisfied? Contact us within 7 days for a full refund — no questions asked.' },
]

function TierBadge({ tier }: { tier: Tier }) {
  if (tier === 'starter')    return <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full border border-stone-300 text-navy-800/45">Starter</span>
  if (tier === 'complete')   return <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full bg-navy-900 text-white">Complete</span>
  return <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full text-navy-900" style={{ backgroundColor: '#FFE030' }}>All-Access</span>
}

export default function ShopPage() {
  const [audience, setAudience] = useState<Audience>('families')
  const { addItem, openCart } = useCart()

  const bundles = BUNDLES.filter(b => b.audience === audience)

  const handleAdd = (b: Bundle) => {
    addItem({ id: b.id, name: b.name, price: b.price, tag: b.tag, tier: b.tierLabel })
    openCart()
  }

  const handleAddSingle = (s: typeof SINGLES[0]) => {
    addItem({ id: s.id, name: s.name, price: s.price, tag: 'Individual Download' })
    openCart()
  }

  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section style={{ backgroundColor: WARM_BG }} className="pt-28 pb-16 lg:pt-36 lg:pb-20 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...up()} className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-6 h-px" style={{ backgroundColor: '#FFE030' }} />
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/45">The Light2Minds Shop</p>
            </div>
            <h1 className="text-[clamp(2.2rem,5vw,3.8rem)] font-bold text-navy-900 leading-[1.04] tracking-[-0.03em] mb-5">
              Curated kits for families<br />and professionals.
            </h1>
            <p className="text-[16px] text-navy-800/55 leading-relaxed max-w-xl mb-8">
              Every resource developed by behavioral health professionals — practical, evidence-based, and ready to use the moment you download.
            </p>

            {/* Trust strip */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Instant Download', color: '#5BC4F8' },
                { label: 'BCBA-Reviewed', color: '#2EBB50' },
                { label: 'Satisfaction Guaranteed', color: '#FFE030' },
                { label: 'Secure Checkout', color: '#5BC4F8' },
              ].map(b => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: b.color + '15', color: b.color === '#FFE030' ? '#9A7A00' : b.color }}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: b.color === '#FFE030' ? '#C4A800' : b.color }} />
                  {b.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Audience Toggle ── */}
      <div className="sticky top-[66px] z-30 bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex">
            {(['families', 'professionals'] as Audience[]).map(a => {
              const active = audience === a
              const label = a === 'families' ? 'For Families' : 'For Professionals'
              const color = a === 'families' ? '#5BC4F8' : '#2EBB50'
              return (
                <button
                  key={a}
                  onClick={() => setAudience(a)}
                  className="flex-1 relative py-4 text-[13px] font-semibold transition-colors duration-200"
                  style={{ color: active ? color : undefined }}
                >
                  <span className={active ? '' : 'text-navy-500/50 hover:text-navy-800'}>{label}</span>
                  {active && (
                    <motion.span
                      layoutId="audience-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Bundles ── */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <motion.div {...up()} className="mb-10">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-3">
              {audience === 'families' ? 'Family Resource Bundles' : 'Professional Resource Bundles'}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
                Choose the right bundle<br />for where you are.
              </h2>
              <p className="text-[13px] text-navy-800/40 max-w-xs sm:text-right">
                Each tier builds on the previous one. Start with Starter or go straight to All-Access.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {bundles.map((b, i) => {
              const isGold = b.color === '#FFE030'
              const textColor = isGold ? '#9A7A00' : b.color
              return (
                <motion.div key={b.id} {...up(i * 0.08)}>
                  <div
                    className="h-full flex flex-col bg-white rounded-2xl overflow-hidden border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-stone-200/50"
                    style={{ borderColor: b.color + '35' }}
                  >
                    {/* Top bar */}
                    <div className="h-[3px] w-full flex-shrink-0" style={{ backgroundColor: b.color }} />

                    <div className="flex flex-col flex-1 p-7">
                      {/* Tier + badge row */}
                      <div className="flex items-center justify-between mb-5">
                        <TierBadge tier={b.tier} />
                        {b.badge && (
                          <span
                            className="text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full"
                            style={{ backgroundColor: b.color + '18', color: textColor }}
                          >
                            {b.badge}
                          </span>
                        )}
                      </div>

                      {/* Name + tagline */}
                      <h3 className="text-[17px] font-bold text-navy-900 tracking-[-0.02em] leading-snug mb-2">
                        {b.name}
                      </h3>
                      <p className="text-[13.5px] text-navy-800/50 leading-relaxed mb-6">
                        {b.tagline}
                      </p>

                      {/* Includes */}
                      <div className="flex-1 mb-6">
                        <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-navy-800/30 mb-3">What&apos;s included</p>
                        <ul className="space-y-2">
                          {b.includes.map((item, j) => (
                            <li key={j} className="flex items-start gap-2.5 text-[12.5px] text-navy-800/60 leading-relaxed">
                              <span
                                className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-[1px]"
                                style={{ backgroundColor: b.color + '18' }}
                              >
                                <svg className="w-2.5 h-2.5" viewBox="0 0 10 8" fill="none">
                                  <path d="M1 4L3.5 6.5L9 1" stroke={textColor} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Price + CTA */}
                      <div className="pt-5 border-t border-stone-100">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-[10px] text-navy-800/30 mb-0.5">Bundle price</p>
                            <p className="text-[26px] font-bold text-navy-900 leading-none">${b.price}</p>
                          </div>
                          <p className="text-[11px] text-navy-800/30 text-right">Instant<br />digital download</p>
                        </div>
                        <button
                          onClick={() => handleAdd(b)}
                          className="w-full flex items-center justify-center gap-2 text-[13.5px] font-bold py-3.5 rounded-xl transition-all duration-150 hover:translate-y-[-1px]"
                          style={
                            b.tier === 'all-access'
                              ? { backgroundColor: '#FFE030', color: '#0D1B2E', boxShadow: '0 4px 0 #C4A800, 0 6px 14px rgba(0,0,0,0.08)' }
                              : { backgroundColor: b.color + '14', color: textColor, border: `1.5px solid ${b.color}40` }
                          }
                        >
                          Add to Cart
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Individual Downloads ── */}
      <section style={{ backgroundColor: WARM_BG }} className="py-14 lg:py-20 border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...up()} className="mb-10">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-3 flex items-center gap-3">
              <span className="w-5 h-px" style={{ backgroundColor: '#2EBB50' }} />
              Individual Downloads
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
                Just need one resource?
              </h2>
              <p className="text-[13px] text-navy-800/40">Download individually — or save with a bundle.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SINGLES.map((s, i) => (
              <motion.div key={s.id} {...up(i * 0.06)}>
                <div className="h-full bg-white rounded-2xl overflow-hidden border border-stone-200/70 flex flex-col hover:-translate-y-0.5 hover:shadow-md hover:shadow-stone-200/50 transition-all duration-200">
                  <div className="h-[3px] w-full" style={{ backgroundColor: '#2EBB50' }} />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 flex-shrink-0" style={{ backgroundColor: 'rgba(46,187,80,0.10)' }}>
                      <svg className="w-4.5 h-4.5" style={{ color: '#2EBB50', width: '18px', height: '18px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    </div>
                    {s.pages && (
                      <span className="text-[10px] font-bold tracking-[0.08em] uppercase px-2 py-0.5 rounded-full self-start mb-2" style={{ backgroundColor: 'rgba(46,187,80,0.10)', color: '#2EBB50' }}>
                        {s.pages}
                      </span>
                    )}
                    <h3 className="text-[13.5px] font-bold text-navy-900 leading-snug mb-2 flex-1">{s.name}</h3>
                    <p className="text-[12px] text-navy-800/45 leading-relaxed mb-5">{s.desc}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                      <span className="text-[16px] font-bold text-navy-900">${s.price}</span>
                      <button
                        onClick={() => handleAddSingle(s)}
                        className="inline-flex items-center gap-1.5 text-[12px] font-bold px-4 py-2 rounded-full transition-all duration-150"
                        style={{ backgroundColor: 'rgba(46,187,80,0.12)', color: '#2EBB50' }}
                      >
                        Add to Cart
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M6 1v10M1 6h10" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Free Resource ── */}
      <section className="bg-white py-12 lg:py-16 border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...up()}>
            <div className="rounded-2xl overflow-hidden border border-forest-200/50 flex flex-col sm:flex-row" style={{ backgroundColor: 'rgba(46,187,80,0.04)' }}>
              <div className="p-7 sm:p-8 flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: '#2EBB50' }}>FREE</span>
                  <span className="text-[10px] font-semibold text-navy-800/35">No account required</span>
                </div>
                <h3 className="text-[18px] font-bold text-navy-900 leading-snug mb-2">
                  AAC Core Vocabulary Communication Board
                </h3>
                <p className="text-[13px] text-navy-800/50 leading-relaxed mb-5 max-w-lg">
                  Full-color, print-ready board with 80+ high-frequency words and visual symbols. For verbal and non-verbal learners — use at home, school, or in therapy.
                </p>
                <a
                  href="/aac-communication-board.jpg"
                  download="AAC-Core-Vocabulary-Board-Light2Minds.jpg"
                  className="inline-flex items-center gap-2 text-[13px] font-bold text-white px-6 py-3 rounded-full transition-all duration-150 hover:translate-y-[-1px]"
                  style={{ backgroundColor: '#2EBB50', boxShadow: '0 4px 0 #1E8E3E' }}
                >
                  Download Free
                  <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 1v8M4 6l3 3 3-3M2 11h10" /></svg>
                </a>
              </div>
              <div className="sm:w-48 flex-shrink-0 border-t sm:border-t-0 sm:border-l border-forest-100/50 flex items-center justify-center p-6 bg-white/60">
                <div className="w-full aspect-square rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(46,187,80,0.08)' }}>
                  <svg className="w-16 h-16 text-forest-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9M3 15h6M3 21h6" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Section ── */}
      <section style={{ backgroundColor: WARM_BG }} className="py-14 lg:py-18 border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST.map((t, i) => (
              <motion.div key={t.title} {...up(i * 0.06)} className="flex gap-4">
                <span className="text-[22px] flex-shrink-0 mt-0.5">{t.icon}</span>
                <div>
                  <p className="text-[14px] font-semibold text-navy-900 mb-1">{t.title}</p>
                  <p className="text-[12.5px] text-navy-800/50 leading-relaxed">{t.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Expert CTA ── */}
      <section className="bg-white py-14 lg:py-20 border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...up()}>
            <div
              className="rounded-2xl px-8 py-12 lg:px-14 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16"
              style={{ backgroundColor: '#0D1B2E' }}
            >
              <div className="flex-1">
                <p className="text-[11px] font-bold tracking-[0.16em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.30)' }}>
                  Not sure where to start?
                </p>
                <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-bold text-white tracking-[-0.025em] leading-[1.15] mb-4">
                  Tell us about your situation.<br />We&apos;ll point you in the right direction.
                </h2>
                <p className="text-[14px] leading-relaxed max-w-lg" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Our team includes BCBAs and behavioral health professionals who can help you identify the right resources for your specific child or practice. No sales pitch — just guidance.
                </p>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <a
                  href="mailto:info@light2minds.com"
                  className="inline-flex items-center justify-center gap-2 text-[13.5px] font-bold text-navy-900 px-7 py-4 rounded-full transition-all duration-150 hover:translate-y-[-1px]"
                  style={{ backgroundColor: '#FFE030', boxShadow: '0 4px 0 #C4A800' }}
                >
                  Contact Our Team
                  <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
                </a>
                <p className="text-[11px] text-center" style={{ color: 'rgba(255,255,255,0.25)' }}>info@light2minds.com</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
