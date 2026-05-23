'use client'

import { motion } from 'framer-motion'

const stats = [
  { value: '1 in 36', label: 'Children are diagnosed with autism spectrum disorder in the US' },
  { value: '9.8%',   label: 'Of children aged 3–17 have an ADHD diagnosis' },
  { value: '17%',    label: 'Of children in the US have a developmental disability' },
  { value: '+40%',   label: 'Projected growth in RBT career demand over the next decade' },
]

export default function StatsStrip() {
  return (
    <div className="bg-navy-900 py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-white/[0.08]">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="lg:px-10 first:lg:pl-0 last:lg:pr-0"
            >
              <p className="text-[2rem] font-bold text-white tracking-[-0.03em] leading-none mb-2">{stat.value}</p>
              <p className="text-[12px] text-white/40 leading-relaxed">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
