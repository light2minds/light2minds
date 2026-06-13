'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Accordion from '@/components/Accordion'
import FlashCard from '@/components/FlashCard'

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
const up = (delay = 0) => ({ ...fade, transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const } })

// ── Existing data (preserved) ──────────────────────────────────────────────────
const flashcards = [
  { section: 'Section B · Skill Acquisition', term: 'Positive Reinforcement', definition: 'The addition of a stimulus following a behavior that increases the future frequency of that behavior. The stimulus added must be something the individual finds valuable or pleasurable.' },
  { section: 'Section C · Behavior Reduction', term: 'Extinction', definition: 'Withholding the reinforcer that has been maintaining a behavior, resulting in a decrease in the frequency of that behavior over time. Often produces an "extinction burst" initially.' },
  { section: 'Section A · Measurement', term: 'ABC Data', definition: 'Antecedent-Behavior-Consequence data. A descriptive data collection method used to identify patterns and potential functions of behavior by recording what happens before and after a behavior occurs.' },
  { section: 'Section B · Skill Acquisition', term: 'Discrete Trial Training (DTT)', definition: 'A structured teaching method involving a clear discriminative stimulus (SD), a prompt if needed, the learner\'s response, and a consequence (reinforcement or corrective feedback). Trials are repeated systematically.' },
  { section: 'Section C · Behavior Reduction', term: 'Four Functions of Behavior', definition: 'All behavior serves a purpose: (1) Access to tangibles, (2) Attention from others, (3) Escape/Avoidance of demands or situations, (4) Automatic/Sensory reinforcement. Identifying the function guides treatment.' },
  { section: 'Section B · Skill Acquisition', term: 'Prompting Hierarchy', definition: 'A systematic way of delivering prompts from most-to-least or least-to-most intrusive. Prompt types include: Full Physical, Partial Physical, Modeling, Gestural, and Verbal. The goal is to fade prompts and achieve independent responding.' },
]

const terminologyItems = [
  {
    trigger: 'Measurement & Data Collection Terms',
    content: (
      <ul>
        <li><strong>Frequency/Event Recording:</strong> Counting how many times a behavior occurs within an observation period.</li>
        <li><strong>Duration Recording:</strong> Measuring how long a behavior lasts from start to finish.</li>
        <li><strong>Latency Recording:</strong> Time from the presentation of a stimulus (SD) to the onset of the behavior.</li>
        <li><strong>Interval Recording (Whole/Partial):</strong> Dividing an observation period into intervals; noting if behavior occurred in each interval.</li>
        <li><strong>Momentary Time Sampling:</strong> Observing whether the behavior is occurring at the end of each interval — not throughout.</li>
        <li><strong>Permanent Product Recording:</strong> Measuring the tangible result of a behavior rather than the behavior itself (e.g., number of worksheets completed).</li>
      </ul>
    ),
  },
  {
    trigger: 'Reinforcement Concepts',
    content: (
      <ul>
        <li><strong>Positive Reinforcement:</strong> Adding a stimulus to increase behavior.</li>
        <li><strong>Negative Reinforcement:</strong> Removing a stimulus to increase behavior (e.g., removing an itchy tag when a child puts on their shirt).</li>
        <li><strong>Unconditioned Reinforcer (UR):</strong> Naturally reinforcing without learning (food, water, warmth).</li>
        <li><strong>Conditioned Reinforcer (CR):</strong> Learned reinforcer (praise, tokens, money) through pairing with a UR.</li>
        <li><strong>Schedules of Reinforcement:</strong> Rules for when reinforcement is delivered — Fixed Ratio (FR), Variable Ratio (VR), Fixed Interval (FI), Variable Interval (VI).</li>
        <li><strong>Preference Assessment:</strong> A structured process to identify potential reinforcers (MSWO, paired stimulus, free operant).</li>
      </ul>
    ),
  },
  {
    trigger: 'Behavior Reduction Terms',
    content: (
      <ul>
        <li><strong>Antecedent:</strong> What happens immediately before a behavior (the trigger).</li>
        <li><strong>Consequence:</strong> What happens immediately after a behavior.</li>
        <li><strong>Punishment:</strong> A consequence that decreases the future frequency of a behavior (positive: adding an aversive; negative: removing something valued).</li>
        <li><strong>Extinction Burst:</strong> A temporary increase in behavior when extinction is first implemented.</li>
        <li><strong>Functional Behavior Assessment (FBA):</strong> A process to determine the function (purpose) of a challenging behavior — conducted by the BCBA, not the RBT.</li>
        <li><strong>Behavior Intervention Plan (BIP):</strong> A written plan (developed by the BCBA) based on the FBA that outlines strategies to reduce challenging behavior.</li>
      </ul>
    ),
  },
  {
    trigger: 'Teaching Procedures',
    content: (
      <ul>
        <li><strong>Shaping:</strong> Reinforcing successive approximations toward a target behavior.</li>
        <li><strong>Chaining:</strong> Teaching a skill by linking steps of a task analysis together (forward, backward, or total task).</li>
        <li><strong>Modeling:</strong> Demonstrating a skill for the learner to imitate.</li>
        <li><strong>Natural Environment Teaching (NET):</strong> Teaching skills in the natural context using the learner&apos;s interests and motivation.</li>
        <li><strong>Generalization:</strong> The occurrence of a behavior across different settings, people, or materials without direct training.</li>
        <li><strong>Maintenance:</strong> A previously learned skill continues to occur after direct instruction has ended.</li>
      </ul>
    ),
  },
]

const ethicsScenarios = [
  {
    trigger: "Scenario 1: Client's parent asks you to change a program",
    content: (
      <div className="space-y-3">
        <p><strong>Situation:</strong> A parent tells you they&apos;ve read that a different prompting strategy works better and asks you to use it instead.</p>
        <p><strong>Correct Response:</strong> Thank the parent for their input, explain that you implement programs as designed by the BCBA, and commit to passing this feedback along to your supervisor. Do not modify the program without BCBA approval.</p>
      </div>
    ),
  },
  {
    trigger: 'Scenario 2: You see another therapist using an unapproved procedure',
    content: (
      <div className="space-y-3">
        <p><strong>Situation:</strong> During a session, you observe a colleague using a physical prompt that is not in the client&apos;s program.</p>
        <p><strong>Correct Response:</strong> Report the observation to your supervising BCBA as soon as possible. Do not confront the colleague directly or ignore it. Client safety and ethical practice are the priority.</p>
      </div>
    ),
  },
  {
    trigger: "Scenario 3: A family member asks for the client's progress notes",
    content: (
      <div className="space-y-3">
        <p><strong>Situation:</strong> A grandparent of a client calls you directly and asks you to email them the last three progress notes.</p>
        <p><strong>Correct Response:</strong> Do not share records without proper authorization. Politely explain that you need to direct them to the BCBA or clinic director for any record requests, which go through a formal process under HIPAA.</p>
      </div>
    ),
  },
]

const careerTools = [
  { title: 'RBT Resume Template', body: 'A professionally designed resume template tailored for RBT roles, highlighting key competencies employers look for.' },
  { title: 'Interview Preparation Guide', body: '30 common RBT interview questions with expert-coached answers and tips for demonstrating your knowledge and professionalism.' },
  { title: 'Career Pathway Map', body: 'A visual guide showing career progression from RBT to BCaBA to BCBA — including education, supervision, and exam requirements at each level.' },
  { title: 'Supervision Log Template', body: 'Track your required monthly supervision hours with this BACB-aligned log — essential for maintaining your RBT certification.' },
  { title: 'BCBA Pathway Overview', body: 'An overview of the requirements to pursue your BCBA — including education, fieldwork hours, and the exam.' },
  { title: 'ABA Center Startup Support', body: 'Ready to open your own ABA practice? This is a specialized service. Contact us directly and we\'ll guide you through the process.' },
]

const printableForms = [
  { title: 'ABC Data Sheet', body: 'Antecedent-Behavior-Consequence data collection form for functional behavior assessment.', format: 'PDF' },
  { title: 'Discrete Trial (DTT) Data Sheet', body: 'Track correct, incorrect, and prompted responses across multiple trials per session.', format: 'PDF' },
  { title: 'Behavior Frequency Tracking Sheet', body: 'Simple event recording form for tracking frequency of target behaviors across a session.', format: 'PDF' },
  { title: 'Session Note Template', body: 'A structured session note format aligned with insurance billing requirements and BACB standards.', format: 'PDF + Word' },
  { title: 'Duration & Latency Recording Form', body: 'Track how long behaviors last and how quickly they occur after a prompt or stimulus.', format: 'PDF' },
  { title: 'Interval Recording Data Sheet', body: 'Whole-interval and partial-interval recording sheets for structured observation periods.', format: 'PDF' },
]

const RBT_STEPS = [
  { num: '01', title: 'Eligibility Requirements', body: 'You must be at least 18 years old, hold a high school diploma or equivalent, and pass a criminal background check. No prior ABA experience is required to apply.' },
  { num: '02', title: '40-Hour Training', body: 'Complete 40 hours of training covering the RBT Task List (3rd Ed.) — including measurement, skill acquisition, behavior reduction, documentation, and professional conduct.' },
  { num: '03', title: 'Competency Assessment', body: 'A qualified BCBA/BCaBA must assess your ability to perform each skill on the Task List. This live demonstration is a required gateway before you can sit for the exam.' },
  { num: '04', title: 'Certification Exam', body: 'Pass the 85-question BACB RBT exam covering all six content areas. The exam is administered at Pearson VUE test centers. A passing score is required for certification.' },
  { num: '05', title: 'Starting Your Career', body: 'Once certified, you\'ll work under the supervision of a BCBA/BCaBA, implementing individualized therapy programs, collecting data, and supporting clients with autism and developmental needs.' },
]

const BCBA_STEPS = [
  { num: '01', title: 'Educational Requirements', body: 'You must hold a minimum of an accredited university Bachelor\'s degree to apply to BCaBA and a master\'s degree to apply to BCBA. The degree must be from an accredited university.' },
  { num: '02', title: 'ABA-Approved Coursework', body: 'Complete a minimum 1 year ABA-Approved Coursework sequence covering applied behavior analysis concepts, ethics, experimental design, and behavior assessment and intervention.' },
  { num: '03', title: 'Supervised Fieldwork', body: 'Accumulate 1,500 (BCaBA)–2,000 (BCBA) hours of supervised fieldwork under an approved supervisor. A minimum percentage of your hours must be in concentrated experience with clients.' },
  { num: '04', title: 'Supervision Requirements', body: 'Supervised fieldwork requires structured supervision sessions, direct observation, and documented logs. Your supervisor must be a credentialed BCBA with appropriate experience.' },
  { num: '05', title: 'BCBA Certification Exam', body: 'Pass the BACB BCBA exam — a rigorous assessment covering behavior analytic principles, ethical standards, and clinical application across all major content areas.' },
  { num: '06', title: 'Career Growth & Leadership', body: 'BCBAs can move into supervisory roles, open their own practices, contribute to research, or specialize in areas such as organizational behavior management, autism, or feeding disorders.' },
]

const MENTORSHIP_FEATURES = [
  'RBT exam preparation strategy & study planning',
  'Resume, interview prep, and job search support',
  'BCaBA / BCBA exam preparation & task list review',
  'Fieldwork and supervision planning guidance',
  'Career trajectory mapping from RBT to BCBA',
  'Clinical consultation and practice growth support',
]

const MENTORSHIP_STAGES = [
  {
    label: 'Aspiring & Current RBTs',
    color: '#5BC4F8',
    desc: 'Exam prep, competency readiness, first job, and career direction.',
  },
  {
    label: 'BCaBA / BCBA Candidates',
    color: '#8B5CF6',
    desc: 'Supervision hours, exam strategy, and transition into leadership.',
  },
  {
    label: 'Practicing BCBAs & Clinicians',
    color: '#2EBB50',
    desc: 'Clinical consultation, team development, and practice growth.',
  },
]

const CHECKOUT = 'https://light-2-minds.myshopify.com/cart'

const STUDY_GUIDES = [
  {
    id: 'rbt-guide',
    title: 'RBT Exam Study Guide (3rd Ed)',
    credential: 'Registered Behavior Technician',
    description: 'A comprehensive, task list–aligned study guide covering all six content areas of the BACB RBT exam. Includes definitions, examples, memory tips, and practice questions.',
    benefits: ['Aligned to the RBT Task List 2nd Edition', 'Section-by-section breakdown (A–F)', 'Practice questions with rationale', 'Ethics and professional conduct module'],
    accent: '#5BC4F8',
    dark: '#1A7AC0',
    checkout: `${CHECKOUT}/47184621600939:1`,
  },
  {
    id: 'rbt-guide-es',
    title: 'RBT Exam Study Guide (Español)',
    credential: 'Registered Behavior Technician · En Español',
    description: 'Guía de estudio completa en español alineada al Task List del RBT. Cubre las seis áreas de contenido del examen BACB con definiciones, ejemplos y preguntas de práctica.',
    benefits: ['Alineada al RBT Task List 2nd Edition', 'Desglose sección por sección (A–F)', 'Preguntas de práctica con justificación', 'Módulo de ética y conducta profesional'],
    accent: '#FFE030',
    dark: '#C4A800',
    checkout: `${CHECKOUT}/47208775942315:1`,
  },
  {
    id: 'bcba-guide',
    title: 'BCBA/BCaBA Exam Study Guide (6th Ed)',
    credential: 'Board Certified Behavior Analyst · BCaBA',
    description: 'Advanced preparation for the BCBA and BCaBA exams — covering behavior measurement, assessment, behavior change procedures, ethics, and supervisory responsibilities.',
    benefits: ['Full 6th Edition task list coverage', 'Applied case-based practice scenarios', 'Supervision and ethics deep-dive', 'Data analysis and graphing review'],
    accent: '#2EBB50',
    dark: '#1E8E3E',
    checkout: `${CHECKOUT}/47184628809899:1`,
  },
]

const WHY_ITEMS = [
  { title: 'Created by a Board Certified Behavior Analyst', body: 'All content is developed and reviewed by a practicing BCBA with direct clinical and supervisory experience.', accent: '#5BC4F8' },
  { title: 'Evidence-Based ABA Practices', body: 'Every resource is grounded in the science of applied behavior analysis and aligned with BACB standards and ethics.', accent: '#2EBB50' },
  { title: 'Resources for Every Career Stage', body: 'From your first day as an aspiring RBT to seasoned BCBAs — we support professionals at every step of the journey.', accent: '#8B5CF6' },
  { title: 'Practical, Real-World Mentorship', body: 'Our mentorship and coaching sessions focus on what actually happens in the clinic — not just what\'s in the textbook.', accent: '#C4A800' },
  { title: 'Clinically Accurate & Exam-Ready', body: 'Study materials are written to match the exact language and expectations of the BACB, so you know you\'re preparing with the right content.', accent: '#5BC4F8' },
]

// ── Check icon ─────────────────────────────────────────────────────────────────
function Check({ color = '#2EBB50' }: { color?: string }) {
  return (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" fill={color + '20'} />
      <path d="M5 8l2 2 4-4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
export default function ProfessionalsPage() {
  return (
    <main>

      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-stone-50 pt-28 pb-8 lg:pt-32 lg:pb-10 relative overflow-hidden border-b border-stone-200/60">
        <span className="absolute bottom-0 right-6 text-[8rem] font-bold leading-none text-navy-900/[0.025] select-none pointer-events-none" aria-hidden="true">ABA</span>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div {...up()} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="block w-6 h-px bg-navy-700/30" />
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-navy-700/40">For Behavioral Health Professionals</p>
            </div>
            <h1 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.03em] leading-[1.08] mb-3">
              Professional Resources & Career Development
            </h1>
            <p className="text-[14px] font-light text-navy-800/55 leading-relaxed max-w-2xl mb-5">
              Resources, mentorship, exam preparation, and professional tools for aspiring and practicing RBTs, BCaBAs, and BCBAs.
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <Link href="/shop#professionals"
                className="inline-flex items-center gap-2.5 text-[14px] font-bold text-navy-900 bg-gold-400 px-7 py-3.5 rounded-full hover:bg-gold-300 transition-colors duration-200"
                style={{ boxShadow: '0 4px 0 #C4A800' }}>
                Shop Study Guides
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </Link>
              <a href={`${CHECKOUT}/47209074819243:1`}
                className="inline-flex items-center gap-2.5 text-[14px] font-semibold text-navy-900 bg-white border border-stone-200 px-7 py-3.5 rounded-full hover:border-navy-900/30 transition-all duration-200">
                Book Mentorship
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-navy-700/35">Jump to</span>
              {[
                { label: 'RBT Roadmap', href: '#become-rbt' },
                { label: 'BCBA Pathway', href: '#become-bcba' },
                { label: 'Mentorship & Coaching', href: '#mentorship' },
                { label: 'Study Guides', href: '#study-guides' },
                { label: 'Free Resources', href: '#resources' },
              ].map(link => (
                <a key={link.href} href={link.href}
                  className="text-[12px] font-semibold text-navy-800/50 hover:text-navy-900 underline underline-offset-4 decoration-navy-900/20 hover:decoration-navy-900/50 transition-all duration-150">
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. BECOME AN RBT ─────────────────────────────────────────────────── */}
      <section className="bg-stone-50 py-12 lg:py-16 border-b border-stone-200/60" id="become-rbt">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            <motion.div {...up()}>
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-navy-700/40 mb-3 flex items-center gap-3">
                <span className="w-5 h-px bg-current" /> RBT Certification Roadmap
              </p>
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-3">
                Become a Registered Behavior Technician.
              </h2>
              <p className="text-[13.5px] text-navy-800/50 leading-relaxed mb-6">
                The RBT credential is your first step into the field of applied behavior analysis. Here&apos;s exactly what you need to do — from eligibility to your first day on the job.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/shop#professionals"
                  className="inline-flex items-center gap-2 text-[13px] font-bold text-navy-900 bg-gold-400 px-5 py-2.5 rounded-full hover:bg-gold-300 transition-colors">
                  Shop Study Guides
                </Link>
                <Link href="/shop#services"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy-900 border border-stone-300 px-5 py-2.5 rounded-full hover:border-navy-900/50 transition-all">
                  Book Mentorship
                </Link>
                <Link href="/shop#services"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-white px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#2EBB50' }}>
                  Book Competency Assessment
                </Link>
              </div>
            </motion.div>

            <div className="space-y-3">
              {RBT_STEPS.map((step, i) => (
                <motion.div key={step.num} {...up(i * 0.06)}
                  className="flex gap-5 bg-white border border-stone-200/70 rounded-2xl p-5">
                  <div className="w-9 h-9 rounded-full bg-navy-900 text-white text-[12px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-navy-900 mb-1">{step.title}</h3>
                    <p className="text-[12.5px] text-navy-800/50 leading-relaxed">{step.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. BECOME A BCaBA / BCBA ─────────────────────────────────────────── */}
      <section className="bg-white py-12 lg:py-16 border-b border-stone-200/60" id="become-bcba">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            <div className="space-y-3 lg:order-2">
              {BCBA_STEPS.map((step, i) => (
                <motion.div key={step.num} {...up(i * 0.06)}
                  className="flex gap-5 bg-stone-50 border border-stone-200/70 rounded-2xl p-5">
                  <div className="w-9 h-9 rounded-full text-white text-[12px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#8B5CF6' }}>
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-navy-900 mb-1">{step.title}</h3>
                    <p className="text-[12.5px] text-navy-800/50 leading-relaxed">{step.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div {...up()} className="lg:order-1">
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-navy-700/40 mb-3 flex items-center gap-3">
                <span className="w-5 h-px bg-current" /> BCaBA / BCBA Pathway
              </p>
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-3">
                Advance to BCaBA or BCBA.
              </h2>
              <p className="text-[13.5px] text-navy-800/50 leading-relaxed mb-6">
                Becoming a Board Certified Behavior Analyst is one of the most rewarding professional paths in behavioral health. Here&apos;s the full roadmap — from coursework to certification.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/shop#professionals"
                  className="inline-flex items-center gap-2 text-[13px] font-bold text-navy-900 bg-gold-400 px-5 py-2.5 rounded-full hover:bg-gold-300 transition-colors">
                  Shop Study Guides
                </Link>
                <Link href="/shop#services"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy-900 border border-stone-300 px-5 py-2.5 rounded-full hover:border-navy-900/50 transition-all">
                  Book Mentorship
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. PROFESSIONAL MENTORSHIP ────────────────────────────────────────── */}
      <section className="bg-stone-50 py-12 lg:py-16 border-b border-stone-200/60" id="mentorship">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left — value proposition + features + CTA */}
            <motion.div {...up()}>
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-navy-700/40 mb-3 flex items-center gap-3">
                <span className="w-5 h-px bg-current" /> Premium Services
              </p>
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-3">
                Professional Mentorship & Coaching.
              </h2>
              <p className="text-[13.5px] text-navy-800/50 leading-relaxed mb-7">
                BCBA-led, one-on-one sessions tailored to your career stage. Whether you&apos;re preparing for your first exam, moving into supervision, or growing a practice — we&apos;re your dedicated career partner.
              </p>
              <ul className="space-y-3 mb-8">
                {MENTORSHIP_FEATURES.map(f => (
                  <li key={f} className="flex items-start gap-3 text-[13px] text-navy-800/65 leading-relaxed">
                    <Check color="#2EBB50" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/shop#services"
                className="inline-flex items-center gap-2.5 text-[14px] font-bold text-white px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#2EBB50', boxShadow: '0 4px 0 #1E8E3E' }}>
                Book a Mentorship Session
                <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 7h10M7 2l5 5-5 5"/></svg>
              </Link>
            </motion.div>

            {/* Right — who is this for */}
            <motion.div {...up(0.1)}>
              <div className="bg-white border border-stone-200/60 rounded-2xl overflow-hidden">
                <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, #5BC4F8, #8B5CF6, #2EBB50)' }} />
                <div className="p-7">
                  <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-navy-700/40 mb-5">Who is this for?</p>
                  <div className="space-y-4">
                    {MENTORSHIP_STAGES.map(stage => (
                      <div key={stage.label} className="flex gap-4 items-start">
                        <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: stage.color }} />
                        <div>
                          <p className="text-[13.5px] font-semibold text-navy-900 mb-0.5">{stage.label}</p>
                          <p className="text-[12.5px] text-navy-800/50 leading-relaxed">{stage.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-7 pt-6 border-t border-stone-100">
                    <p className="text-[12px] text-navy-800/40 leading-relaxed">
                      Sessions are conducted virtually by a Board Certified Behavior Analyst. Available in English and Spanish.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Competency Assessment deep-dive (existing content, improved) */}
          <motion.div {...up()} id="competency">
            <div className="bg-white border border-stone-200/60 rounded-3xl overflow-hidden">
              <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #2EBB50, #5BC4F8)' }} />
              <div className="p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
                  <div className="max-w-2xl">
                    <span className="inline-block text-[10px] font-bold tracking-[0.12em] uppercase text-forest-700 bg-forest-100 px-2.5 py-1 rounded-full mb-3">Competency Preparation</span>
                    <h3 className="text-[clamp(1.3rem,2.5vw,1.8rem)] font-bold text-navy-900 mb-3">RBT Competency Assessment — What to Expect & How to Prepare.</h3>
                    <p className="text-[14px] text-navy-800/50 leading-relaxed">
                      Before receiving your RBT certification, a BCBA must observe and assess your ability to perform the skills on the Task List. This is a required live demonstration — not a written test. Preparation is everything.
                    </p>
                  </div>
                  <Link href="/shop#services"
                    className="flex-shrink-0 inline-flex items-center gap-2 text-[13px] font-bold text-white px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity self-start"
                    style={{ backgroundColor: '#2EBB50', boxShadow: '0 4px 0 #1E8E3E' }}>
                    Book Competency Assessment
                    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 7h10M7 2l5 5-5 5"/></svg>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { num: '1', title: 'Measurement — Demonstrating Data Collection', body: "You'll demonstrate event recording, interval recording, duration recording, and graphing data during a role-play or live observation." },
                    { num: '2', title: 'Skill Acquisition — Running Discrete Trials', body: 'Demonstrate delivering an SD, delivering prompts appropriately, recording responses, and reinforcing behavior according to the program.' },
                    { num: '3', title: 'Behavior Reduction — Implementing BIP Strategies', body: 'Demonstrate antecedent modifications, extinction procedures, and reinforcement-based reduction strategies as written in the BIP.' },
                    { num: '4', title: 'Documentation — Completing Session Notes', body: 'Complete a session note accurately, objectively, and in a timely manner following a simulated session observation.' },
                    { num: '5', title: 'Communication — Reporting to Supervisor', body: 'Role-play scenarios involving reporting behavioral events, safety concerns, and data anomalies to a supervising BCBA professionally.' },
                  ].map((step, i) => (
                    <div key={step.num} className="flex gap-4 bg-stone-50 rounded-xl p-5 border border-stone-100">
                      <div className="w-7 h-7 rounded-full bg-navy-900 text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">{step.num}</div>
                      <div>
                        <h4 className="text-[13px] font-semibold text-navy-900 mb-1 leading-snug">{step.title}</h4>
                        <p className="text-[12px] text-navy-800/45 leading-relaxed">{step.body}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-col items-start justify-between bg-forest-50 border border-forest-100 rounded-xl p-5">
                    <p className="text-[13px] font-semibold text-navy-900 mb-2 leading-snug">Ready to schedule your assessment?</p>
                    <p className="text-[12px] text-navy-800/50 leading-relaxed mb-4">Our BCBA conducts assessments virtually and in-person. Reach out to schedule and receive prep materials in advance.</p>
                    <Link href="/shop#services"
                      className="text-[12px] font-bold flex items-center gap-1.5 transition-colors hover:opacity-80"
                      style={{ color: '#2EBB50' }}>
                      Book Now <span className="w-3 h-px bg-current" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 6. FEATURED STUDY GUIDES ─────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 border-b border-navy-800" id="study-guides" style={{ backgroundColor: '#0D1B2E' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...up()} className="mb-7 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/30 mb-3 flex items-center gap-3">
                <span className="w-5 h-px bg-white/20" /> Premium Study Materials
              </p>
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-white tracking-[-0.025em] leading-[1.1]">
                Study Guides for Every Credential.
              </h2>
              <p className="text-[13.5px] text-white/50 leading-relaxed mt-3 max-w-xl">
                Clinically accurate, exam-aligned study guides written by a Board Certified Behavior Analyst. Everything you need to pass — in one resource.
              </p>
            </div>
            <Link href="/shop#professionals"
              className="flex-shrink-0 inline-flex items-center gap-2.5 text-[14px] font-bold text-navy-900 bg-gold-400 px-8 py-3.5 rounded-full hover:bg-gold-300 transition-colors self-start lg:self-auto"
              style={{ boxShadow: '0 4px 0 #C4A800' }}>
              Visit the Shop
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STUDY_GUIDES.map((g, i) => (
              <motion.div key={g.id} {...up(i * 0.08)}
                className="flex flex-col rounded-3xl overflow-hidden border"
                style={{ borderColor: g.accent + '30', backgroundColor: g.accent + '0A' }}>
                <div className="h-1.5 w-full" style={{ backgroundColor: g.accent }} />
                <div className="flex flex-col flex-1 p-7">
                  <div className="mb-5">
                    <p className="text-[10px] font-bold tracking-[0.12em] uppercase mb-2" style={{ color: g.accent }}>{g.credential}</p>
                    <h3 className="text-[20px] font-bold text-white leading-tight mb-3">{g.title}</h3>
                    <p className="text-[13px] text-white/50 leading-relaxed">{g.description}</p>
                  </div>
                  <ul className="space-y-2.5 mb-7 flex-1">
                    {g.benefits.map(b => (
                      <li key={b} className="flex items-start gap-2.5 text-[12.5px] text-white/60">
                        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="7" fill={g.accent + '25'} />
                          <path d="M5 8l2 2 4-4" stroke={g.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link href="/shop#professionals"
                    className="inline-flex items-center justify-center gap-2 text-[13px] font-bold px-6 py-3 rounded-full transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: g.accent, color: g.accent === '#FFE030' ? '#0D1B2E' : '#fff', boxShadow: `0 3px 0 ${g.dark}` }}>
                    Ver en Shop
                    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 7h10M7 2l5 5-5 5"/></svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FREE ABA RESOURCE CENTER ──────────────────────────────────────── */}
      <section className="bg-white py-12 lg:py-16 border-b border-stone-200/60" id="resources">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...up()} className="mb-7 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full text-white bg-forest-500">FREE</span>
                <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-navy-700/40">ABA Resource Center</p>
              </div>
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-3">
                Free tools to build your foundation.
              </h2>
              <p className="text-[13.5px] text-navy-800/50 leading-relaxed max-w-xl">
                All resources below are completely free. Use them to study, practice, and prepare. For the full library, visit the Tools page.
              </p>
            </div>
            <Link href="/tools"
              className="flex-shrink-0 inline-flex items-center gap-2 text-[13px] font-semibold text-navy-900 border border-navy-900/20 px-6 py-3 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200 self-start lg:self-auto">
              View All Free Resources
              <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 7h10M7 2l5 5-5 5"/></svg>
            </Link>
          </motion.div>

          {/* A. Interactive Flashcards */}
          <div className="mb-8" id="materials">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full text-forest-700 bg-forest-100">FREE</span>
                <h3 className="text-[15px] font-bold text-navy-900">Interactive Learning — ABA Flashcards</h3>
              </div>
              <p className="text-[12px] text-navy-800/35 hidden sm:block">Click a card to flip</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
              {flashcards.map((card, i) => (
                <motion.div key={card.term} {...up(i * 0.04)}>
                  <FlashCard section={card.section} term={card.term} definition={card.definition} />
                </motion.div>
              ))}
            </div>
            <Link href="/tools#rbt-tools"
              className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-forest-700 hover:text-forest-900 transition-colors">
              See all flashcard decks on the Tools page <span className="w-3 h-px bg-current" />
            </Link>
          </div>

          {/* B. ABA Terminology */}
          <div className="mb-8" id="terminology">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full text-forest-700 bg-forest-100">FREE</span>
              <h3 className="text-[15px] font-bold text-navy-900">ABA Terminology — Essential Concepts</h3>
            </div>
            <div className="max-w-3xl mb-4">
              <Accordion items={terminologyItems} openFirst />
            </div>
            <Link href="/tools#rbt-tools"
              className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-forest-700 hover:text-forest-900 transition-colors">
              Download full glossary on the Tools page <span className="w-3 h-px bg-current" />
            </Link>
          </div>

          {/* C. Professional Conduct */}
          <div className="mb-8" id="ethics">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full text-forest-700 bg-forest-100">FREE</span>
              <h3 className="text-[15px] font-bold text-navy-900">Professional Conduct & Ethics</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
              <div className="bg-navy-50 border border-navy-100 rounded-2xl p-7">
                <h4 className="text-[14px] font-semibold text-navy-900 mb-4">Core RBT Ethical Responsibilities</h4>
                <ul className="space-y-2.5">
                  {[
                    'Maintain confidentiality for all client information (HIPAA)',
                    'Practice only within your scope — implement programs designed by the BCBA',
                    'Report any concerns about client safety or welfare to your supervisor immediately',
                    'Avoid dual relationships with clients and their families',
                    'Complete RBT supervision requirements and document sessions accurately',
                    'Use the least restrictive, most effective procedures',
                    'Represent your credentials honestly',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-[12.5px] text-navy-800/60">
                      <Check color="#5BC4F8" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[14px] font-semibold text-navy-900 mb-4">Ethics Scenarios — Exam Practice</h4>
                <Accordion items={ethicsScenarios} />
              </div>
            </div>
            <Link href="/tools#rbt-tools"
              className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-forest-700 hover:text-forest-900 transition-colors">
              Download ethics quick-reference on the Tools page <span className="w-3 h-px bg-current" />
            </Link>
          </div>

          {/* D. Career Development */}
          <div className="mb-7" id="career">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full text-forest-700 bg-forest-100">FREE</span>
                <h3 className="text-[15px] font-bold text-navy-900">Career Development Tools</h3>
              </div>
              <Link href="/tools"
                className="text-[12px] font-semibold text-forest-700 hover:text-forest-900 flex items-center gap-1.5 transition-colors flex-shrink-0">
                View all <span className="w-3 h-px bg-current" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {careerTools.map(tool => (
                <div key={tool.title} className="flex items-center gap-3 py-2.5 px-3 rounded-xl border border-stone-100 bg-white">
                  <Check color="#2EBB50" />
                  <span className="text-[13px] font-medium text-navy-900">{tool.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional free resources row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Mock Exams', sub: '3 full-length RBT practice exams', href: '/tools#rbt-tools' },
              { label: 'Printable Resources', sub: 'Visual schedules, data sheets, charts', href: '/tools' },
              { label: 'Clinical Tools', sub: 'Session notes, graphing templates', href: '/tools#clinical-tools' },
              { label: 'Downloadable Worksheets', sub: 'ABC sheets, token boards, and more', href: '/tools' },
            ].map(item => (
              <Link key={item.label} href={item.href}
                className="group flex flex-col gap-2 p-4 rounded-2xl border border-stone-100 bg-stone-50 hover:border-forest-200 hover:bg-forest-50 transition-all duration-200">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold tracking-[0.1em] uppercase text-forest-700 bg-forest-100 px-1.5 py-0.5 rounded-full">FREE</span>
                </div>
                <p className="text-[13px] font-semibold text-navy-900 group-hover:text-forest-800">{item.label}</p>
                <p className="text-[11.5px] text-navy-800/45 leading-snug">{item.sub}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. WHY LIGHT2MINDS ───────────────────────────────────────────────── */}
      <section className="bg-stone-50 py-10 lg:py-12 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...up()} className="mb-6">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-navy-700/40 mb-2">Why Light2Minds</p>
            <h2 className="text-[clamp(1.3rem,2.5vw,1.8rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
              Built by clinicians. Designed for you.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {WHY_ITEMS.map((item, i) => (
              <motion.div key={item.title} {...up(i * 0.06)}
                className="flex items-start gap-3 bg-white border border-stone-200/60 rounded-xl p-4">
                <Check color={item.accent} />
                <div>
                  <p className="text-[13px] font-semibold text-navy-900 leading-snug mb-0.5">{item.title}</p>
                  <p className="text-[12px] text-navy-800/45 leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-10 border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...up()}
            className="bg-navy-900 rounded-3xl px-8 py-10 lg:px-16 lg:py-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/30 mb-3">Take the Next Step</p>
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-white tracking-[-0.025em] leading-[1.1] mb-3">
                Ready to Advance Your Behavioral Health Career?
              </h2>
              <p className="text-[13.5px] text-white/50 leading-relaxed">
                Whether you&apos;re preparing for your first exam or growing into a senior clinical role — Light2Minds is your dedicated partner at every stage.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
              <Link href="/shop#professionals"
                className="inline-flex items-center justify-center gap-2.5 text-[14px] font-bold text-navy-900 bg-gold-400 px-8 py-3.5 rounded-full hover:bg-gold-300 transition-colors"
                style={{ boxShadow: '0 4px 0 #C4A800' }}>
                Shop Study Guides
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </Link>
              <a href={`${CHECKOUT}/47209074819243:1`}
                className="inline-flex items-center justify-center gap-2 text-[13px] font-semibold text-white border border-white/20 px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors">
                Book Mentorship
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
