'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const phases = [
  {
    id: 'phase-1',
    num: '01',
    phase: 'Phase 1',
    title: 'Foundation & Legal Structure',
    body: 'Choose the right business entity, register with the Florida Division of Corporations, obtain an EIN, and establish the legal foundation before accepting clients or billing insurance.',
    steps: [
      'Choose LLC vs. PLLC vs. Corporation',
      'Register with Florida Division of Corporations (sunbiz.org)',
      'Obtain federal EIN from IRS',
      'Open a business bank account',
      'Draft an operating agreement',
    ],
  },
  {
    id: 'phase-2',
    num: '02',
    phase: 'Phase 2',
    title: 'Licensing & Credentialing',
    body: 'Florida requires specific licensure for ABA providers. Understand Agency for Health Care Administration (AHCA) requirements, BACB supervision standards, and insurance credentialing timelines.',
    steps: [
      'AHCA healthcare provider enrollment',
      'National Provider Identifier (NPI) registration',
      'Medicaid provider enrollment (Florida)',
      'Commercial insurance credentialing (BCBS, Aetna, UHC)',
      'BACB supervision requirements review',
    ],
  },
  {
    id: 'phase-3',
    num: '03',
    phase: 'Phase 3',
    title: 'Clinical Operations Setup',
    body: 'Build the clinical infrastructure your staff and clients will depend on: documentation systems, data collection workflows, client intake procedures, and behavior plan templates.',
    steps: [
      'Electronic health record (EHR) system selection',
      'Intake and consent packet development',
      'Data collection system design',
      'Clinical supervision structure and schedule',
      'Behavior intervention plan (BIP) templates',
    ],
  },
  {
    id: 'phase-4',
    num: '04',
    phase: 'Phase 4',
    title: 'Compliance & HIPAA',
    body: 'Protect your clients and your practice with a fully documented compliance program. HIPAA policies, staff training records, incident response procedures, and audit readiness.',
    steps: [
      'HIPAA Privacy and Security Policy documentation',
      'Business Associate Agreement (BAA) templates',
      'Staff HIPAA training records',
      'Incident response and breach notification procedures',
      'Annual compliance audit checklist',
    ],
  },
  {
    id: 'phase-5',
    num: '05',
    phase: 'Phase 5',
    title: 'Staffing & HR',
    body: 'Hire, onboard, and retain your clinical team. RBT and BCBA job descriptions, onboarding checklists, supervision agreements, competency evaluation forms, and compensation benchmarks.',
    steps: [
      'RBT and BCBA job description templates',
      'Staff onboarding checklist',
      'Supervision agreement templates',
      'RBT competency assessment forms',
      'Employee handbook outline',
    ],
  },
  {
    id: 'phase-6',
    num: '06',
    phase: 'Phase 6',
    title: 'Billing & Revenue Cycle',
    body: 'Build a billing workflow that captures every unit of service, submits claims correctly the first time, and follows up systematically on denials. Understand CPT codes, authorization workflows, and billing compliance.',
    steps: [
      'CPT code reference sheet (97151–97158)',
      'Authorization tracking workflow',
      'Claims submission checklist',
      'Denial management workflow',
      'Revenue cycle KPI tracking template',
    ],
  },
]

const downloads = [
  { label: 'Center Launch Checklist', body: 'A complete phase-by-phase checklist from entity formation to first client.' },
  { label: 'Intake Packet Template', body: 'Consent forms, demographic intake, release of information, and financial agreement.' },
  { label: 'Staff Onboarding Checklist', body: 'Day-1 through Day-30 onboarding steps for new clinical hires.' },
  { label: 'HIPAA Policy Template', body: 'Documented privacy and security policies ready for customization.' },
  { label: 'Supervision Agreement', body: 'BACB-compliant supervision contract template for BCBAs and RBTs.' },
  { label: 'CPT Code Reference', body: 'ABA billing code descriptions, units, and documentation requirements.' },
]

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

export default function AbaCenterPage() {
  return (
    <main>

      {/* Hero */}
      <section className="bg-navy-950 pt-36 pb-24 lg:pt-44 lg:pb-32 relative overflow-hidden">
        <span
          className="absolute bottom-0 right-0 text-[22rem] font-bold leading-none text-white/[0.015] select-none pointer-events-none"
          aria-hidden="true"
        >
          ABA
        </span>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="max-w-3xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-gold-400/45 mb-6 flex items-center gap-3">
              <span className="block w-6 h-px bg-gold-400/40" />
              ABA Center Startup Guide
            </p>
            <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-bold text-white tracking-[-0.03em] leading-[1.06] mb-7">
              Everything you need<br />to open your ABA practice.
            </h1>
            <p className="text-[clamp(1rem,1.5vw,1.15rem)] font-light text-white/45 leading-relaxed max-w-xl">
              A structured, six-phase guide for ABA professionals in Florida. Legal formation, credentialing, clinical operations, compliance, staffing, and billing — organized in sequence, with downloadable templates at each step.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Phase overview strip */}
      <section className="bg-stone-50 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-stone-200/70">
            {phases.map((ph) => (
              <a
                key={ph.id}
                href={`#${ph.id}`}
                className="py-5 px-4 text-center hover:bg-stone-100/80 transition-colors duration-150"
              >
                <p className="text-[10px] font-bold tracking-[0.1em] text-navy-700/30 uppercase mb-1">{ph.phase}</p>
                <p className="text-[12px] font-semibold text-navy-900/70 leading-tight">{ph.title.split(' ').slice(0, 3).join(' ')}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Phases */}
      {phases.map((ph, i) => (
        <section
          key={ph.id}
          id={ph.id}
          className={`py-24 lg:py-32 border-b border-stone-200/60 ${i % 2 === 0 ? 'bg-white' : 'bg-stone-50'}`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <motion.div {...fade} transition={{ duration: 0.65 }}>
                <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-3">
                  {ph.phase}
                </p>
                <p className="text-[4.5rem] font-bold leading-none tracking-[-0.04em] mb-4" style={{ color: 'rgba(13,27,46,0.05)' }}>
                  {ph.num}
                </p>
                <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.15] mb-4">
                  {ph.title}
                </h2>
                <p className="text-[15px] text-navy-800/50 leading-relaxed">{ph.body}</p>
              </motion.div>

              <motion.div {...fade} transition={{ duration: 0.55, delay: 0.1 }}>
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-navy-700/35 mb-4">Key Steps</p>
                <ul className="space-y-0 border border-stone-200/70 rounded-2xl overflow-hidden">
                  {ph.steps.map((step, j) => (
                    <li
                      key={step}
                      className={`px-6 py-4 text-[13px] font-medium text-navy-800/65 flex items-center gap-4 ${j < ph.steps.length - 1 ? 'border-b border-stone-100' : ''}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Operations section */}
      <section id="operations" className="bg-stone-50 py-24 lg:py-32 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">
                Downloadable Templates
              </p>
              <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
                Templates for every stage<br />of your center launch.
              </h2>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-3 text-[13px] font-semibold text-navy-900 border border-navy-900/18 px-6 py-3 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200 self-start lg:self-auto"
            >
              Browse all tools
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {downloads.map((d, i) => (
              <motion.div
                key={d.label}
                {...fade}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white border border-stone-200/70 rounded-2xl p-7"
              >
                <h3 className="text-[14px] font-semibold text-navy-900 mb-2">{d.label}</h3>
                <p className="text-[13px] text-navy-800/45 leading-relaxed">{d.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-navy-950 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-20">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="flex-1">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-gold-400/45 mb-4">
              Professional Resources
            </p>
            <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-white tracking-[-0.025em] leading-[1.1] mb-4">
              Building your practice starts with building your skills.
            </h2>
            <p className="text-[15px] text-white/40 leading-relaxed">
              Explore RBT exam preparation, clinical documentation templates, and career development tools.
            </p>
          </motion.div>
          <motion.div {...fade} transition={{ duration: 0.55, delay: 0.15 }} className="flex-shrink-0 flex flex-col sm:flex-row gap-4">
            <Link
              href="/professionals"
              className="inline-flex items-center gap-3 text-[13px] font-semibold text-white border border-white/15 px-6 py-3 rounded-full hover:bg-white hover:text-navy-950 transition-all duration-200"
            >
              Professional tools
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-3 text-[13px] font-semibold text-white/50 hover:text-white transition-colors duration-200 px-2 py-3"
            >
              All resources
              <span className="w-4 h-px bg-current" />
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
