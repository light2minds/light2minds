'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const WARM_BG = '#F8F5EF'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
})


const painPoints = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
      </svg>
    ),
    title: 'The clinical side is the easy part.',
    body: 'Most ABA professionals are fully prepared to serve clients. What blindsides them is everything else — the business, the legal, the billing, the compliance.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><path d="M12 9v4M12 17h.01" />
      </svg>
    ),
    title: 'Expensive mistakes happen early.',
    body: 'The wrong entity structure, skipping credentialing steps, or opening without compliance systems in place — these aren\'t just setbacks. They can end a practice before it starts.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'You shouldn\'t have to figure this out alone.',
    body: 'The information exists — but it\'s scattered, incomplete, or written for administrators, not clinicians. We built a system specifically for ABA professionals ready to step into ownership.',
  },
]

const guideIncludes = [
  'All 8 phases of the startup process, explained step by step',
  'Legal and entity formation guidance for Florida-based practices',
  'Insurance enrollment timeline and credentialing strategy',
  'Clinical documentation systems and intake templates',
  'Compliance checklist: HIPAA, BACB, and Florida state requirements',
  'Hiring and supervision structure frameworks',
  'Ready-to-use forms, checklists, and templates',
  'Common mistakes and how to avoid them',
]

export default function AbaCenterPage() {
  return (
    <main>

      {/* ── Hero ── */}
      <section
        style={{ backgroundColor: WARM_BG }}
        className="pt-36 pb-20 lg:pt-44 lg:pb-28 relative overflow-hidden border-b border-stone-200/60"
      >
        <span
          className="absolute bottom-0 right-0 text-[clamp(6rem,22vw,18rem)] font-black leading-none text-navy-900/[0.03] select-none pointer-events-none"
          aria-hidden="true"
        >
          ABA
        </span>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div {...fade()} className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-6 flex items-center gap-3">
              <span className="block w-6 h-px bg-navy-700/30" />
              ABA Center Startup
            </p>
            <h1 className="text-[clamp(2.4rem,5.5vw,4.2rem)] font-bold text-navy-900 tracking-[-0.03em] leading-[1.05] mb-6">
              Open your ABA center<br />the right way.
            </h1>
            <p className="text-[16px] text-navy-800/55 leading-relaxed max-w-lg mb-10">
              You have the clinical skills. What you need is a proven roadmap — from the first legal decision to your first client session. We built exactly that.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#coaching"
                className="inline-flex items-center gap-2.5 text-[14px] font-bold text-white px-8 py-4 rounded-full transition-all duration-150 hover:translate-y-[-2px]"
                style={{ backgroundColor: '#5BC4F8', boxShadow: '0 5px 0 #3A9ECE, 0 8px 16px rgba(0,0,0,0.12)' }}
              >
                Book a Coaching Session
                <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
              </a>
              <a
                href="#guide"
                className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold text-navy-900 px-7 py-4 rounded-full border border-navy-900/20 hover:bg-navy-900 hover:text-white transition-all duration-200"
              >
                Get the Complete Guide
                <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Pain points ── */}
      <section className="bg-white py-16 lg:py-20 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {painPoints.map((pt, i) => (
              <motion.div key={i} {...fade(i * 0.08)} className="flex gap-4">
                <span
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: 'rgba(91,196,248,0.10)', color: '#5BC4F8' }}
                >
                  <span className="w-5 h-5">{pt.icon}</span>
                </span>
                <div>
                  <h3 className="text-[14px] font-semibold text-navy-900 mb-2 leading-snug">{pt.title}</h3>
                  <p className="text-[13px] text-navy-800/50 leading-relaxed">{pt.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── Two paths: Guide + Coaching ── */}
      <section
        id="guide"
        style={{ backgroundColor: WARM_BG }}
        className="py-16 lg:py-24 border-b border-stone-200/60"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <motion.div {...fade()} className="mb-12">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">How to Get Started</p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
              Two ways we can help you.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Guide card */}
            <motion.div {...fade(0.06)}>
              <div className="h-full bg-white rounded-2xl overflow-hidden border border-stone-200/70 flex flex-col">
                <div className="h-[3px] w-full" style={{ backgroundColor: '#FFE030' }} />
                <div className="p-8 flex flex-col flex-1">

                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(255,224,48,0.14)', color: '#B8900E' }}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full bg-gold-400/15 text-gold-700">
                      Digital Guide
                    </span>
                  </div>

                  <h3 className="text-[1.25rem] font-bold text-navy-900 tracking-[-0.02em] leading-snug mb-3">
                    The Complete ABA Center<br />Startup Guide
                  </h3>
                  <p className="text-[13.5px] text-navy-800/55 leading-relaxed mb-6">
                    A comprehensive, step-by-step guide covering every phase of opening your ABA practice — written by behavioral health professionals who have been through the process.
                  </p>

                  <ul className="space-y-2.5 mb-8 flex-1">
                    {guideIncludes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[13px] text-navy-800/60 leading-relaxed">
                        <span
                          className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-[2px]"
                          style={{ backgroundColor: 'rgba(255,224,48,0.20)' }}
                        >
                          <svg className="w-2 h-2" viewBox="0 0 8 8" fill="none">
                            <path d="M1 4L3 6L7 2" stroke="#B8900E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/shop"
                    className="inline-flex items-center justify-center gap-2 text-[13.5px] font-bold text-navy-900 py-3.5 px-6 rounded-full transition-all duration-150 hover:translate-y-[-1px]"
                    style={{ backgroundColor: '#FFE030', boxShadow: '0 4px 0 #C4A800, 0 6px 14px rgba(0,0,0,0.08)' }}
                  >
                    Get the Guide
                    <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
                  </Link>

                </div>
              </div>
            </motion.div>

            {/* Coaching card */}
            <motion.div {...fade(0.12)} id="coaching">
              <div
                className="h-full rounded-2xl overflow-hidden border flex flex-col"
                style={{ backgroundColor: '#0D1B2E', borderColor: 'rgba(91,196,248,0.20)' }}
              >
                <div className="h-[3px] w-full" style={{ backgroundColor: '#5BC4F8' }} />
                <div className="p-8 flex flex-col flex-1">

                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(91,196,248,0.12)', color: '#5BC4F8' }}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </span>
                    <span
                      className="text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: 'rgba(91,196,248,0.12)', color: '#5BC4F8' }}
                    >
                      1-on-1 Coaching
                    </span>
                  </div>

                  <h3 className="text-[1.25rem] font-bold text-white tracking-[-0.02em] leading-snug mb-3">
                    Work with us directly.<br />Get personalized guidance.
                  </h3>
                  <p className="text-[13.5px] leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    Skip the trial and error. In a one-on-one coaching session, we review your specific situation — your state, your resources, your timeline — and give you a clear, actionable plan.
                  </p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {[
                      'Review your current stage and next priorities',
                      'Identify gaps in your setup before they become problems',
                      'Walk through the phases most relevant to your situation',
                      'Get answers to your specific questions from someone who knows ABA',
                      'Leave with a personalized action plan',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.60)' }}>
                        <span
                          className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-[2px]"
                          style={{ backgroundColor: 'rgba(91,196,248,0.15)' }}
                        >
                          <svg className="w-2 h-2" viewBox="0 0 8 8" fill="none">
                            <path d="M1 4L3 6L7 2" stroke="#5BC4F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="mailto:info@light2minds.com?subject=ABA Center Startup Coaching Session"
                    className="inline-flex items-center justify-center gap-2 text-[13.5px] font-bold py-3.5 px-6 rounded-full transition-all duration-150 hover:translate-y-[-1px]"
                    style={{
                      backgroundColor: '#5BC4F8',
                      color: '#0D1B2E',
                      boxShadow: '0 4px 0 #3A9ECE, 0 6px 14px rgba(0,0,0,0.20)',
                    }}
                  >
                    Book a Coaching Session
                    <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
                  </a>

                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


    </main>
  )
}
