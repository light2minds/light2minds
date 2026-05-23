'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const sections = [
  {
    id: 'exam',
    num: '01',
    title: 'RBT Exam Preparation',
    label: 'Certification',
    body: 'Structured coverage of the full RBT Task List (2nd Edition). Practice questions mapped to each domain, a full mock exam, and an ethics reference sheet designed to help you pass on your first attempt.',
    items: [
      'Task List domain breakdowns',
      'Practice questions by domain',
      'Full mock exam (85 questions)',
      'Ethics & professional conduct reference',
      'Interactive flashcard sets',
    ],
  },
  {
    id: 'documentation',
    num: '02',
    title: 'ABA Documentation Systems',
    label: 'Clinical Use',
    body: 'Complete templates for daily clinical documentation. Session notes, data collection sheets, supervision logs, and reporting tools formatted for real-world clinical environments.',
    items: [
      'Session note templates (SOAP format)',
      'Supervision meeting logs',
      'Monthly progress report templates',
      'Competency assessment forms',
      'Incident documentation forms',
    ],
  },
  {
    id: 'career',
    num: '03',
    title: 'Career Development',
    label: 'Growth',
    body: 'From your first RBT position to BCBA licensure and beyond. Resume templates, interview preparation guides, career pathway maps, and a complete overview of the path from RBT to BCBA.',
    items: [
      'RBT resume and cover letter templates',
      'Interview question preparation guide',
      'RBT → BCaBA → BCBA pathway map',
      'Supervision hour tracking template',
      'BCBA exam application checklist',
    ],
  },
]

const tools = [
  {
    label: 'ABC Data Forms',
    body: 'Antecedent-behavior-consequence recording sheets for functional assessment.',
  },
  {
    label: 'Interval Recording',
    body: 'Partial and whole interval recording templates for behavior observation.',
  },
  {
    label: 'Task Analysis Templates',
    body: 'Blank and sample task analyses for skill chaining programs.',
  },
  {
    label: 'Preference Assessments',
    body: 'Paired stimulus and multiple stimulus without replacement (MSWO) formats.',
  },
  {
    label: 'Behavior Intervention Plans',
    body: 'Blank BIP templates with function-based intervention framework.',
  },
  {
    label: 'Token Economy Systems',
    body: 'Customizable token board designs for individual and group settings.',
  },
]

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

export default function ProfessionalsPage() {
  return (
    <main>

      {/* Hero */}
      <section className="bg-navy-950 pt-36 pb-24 lg:pt-44 lg:pb-32 overflow-hidden relative">
        <span
          className="absolute top-8 right-12 text-[18rem] font-bold leading-none text-white/[0.02] select-none pointer-events-none"
          aria-hidden="true"
        >
          ABA
        </span>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="max-w-3xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-gold-400/45 mb-6 flex items-center gap-3">
              <span className="block w-6 h-px bg-gold-400/40" />
              For Professionals
            </p>
            <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-bold text-white tracking-[-0.03em] leading-[1.06] mb-7">
              A complete system for<br />your ABA career.
            </h1>
            <p className="text-[clamp(1rem,1.5vw,1.15rem)] font-light text-white/45 leading-relaxed max-w-xl">
              RBT exam preparation, clinical documentation, career development tools, and a full guide to launching your own ABA practice — everything you need, structured and free.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main sections */}
      {sections.map((sec, i) => (
        <section
          key={sec.id}
          id={sec.id}
          className={`py-24 lg:py-32 border-b border-stone-200/60 ${i % 2 === 0 ? 'bg-white' : 'bg-stone-50'}`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <motion.div {...fade} transition={{ duration: 0.65 }}>
                <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">
                  {sec.label}
                </p>
                <p className="text-[5rem] font-bold leading-none tracking-[-0.04em] mb-6" style={{ color: 'rgba(13,27,46,0.05)' }}>
                  {sec.num}
                </p>
                <h2 className="text-[clamp(1.5rem,2.8vw,2.1rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.15] mb-5">
                  {sec.title}
                </h2>
                <p className="text-[15px] text-navy-800/50 leading-relaxed">
                  {sec.body}
                </p>
              </motion.div>

              <motion.div {...fade} transition={{ duration: 0.55, delay: 0.12 }}>
                <ul className="space-y-0 border border-stone-200/70 rounded-2xl overflow-hidden">
                  {sec.items.map((item, j) => (
                    <li
                      key={item}
                      className={`px-6 py-4 text-[13px] font-medium text-navy-800/70 flex items-center gap-4 ${j < sec.items.length - 1 ? 'border-b border-stone-100' : ''}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <Link
                    href="/tools#clinical-tools"
                    className="text-[12px] font-semibold text-navy-600/55 hover:text-navy-900 transition-colors duration-150 flex items-center gap-2"
                  >
                    <span className="w-4 h-px bg-current" />
                    Download these resources
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Clinical tools grid */}
      <section id="clinical-tools" className="bg-white py-24 lg:py-32 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-14">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">
              Clinical Tools
            </p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
              Data collection and measurement<br />tools for daily clinical use.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.label}
                {...fade}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="border border-stone-200/70 rounded-2xl p-7 bg-stone-50/60"
              >
                <h3 className="text-[14px] font-semibold text-navy-900 mb-2">{tool.label}</h3>
                <p className="text-[13px] text-navy-800/45 leading-relaxed">{tool.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade} transition={{ duration: 0.5, delay: 0.3 }} className="mt-10">
            <Link
              href="/tools#clinical-tools"
              className="inline-flex items-center gap-3 text-[13px] font-semibold text-navy-900 border border-navy-900/18 px-6 py-3 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200"
            >
              Browse all clinical tools
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ABA center CTA */}
      <section className="bg-navy-950 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="max-w-xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-gold-400/45 mb-4">
              Practice Ownership
            </p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.4rem)] font-bold text-white tracking-[-0.025em] leading-[1.1] mb-4">
              Ready to open your own ABA center?
            </h2>
            <p className="text-[15px] text-white/45 leading-relaxed">
              A complete, step-by-step guide from business formation to your first client session — built specifically for ABA practitioners in Florida.
            </p>
          </motion.div>
          <motion.div {...fade} transition={{ duration: 0.55, delay: 0.15 }} className="flex-shrink-0">
            <Link
              href="/aba-center"
              className="inline-flex items-center gap-3 text-[13px] font-semibold text-white border border-white/15 px-7 py-3.5 rounded-full hover:bg-white hover:text-navy-950 transition-all duration-200"
            >
              ABA Center Startup Guide
              <span className="w-4 h-px bg-current" />
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
