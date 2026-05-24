'use client'

import { motion } from 'framer-motion'

const conditions = [
  {
    title: 'Autism Spectrum Disorder',
    body: 'Diagnosis, ABA, social skills, sensory support, and transition planning.',
    color: '#5BC4F8',
  },
  {
    title: 'ADHD',
    body: 'Attention, executive function, school support, and behavior management strategies.',
    color: '#2EBB50',
  },
  {
    title: 'Developmental Delays',
    body: 'Early intervention, milestone tracking, therapy options, and family support.',
    color: '#FFE030',
  },
  {
    title: 'Language Delays',
    body: 'Communication strategies, AAC tools, speech therapy collaboration, and home practice.',
    color: '#5BC4F8',
  },
  {
    title: 'Sensory Difficulties',
    body: 'Sensory processing basics, calming tools, sensory diets, and environmental modifications.',
    color: '#2EBB50',
  },
  {
    title: 'Behavioral Challenges',
    body: 'Understanding behavior functions, proactive strategies, and working with a behavior analyst.',
    color: '#FFE030',
  },
]

const fade = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

export default function ConditionsSection() {
  return (
    <section className="bg-stone-50 py-24 lg:py-32 border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-14">
          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">
            Areas We Cover
          </p>
          <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
            Supporting children across the spectrum.
          </h2>
          <p className="text-[15px] text-navy-800/50 leading-relaxed max-w-xl">
            Every child&apos;s journey is unique. Light2minds provides education and tools for a wide range of neurodevelopmental and behavioral conditions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {conditions.map((c, i) => (
            <motion.div
              key={c.title}
              {...fade}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bg-white rounded-2xl overflow-hidden border border-stone-100"
            >
              {/* Colored left border via top bar approach */}
              <div className="h-[3px] w-full" style={{ backgroundColor: c.color }} />
              <div className="p-7">
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: c.color }}
                  />
                  <h3 className="text-[14px] font-semibold text-navy-900 leading-snug">{c.title}</h3>
                </div>
                <p className="text-[13px] text-navy-800/45 leading-relaxed pl-[18px]">{c.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
