'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const categories = [
  {
    count: '12',
    label: 'Parent Resources',
    body: 'Guides, handouts, and tools for families navigating diagnosis and therapy.',
    href: '/tools#parent-tools',
    accent: 'forest',
  },
  {
    count: '8',
    label: 'Clinical Forms',
    body: 'Data sheets, session notes, and documentation templates for daily clinical use.',
    href: '/tools#clinical-tools',
    accent: 'navy',
  },
  {
    count: '10',
    label: 'Developmental Guides',
    body: 'Activity guides, milestone checklists, and skill-building resources.',
    href: '/tools#developmental-tools',
    accent: 'gold',
  },
  {
    count: '15',
    label: 'RBT Study Materials',
    body: 'Exam prep, flashcards, ethics reference sheets, and career templates.',
    href: '/tools#rbt-tools',
    accent: 'navy',
  },
]

export default function ResourcesSection() {
  return (
    <section className="bg-stone-100/40 py-24 lg:py-36 border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
        >
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">
              Free Resources
            </p>
            <h2 className="text-[clamp(1.85rem,3.8vw,2.75rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
              Every tool you need,<br />free and ready.
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed max-w-md">
              40+ downloadable resources across six categories. No sign-up, no cost.
            </p>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-3 text-[13px] font-semibold text-navy-900 border border-navy-900/18 px-6 py-3 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200 self-start lg:self-auto"
          >
            Browse all resources
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <Link
                href={cat.href}
                className="group block bg-white border border-stone-200/70 rounded-2xl p-7 hover:shadow-md hover:shadow-stone-200/60 hover:-translate-y-0.5 transition-all duration-250 h-full"
              >
                <p
                  className="text-[3.5rem] font-bold leading-none tracking-[-0.04em] mb-6"
                  style={{ color: 'rgba(13,27,46,0.07)' }}
                >
                  {cat.count}
                </p>
                <h3 className="text-[15px] font-semibold text-navy-900 mb-2">{cat.label}</h3>
                <p className="text-[13px] text-navy-800/45 leading-relaxed">{cat.body}</p>
                <p className="mt-5 text-[12px] font-semibold text-navy-600/50 group-hover:text-navy-900 transition-colors duration-200 flex items-center gap-2">
                  View resources
                  <span className="inline-block w-4 h-px bg-current" />
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
