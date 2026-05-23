'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const stages = [
  {
    num: '01',
    title: 'Understanding the Diagnosis',
    body: 'A diagnosis is not a ceiling — it is a starting point. We break down what autism, ADHD, and developmental diagnoses actually mean in plain language, separated from fear and misinformation.',
    links: [
      { label: 'What is ABA therapy?', href: '/tools#parent-tools' },
      { label: 'Diagnosis overview guide', href: '/tools#parent-tools' },
    ],
  },
  {
    num: '02',
    title: 'Navigating Evaluations',
    body: 'Understand what happens during assessments, how to read evaluation reports, and how to interpret recommendations from psychologists and developmental pediatricians.',
    links: [
      { label: 'Evaluation checklist', href: '/tools#parent-tools' },
      { label: 'Reading your child\'s report', href: '/tools#parent-tools' },
    ],
  },
  {
    num: '03',
    title: 'Choosing the Right Support',
    body: 'From ABA to speech therapy, occupational therapy, and social skills groups — learn what each discipline addresses, what to ask providers, and how to compare options.',
    links: [
      { label: 'Therapy comparison guide', href: '/tools#parent-tools' },
      { label: 'Questions to ask your BCBA', href: '/tools#parent-tools' },
    ],
  },
  {
    num: '04',
    title: 'Building Skills at Home',
    body: 'Evidence-based strategies for reinforcing progress between sessions. Structured routines, natural environment teaching, and behavioral support that families can implement today.',
    links: [
      { label: 'Home strategy handouts', href: '/tools#parent-tools' },
      { label: 'Visual schedule templates', href: '/tools#parent-tools' },
    ],
  },
  {
    num: '05',
    title: 'Advocating at School',
    body: 'IEPs, 504 plans, ESY services, and placement decisions. Know your rights under IDEA and Section 504. Walk into every meeting informed and prepared.',
    links: [
      { label: 'IEP preparation guide', href: '/tools#parent-tools' },
      { label: 'Parent rights summary', href: '/tools#parent-tools' },
    ],
  },
  {
    num: '06',
    title: 'Insurance & Access',
    body: 'Navigate prior authorizations, benefit letters, and coverage disputes. Understand what ABA therapy coverage looks like in Florida and how to advocate for services.',
    links: [
      { label: 'Insurance appeal template', href: '/tools#parent-tools' },
      { label: 'Florida coverage overview', href: '/tools#parent-tools' },
    ],
  },
]

const resources = [
  {
    label: 'Parent Handouts',
    count: '7',
    body: 'Printable guides on diagnosis, behavior strategies, and communication for families.',
  },
  {
    label: 'Reinforcement Tools',
    count: '3',
    body: 'Token boards, reward menus, and visual reinforcement systems.',
  },
  {
    label: 'Home Program Guides',
    count: '2',
    body: 'Step-by-step skill-building routines designed for home implementation.',
  },
]

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

export default function ParentsPage() {
  return (
    <main>

      {/* Hero */}
      <section className="bg-stone-50 pt-36 pb-24 lg:pt-44 lg:pb-32 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="max-w-3xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-forest-700/55 mb-6 flex items-center gap-3">
              <span className="block w-6 h-px bg-forest-700/40" />
              For Families
            </p>
            <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-bold text-navy-900 tracking-[-0.03em] leading-[1.06] mb-7">
              Clarity for every stage<br />of your child&apos;s journey.
            </h1>
            <p className="text-[clamp(1rem,1.5vw,1.15rem)] font-light text-navy-800/55 leading-relaxed max-w-xl">
              From the moment of diagnosis through school advocacy and beyond — structured guidance, practical tools, and honest answers for families navigating behavioral and developmental differences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Journey stages */}
      <section className="bg-white py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-16 max-w-lg">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">
              The Path Forward
            </p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
              Six stages. Practical guidance<br />at every one.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-100 border border-stone-100 rounded-2xl overflow-hidden">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.num}
                {...fade}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="bg-white p-8 lg:p-10"
              >
                <p className="text-[2.5rem] font-bold leading-none tracking-[-0.04em] mb-6" style={{ color: 'rgba(13,27,46,0.06)' }}>
                  {stage.num}
                </p>
                <h3 className="text-[15px] font-semibold text-navy-900 mb-3">{stage.title}</h3>
                <p className="text-[13px] text-navy-800/45 leading-relaxed mb-5">{stage.body}</p>
                <ul className="space-y-2">
                  {stage.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[12px] font-medium text-navy-600/60 hover:text-navy-900 transition-colors duration-150 flex items-center gap-2"
                      >
                        <span className="w-3 h-px bg-current" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources strip */}
      <section className="bg-stone-50 py-24 lg:py-32 border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">
                Free Downloads
              </p>
              <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
                Resources built for families.
              </h2>
            </div>
            <Link
              href="/tools#parent-tools"
              className="inline-flex items-center gap-3 text-[13px] font-semibold text-navy-900 border border-navy-900/18 px-6 py-3 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200 self-start lg:self-auto"
            >
              Browse all parent resources
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {resources.map((r, i) => (
              <motion.div
                key={r.label}
                {...fade}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-white border border-stone-200/70 rounded-2xl p-8"
              >
                <p className="text-[3rem] font-bold leading-none tracking-[-0.04em] mb-5" style={{ color: 'rgba(13,27,46,0.07)' }}>
                  {r.count}
                </p>
                <h3 className="text-[14px] font-semibold text-navy-900 mb-2">{r.label}</h3>
                <p className="text-[13px] text-navy-800/45 leading-relaxed">{r.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-950 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-gold-400/45 mb-6">
              ABA Professionals
            </p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-white tracking-[-0.025em] leading-[1.1] mb-5">
              Are you working in ABA or training to become an RBT?
            </h2>
            <p className="text-[15px] text-white/45 leading-relaxed mb-10 max-w-lg">
              Light2minds provides a complete professional ecosystem — from RBT exam preparation to clinical documentation systems and practice startup guides.
            </p>
            <Link
              href="/professionals"
              className="inline-flex items-center gap-3 text-[13px] font-semibold text-white border border-white/15 px-6 py-3 rounded-full hover:bg-white hover:text-navy-950 transition-all duration-200"
            >
              Explore professional tools
              <span className="w-4 h-px bg-current" />
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
