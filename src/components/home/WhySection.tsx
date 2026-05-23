'use client'

import { motion } from 'framer-motion'

const pillars = [
  {
    title: 'Family-First Tone',
    body: 'We write for real families, not clinicians. No jargon. No overwhelm. Just clear, warm guidance.',
    accent: 'bg-sky-50 border-sky-100',
    dot: 'bg-sky-400',
  },
  {
    title: 'Professionally Grounded',
    body: 'All professional content is aligned with BACB standards and current ABA best practices.',
    accent: 'bg-forest-50 border-forest-100',
    dot: 'bg-forest-500',
  },
  {
    title: 'Florida-Based & Focused',
    body: 'Built for Florida families and providers, with state-specific considerations where relevant.',
    accent: 'bg-gold-50 border-gold-200',
    dot: 'bg-gold-400',
  },
  {
    title: 'Free & Accessible Tools',
    body: 'Our core resources — forms, guides, and study materials — are free and downloadable, no sign-up required.',
    accent: 'bg-sage-50 border-sage-100',
    dot: 'bg-sage-400',
  },
]

const fade = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

export default function WhySection() {
  return (
    <section className="bg-white py-24 lg:py-32 border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-14">
          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">
            Why Light2minds
          </p>
          <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
            What makes us different.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              {...fade}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`border rounded-2xl p-7 ${p.accent}`}
            >
              <div className={`w-2 h-2 rounded-full ${p.dot} mb-5`} />
              <h3 className="text-[14px] font-semibold text-navy-900 mb-2">{p.title}</h3>
              <p className="text-[13px] text-navy-800/50 leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
