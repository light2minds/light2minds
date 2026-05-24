'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Accordion from '@/components/Accordion'
import FlashCard from '@/components/FlashCard'

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

const flashcards = [
  { section: 'Section B · Skill Acquisition', term: 'Positive Reinforcement', definition: 'The addition of a stimulus following a behavior that increases the future frequency of that behavior. The stimulus added must be something the individual finds valuable or pleasurable.' },
  { section: 'Section C · Behavior Reduction', term: 'Extinction', definition: 'Withholding the reinforcer that has been maintaining a behavior, resulting in a decrease in the frequency of that behavior over time. Often produces an "extinction burst" initially.' },
  { section: 'Section A · Measurement', term: 'ABC Data', definition: 'Antecedent-Behavior-Consequence data. A descriptive data collection method used to identify patterns and potential functions of behavior by recording what happens before and after a behavior occurs.' },
  { section: 'Section B · Skill Acquisition', term: 'Discrete Trial Training (DTT)', definition: 'A structured teaching method involving a clear discriminative stimulus (SD), a prompt if needed, the learner\'s response, and a consequence (reinforcement or corrective feedback). Trials are repeated systematically.' },
  { section: 'Section C · Behavior Reduction', term: 'Four Functions of Behavior', definition: 'All behavior serves a purpose: (1) Access to tangibles, (2) Attention from others, (3) Escape/Avoidance of demands or situations, (4) Automatic/Sensory reinforcement. Identifying the function guides treatment.' },
  { section: 'Section B · Skill Acquisition', term: 'Prompting Hierarchy', definition: 'A systematic way of delivering prompts from most-to-least or least-to-most intrusive. Prompt types include: Full Physical, Partial Physical, Modeling, Gestural, and Verbal. The goal is to fade prompts and achieve independent responding.' },
  { section: 'Section C · Behavior Reduction', term: 'Differential Reinforcement (DR)', definition: 'Reinforcing one behavior while placing another on extinction. Types: DRA (alternative behavior), DRI (incompatible behavior), DRO (other behavior / zero instances), DRL (low rates of behavior).' },
  { section: 'Section A · Measurement', term: 'Interobserver Agreement (IOA)', definition: 'A measure of data reliability. Two observers independently collect data on the same behavior, and their results are compared. IOA ≥80% is generally considered acceptable. Formula: Agreements ÷ (Agreements + Disagreements) × 100.' },
  { section: 'Section B · Skill Acquisition', term: 'Task Analysis', definition: 'Breaking down a complex skill into smaller, teachable steps. Used in chaining procedures. Each step is taught individually and then linked together. Example: hand-washing broken into 10–15 discrete steps.' },
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
  { title: 'ABA Center Startup Guide', body: 'Thinking beyond RBT? Our comprehensive startup guide walks you through opening your own ABA therapy practice in Florida.' },
  { title: 'BCBA Pathway Overview', body: 'An overview of the requirements to pursue your BCBA — including education, fieldwork hours, and the exam.' },
]

const printableForms = [
  { title: 'ABC Data Sheet', body: 'Antecedent-Behavior-Consequence data collection form for functional behavior assessment.', format: 'PDF' },
  { title: 'Discrete Trial (DTT) Data Sheet', body: 'Track correct, incorrect, and prompted responses across multiple trials per session.', format: 'PDF' },
  { title: 'Behavior Frequency Tracking Sheet', body: 'Simple event recording form for tracking frequency of target behaviors across a session.', format: 'PDF' },
  { title: 'Duration & Latency Recording Form', body: 'Track how long behaviors last and how quickly they occur after a prompt or stimulus.', format: 'PDF' },
  { title: 'Session Note Template', body: 'A structured session note format aligned with insurance billing requirements and BACB standards.', format: 'PDF + Word' },
  { title: 'Interval Recording Data Sheet', body: 'Whole-interval and partial-interval recording sheets for structured observation periods.', format: 'PDF' },
]

export default function ProfessionalsPage() {
  return (
    <main>

      {/* Hero */}
      <section className="bg-stone-50 pt-36 pb-24 lg:pt-44 lg:pb-32 relative overflow-hidden border-b border-stone-200/60">
        <span className="absolute bottom-0 right-8 text-[18rem] font-bold leading-none text-navy-900/[0.03] select-none pointer-events-none" aria-hidden="true">ABA</span>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-6 h-px bg-navy-700/30" />
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40">For Professionals</p>
            </div>
            <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-bold text-navy-900 tracking-[-0.03em] leading-[1.06] mb-6">
              Professional Training Hub
            </h1>
            <p className="text-[clamp(1rem,1.5vw,1.15rem)] font-light text-navy-800/55 leading-relaxed max-w-xl mb-8">
              Whether you&apos;re preparing for your RBT exam, building your clinical skills, or laying the groundwork for your own ABA practice — this is your dedicated space.
            </p>
            <div className="flex flex-wrap gap-3 mb-5">
              {[
                { href: '#exam', label: 'RBT Exam Prep' },
                { href: '#materials', label: 'Study Materials' },
                { href: '#career', label: 'Career Tools' },
              ].map(btn => (
                <a key={btn.href} href={btn.href}
                  className="text-[12px] font-semibold text-navy-800/60 border border-stone-200 bg-white px-4 py-2 rounded-full hover:border-navy-900/30 hover:text-navy-900 transition-all duration-150">
                  {btn.label}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              {[
                { href: '#exam', label: 'Exam Prep' },
                { href: '#materials', label: 'Study Materials' },
                { href: '#terminology', label: 'Terminology' },
                { href: '#ethics', label: 'Ethics' },
                { href: '#documentation', label: 'Documentation' },
                { href: '#competency', label: 'Competency' },
                { href: '#career', label: 'Career Tools' },
                { href: '#forms', label: 'Forms' },
              ].map(link => (
                <a key={link.href} href={link.href}
                  className="text-[11px] font-medium text-navy-800/45 hover:text-navy-800 transition-colors duration-150 underline underline-offset-2">
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* RBT Exam Prep */}
      <section className="bg-white py-24 lg:py-32" id="exam">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-12 max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">RBT Exam Preparation</p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
              Pass your RBT exam with confidence.
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed">
              The RBT exam covers six content areas. Light2minds organizes your study materials to match the BACB Task List so you know exactly what to focus on.
            </p>
          </motion.div>

          {/* Task List Table */}
          <motion.div {...fade} transition={{ duration: 0.55 }} className="bg-stone-50 border border-stone-200/70 rounded-2xl overflow-hidden mb-10">
            <div className="px-7 py-5 border-b border-stone-200/60">
              <h3 className="text-[14px] font-semibold text-navy-900 mb-1">RBT Task List — Second Edition Overview</h3>
              <p className="text-[12px] text-navy-800/40">The BACB RBT Task List (2nd Ed.) defines the competencies tested on the exam. Use the table below to guide your study.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-stone-100">
                    <th className="px-6 py-3 text-left text-[11px] font-bold tracking-[0.06em] text-navy-700/60 uppercase">Section</th>
                    <th className="px-6 py-3 text-left text-[11px] font-bold tracking-[0.06em] text-navy-700/60 uppercase">Content Area</th>
                    <th className="px-6 py-3 text-left text-[11px] font-bold tracking-[0.06em] text-navy-700/60 uppercase">Key Topics</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {[
                    { sec: 'A', area: 'Measurement', topics: 'Continuous vs discontinuous measurement, data collection, graphing' },
                    { sec: 'B', area: 'Skill Acquisition', topics: 'Discrete trial training, naturalistic teaching, prompting, shaping, chaining' },
                    { sec: 'C', area: 'Behavior Reduction', topics: 'Extinction, differential reinforcement, antecedent modifications, function of behavior' },
                    { sec: 'D', area: 'Documentation & Reporting', topics: 'Session notes, graphing, reporting to supervisors, data integrity' },
                    { sec: 'E', area: 'Professional Conduct & Scope of Practice', topics: 'BACB ethics, scope of practice, supervisor relationship, confidentiality' },
                    { sec: 'F', area: 'Competency Demonstration', topics: 'Direct skills, observational learning, generalization and maintenance' },
                  ].map((row, i) => (
                    <tr key={row.sec} className={i % 2 === 1 ? 'bg-stone-50/60' : 'bg-white'}>
                      <td className="px-6 py-3.5 text-[13px] font-bold text-navy-900">{row.sec}</td>
                      <td className="px-6 py-3.5 text-[13px] font-semibold text-navy-800/70">{row.area}</td>
                      <td className="px-6 py-3.5 text-[13px] text-navy-800/45">{row.topics}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Exam prep cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Mock Exams',
                body: 'Timed practice exams that mirror the format and difficulty of the actual RBT exam. Available in full-length (85 questions) and section-specific formats.',
                meta: '3 full-length exams available',
                href: '/tools#rbt-tools',
                label: 'Access Mock Exams',
                color: 'bg-forest-50 border-forest-100',
              },
              {
                title: 'Flashcard Decks',
                body: 'Interactive flashcards covering ABA terminology, measurement concepts, behavior reduction strategies, and ethics — organized by task list section.',
                meta: '150+ total flashcards',
                href: '#materials',
                label: 'Study Flashcards',
                color: 'bg-navy-50 border-navy-100',
              },
              {
                title: 'Study Guide',
                body: 'Comprehensive chapter-by-chapter study guide aligned to each section of the RBT Task List, with definitions, examples, and memory tips.',
                meta: 'Sections A through F',
                href: '/tools#rbt-tools',
                label: 'Download Study Guide',
                color: 'bg-gold-50 border-gold-100',
              },
            ].map((card, i) => (
              <motion.div key={card.title} {...fade} transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`border rounded-2xl p-7 ${card.color}`}>
                <h3 className="text-[14px] font-semibold text-navy-900 mb-2">{card.title}</h3>
                <p className="text-[13px] text-navy-800/50 leading-relaxed mb-4">{card.body}</p>
                <p className="text-[11px] text-navy-800/35 mb-5">{card.meta}</p>
                <Link href={card.href}
                  className="text-[12px] font-semibold text-navy-700/60 hover:text-navy-900 transition-colors duration-150 flex items-center gap-2">
                  {card.label} <span className="w-3 h-px bg-current" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flashcards */}
      <section className="bg-stone-50 py-24 lg:py-32 border-t border-stone-200/60" id="materials">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-12 max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">Interactive Learning</p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
              ABA flashcards — click to flip.
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed">
              Click any card to reveal the definition. Study these terms to build the foundation you need for the RBT exam and your clinical practice.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {flashcards.map((card, i) => (
              <motion.div key={card.term} {...fade} transition={{ duration: 0.4, delay: i * 0.04 }}>
                <FlashCard section={card.section} term={card.term} definition={card.definition} />
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/tools#rbt-tools"
              className="inline-flex items-center gap-3 text-[13px] font-semibold text-white bg-forest-500 px-6 py-3 rounded-full hover:bg-forest-600 transition-colors duration-200">
              Download All Flashcard Decks
            </Link>
            <Link href="/tools#rbt-tools"
              className="inline-flex items-center gap-3 text-[13px] font-medium text-navy-700/60 hover:text-navy-900 transition-colors duration-150 border border-stone-200 bg-white px-6 py-3 rounded-full">
              Take a Mock Exam
            </Link>
          </div>
        </div>
      </section>

      {/* Terminology */}
      <section className="bg-white py-24 lg:py-32 border-t border-stone-200/60" id="terminology">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-12 max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">ABA Terminology</p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
              Essential ABA terms &amp; concepts.
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed">
              A solid grasp of behavioral terminology is foundational for exam success and professional practice. Expand each category to review.
            </p>
          </motion.div>

          <motion.div {...fade} transition={{ duration: 0.55 }} className="max-w-3xl mb-6">
            <Accordion items={terminologyItems} openFirst />
          </motion.div>

          <Link href="/tools#rbt-tools"
            className="inline-flex items-center gap-3 text-[13px] font-semibold text-navy-900 border border-navy-900/18 px-6 py-3 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200">
            Download Full Terminology Glossary
          </Link>
        </div>
      </section>

      {/* Ethics */}
      <section className="bg-navy-50 py-24 lg:py-32 border-t border-navy-100/60" id="ethics">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-12 max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">Professional Conduct</p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
              Ethics &amp; the RBT Code of Ethics.
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed">
              Ethics questions are guaranteed to appear on the RBT exam. More importantly, ethical practice protects your clients, your career, and the integrity of the field. This section covers what every RBT must know.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <motion.div {...fade} transition={{ duration: 0.55 }} className="bg-white border border-stone-200/70 rounded-2xl p-8">
              <h3 className="text-[15px] font-semibold text-navy-900 mb-5">Core RBT Ethical Responsibilities</h3>
              <ul className="space-y-3">
                {[
                  'Maintain confidentiality for all client information (HIPAA)',
                  'Practice only within your scope — implement programs designed by the BCBA, do not modify them',
                  'Report any concerns about client safety or welfare to your supervisor immediately',
                  'Avoid dual relationships with clients and their families',
                  'Complete RBT supervision requirements and document sessions accurately',
                  'Use the least restrictive, most effective procedures',
                  'Represent your credentials honestly',
                  'Follow your organization\'s policies and the BACB Ethics Code',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[13px] text-navy-800/60">
                    <span className="w-4 h-4 rounded-full bg-navy-100 border border-navy-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-2 h-2 text-navy-600" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fade} transition={{ duration: 0.55, delay: 0.1 }}>
              <h3 className="text-[15px] font-semibold text-navy-900 mb-5">Ethics Scenarios — Exam Practice</h3>
              <Accordion items={ethicsScenarios} />
            </motion.div>
          </div>

          <Link href="/tools#rbt-tools"
            className="inline-flex items-center gap-3 text-[13px] font-semibold text-navy-900 border border-navy-900/18 px-6 py-3 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200">
            Download Ethics Quick-Reference Sheet
          </Link>
        </div>
      </section>

      {/* Documentation */}
      <section className="bg-white py-24 lg:py-32 border-t border-stone-200/60" id="documentation">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-12 max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">Clinical Practice</p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
              Session documentation &amp; data integrity.
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed">
              Accurate documentation is a professional and ethical requirement. Understanding what to document — and how — is a testable skill and a daily responsibility.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Session Notes',
                body: 'Session notes document what occurred during therapy. They should include: date, time, duration, attendees, targets addressed, data summary, behavioral events, and any deviations from the plan. Notes must be objective — no interpretations.',
                link: { label: 'Download Session Note Template', href: '/tools#clinical-tools' },
                color: 'bg-navy-50 border-navy-100',
              },
              {
                title: 'Graphing Data',
                body: 'ABA is a data-driven field. RBTs plot session data on graphs so the BCBA can visually analyze progress and make clinical decisions. Learn to graph frequency, percentage correct, duration, and rate data accurately.',
                link: { label: 'Graph Templates', href: '/tools#clinical-tools' },
                color: 'bg-forest-50 border-forest-100',
              },
              {
                title: 'Reporting to Supervisors',
                body: 'RBTs are required to report concerns — about client safety, unexpected behaviors, deviations from the plan, or environmental hazards — to their supervising BCBA promptly. When in doubt, report it.',
                link: { label: 'Incident Report Template', href: '/tools#clinical-tools' },
                color: 'bg-stone-50 border-stone-200',
              },
            ].map((card, i) => (
              <motion.div key={card.title} {...fade} transition={{ duration: 0.4, delay: i * 0.07 }}
                className={`border rounded-2xl p-7 ${card.color}`}>
                <h3 className="text-[14px] font-semibold text-navy-900 mb-2">{card.title}</h3>
                <p className="text-[13px] text-navy-800/50 leading-relaxed mb-5">{card.body}</p>
                <Link href={card.link.href}
                  className="text-[12px] font-semibold text-navy-700/55 hover:text-navy-900 transition-colors duration-150 flex items-center gap-2">
                  {card.link.label} <span className="w-3 h-px bg-current" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competency Assessment */}
      <section className="bg-stone-50 py-24 lg:py-32 border-t border-stone-200/60" id="competency">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-12 max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">Competency Preparation</p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
              RBT competency assessment prep.
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed">
              Before you can call yourself an RBT, a BCBA must assess your ability to perform the skills on the Task List. Here&apos;s how to prepare.
            </p>
          </motion.div>

          <div className="space-y-3 max-w-3xl mb-8">
            {[
              {
                num: '1',
                title: 'Measurement — Demonstrating Data Collection',
                body: "You'll be asked to demonstrate event recording, interval recording, duration recording, and graphing data during a role-play or live observation.",
              },
              {
                num: '2',
                title: 'Skill Acquisition — Running Discrete Trials',
                body: 'You must demonstrate delivering an SD, delivering prompts appropriately, recording correct/incorrect responses, and reinforcing behavior according to the program.',
              },
              {
                num: '3',
                title: 'Behavior Reduction — Implementing BIP Strategies',
                body: 'You must be able to implement antecedent modifications, extinction procedures, and reinforcement-based reduction strategies as written in the BIP.',
              },
              {
                num: '4',
                title: 'Documentation — Completing Session Notes',
                body: 'Demonstrate that you can complete a session note accurately, objectively, and in a timely manner following a simulated session.',
              },
              {
                num: '5',
                title: 'Communication — Reporting to Supervisor',
                body: 'Role-play scenarios involving reporting behavioral events, safety concerns, or data anomalies to a supervising BCBA professionally and promptly.',
              },
            ].map((step, i) => (
              <motion.div key={step.num} {...fade} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex gap-5 bg-white border border-stone-200/70 rounded-2xl p-6">
                <div className="w-8 h-8 rounded-full bg-navy-900 text-white text-[12px] font-bold flex items-center justify-center flex-shrink-0">{step.num}</div>
                <div>
                  <h3 className="text-[14px] font-semibold text-navy-900 mb-1.5">{step.title}</h3>
                  <p className="text-[13px] text-navy-800/50 leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <Link href="/tools#rbt-tools"
            className="inline-flex items-center gap-3 text-[13px] font-semibold text-white bg-forest-500 px-6 py-3 rounded-full hover:bg-forest-600 transition-colors duration-200">
            Download Competency Self-Check Guide
          </Link>
        </div>
      </section>

      {/* Career Tools */}
      <section className="bg-white py-24 lg:py-32 border-t border-stone-200/60" id="career">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-12 max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">Career Development</p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
              Build a rewarding career in ABA.
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed">
              The demand for RBTs and behavior analysts is growing rapidly. Use these tools to present yourself professionally and navigate your next career step.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {careerTools.map((tool, i) => (
              <motion.div key={tool.title} {...fade} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white border border-stone-200/70 rounded-2xl p-7 hover:shadow-sm hover:shadow-stone-200/60 hover:-translate-y-0.5 transition-all duration-200">
                <h3 className="text-[14px] font-semibold text-navy-900 mb-2">{tool.title}</h3>
                <p className="text-[13px] text-navy-800/45 leading-relaxed mb-5">{tool.body}</p>
                {tool.title === 'ABA Center Startup Guide' ? (
                  <Link href="/aba-center"
                    className="text-[12px] font-semibold text-navy-700/55 hover:text-navy-900 transition-colors duration-150 flex items-center gap-2">
                    View Startup Guide <span className="w-3 h-px bg-current" />
                  </Link>
                ) : (
                  <button className="text-[12px] font-semibold text-navy-700/55 hover:text-navy-900 transition-colors duration-150 flex items-center gap-2">
                    Download <span className="w-3 h-px bg-current" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Printable Forms */}
      <section className="bg-stone-50 py-24 lg:py-32 border-t border-stone-200/60" id="forms">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">Clinical Tools</p>
              <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
                Printable data collection forms.
              </h2>
              <p className="text-[15px] text-navy-800/45 leading-relaxed mt-3 max-w-md">
                Ready-to-use clinical forms for session documentation, data collection, and daily practice. All forms are printer-ready and free to download.
              </p>
            </div>
            <Link href="/tools#clinical-tools"
              className="inline-flex items-center gap-3 text-[13px] font-semibold text-navy-900 border border-navy-900/18 px-6 py-3 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200 self-start lg:self-auto">
              View All Clinical Forms
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {printableForms.map((form, i) => (
              <motion.div key={form.title} {...fade} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white border border-stone-200/70 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.08em] text-navy-800/25 bg-stone-50 border border-stone-100 rounded px-1.5 py-0.5 mb-3 inline-block">{form.format}</span>
                  <h3 className="text-[14px] font-semibold text-navy-900 mb-2">{form.title}</h3>
                  <p className="text-[13px] text-navy-800/45 leading-relaxed">{form.body}</p>
                </div>
                <button className="mt-5 text-[12px] font-semibold text-navy-600/50 hover:text-navy-900 transition-colors duration-150 flex items-center gap-2 self-start">
                  Download <span className="w-3 h-px bg-current" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="bg-stone-50 border border-stone-200/60 rounded-3xl px-10 py-12 lg:px-16 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-3">
                Ready to pass your RBT exam?
              </h2>
              <p className="text-[15px] text-navy-800/50 leading-relaxed max-w-lg">
                Access all study materials, mock exams, flashcards, and career tools — free and available now. Start your preparation today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link href="/tools"
                className="inline-flex items-center justify-center gap-3 text-[13px] font-semibold text-navy-900 border border-navy-900/20 px-6 py-3 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200">
                Browse All Resources
              </Link>
              <Link href="/aba-center"
                className="inline-flex items-center justify-center gap-3 text-[13px] font-semibold text-navy-900 bg-gold-400 px-6 py-3 rounded-full hover:bg-gold-300 transition-colors duration-200">
                ABA Center Startup Guide
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
