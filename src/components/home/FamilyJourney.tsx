'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Understanding',
    body: 'Coming to terms with a diagnosis. Learning what it means for your child, your family, and your daily life — without the noise.',
  },
  {
    num: '02',
    title: 'Evaluation',
    body: 'Navigating assessments, reports, and professional evaluations. Understanding what is being measured and why.',
  },
  {
    num: '03',
    title: 'Support',
    body: 'Connecting with the right therapies — ABA, speech, occupational — and understanding how each one contributes.',
  },
  {
    num: '04',
    title: 'Skill Building',
    body: 'Learning evidence-based strategies to use at home. Creating consistent environments where your child can grow.',
  },
  {
    num: '05',
    title: 'Advocacy',
    body: 'Navigating IEPs, school systems, and insurance. Knowing your rights and speaking up effectively on your child\'s behalf.',
  },
  {
    num: '06',
    title: 'Progress',
    body: 'Measuring growth, celebrating milestones, and sustaining momentum — for your child and for your whole family.',
  },
]

export default function FamilyJourney() {
  return (
    <section className="bg-white py-24 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20"
        >
          <div className="max-w-lg">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-forest-700/55 mb-4">
              The Family Journey
            </p>
            <h2 className="text-[clamp(1.85rem,3.8vw,2.75rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
              From uncertainty<br />to confidence.
            </h2>
          </div>
          <p className="text-[15px] text-navy-800/45 leading-relaxed max-w-xs">
            Every family&apos;s path is different — but the milestones are shared. Light2minds walks alongside you at every stage.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop only) */}
          <div className="absolute top-7 left-7 right-7 h-px bg-stone-100 hidden lg:block" aria-hidden="true" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="relative"
              >
                {/* Circle */}
                <div className="relative w-14 h-14 mb-6">
                  <div className="w-14 h-14 rounded-full border border-stone-150 bg-white flex items-center justify-center relative z-10">
                    <span className="text-[11px] font-bold tracking-[0.08em] text-navy-900/30">
                      {step.num}
                    </span>
                  </div>
                  {/* Gold accent dot */}
                  <span className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-gold-400" aria-hidden="true" />
                </div>

                <h3 className="text-[15px] font-semibold text-navy-900 mb-2">{step.title}</h3>
                <p className="text-[13px] text-navy-800/48 leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
