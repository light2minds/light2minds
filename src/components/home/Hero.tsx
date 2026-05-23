'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY  = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentOp = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center bg-stone-50 overflow-hidden">

      {/* Light-beam SVG — top-right corner, very subtle */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <svg
          className="absolute top-0 right-0 w-[640px] h-[640px]"
          viewBox="0 0 640 640"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="640" y1="0" x2="0"   y2="640" stroke="#E8B84B" strokeWidth="1"   strokeOpacity="0.10" />
          <line x1="640" y1="0" x2="80"  y2="640" stroke="#E8B84B" strokeWidth="0.8" strokeOpacity="0.08" />
          <line x1="640" y1="0" x2="200" y2="640" stroke="#E8B84B" strokeWidth="0.8" strokeOpacity="0.07" />
          <line x1="640" y1="0" x2="340" y2="640" stroke="#E8B84B" strokeWidth="0.6" strokeOpacity="0.06" />
          <line x1="640" y1="0" x2="480" y2="640" stroke="#E8B84B" strokeWidth="0.5" strokeOpacity="0.05" />
          <line x1="640" y1="0" x2="580" y2="640" stroke="#E8B84B" strokeWidth="0.5" strokeOpacity="0.04" />
          <line x1="640" y1="0" x2="0"   y2="400" stroke="#E8B84B" strokeWidth="0.6" strokeOpacity="0.07" />
          <line x1="640" y1="0" x2="0"   y2="200" stroke="#E8B84B" strokeWidth="0.5" strokeOpacity="0.05" />
          <line x1="640" y1="0" x2="0"   y2="80"  stroke="#E8B84B" strokeWidth="0.4" strokeOpacity="0.04" />
        </svg>
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOp }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-24"
      >
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="block w-7 h-px bg-gold-400" />
          <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/55">
            Behavioral &amp; Neurodevelopmental Guidance · Florida
          </span>
        </motion.div>

        {/* Headline */}
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.75rem,6.5vw,5.25rem)] font-bold leading-[1.03] tracking-[-0.035em] text-navy-900 mb-7"
          >
            Some journeys begin<br />
            with uncertainty.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(1.05rem,1.8vw,1.2rem)] font-light text-navy-800/60 leading-relaxed max-w-lg mb-14"
          >
            Light2minds helps families and professionals move<br className="hidden lg:block" />
            forward with clarity, structure, and purpose.
          </motion.p>

          {/* CTA text-links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.52 }}
            className="flex flex-wrap gap-8"
          >
            <Link href="/parents" className="group flex items-center gap-4 text-[15px] font-semibold text-navy-900">
              <span className="w-9 h-9 rounded-full border border-navy-900/20 flex items-center justify-center group-hover:bg-navy-900 group-hover:border-navy-900 transition-all duration-250 flex-shrink-0">
                <ArrowRight className="w-3.5 h-3.5 text-navy-900 group-hover:text-white transition-colors duration-250" />
              </span>
              For Families
            </Link>
            <Link href="/professionals" className="group flex items-center gap-4 text-[15px] font-semibold text-navy-600/80">
              <span className="w-9 h-9 rounded-full border border-navy-600/15 flex items-center justify-center group-hover:bg-navy-600 group-hover:border-navy-600 transition-all duration-250 flex-shrink-0">
                <ArrowRight className="w-3.5 h-3.5 text-navy-600 group-hover:text-white transition-colors duration-250" />
              </span>
              For Professionals
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-stone-200/70" />
    </section>
  )
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  )
}
