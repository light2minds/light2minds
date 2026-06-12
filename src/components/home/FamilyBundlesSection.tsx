'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const WARM_BG = '#F8F5EF'
const SKY     = '#5BC4F8'
const GREEN   = '#2EBB50'
const GOLD    = '#FFE030'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
})

const bundles = [
  {
    color: SKY,
    title: 'Sensory Travel Kit',
    price: '$59.99',
    body: 'Keep your child regulated and comfortable wherever you go.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
  {
    color: GREEN,
    title: 'Calm & Focus Box',
    price: '$49.99',
    body: 'Sensory tools to help children regulate, focus, and thrive at home.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    color: GOLD,
    title: 'Bedtime Regulation Box',
    price: '$79.99',
    body: 'Build a calming nighttime routine that works — every single night.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
]

export default function FamilyBundlesSection() {
  return (
    <section style={{ backgroundColor: WARM_BG }} className="py-10 lg:py-14 border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div {...fade()} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-2">
              Family Bundles
            </p>
            <h2 className="text-[clamp(1.4rem,2.8vw,2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
              Sensory kits built for your family&apos;s real life.
            </h2>
            <p className="mt-2 text-[13.5px] text-navy-800/50 leading-relaxed max-w-md">
              Curated bundles of sensory tools that help children stay regulated — at home, on the go, and at bedtime.
            </p>
          </div>
          <Link
            href="/shop#families"
            className="inline-flex items-center gap-2.5 text-[13.5px] font-bold text-navy-900 px-6 py-3 rounded-full flex-shrink-0 transition-all duration-150 hover:-translate-y-0.5"
            style={{ backgroundColor: GOLD, boxShadow: '0 4px 0 #C4A800, 0 6px 14px rgba(0,0,0,0.08)' }}
          >
            Shop Family Bundles
            <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </Link>
        </motion.div>

        {/* Bundle cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {bundles.map((b, i) => {
            const textColor = b.color === GOLD ? '#8A6A00' : b.color
            return (
              <motion.div key={b.title} {...fade(i * 0.08)}>
                <Link
                  href="/shop#families"
                  className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-stone-200/60 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                  style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                >
                  <div className="h-[3px] w-full" style={{ backgroundColor: b.color }} />
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: b.color + '18', color: textColor }}
                      >
                        <span className="w-5 h-5">{b.icon}</span>
                      </span>
                      <span
                        className="text-[12px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: b.color + '18', color: textColor }}
                      >
                        {b.price}
                      </span>
                    </div>
                    <h3 className="text-[14px] font-bold text-navy-900 leading-snug mb-2">{b.title}</h3>
                    <p className="text-[12.5px] text-navy-800/50 leading-relaxed flex-1 mb-4">{b.body}</p>
                    <span
                      className="inline-flex items-center gap-2 text-[12.5px] font-bold opacity-70 group-hover:opacity-100 transition-opacity"
                      style={{ color: textColor }}
                    >
                      View Bundle
                      <svg className="w-3 h-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 7h10M8 3l4 4-4 4" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
