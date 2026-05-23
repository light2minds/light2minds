'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Accordion from '@/components/Accordion'

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

const quickNav = [
  { href: '#business', label: 'Business Plan' },
  { href: '#operations', label: 'Operations' },
  { href: '#intake', label: 'Intake & Packets' },
  { href: '#staff', label: 'Staff Onboarding' },
  { href: '#compliance', label: 'Compliance' },
  { href: '#billing', label: 'Billing Workflow' },
  { href: '#clinical', label: 'Clinical Workflow' },
  { href: '#templates', label: 'Templates' },
]

const overviewPhases = [
  { num: '01', title: 'Phase 1', body: 'Business planning, entity formation, and market research' },
  { num: '02', title: 'Phase 2', body: 'Operations setup, space, hiring, and credentialing' },
  { num: '03', title: 'Phase 3', body: 'Documentation systems, intake process, and compliance' },
  { num: '04', title: 'Phase 4', body: 'Billing, clinical workflows, and serving your first clients' },
]

const entityItems = [
  {
    trigger: 'LLC (Limited Liability Company)',
    content: (
      <p>The most popular choice for small ABA practices. Provides personal liability protection and flexible tax treatment. Easy to form through Florida Division of Corporations (sunbiz.org). Low annual fees.</p>
    ),
  },
  {
    trigger: 'PLLC (Professional LLC)',
    content: (
      <p>Required in some states for licensed professionals; in Florida, a BCBA may form an LLC or PLLC depending on how the practice is structured. Consult an attorney to determine the right entity type for your licensure status.</p>
    ),
  },
  {
    trigger: 'S-Corp or C-Corp',
    content: (
      <p>More complex entity types typically used as practices grow. S-Corp election can provide tax advantages at higher revenue levels. Consult a CPA familiar with healthcare businesses before choosing this structure.</p>
    ),
  },
]

const operationsCards = [
  {
    title: 'Your Physical Space',
    body: 'For a center-based practice, look for a location that is accessible, zoned appropriately for medical/therapy services, and has sufficient room for therapy rooms, a waiting area, and admin space. ABA therapy rooms should be distraction-minimal with appropriate lighting.',
    bullets: [
      'Minimum 80–100 sq ft per therapy room',
      'ADA accessible entry and restrooms',
      'Safe, secure environment for children',
      'Outdoor play area if possible',
    ],
    accent: 'bg-navy-50 border-navy-100',
  },
  {
    title: 'Practice Management Software',
    body: 'You\'ll need software to manage scheduling, documentation, billing, and client records. Popular options in the ABA space include CentralReach, Catalyst, ABADesk, and Rethink Ed. Evaluate cost, training requirements, and insurance integrations carefully.',
    bullets: [
      'Electronic health record (EHR) system',
      'Session scheduling and notes',
      'Billing and insurance claims',
      'Data collection tools',
    ],
    accent: 'bg-forest-50 border-forest-100',
  },
  {
    title: 'HIPAA Compliance Setup',
    body: 'As a healthcare provider, you are required to comply with HIPAA. This includes appointing a Privacy Officer, completing a risk assessment, training all staff, and having Business Associate Agreements (BAAs) with any vendors who access protected health information (PHI).',
    bullets: [
      'Written privacy policies and procedures',
      'Staff HIPAA training (documented)',
      'Secure storage of client records',
      'BAAs with software vendors',
    ],
    accent: 'bg-gold-50 border-gold-200',
  },
]

const credentialingSteps = [
  {
    num: '1',
    title: 'Obtain Your NPI Number',
    body: 'Apply for an NPI Type 1 (individual) and NPI Type 2 (organization) through the NPPES registry at nppes.cms.hhs.gov. This is free and required for all insurance billing.',
  },
  {
    num: '2',
    title: 'Enroll in Medicaid',
    body: 'Florida Medicaid covers ABA therapy for eligible children. Enroll through the Florida Medicaid provider portal. Each BCBA and the practice entity must be enrolled separately.',
  },
  {
    num: '3',
    title: 'Credential with Commercial Insurers',
    body: 'Contact major insurers operating in Florida (Blue Cross, Aetna, United Healthcare, Cigna, etc.) to request provider credentialing applications. Many use the CAQH ProView system to streamline the process.',
  },
  {
    num: '4',
    title: 'Understand Billing Codes',
    body: 'ABA services are billed using CPT codes (97151–97158 for ABA, and H2019 for Medicaid in some states). Work with a billing specialist who knows ABA to avoid denied claims.',
  },
]

const intakeSteps = [
  {
    num: '1',
    title: 'Initial Inquiry',
    body: 'Phone or email inquiry from the family. Collect basic information, confirm diagnosis, and check insurance. Do a brief needs screening to ensure you can serve the family.',
  },
  {
    num: '2',
    title: 'Insurance Verification',
    body: 'Verify the client\'s benefits before scheduling any services. Confirm coverage for ABA therapy (CPT codes, prior authorization requirements, in-network status, co-pay, and deductible).',
  },
  {
    num: '3',
    title: 'Send Parent Intake Packet',
    body: 'Send (or collect in person) all required intake documents. See the checklist on the right for what to include.',
  },
  {
    num: '4',
    title: 'Schedule the Initial Assessment',
    body: 'The supervising BCBA conducts a comprehensive assessment (often using tools such as VB-MAPP, ABLLS-R, AFLS, or ADOS-2 results from a prior evaluation). This forms the basis of the treatment plan.',
  },
  {
    num: '5',
    title: 'Submit for Prior Authorization',
    body: 'Most insurers require prior authorization (PA) before ABA services begin. Submit the completed assessment report and treatment plan to the insurer and await approval.',
  },
  {
    num: '6',
    title: 'Begin Services',
    body: 'Once PA is approved, schedule the first therapy session. Assign a primary RBT, introduce the family to the team, and review the program overview with parents.',
  },
]

const billingSteps = [
  {
    num: '1',
    title: 'Verify Benefits Before Every Authorization Period',
    body: 'Insurance benefits change. Verify coverage at intake and before each authorization renewal. Record the reference number for every verification call.',
  },
  {
    num: '2',
    title: 'Obtain Prior Authorization (PA)',
    body: 'Most ABA services require a PA before sessions can begin or renew. The PA is based on a BCBA assessment and treatment plan. Submit all required documents promptly — delays in PA mean delayed services.',
  },
  {
    num: '3',
    title: 'Use Correct ABA CPT Codes',
    body: 'ABA services are billed with specific CPT codes: 97151 (adaptive behavior assessment), 97153 (adaptive behavior treatment by RBT), 97155 (protocol modification by BCBA), 97156 (family training by BCBA), and others. Each code has specific requirements about who delivers and supervises the service.',
  },
  {
    num: '4',
    title: 'Submit Clean Claims Promptly',
    body: 'Submit claims within the timely filing limit (varies by insurer — typically 90–365 days). Ensure all required fields are completed accurately. Common denial reasons include missing modifiers, incorrect diagnosis codes, or no active PA.',
  },
  {
    num: '5',
    title: 'Manage Denials and Appeals',
    body: 'Denied claims must be tracked and appealed within the insurer\'s appeal window. A good billing system and dedicated billing staff or partner can dramatically reduce your denial rate.',
  },
  {
    num: '6',
    title: 'Collect Patient Responsibility',
    body: 'Clearly communicate co-pay and deductible obligations to families at intake. Collect co-pays at time of service. Have a written financial agreement and payment policy — enforced consistently to avoid awkward conversations later.',
  },
]

const clinicalSteps = [
  {
    num: '1',
    title: 'Initial Intake Assessment',
    body: 'BCBA conducts a comprehensive assessment using standardized tools (VB-MAPP, ABLLS-R, AFLS, PEAK) and direct observation. Parent interview is included.',
  },
  {
    num: '2',
    title: 'Treatment Plan Development',
    body: 'BCBA writes the treatment plan, including: present levels, long-term goals, short-term objectives, recommended intensity (hours/week), and proposed interventions.',
  },
  {
    num: '3',
    title: 'Program Implementation by RBT Team',
    body: 'RBTs implement programs as designed, collect data every session, and communicate observations to the supervising BCBA.',
  },
  {
    num: '4',
    title: 'Ongoing Supervision & Program Review',
    body: 'BCBA reviews data graphs, adjusts programs, provides feedback to RBTs, and meets with families regularly. Programs are never static — they evolve with the learner.',
  },
  {
    num: '5',
    title: 'Progress Reporting & Authorization Renewals',
    body: 'BCBA writes progress reports at regular intervals (typically every 6 months) and submits to insurers for authorization renewal. Goals are updated based on data.',
  },
  {
    num: '6',
    title: 'Discharge Planning',
    body: 'When treatment goals are met or services end, the BCBA prepares a discharge summary and transition plan — including recommendations for school support, community programs, or other services.',
  },
]

const templates = [
  {
    title: 'Client Intake Packet',
    body: 'Consent forms, HIPAA notices, developmental history questionnaire, and financial agreement.',
    format: 'PDF + Word',
  },
  {
    title: 'Staff Onboarding Packet',
    body: 'Employee handbook template, HIPAA acknowledgment, confidentiality agreement, and onboarding checklist.',
    format: 'PDF + Word',
  },
  {
    title: 'Treatment Plan Template',
    body: 'BCBA-designed treatment plan format with present levels, goals, objectives, and methodology sections.',
    format: 'Word',
  },
  {
    title: 'Session Note Template',
    body: 'Insurance-ready session note format covering all required elements for ABA billing compliance.',
    format: 'PDF + Word',
  },
  {
    title: 'Center Launch Checklist',
    body: 'A comprehensive pre-launch checklist covering legal, clinical, operational, and compliance milestones.',
    format: 'PDF',
  },
  {
    title: 'Billing Workflow Guide',
    body: 'Step-by-step billing workflow, CPT code reference, prior authorization tracking sheet, and denial management log.',
    format: 'PDF + Excel',
  },
  {
    title: 'HIPAA Policy Templates',
    body: 'Privacy policy, notice of privacy practices, breach notification procedure, and staff training acknowledgment form.',
    format: 'Word',
  },
  {
    title: 'Supervision Documentation Log',
    body: 'BACB-aligned supervision log for documenting RBT supervision sessions — required for RBT certification maintenance.',
    format: 'PDF + Excel',
  },
]

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
              Open Your Own<br />ABA Center
            </h1>
            <p className="text-[clamp(1rem,1.5vw,1.15rem)] font-light text-white/45 leading-relaxed max-w-xl mb-8">
              Launching an ABA therapy practice is one of the most meaningful business decisions you can make. This guide walks you through every phase — from the first business plan to your first client session.
            </p>
            <div className="flex flex-wrap gap-3">
              {quickNav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center text-[12px] font-semibold text-gold-300/70 bg-white/[0.05] border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 hover:text-gold-300 transition-all duration-150"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-white border-b border-stone-200/60 py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[12px] text-navy-800/50 leading-relaxed">
            <span className="font-semibold text-navy-800/70">Important Notice: </span>
            The content in this section is for educational and informational purposes only. It does not constitute legal, financial, medical, or clinical consultation. Starting an ABA practice involves complex legal, regulatory, and clinical considerations. Always consult with a licensed attorney, accountant, BCBA, and compliance specialist before making business decisions.
          </p>
        </div>
      </div>

      {/* Overview — 4 phases */}
      <section className="bg-stone-50 py-24 lg:py-32 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-14 text-center">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">At a Glance</p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
              What Does Opening an ABA Center Involve?
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed max-w-2xl mx-auto">
              Starting a therapy practice is rewarding but complex. Here&apos;s the high-level roadmap across all phases of launch.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {overviewPhases.map((ph, i) => (
              <motion.div
                key={ph.num}
                {...fade}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white border border-stone-200/70 rounded-2xl p-7 text-center"
              >
                <p className="text-[3rem] font-bold text-navy-900/[0.05] leading-none mb-3 tracking-[-0.04em]">{ph.num}</p>
                <h3 className="text-[14px] font-semibold text-navy-900 mb-2">{ph.title}</h3>
                <p className="text-[13px] text-navy-800/45 leading-relaxed">{ph.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Phase 1 — Business Planning */}
      <section id="business" className="bg-white py-24 lg:py-32 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-full bg-navy-900 text-white text-[1.1rem] font-bold flex items-center justify-center flex-shrink-0">1</div>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em]">Business Planning &amp; Entity Formation</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div {...fade} transition={{ duration: 0.65 }}>
              <p className="text-[15px] text-navy-800/55 leading-relaxed mb-8">
                A solid business plan is the foundation of a sustainable ABA practice. Before spending a dollar on rent or hiring, you need clarity on your model, market, and finances.
              </p>

              <h3 className="text-[14px] font-semibold text-navy-900 mb-4">Your Business Plan Should Include:</h3>
              <ul className="space-y-3 mb-10">
                {[
                  'Executive summary and mission statement',
                  'Target population and geographic service area',
                  'Service model (home-based, center-based, or hybrid)',
                  'Competitive landscape and differentiators',
                  'Projected startup costs and operating budget',
                  'Revenue projections based on billing rates and capacity',
                  'Marketing and referral strategy',
                  '3-year financial forecast',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[13px] text-navy-800/60 leading-relaxed">
                    <span className="w-4 h-4 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-2 h-2 text-navy-600" viewBox="0 0 8 8" fill="currentColor"><path d="M1.5 4L3.5 6L6.5 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-[14px] font-semibold text-navy-900 mb-4">Common Business Entity Options in Florida:</h3>
              <Accordion items={entityItems} openFirst />
            </motion.div>

            <motion.div {...fade} transition={{ duration: 0.55, delay: 0.1 }}>
              <div className="bg-white border border-stone-200/70 rounded-2xl p-7 mb-6">
                <h4 className="text-[14px] font-semibold text-navy-900 mb-5">Pre-Launch Checklist — Legal &amp; Financial</h4>
                <ul className="space-y-3">
                  {[
                    'Choose and register your business name (Florida SunBiz)',
                    'Form your legal entity (LLC, PLLC)',
                    'Obtain a Federal Employer Identification Number (EIN) from IRS',
                    'Open a dedicated business bank account',
                    'Obtain professional liability (malpractice) insurance',
                    'Obtain general business liability insurance',
                    'Consult a CPA to set up your accounting system',
                    'Create a Florida Department of Health account if applicable',
                    'Apply for an NPI (National Provider Identifier) number',
                    'Draft a business plan and financial projections',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[13px] text-navy-800/60 leading-relaxed">
                      <span className="w-4 h-4 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-2 h-2 text-forest-600" viewBox="0 0 8 8" fill="currentColor"><path d="M1.5 4L3.5 6L6.5 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gold-50 border border-gold-200 rounded-2xl p-6">
                <h4 className="text-[14px] font-semibold text-navy-900 mb-2">Startup Cost Estimate</h4>
                <p className="text-[13px] text-navy-800/55 leading-relaxed">
                  Typical startup costs for a small center-based ABA practice range from $30,000 to $100,000+, depending on location, space size, and staffing. Home-based models have significantly lower initial overhead.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Phase 2 — Operations */}
      <section id="operations" className="bg-stone-50 py-24 lg:py-32 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-full bg-navy-900 text-white text-[1.1rem] font-bold flex items-center justify-center flex-shrink-0">2</div>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em]">Operations Setup</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {operationsCards.map((card, i) => (
              <motion.div
                key={card.title}
                {...fade}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={`rounded-2xl border p-7 ${card.accent}`}
              >
                <h3 className="text-[14px] font-semibold text-navy-900 mb-3">{card.title}</h3>
                <p className="text-[13px] text-navy-800/55 leading-relaxed mb-4">{card.body}</p>
                <ul className="space-y-2">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[12px] text-navy-800/50">
                      <span className="w-1 h-1 rounded-full bg-navy-400 flex-shrink-0 mt-[5px]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade} transition={{ duration: 0.65 }}>
            <h3 className="text-[16px] font-semibold text-navy-900 mb-3">Credentialing with Insurance</h3>
            <p className="text-[14px] text-navy-800/50 leading-relaxed mb-8 max-w-2xl">
              Credentialing is the process of becoming an approved in-network provider with insurance companies. It can take 3–6 months, so start this process early — ideally before you open your doors.
            </p>
            <div className="space-y-5">
              {credentialingSteps.map((step) => (
                <div key={step.num} className="flex gap-5">
                  <div className="w-8 h-8 rounded-full bg-navy-900 text-white text-[13px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{step.num}</div>
                  <div>
                    <h4 className="text-[14px] font-semibold text-navy-900 mb-1">{step.title}</h4>
                    <p className="text-[13px] text-navy-800/55 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Phase 3 — Intake */}
      <section id="intake" className="bg-white py-24 lg:py-32 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-navy-900 text-white text-[1.1rem] font-bold flex items-center justify-center flex-shrink-0">3</div>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em]">Intake Process &amp; Parent Packets</h2>
          </div>
          <p className="text-[15px] text-navy-800/50 leading-relaxed mb-12 max-w-2xl">
            The intake process is your client&apos;s first experience with your practice. A smooth, organized, and warm intake sets the tone for the entire therapeutic relationship.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div {...fade} transition={{ duration: 0.65 }}>
              <h3 className="text-[15px] font-semibold text-navy-900 mb-6">Intake Workflow — Step by Step</h3>
              <div className="space-y-5">
                {intakeSteps.map((step) => (
                  <div key={step.num} className="flex gap-5">
                    <div className="w-8 h-8 rounded-full bg-navy-900 text-white text-[13px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{step.num}</div>
                    <div>
                      <h4 className="text-[14px] font-semibold text-navy-900 mb-1">{step.title}</h4>
                      <p className="text-[13px] text-navy-800/55 leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fade} transition={{ duration: 0.55, delay: 0.1 }}>
              <div className="bg-white border border-stone-200/70 rounded-2xl p-7 mb-6">
                <h4 className="text-[14px] font-semibold text-navy-900 mb-5">Parent Intake Packet — What to Include</h4>
                <ul className="space-y-3">
                  {[
                    'Welcome letter and practice overview',
                    'Consent for treatment (signed by legal guardian)',
                    'HIPAA Notice of Privacy Practices & acknowledgment',
                    'Release of records authorization form',
                    'Insurance information and benefit assignment form',
                    'Financial agreement / fee schedule',
                    'Child background and developmental history form',
                    'Parent / caregiver contact and emergency information',
                    'Photo, media, and communication consent',
                    'Attendance and cancellation policy acknowledgment',
                    'Mandated reporter disclosure',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[13px] text-navy-800/60 leading-relaxed">
                      <span className="w-4 h-4 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-2 h-2 text-forest-600" viewBox="0 0 8 8" fill="currentColor"><path d="M1.5 4L3.5 6L6.5 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-navy-50 border border-navy-100 rounded-2xl p-6">
                <h4 className="text-[14px] font-semibold text-navy-900 mb-2">Ready-to-Use Intake Templates</h4>
                <p className="text-[13px] text-navy-800/55 leading-relaxed mb-4">
                  Download our customizable intake packet templates — professionally written, HIPAA-aware, and ready to brand with your practice name.
                </p>
                <a
                  href="#templates"
                  className="inline-flex items-center text-[12px] font-semibold text-navy-900 border border-navy-900/20 px-4 py-2 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200"
                >
                  Get Intake Templates
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Phase 4 — Staff Onboarding */}
      <section id="staff" className="bg-stone-50 py-24 lg:py-32 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-navy-900 text-white text-[1.1rem] font-bold flex items-center justify-center flex-shrink-0">4</div>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em]">Staff Onboarding</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div {...fade} transition={{ duration: 0.65 }}>
              <p className="text-[15px] text-navy-800/50 leading-relaxed mb-8">
                Your staff are the most important asset in your practice. A thorough onboarding process ensures quality, safety, and compliance from day one.
              </p>

              <h3 className="text-[14px] font-semibold text-navy-900 mb-4">Before the First Day</h3>
              <ul className="space-y-3 mb-8">
                {[
                  'Verify credentials — RBT registry, BCBA certification, Florida Medicaid eligibility',
                  'Background screening (Level 2 fingerprinting required in Florida)',
                  'CPR and First Aid certification (current)',
                  'Signed offer letter and employment agreement',
                  'Signed confidentiality / HIPAA agreement',
                  'I-9 employment eligibility verification',
                  'W-4 or W-9 (depending on employment classification)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[13px] text-navy-800/60 leading-relaxed">
                    <span className="w-4 h-4 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-2 h-2 text-navy-600" viewBox="0 0 8 8" fill="currentColor"><path d="M1.5 4L3.5 6L6.5 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-[14px] font-semibold text-navy-900 mb-4">First Week Onboarding</h3>
              <ul className="space-y-3">
                {[
                  'Practice policies and procedures review',
                  'HIPAA training (documented)',
                  'Mandated reporter training',
                  'Data collection system training',
                  'Crisis prevention and safety protocol training',
                  'Client-specific program overview with supervising BCBA',
                  'Shadowing and co-session with experienced team member',
                  'Emergency procedures and evacuation plan review',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[13px] text-navy-800/60 leading-relaxed">
                    <span className="w-4 h-4 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-2 h-2 text-forest-600" viewBox="0 0 8 8" fill="currentColor"><path d="M1.5 4L3.5 6L6.5 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fade} transition={{ duration: 0.55, delay: 0.1 }}>
              <div className="bg-white border border-stone-200/70 rounded-2xl p-7 mb-6">
                <h4 className="text-[14px] font-semibold text-navy-900 mb-2">Supervision Structure for RBTs</h4>
                <p className="text-[13px] text-navy-800/45 leading-relaxed mb-5">
                  BACB requirements state that RBTs must receive ongoing supervision from a qualified BCBA. Your practice must have a formal supervision structure in place.
                </p>
                <ul className="space-y-3">
                  {[
                    'A minimum of 5% of total therapy hours per month must be supervised by a BCBA',
                    'At least 1 hour of supervision per week for new RBTs',
                    'Supervision can be individual or group, in-person or remote',
                    'All supervision must be documented with date, time, and skills reviewed',
                    'The BCBA must review data and update programs regularly',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[13px] text-navy-800/60 leading-relaxed">
                      <span className="w-4 h-4 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-2 h-2 text-navy-600" viewBox="0 0 8 8" fill="currentColor"><path d="M1.5 4L3.5 6L6.5 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-forest-50 border border-forest-100 rounded-2xl p-6">
                <h4 className="text-[14px] font-semibold text-navy-900 mb-2">Staff Onboarding Packet Template</h4>
                <p className="text-[13px] text-navy-800/55 leading-relaxed mb-4">
                  Download a complete staff onboarding packet — includes employee handbook template, HIPAA training acknowledgment, confidentiality agreement, and first-week checklist.
                </p>
                <a
                  href="#templates"
                  className="inline-flex items-center text-[12px] font-semibold text-forest-700 border border-forest-200 px-4 py-2 rounded-full hover:bg-forest-600 hover:text-white hover:border-forest-600 transition-all duration-200"
                >
                  Download Packet
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Phase 5 — Compliance */}
      <section id="compliance" className="bg-white py-24 lg:py-32 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-full bg-navy-900 text-white text-[1.1rem] font-bold flex items-center justify-center flex-shrink-0">5</div>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em]">Compliance Basics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {[
              {
                title: 'HIPAA Compliance',
                items: [
                  'Appoint a designated Privacy Officer',
                  'Conduct annual HIPAA risk assessments',
                  'Maintain Business Associate Agreements',
                  'Document all staff HIPAA training',
                  'Have a documented breach response plan',
                ],
                bg: 'bg-navy-50 border-navy-100',
              },
              {
                title: 'BACB Standards',
                items: [
                  'Ensure all BCBAs maintain active certification',
                  'RBTs must be registered and supervised per BACB standards',
                  'Ethics Code applies to all BACB certificants',
                  'Maintain required supervision documentation',
                  'Report ethics violations to BACB as required',
                ],
                bg: 'bg-forest-50 border-forest-100',
              },
              {
                title: 'Florida State Requirements',
                items: [
                  'Level 2 background screening for all direct-care staff',
                  'Mandated reporter training and documentation',
                  'Florida Medicaid provider enrollment and compliance',
                  'Comply with Florida Patient Rights Act',
                  'Maintain required malpractice insurance',
                ],
                bg: 'bg-gold-50 border-gold-200',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                {...fade}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={`rounded-2xl border p-7 ${card.bg}`}
              >
                <h3 className="text-[14px] font-semibold text-navy-900 mb-4">{card.title}</h3>
                <ul className="space-y-2">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[12px] text-navy-800/55 leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-navy-400 flex-shrink-0 mt-[5px]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade} transition={{ duration: 0.5 }} className="bg-gold-50 border border-gold-200 rounded-2xl p-6">
            <p className="text-[13px] text-navy-800/65 leading-relaxed">
              <span className="font-semibold text-navy-900">Important: </span>
              ABA therapy regulation varies by state. Florida does not currently require a separate state license for ABA providers (beyond BCBA certification), but this can change. Always verify current requirements with the Florida Department of Health and consult a healthcare attorney. Medicaid enrollment has its own compliance requirements and auditing standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Phase 6 — Billing */}
      <section id="billing" className="bg-stone-50 py-24 lg:py-32 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-navy-900 text-white text-[1.1rem] font-bold flex items-center justify-center flex-shrink-0">6</div>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em]">Billing Workflow Overview</h2>
          </div>
          <p className="text-[15px] text-navy-800/50 leading-relaxed mb-10 max-w-2xl">
            ABA billing is specialized. Working with a billing company that knows ABA is strongly recommended. Here&apos;s a simplified overview of how the billing cycle works.
          </p>

          <div className="space-y-5 mb-10">
            {billingSteps.map((step) => (
              <motion.div key={step.num} {...fade} transition={{ duration: 0.4 }} className="flex gap-5">
                <div className="w-8 h-8 rounded-full bg-navy-900 text-white text-[13px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{step.num}</div>
                <div>
                  <h4 className="text-[14px] font-semibold text-navy-900 mb-1">{step.title}</h4>
                  <p className="text-[13px] text-navy-800/55 leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade} transition={{ duration: 0.5 }} className="bg-navy-50 border border-navy-100 rounded-2xl p-7 max-w-2xl">
            <h4 className="text-[14px] font-semibold text-navy-900 mb-2">Billing Tip: Work with a Specialist</h4>
            <p className="text-[13px] text-navy-800/55 leading-relaxed">
              ABA billing has a steep learning curve. Many small practices partner with an ABA-specific billing company or hire a dedicated billing coordinator from the start. Your revenue cycle health directly determines your ability to serve clients sustainably.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Phase 7 — Clinical Workflow */}
      <section id="clinical" className="bg-white py-24 lg:py-32 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-full bg-navy-900 text-white text-[1.1rem] font-bold flex items-center justify-center flex-shrink-0">7</div>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em]">Clinical Workflow</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div {...fade} transition={{ duration: 0.65 }}>
              <h3 className="text-[15px] font-semibold text-navy-900 mb-6">Assessment to Treatment — The Clinical Cycle</h3>
              <div className="space-y-5">
                {clinicalSteps.map((step) => (
                  <div key={step.num} className="flex gap-5">
                    <div className="w-8 h-8 rounded-full bg-navy-900 text-white text-[13px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{step.num}</div>
                    <div>
                      <h4 className="text-[14px] font-semibold text-navy-900 mb-1">{step.title}</h4>
                      <p className="text-[13px] text-navy-800/55 leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fade} transition={{ duration: 0.55, delay: 0.1 }}>
              <h3 className="text-[15px] font-semibold text-navy-900 mb-4">Quality Assurance</h3>
              <p className="text-[13px] text-navy-800/50 leading-relaxed mb-5">
                Building quality checks into your clinical operations protects clients and protects your practice.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Regular IOA (interobserver agreement) checks on data collection',
                  'Routine treatment integrity checks by BCBA',
                  'Parent satisfaction surveys at regular intervals',
                  'Staff competency evaluations on an annual basis',
                  'Regular team meetings and case consultations',
                  'Peer review of treatment plans for complex cases',
                  'Incident tracking and response protocol',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[13px] text-navy-800/60 leading-relaxed">
                    <span className="w-4 h-4 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-2 h-2 text-forest-600" viewBox="0 0 8 8" fill="currentColor"><path d="M1.5 4L3.5 6L6.5 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="bg-forest-50 border border-forest-100 rounded-2xl p-6">
                <h4 className="text-[14px] font-semibold text-navy-900 mb-2">Parent Training Is Not Optional</h4>
                <p className="text-[13px] text-navy-800/55 leading-relaxed">
                  High-quality ABA programs include structured parent training. Generalization — the ability of skills to transfer beyond the therapy room — depends heavily on parents implementing strategies consistently at home. Build this into your clinical model from the start.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="bg-navy-950 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="text-center mb-14">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-gold-400/45 mb-4">Ready-to-Use</p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-white tracking-[-0.025em] leading-[1.1] mb-4">
              Templates &amp; Checklists for ABA Centers
            </h2>
            <p className="text-[15px] text-white/40 leading-relaxed max-w-xl mx-auto">
              Download professionally written, customizable templates to launch your practice faster and more confidently.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((t, i) => (
              <motion.div
                key={t.title}
                {...fade}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white/[0.06] border border-white/10 rounded-2xl p-6 flex flex-col"
              >
                <div className="flex-1">
                  <h3 className="text-[14px] font-semibold text-white mb-2">{t.title}</h3>
                  <p className="text-[13px] text-white/50 leading-relaxed mb-4">{t.body}</p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.08]">
                  <span className="text-[11px] font-medium text-white/35">{t.format}</span>
                  <button className="text-[12px] font-semibold text-white bg-gold-500/20 border border-gold-400/30 px-4 py-1.5 rounded-full hover:bg-gold-500/30 transition-colors duration-150">
                    Download
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-50 py-20 lg:py-28 border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-navy-950 rounded-3xl px-10 py-14 lg:px-16 lg:py-18">
            <motion.div {...fade} transition={{ duration: 0.65 }} className="max-w-2xl mb-10">
              <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-white tracking-[-0.025em] leading-[1.1] mb-4">
                Ready to Build Something That Matters?
              </h2>
              <p className="text-[15px] text-white/40 leading-relaxed">
                Opening an ABA center is a significant undertaking — and a remarkable opportunity to serve your community. Light2minds is here to help you do it well.
              </p>
            </motion.div>
            <motion.div
              {...fade}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="mailto:hello@light2minds.com"
                className="inline-flex items-center gap-3 text-[13px] font-semibold text-white border border-white/15 px-6 py-3 rounded-full hover:bg-white hover:text-navy-950 transition-all duration-200"
              >
                Contact Us for Guidance
              </a>
              <Link
                href="/professionals"
                className="inline-flex items-center gap-3 text-[13px] font-semibold text-white border border-white/15 px-6 py-3 rounded-full hover:bg-white hover:text-navy-950 transition-all duration-200"
              >
                RBT Professional Hub
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center gap-3 text-[13px] font-medium text-white/50 hover:text-white transition-colors duration-200 px-2 py-3"
              >
                Browse All Resources
                <span className="w-4 h-px bg-current" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  )
}
