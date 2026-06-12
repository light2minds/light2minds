'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Understanding',
    body: 'Coming to terms with a diagnosis and learning what it means for your child and your daily life.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Evaluation',
    body: 'Navigating assessments and reports — understanding what is being measured and why it matters.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Support',
    body: 'Connecting with the right therapies — ABA, speech, occupational — and understanding each one.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Skill Building',
    body: 'Learning evidence-based strategies to use at home where your child can grow every day.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Advocacy',
    body: 'Navigating IEPs, school systems, and insurance — knowing your rights and speaking up effectively.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Progress',
    body: 'Measuring growth, celebrating milestones, and sustaining momentum for your whole family.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
]

export default function FamilyJourney() {
  return (
    <section className="bg-white py-10 lg:py-14 border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-3">
            The Family Journey
          </p>
          <h2 className="text-[clamp(1.45rem,2.8vw,2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.15]">
            From uncertainty to confidence.
          </h2>
        </motion.div>

        {/* Steps — compact grid, no per-step links */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mb-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex gap-3.5 items-start"
            >
              <div className="relative flex-shrink-0 w-10 h-10">
                <div className="w-10 h-10 rounded-full bg-stone-50 border border-stone-150 flex items-center justify-center">
                  <span className="w-4.5 h-4.5 w-[18px] h-[18px] text-navy-900/30">{step.icon}</span>
                </div>
                <span className="absolute -top-1 -right-1 text-[8px] font-bold text-navy-900/25 leading-none">
                  {step.num}
                </span>
              </div>
              <div className="pt-0.5">
                <h3 className="text-[13.5px] font-semibold text-navy-900 mb-1">{step.title}</h3>
                <p className="text-[12px] text-navy-800/45 leading-relaxed">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Two CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 pt-2 border-t border-stone-100"
        >
          <Link
            href="/parents"
            className="inline-flex items-center gap-2.5 text-[13px] font-semibold text-white px-6 py-2.5 rounded-full transition-all duration-150 hover:-translate-y-0.5"
            style={{ backgroundColor: '#5BC4F8', boxShadow: '0 3px 0 #3A9ECE' }}
          >
            Family Resources
            <span className="w-4 h-px bg-current" />
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2.5 text-[13px] font-semibold text-navy-900 px-6 py-2.5 rounded-full border border-navy-900/15 hover:bg-navy-900 hover:text-white transition-all duration-200"
          >
            Browse Free Tools
            <span className="w-4 h-px bg-current" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
