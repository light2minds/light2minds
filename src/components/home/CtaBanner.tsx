'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const WARM_BG = '#F8F5EF'

export default function CtaBanner() {
  return (
    <section
      style={{ backgroundColor: WARM_BG }}
      className="py-24 lg:py-32 border-t border-stone-200/40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="max-w-2xl mb-10"
        >
          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">
            Get Started
          </p>
          <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
            Your path starts here.
          </h2>
          <p className="text-[15px] text-navy-800/50 leading-relaxed">
            Families. Professionals. ABA Center owners. Light2Minds was built for each of you — with the resources, tools, and guidance your specific journey requires.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            href="/parents"
            className="inline-flex items-center gap-3 text-[13px] font-semibold text-white px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: '#5BC4F8', boxShadow: '0 4px 0 #3A9ECE, 0 6px 14px rgba(0,0,0,0.10)' }}
          >
            I&apos;m a Parent
            <span className="w-4 h-px bg-current" />
          </Link>
          <Link
            href="/professionals"
            className="inline-flex items-center gap-3 text-[13px] font-semibold text-navy-900 px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: '#FFE030', boxShadow: '0 4px 0 #C4A800, 0 6px 14px rgba(0,0,0,0.08)' }}
          >
            I&apos;m an RBT / Professional
            <span className="w-4 h-px bg-current" />
          </Link>
          <Link
            href="/aba-center"
            className="inline-flex items-center gap-3 text-[13px] font-semibold text-navy-900 border border-navy-900/20 px-6 py-3 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200"
          >
            ABA Center Startup
            <span className="w-4 h-px bg-current" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
