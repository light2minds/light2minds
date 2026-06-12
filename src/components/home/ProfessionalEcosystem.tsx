'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const areas = [
  {
    id: '01',
    title: 'RBT Preparation',
    body: 'Task list coverage, mock exams, interactive flashcards, and ethics — structured to pass the RBT exam on the first attempt.',
    href: '/professionals#exam',
    badge: 'Start Here',
  },
  {
    id: '02',
    title: 'ABA Documentation',
    body: 'Session notes, data sheets, supervision logs, and reporting systems for daily clinical use.',
    href: '/professionals#documentation',
    badge: null,
  },
  {
    id: '03',
    title: 'Clinical Tools',
    body: 'ABC data forms, interval recording sheets, task analysis templates, and preference assessments.',
    href: '/tools#clinical-tools',
    badge: null,
  },
  {
    id: '04',
    title: 'Career Development',
    body: 'Resume templates, interview preparation, mentorship, career pathway maps from RBT to BCBA, and licensure guidance.',
    href: '/professionals#career',
    badge: null,
  },
  {
    id: '05',
    title: 'BCBA / BCaBA Preparation',
    body: 'Supervision hours tracking, exam content area review, ethics case studies, and study frameworks for the BCBA and BCaBA examinations.',
    href: '/professionals#bcba',
    badge: null,
  },
  {
    id: '06',
    title: 'Center Startup',
    body: 'A complete guide to opening your own ABA practice — from entity formation to your first client session.',
    href: '/aba-center',
    badge: null,
  },
]

export default function ProfessionalEcosystem() {
  return (
    <section className="bg-stone-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10"
        >
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">
              Professional Ecosystem
            </p>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-3">
              A complete system for<br />ABA professionals.
            </h2>
            <p className="text-[13px] text-navy-800/40 leading-relaxed max-w-sm">
              Resources for RBTs, BCaBAs, BCBAs, students, and practice owners — at every stage of your career.
            </p>
          </div>
          <Link
            href="/professionals"
            className="inline-flex items-center gap-3 text-[13px] font-semibold text-white px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5 self-start lg:self-auto flex-shrink-0"
            style={{ backgroundColor: '#2EBB50', boxShadow: '0 4px 0 #1A7A3C, 0 6px 14px rgba(0,0,0,0.08)' }}
          >
            Explore here
            <span className="w-4 h-px bg-current" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-200/60 border border-stone-200/60 rounded-2xl overflow-hidden">
          {areas.map((area, i) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={[
                'border-stone-200/60',
                i >= 3 ? 'lg:border-t' : '',
                i === 1 || i === 4 ? 'md:border-l' : '',
              ].join(' ')}
            >
              <Link
                href={area.href}
                className="group block bg-white hover:bg-stone-50 p-8 h-full transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <p className="text-[11px] font-bold text-navy-900/20 tracking-[0.1em]">{area.id}</p>
                  {area.badge && (
                    <span className="text-[9.5px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full bg-gold-400/20 text-gold-700">
                      {area.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-[13.5px] font-semibold text-navy-900 mb-3 group-hover:text-gold-600 transition-colors duration-200">
                  {area.title}
                </h3>
                <p className="text-[12.5px] text-navy-800/50 leading-relaxed">{area.body}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
