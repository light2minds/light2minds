'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const fade = { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

export function FeatureFamilies() {
  return (
    <section className="bg-white py-24 lg:py-32 border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div {...fade} transition={{ duration: 0.65 }}>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase mb-4" style={{ color: '#2EBB50' }}>For Families</p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-5">
              You don&apos;t have to figure this out alone.
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed mb-8">
              Receiving a diagnosis for your child can feel like the ground shifting beneath you. Light2minds exists to give you a steady place to stand — with honest information, practical strategies, and a compassionate community.
            </p>
            <Link
              href="/parents"
              className="inline-flex items-center gap-3 text-[13px] font-semibold text-white px-6 py-3 rounded-full transition-all duration-200"
              style={{ backgroundColor: '#2EBB50' }}
            >
              Parent Resource Center
              <span className="w-4 h-px bg-current" />
            </Link>
          </motion.div>
          <motion.div {...fade} transition={{ duration: 0.55, delay: 0.1 }}>
            <ul className="space-y-3">
              {[
                'Plain-language guides on autism, ADHD, and developmental delays',
                'What to expect after diagnosis — the real, unfiltered picture',
                'How ABA therapy works and what to look for in a provider',
                'Navigating IEPs, school accommodations, and 504 plans',
                'Home-based strategies that actually fit real family life',
                '1-on-1 parent education sessions with a specialist',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14px] text-navy-800/65 leading-relaxed">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-[1px]" style={{ backgroundColor: '#2EBB5022' }}>
                    <svg className="w-2.5 h-2.5" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#2EBB50" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function FeatureProfessionals() {
  return (
    <section className="bg-stone-50 py-24 lg:py-32 border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div {...fade} transition={{ duration: 0.55, delay: 0.1 }}>
            <ul className="space-y-3">
              {[
                'Full RBT task list coverage with study guides & mock exams',
                'ABA terminology flashcards and quick-reference sheets',
                'Ethics module aligned with the BACB code',
                'Session documentation templates and competency prep',
                'Resume writing, interview prep, and career resources',
                'Step-by-step ABA center startup guide for entrepreneurs',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14px] text-navy-800/65 leading-relaxed">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-[1px]" style={{ backgroundColor: '#5BC4F822' }}>
                    <svg className="w-2.5 h-2.5" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#5BC4F8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fade} transition={{ duration: 0.65 }}>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">For RBTs & Professionals</p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-5">
              Build your career on a solid foundation.
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed mb-8">
              The field of ABA therapy is growing rapidly. Whether you&apos;re sitting for the RBT exam, advancing your career, or opening your own practice, Light2minds gives you the tools to do it with confidence.
            </p>
            <Link
              href="/professionals"
              className="inline-flex items-center gap-3 text-[13px] font-semibold text-navy-900 px-6 py-3 rounded-full transition-all duration-200"
              style={{ backgroundColor: '#5BC4F8', color: '#fff' }}
            >
              Professional Hub
              <span className="w-4 h-px bg-current" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
