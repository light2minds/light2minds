'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const services = [
  {
    num: '01',
    title: 'Parent Education & Support',
    body: 'Clear, jargon-free guidance on autism, ADHD, developmental delays, sensory challenges, and behavioral conditions — written for families, not clinicians.',
    href: '/parents',
    label: 'Learn More',
    bar: 'bg-forest-500',
    numColor: 'text-forest-500',
    hover: 'hover:border-forest-300',
  },
  {
    num: '02',
    title: 'RBT Exam Preparation',
    body: 'Structured study materials including mock exams, flashcards, ABA terminology glossaries, ethics case studies, and competency checklists.',
    href: '/professionals#exam',
    label: 'Explore Materials',
    bar: 'bg-sky-400',
    numColor: 'text-sky-500',
    hover: 'hover:border-sky-300',
  },
  {
    num: '03',
    title: 'ABA Center Startup',
    body: 'Step-by-step guidance for opening your own ABA practice — business planning, staffing, compliance, billing workflow, and clinical operations.',
    href: '/aba-center',
    label: 'Get Started',
    bar: 'bg-gold-400',
    numColor: 'text-gold-500',
    hover: 'hover:border-gold-300',
  },
  {
    num: '04',
    title: 'Sensory & Developmental Tools',
    body: 'Practical sensory tool recommendations, developmental activity guides, visual schedules, and reinforcement menus for home and classroom use.',
    href: '/tools',
    label: 'View Tools',
    bar: 'bg-forest-500',
    numColor: 'text-forest-500',
    hover: 'hover:border-forest-300',
  },
  {
    num: '05',
    title: 'School Support & IEP Guidance',
    body: 'Help parents understand IEP meetings, request evaluations, advocate for services, and collaborate effectively with school teams.',
    href: '/parents#iep',
    label: 'IEP Resources',
    bar: 'bg-sky-400',
    numColor: 'text-sky-500',
    hover: 'hover:border-sky-300',
  },
  {
    num: '06',
    title: 'Data & Documentation Forms',
    body: 'Printable and downloadable ABC data sheets, behavior tracking forms, session notes, parent handouts, and clinical intake packets.',
    href: '/tools',
    label: 'Download Forms',
    bar: 'bg-gold-400',
    numColor: 'text-gold-500',
    hover: 'hover:border-gold-300',
  },
]

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

export default function ServicesGrid() {
  return (
    <section className="bg-stone-50 py-24 lg:py-32 border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-14">
          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">
            What We Offer
          </p>
          <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
            Comprehensive support in six areas.
          </h2>
          <p className="text-[15px] text-navy-800/50 leading-relaxed max-w-xl">
            From understanding a diagnosis to launching a clinic — Light2minds covers the full spectrum of behavioral and developmental support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              {...fade}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                href={svc.href}
                className={`group block bg-white rounded-2xl overflow-hidden border border-stone-100 ${svc.hover} hover:-translate-y-0.5 hover:shadow-md hover:shadow-stone-200/50 transition-all duration-200 h-full`}
              >
                {/* Colored accent bar at top */}
                <div className={`h-[3px] w-full ${svc.bar}`} />
                <div className="p-7">
                  <p className={`text-[11px] font-bold tracking-[0.12em] ${svc.numColor} mb-4`}>{svc.num}</p>
                  <h3 className="text-[15px] font-semibold text-navy-900 mb-3 leading-snug group-hover:text-navy-700 transition-colors duration-150">{svc.title}</h3>
                  <p className="text-[13px] text-navy-800/45 leading-relaxed mb-6">{svc.body}</p>
                  <p className={`text-[12px] font-semibold ${svc.numColor} opacity-70 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2`}>
                    {svc.label}
                    <span className="w-4 h-px bg-current" />
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
