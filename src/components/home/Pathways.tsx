'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Pathways() {
  return (
    <section className="flex flex-col lg:flex-row min-h-[72vh]">

      {/* Left — Families */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75 }}
        className="relative flex-1 bg-white px-8 lg:px-16 py-20 lg:py-28 flex flex-col justify-between overflow-hidden"
      >
        <span
          className="absolute top-6 right-8 text-[9rem] font-bold leading-none text-navy-900/[0.04] select-none pointer-events-none"
          aria-hidden="true"
        >
          01
        </span>

        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-forest-600/80 mb-6">
            For Families
          </p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold text-navy-900 leading-[1.12] tracking-[-0.02em] mb-5 max-w-sm">
            Your child&apos;s journey,<br />navigated with clarity.
          </h2>
          <p className="text-[15px] text-navy-800/55 leading-relaxed max-w-sm">
            From the first diagnosis through therapy, school, and home — we provide families with the knowledge and tools to advocate with confidence.
          </p>
        </div>

        <div className="mt-14">
          <Link
            href="/parents"
            className="inline-flex items-center gap-3 text-[13px] font-semibold text-navy-900 border border-navy-900/20 px-6 py-3 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-250"
          >
            Explore family resources
            <span className="w-4 h-px bg-current" />
          </Link>
        </div>
      </motion.div>

      {/* Divider dot */}
      <div className="hidden lg:flex items-center justify-center w-px bg-stone-200/30 relative">
        <div className="absolute w-5 h-5 rounded-full bg-gold-400 border-[3px] border-stone-50 z-10" />
      </div>

      {/* Right — Professionals */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.12 }}
        className="relative flex-1 bg-stone-50 px-8 lg:px-16 py-20 lg:py-28 flex flex-col justify-between overflow-hidden border-t lg:border-t-0 border-stone-200/60"
      >
        <span
          className="absolute top-6 right-8 text-[9rem] font-bold leading-none text-navy-900/[0.04] select-none pointer-events-none"
          aria-hidden="true"
        >
          02
        </span>

        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-sky-500/70 mb-6">
            For Professionals
          </p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold text-navy-900 leading-[1.12] tracking-[-0.02em] mb-5 max-w-sm">
            Your ABA career,<br />built with precision.
          </h2>
          <p className="text-[15px] text-navy-800/50 leading-relaxed max-w-sm">
            RBT exam preparation, clinical documentation systems, career development, and a complete guide to launching your own therapy center.
          </p>
        </div>

        <div className="mt-14">
          <Link
            href="/professionals"
            className="inline-flex items-center gap-3 text-[13px] font-semibold text-navy-900 border border-navy-900/20 px-6 py-3 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-250"
          >
            Explore professional tools
            <span className="w-4 h-px bg-current" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
