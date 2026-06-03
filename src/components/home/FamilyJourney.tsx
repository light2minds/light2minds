'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Understanding',
    body: 'Coming to terms with a diagnosis. Learning what it means for your child, your family, and your daily life — without the noise.',
    href: null,
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
    body: 'Navigating assessments, reports, and professional evaluations. Understanding what is being measured and why.',
    href: null,
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
    body: 'Connecting with the right therapies — ABA, speech, occupational — and understanding how each one contributes.',
    href: '/parents',
    cta: 'ABA therapy guide',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Skill Building',
    body: 'Learning evidence-based strategies to use at home. Creating consistent environments where your child can grow.',
    href: '/tools',
    cta: 'Browse home tools',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Advocacy',
    body: 'Navigating IEPs, school systems, and insurance. Knowing your rights and speaking up effectively on your child\'s behalf.',
    href: '/parents',
    cta: 'IEP resources',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Progress',
    body: 'Measuring growth, celebrating milestones, and sustaining momentum — for your child and for your whole family.',
    href: '/tools',
    cta: 'Tracking tools',
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
    <section className="bg-white py-16 lg:py-24 overflow-hidden border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div className="max-w-lg">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-forest-700/55 mb-4">
              The Family Journey
            </p>
            <h2 className="text-[clamp(1.85rem,3.8vw,2.75rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
              From uncertainty<br />to confidence.
            </h2>
          </div>
          <p className="text-[15px] text-navy-800/45 leading-relaxed max-w-xs">
            Every family&apos;s path is different — but the milestones are shared. Light2Minds walks alongside you at every stage.
          </p>
        </motion.div>

        {/* 2-row × 3-column grid for comfortable step spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-x-8 lg:gap-y-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="relative flex gap-5"
            >
              {/* Left: number circle with icon */}
              <div className="flex-shrink-0">
                <div className="relative w-14 h-14">
                  <div className="w-14 h-14 rounded-full border border-stone-150 bg-stone-50 flex items-center justify-center relative z-10">
                    <span
                      className="w-6 h-6 text-navy-900/25"
                      aria-hidden="true"
                    >
                      {step.icon}
                    </span>
                  </div>
                  {/* Gold accent dot */}
                  <span className="absolute top-1 left-1 w-2 h-2 rounded-full bg-gold-400" aria-hidden="true" />
                  {/* Step number */}
                  <span className="absolute -bottom-1 -right-1 text-[9px] font-bold tracking-[0.08em] text-navy-900/30 leading-none">
                    {step.num}
                  </span>
                </div>
              </div>

              {/* Right: content */}
              <div className="pt-1 min-w-0">
                <h3 className="text-[15px] font-semibold text-navy-900 mb-2">{step.title}</h3>
                <p className="text-[13px] text-navy-800/48 leading-relaxed mb-3">{step.body}</p>
                {step.href && (
                  <Link
                    href={step.href}
                    className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-forest-600/70 hover:text-forest-600 transition-colors duration-150"
                  >
                    {step.cta}
                    <span className="w-3 h-px bg-current" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
