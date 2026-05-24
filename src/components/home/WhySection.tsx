'use client'

import { motion } from 'framer-motion'

const pillars = [
  {
    title: 'Family-First Tone',
    body: 'We write for real families, not clinicians. No jargon. No overwhelm. Just clear, warm guidance that meets you where you are.',
    color: '#5BC4F8',
    label: 'Families',
  },
  {
    title: 'Professionally Grounded',
    body: 'All professional content is aligned with BACB standards and current ABA best practices — accurate, current, and clinically sound.',
    color: '#2EBB50',
    label: 'Standards',
  },
  {
    title: 'Florida-Based & Focused',
    body: 'Built for Florida families and providers, with state-specific regulatory, educational, and Medicaid considerations where relevant.',
    color: '#FFE030',
    label: 'Florida',
  },
  {
    title: 'Free & Accessible Tools',
    body: 'Our core resources — forms, guides, and study materials — are free and downloadable with no account, paywall, or sign-up required.',
    color: '#5BC4F8',
    label: 'Free',
  },
]

const fade = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

export default function WhySection() {
  return (
    <section className="bg-white py-24 lg:py-32 border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — header */}
          <motion.div {...fade} transition={{ duration: 0.65 }} className="lg:sticky lg:top-28">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">
              Why Light2minds
            </p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-6">
              What makes us different.
            </h2>
            <p className="text-[15px] text-navy-800/45 leading-relaxed max-w-md">
              There&apos;s no shortage of information online. What&apos;s rare is information that&apos;s accurate, warm, and actually useful for the families and professionals who need it most.
            </p>
          </motion.div>

          {/* Right — pillars */}
          <div className="space-y-px">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                {...fade}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="group flex gap-6 py-7 border-b border-stone-100 last:border-b-0"
              >
                {/* Colored accent line */}
                <div
                  className="w-[3px] rounded-full flex-shrink-0 mt-1"
                  style={{ backgroundColor: p.color, minHeight: '100%' }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-[15px] font-semibold text-navy-900">{p.title}</h3>
                    <span
                      className="text-[10px] font-bold tracking-[0.08em] uppercase px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: p.color + '22', color: p.color === '#FFE030' ? '#B8900E' : p.color }}
                    >
                      {p.label}
                    </span>
                  </div>
                  <p className="text-[13px] text-navy-800/50 leading-relaxed">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
