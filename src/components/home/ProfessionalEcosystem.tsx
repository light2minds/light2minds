'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const areas = [
  {
    id: '01',
    title: 'RBT Preparation',
    body: 'Task list coverage, mock exams, interactive flashcards, and ethics — structured to pass the RBT exam on the first attempt.',
    href: '/professionals#exam',
  },
  {
    id: '02',
    title: 'ABA Documentation',
    body: 'Session notes, data sheets, supervision logs, and reporting systems for daily clinical use.',
    href: '/professionals#documentation',
  },
  {
    id: '03',
    title: 'Clinical Tools',
    body: 'ABC data forms, interval recording sheets, task analysis templates, and preference assessments.',
    href: '/tools#clinical-tools',
  },
  {
    id: '04',
    title: 'Career Development',
    body: 'Resume templates, interview preparation, career pathway maps from RBT to BCBA, and licensure guidance.',
    href: '/professionals#career',
  },
  {
    id: '05',
    title: 'Center Startup',
    body: 'A complete guide to opening your own ABA practice — from entity formation to your first client session.',
    href: '/aba-center',
  },
  {
    id: '06',
    title: 'Operations Systems',
    body: 'Intake packets, staff onboarding, compliance checklists, HIPAA policies, and billing workflow templates.',
    href: '/aba-center#operations',
  },
]

export default function ProfessionalEcosystem() {
  return (
    <section className="bg-navy-950 py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-gold-400/45 mb-4">
              Professional Ecosystem
            </p>
            <h2 className="text-[clamp(1.85rem,3.8vw,2.75rem)] font-bold text-white tracking-[-0.025em] leading-[1.1]">
              A complete system for<br />ABA professionals.
            </h2>
          </div>
          <Link
            href="/professionals"
            className="inline-flex items-center gap-3 text-[13px] font-medium text-white/45 hover:text-white/80 transition-colors duration-200 self-start lg:self-auto"
          >
            Explore all tools
            <span className="w-5 h-px bg-current" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          {areas.map((area, i) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={[
                'border-white/[0.06]',
                i >= 3 ? 'lg:border-t' : '',
                i === 1 || i === 4 ? 'md:border-l' : '',
              ].join(' ')}
            >
              <Link
                href={area.href}
                className="group block bg-navy-950 hover:bg-navy-900/60 p-8 h-full transition-colors duration-300"
              >
                <p className="text-[11px] font-bold text-white/18 mb-5 tracking-[0.1em]">{area.id}</p>
                <h3 className="text-[15px] font-semibold text-white mb-3 group-hover:text-gold-300 transition-colors duration-200">
                  {area.title}
                </h3>
                <p className="text-[13px] text-white/35 leading-relaxed">{area.body}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
