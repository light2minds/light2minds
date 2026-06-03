'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const conditions = [
  {
    title: 'Autism Spectrum Disorder',
    body: 'Diagnosis, ABA, social skills, sensory support, and transition planning.',
    color: '#5BC4F8',
    href: '/parents',
  },
  {
    title: 'ADHD',
    body: 'Attention, executive function, school support, and behavior management strategies.',
    color: '#2EBB50',
    href: '/parents',
  },
  {
    title: 'Developmental Delays',
    body: 'Early intervention, milestone tracking, therapy options, and family support.',
    color: '#FFE030',
    href: '/parents',
  },
  {
    title: 'Language Delays',
    body: 'Communication strategies, AAC tools, speech therapy collaboration, and home practice.',
    color: '#5BC4F8',
    href: '/tools',
  },
  {
    title: 'Sensory Difficulties',
    body: 'Sensory processing basics, calming tools, sensory diets, and environmental modifications.',
    color: '#2EBB50',
    href: '/tools',
  },
  {
    title: 'Behavioral Challenges',
    body: 'Understanding behavior functions, proactive strategies, and working with a behavior analyst.',
    color: '#FFE030',
    href: '/parents',
  },
]

const fade = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

function ConditionRow({ c, i }: { c: (typeof conditions)[0]; i: number }) {
  return (
    <motion.div
      {...fade}
      transition={{ duration: 0.4, delay: i * 0.07 }}
      className="flex gap-5 py-6 border-b border-stone-100 last:border-b-0"
    >
      <div
        className="w-[3px] rounded-full flex-shrink-0 self-stretch mt-[3px]"
        style={{ backgroundColor: c.color }}
      />
      <div className="min-w-0 flex-1">
        <h3 className="text-[14px] font-semibold text-navy-900 mb-1.5 leading-snug">{c.title}</h3>
        <p className="text-[13px] text-navy-800/50 leading-relaxed mb-2.5">{c.body}</p>
        <Link
          href={c.href}
          className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold transition-opacity duration-150 opacity-60 hover:opacity-100"
          style={{ color: c.color === '#FFE030' ? '#B8900E' : c.color }}
        >
          Explore resources
          <span className="w-3 h-px bg-current" />
        </Link>
      </div>
    </motion.div>
  )
}

export default function ConditionsSection() {
  const left  = conditions.slice(0, 3)
  const right = conditions.slice(3)

  return (
    <section className="bg-stone-50 py-24 lg:py-32 border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section header */}
        <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-14">
          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">
            Areas We Cover
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
              Supporting children across the spectrum.
            </h2>
            <p className="text-[15px] text-navy-800/45 leading-relaxed max-w-sm sm:text-right">
              Most children we support present with more than one of these conditions — our resources reflect that reality.
            </p>
          </div>
        </motion.div>

        {/* Editorial two-column condition list — no boxes, just rhythm and color */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-x-16 xl:gap-x-24">
          <div className="divide-y-0">
            {left.map((c, i) => <ConditionRow key={c.title} c={c} i={i} />)}
          </div>
          <div className="border-t lg:border-t-0 border-stone-100 divide-y-0">
            {right.map((c, i) => <ConditionRow key={c.title} c={c} i={i + 3} />)}
          </div>
        </div>

      </div>
    </section>
  )
}
