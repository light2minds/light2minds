'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CtaBanner() {
  return (
    <section className="bg-navy-900 py-20 lg:py-28 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="max-w-2xl mb-10"
        >
          <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-white tracking-[-0.025em] leading-[1.1] mb-4">
            Ready to take the next step?
          </h2>
          <p className="text-[15px] text-white/45 leading-relaxed">
            Whether you&apos;re a parent seeking answers or a professional building your future — your journey starts here.
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
            className="inline-flex items-center gap-3 text-[13px] font-semibold text-white border border-white/15 px-6 py-3 rounded-full hover:bg-white hover:text-navy-900 transition-all duration-200"
          >
            I&apos;m a Parent
          </Link>
          <Link
            href="/professionals"
            className="inline-flex items-center gap-3 text-[13px] font-semibold text-white border border-white/15 px-6 py-3 rounded-full hover:bg-white hover:text-navy-900 transition-all duration-200"
          >
            I&apos;m an RBT / Professional
          </Link>
          <Link
            href="/aba-center"
            className="inline-flex items-center gap-3 text-[13px] font-medium text-white/50 hover:text-white transition-colors duration-200 px-2 py-3"
          >
            ABA Center Startup
            <span className="w-4 h-px bg-current" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
