'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Accordion from '@/components/Accordion'

const WARM_BG = '#F8F5EF'
const SKY = '#5BC4F8'
const GREEN = '#2EBB50'
const GOLD = '#FFE030'

function ArrowRight() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  )
}

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="#FFE030">
          <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 2 .7-4L2.2 5.2l4-.6z" />
        </svg>
      ))}
    </div>
  )
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M2 5l5 5 5-5" />
    </svg>
  )
}

// ── Data ─────────────────────────────────────────────────────────────────────

const conditions = [
  {
    color: SKY,
    title: 'Autism Spectrum Disorder',
    teaser: 'A neurodevelopmental condition affecting social communication, sensory processing, and behavior.',
    body: 'ASD presents differently in every child — which is why it\'s called a spectrum. Early intervention including ABA therapy, speech therapy, and occupational therapy produces the strongest outcomes.',
    insight: 'Autism is not caused by parenting. It is a neurological difference that requires understanding, not fixing.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>),
  },
  {
    color: GREEN,
    title: 'ADHD',
    teaser: 'Affects focus, impulse control, and activity regulation alongside exceptional creativity and energy.',
    body: 'Effective support combines behavioral strategies, school accommodations, and — when needed — medical guidance. Children with ADHD often show exceptional problem-solving strengths.',
    insight: 'ADHD is not a behavior problem. It is a neurological difference in how the brain manages attention and executive function.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>),
  },
  {
    color: GOLD,
    title: 'Developmental Delays',
    teaser: 'Child reaching milestones later than expected — walking, talking, or social skills.',
    body: 'Delays may affect one area or several. With early support, many children make significant gains. Early intervention services through public programs are often available at no cost.',
    insight: '"Wait and see" is rarely the right approach. Early intervention consistently produces better outcomes.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12M12 12C12 12 8 9 8 6a4 4 0 0 1 8 0c0 3-4 6-4 6z" /><path d="M8 14s-4 1-4 4h16c0-3-4-4-4-4" /></svg>),
  },
  {
    color: SKY,
    title: 'Language Delays',
    teaser: 'Affects a child\'s ability to understand or express language — spoken words or sentence structure.',
    body: 'A speech-language pathologist (SLP) can evaluate and guide therapy. What parents do at home every day has an enormous impact on language development.',
    insight: 'Daily communication strategies practiced at home are among the most powerful interventions available. You don\'t need a therapy room to make a difference.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>),
  },
  {
    color: GREEN,
    title: 'Sensory Processing',
    teaser: 'Over- or under-sensitivity to sounds, textures, lights, and movement causing meltdowns or avoidance.',
    body: 'An occupational therapist can assess sensory needs and design a personalized sensory plan tailored to your child\'s profile and daily environment.',
    insight: 'Many behaviors labeled "defiance" are sensory responses to an overwhelming environment. Understanding the trigger changes everything.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" /></svg>),
  },
  {
    color: GOLD,
    title: 'Behavioral Challenges',
    teaser: 'Aggression, tantrums, or refusal are almost always communication when words aren\'t enough.',
    body: 'ABA therapy identifies the function behind behavior and teaches more effective, socially appropriate ways to communicate. All behavior serves a purpose.',
    insight: 'Understanding the "why" behind a behavior is always the first — and most important — step toward meaningful change.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>),
  },
]

const afterDiagnosisSteps = [
  {
    num: '01', color: SKY,
    title: 'Give Yourself Grace',
    body: "It's normal to feel grief, relief, fear, or all three at once. A diagnosis doesn't change who your child is — it gives your team a clearer picture of how they experience the world. Give yourself time before making any major decisions.",
  },
  {
    num: '02', color: GREEN,
    title: 'Request the Full Evaluation Report',
    body: "Get a written copy of every evaluation. This document is the foundation of your child's support plan — required for school services, insurance authorization, and therapy referrals. Ask for it in plain language if anything is unclear.",
  },
  {
    num: '03', color: GOLD,
    title: 'Connect with Early Intervention',
    body: "In Florida, children under 3 may qualify for Early Steps. Children 3+ are entitled to a free appropriate public education (FAPE) — including an IEP. Contact your school district's ESE department as soon as possible.",
  },
  {
    num: '04', color: SKY,
    title: 'Explore Therapy Options',
    body: "Depending on the diagnosis, your child may benefit from ABA therapy, speech-language therapy, occupational therapy, or a combination. Ask your pediatrician for referrals and verify which providers are covered by your insurance.",
  },
  {
    num: '05', color: GREEN,
    title: 'Understand Your Insurance Coverage',
    body: "Florida law requires most insurance plans to cover autism spectrum disorder treatment, including ABA therapy. Contact your insurer to confirm benefits, co-pays, and prior authorization requirements before scheduling.",
  },
  {
    num: '06', color: GOLD,
    title: 'Build Your Support Network',
    body: "Connect with other families, join parent advocacy groups, and consider a parent advocate if IEP meetings feel overwhelming. You learn fastest from people who've been exactly where you are.",
  },
]

const iepItems = [
  {
    trigger: 'Your Rights as a Parent',
    content: (
      <ul className="space-y-2">
        {[
          'You are a full and equal member of your child\'s IEP team.',
          'You have the right to request an evaluation — at no cost — if you believe your child has a disability.',
          'You must receive written notice before any change to your child\'s placement or services.',
          'You can request an Independent Educational Evaluation (IEE) if you disagree with the school\'s assessment.',
          'You can bring a support person or advocate to any IEP meeting.',
          'You are entitled to a copy of all educational records — at no cost.',
        ].map(item => <li key={item} className="text-[13px] text-navy-800/65 leading-relaxed pl-3 border-l-2 border-sky-200">{item}</li>)}
      </ul>
    ),
  },
  {
    trigger: 'What an IEP Must Include',
    content: (
      <ul className="space-y-2">
        {[
          'Present levels of academic achievement and functional performance',
          'Annual measurable goals — academic and functional',
          'Special education and related services (speech, OT, ABA)',
          'Accommodation and modification list',
          'Least restrictive environment (LRE) statement',
          'Transition plan (required at age 16 in Florida)',
        ].map(item => <li key={item} className="text-[13px] text-navy-800/65 leading-relaxed pl-3 border-l-2 border-green-200">{item}</li>)}
      </ul>
    ),
  },
  {
    trigger: 'Florida Families — ESE Services',
    content: <p className="text-[13px] text-navy-800/65 leading-relaxed">Florida&apos;s term for special education is Exceptional Student Education (ESE). Contact your school district&apos;s ESE office — they are legally required to respond to your evaluation request within 60 days and to provide services at no cost.</p>,
  },
]

const strategyItems = [
  { trigger: '1 — Build a Predictable Routine', content: <p className="text-[13px] text-navy-800/60 leading-relaxed">Use visual schedules to show what&apos;s coming next. Warn your child before transitions (&ldquo;In 5 minutes we&apos;re leaving&rdquo;). Predictability reduces anxiety and challenging behavior significantly.</p> },
  { trigger: '2 — Follow Your Child\'s Lead', content: <p className="text-[13px] text-navy-800/60 leading-relaxed">During play, join what your child is already doing. Get on the floor, imitate their actions, and comment on what you see. Child-led play builds joint attention, language, and social connection.</p> },
  { trigger: '3 — Use Clear, Simple Language', content: <p className="text-[13px] text-navy-800/60 leading-relaxed">Keep instructions short and specific. Instead of &ldquo;stop it,&rdquo; say &ldquo;hands down.&rdquo; For children with limited language, use their level plus one word: &ldquo;Ball!&rdquo; → &ldquo;Roll ball!&rdquo;</p> },
  { trigger: '4 — Catch the Positives', content: <p className="text-[13px] text-navy-800/60 leading-relaxed">For every correction, aim for 4–5 specific positive comments. &ldquo;I love how you put your shoes on by yourself&rdquo; teaches far more than a generic &ldquo;Good job!&rdquo;</p> },
  { trigger: '5 — Understand the Function of Behavior', content: <p className="text-[13px] text-navy-800/60 leading-relaxed">Before reacting, ask: what is my child trying to get or avoid? Most behavior serves one of four functions: attention, access, escape, or sensory stimulation.</p> },
  { trigger: '6 — Create a Sensory-Friendly Home', content: <p className="text-[13px] text-navy-800/60 leading-relaxed">Reduce overwhelming stimuli — dim harsh lights, minimize background noise, create a quiet space. Offer sensory input your child seeks: a swing, textured toys, or movement breaks.</p> },
  { trigger: '7 — Take Care of Yourself Too', content: <p className="text-[13px] text-navy-800/60 leading-relaxed">Caregiver burnout directly affects your child&apos;s wellbeing. Connect with a parent support group, ask for respite care. You cannot give your child what you don&apos;t have.</p> },
]

const abaFaqItems = [
  { trigger: 'What is positive reinforcement and why does it matter?', content: <p>Positive reinforcement means adding something enjoyable after a behavior, making it more likely to happen again. Therapists identify what motivates your child and use it strategically to build skills. This is not bribery — it&apos;s teaching, the same way we all learn.</p> },
  { trigger: 'How many hours per week does my child need?', content: <p>Intensity varies based on age, needs, and goals — typically 10 to 40 hours per week. The BCBA conducts a comprehensive assessment and recommends an appropriate level. Medicaid and many private insurers in Florida cover intensive ABA.</p> },
  { trigger: 'How do I know if my child is making progress?', content: <p>Progress is data-driven. Your BCBA tracks skill acquisition and challenging behavior with daily data. You should receive regular progress reports and team meetings to review goals. You are a critical part of the team, not just an observer.</p> },
  { trigger: 'Is ABA only for autism?', content: <p>No. While ABA is most widely known for autism, the principles apply to any child who would benefit from skill-building or behavior support — including ADHD, developmental delays, and intellectual disabilities.</p> },
]

const downloads = [
  { color: SKY, title: 'IEP Meeting Preparation Checklist', body: 'Know exactly what to bring, what to ask, and what to look out for in your child\'s IEP meeting.' },
  { color: GREEN, title: 'Behavior Observation Log', body: 'Track behaviors at home to share with your child\'s therapy team — includes time, trigger, and outcome fields.' },
  { color: GOLD, title: 'Visual Daily Schedule Template', body: 'A customizable visual schedule for home use — ideal for children who benefit from routine and predictability.' },
  { color: SKY, title: 'Sensory Profile Questionnaire', body: 'Help identify your child\'s sensory sensitivities and preferences to share with their occupational therapist.' },
  { color: GREEN, title: 'ABA Terms for Parents Glossary', body: 'A plain-language guide to the therapy terms your child\'s ABA team will use — so you always know what they mean.' },
  { color: GOLD, title: 'Provider Interview Question Guide', body: '25 questions to ask before choosing an ABA provider, speech therapist, or occupational therapist.' },
]

// ── Expandable condition card ─────────────────────────────────────────────────

function ConditionCard({ cond }: { cond: typeof conditions[0] }) {
  const [open, setOpen] = useState(false)
  const textColor = cond.color === GOLD ? '#8A6A00' : cond.color === SKY ? '#1A6B96' : '#1A7A3C'

  return (
    <button
      onClick={() => setOpen(o => !o)}
      className="w-full text-left bg-white border border-stone-200/70 rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 focus:outline-none"
    >
      <div className="h-[3px] w-full flex-shrink-0" style={{ backgroundColor: cond.color }} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-3">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: cond.color + '14', color: textColor }}
            >
              <span className="w-4 h-4">{cond.icon}</span>
            </span>
            <h3 className="text-[13.5px] font-semibold text-navy-900 leading-snug">{cond.title}</h3>
          </div>
          <ChevronDown open={open} />
        </div>
        <p className="text-[12px] text-navy-800/45 leading-relaxed" style={{ color: open ? 'transparent' : undefined, maxHeight: open ? 0 : undefined, overflow: 'hidden' }}>
          {!open && cond.teaser}
        </p>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28 }}
              className="overflow-hidden"
            >
              <p className="text-[12.5px] text-navy-800/55 leading-relaxed mb-3">{cond.body}</p>
              <div className="rounded-xl px-3 py-2.5" style={{ backgroundColor: cond.color + '0E', borderLeft: `3px solid ${cond.color}` }}>
                <p className="text-[11.5px] leading-relaxed" style={{ color: textColor }}>
                  <span className="font-semibold">Key insight: </span>{cond.insight}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

const fade = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

export default function ParentsPage() {
  return (
    <main>

      {/* ── Hero ── */}
      <section style={{ backgroundColor: WARM_BG }} className="pt-28 pb-10 lg:pt-32 lg:pb-12 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.6 }} className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-5 h-px" style={{ backgroundColor: SKY }} />
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/45">For Families</p>
            </div>
            <h1 className="text-[clamp(2rem,4.5vw,3.2rem)] font-bold text-navy-900 tracking-[-0.03em] leading-[1.08] mb-4">
              Navigate your child&apos;s<br />diagnosis with confidence.
            </h1>
            <p className="text-[15px] text-navy-800/50 leading-relaxed mb-7 max-w-lg">
              Evidence-based guidance, practical tools, and personalized support — for every stage of your family&apos;s journey.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://light-2-minds.myshopify.com/products/book-a-family-consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-[13.5px] font-bold text-navy-900 px-6 py-3 rounded-full transition-all duration-150 hover:-translate-y-0.5"
                style={{ backgroundColor: GOLD, boxShadow: '0 4px 0 #C4A800, 0 6px 14px rgba(0,0,0,0.08)' }}
              >
                Book Family Consultation
                <ArrowRight />
              </a>
              <a
                href="#downloads"
                className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold text-navy-900 px-6 py-3 rounded-full border border-navy-900/15 hover:bg-navy-900 hover:text-white transition-all duration-200"
              >
                Free Tools
                <ArrowRight />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Understanding Diagnosis — expandable cards ── */}
      <section className="bg-white py-10 lg:py-14" id="diagnosis">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.55 }} className="mb-6">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-2">Understanding Your Child</p>
            <h2 className="text-[clamp(1.4rem,2.8vw,1.9rem)] font-bold text-navy-900 tracking-[-0.02em] leading-[1.1]">
              What your child&apos;s diagnosis means — and what it doesn&apos;t
            </h2>
            <p className="text-[13px] text-navy-800/40 mt-1">Tap any card to learn more.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {conditions.map((cond, i) => (
              <motion.div key={cond.title} {...fade} transition={{ duration: 0.35, delay: i * 0.05 }}>
                <ConditionCard cond={cond} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── After Diagnosis ── */}
      <section style={{ backgroundColor: WARM_BG }} className="py-12 lg:py-18 border-t border-stone-200/60" id="after-diagnosis">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Header */}
          <motion.div {...fade} transition={{ duration: 0.55 }} className="mb-10">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-3">What&apos;s Next</p>
            <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-3">
              What to expect after diagnosis.
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed max-w-xl">
              The period right after a diagnosis can feel overwhelming. Here&apos;s a clear roadmap, so you know what to do.
            </p>
          </motion.div>

          {/* Steps grid — fully visible */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {afterDiagnosisSteps.map((step, i) => {
              const numColor = step.color === GOLD ? '#8A6A00' : step.color === SKY ? '#1A6B96' : '#1A7A3C'
              return (
                <motion.div
                  key={step.num}
                  {...fade}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="relative bg-white rounded-2xl overflow-hidden border border-stone-200/60 p-6 flex flex-col"
                  style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
                >
                  {/* Colored left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ backgroundColor: step.color }} />

                  {/* Number watermark */}
                  <span
                    className="absolute top-3 right-4 text-[4rem] font-black leading-none select-none pointer-events-none"
                    style={{ color: step.color + '12' }}
                  >
                    {step.num}
                  </span>

                  {/* Badge */}
                  <span
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full text-[12px] font-bold mb-4 flex-shrink-0"
                    style={{ backgroundColor: step.color + '18', color: numColor }}
                  >
                    {step.num}
                  </span>

                  <h3 className="text-[14.5px] font-bold text-navy-900 leading-snug mb-2">{step.title}</h3>
                  <p className="text-[13px] text-navy-800/55 leading-relaxed flex-1">{step.body}</p>
                </motion.div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ── Family Consultation (merged) ── */}
      <section style={{ backgroundColor: '#0D1B2E' }} className="py-12 lg:py-16 border-t border-navy-900" id="sessions">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — copy + CTA */}
            <motion.div {...fade} transition={{ duration: 0.6 }}>
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-4" style={{ color: 'rgba(255,224,48,0.7)' }}>
                Family Consultation
              </p>
              <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-bold text-white tracking-[-0.025em] leading-[1.12] mb-4">
                Every family&apos;s situation is different.<br />Let&apos;s talk about yours.
              </h2>
              <p className="text-[14px] leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.50)' }}>
                A 1-on-1 session with a behavioral health specialist — dedicated time to understand your child&apos;s diagnosis, answer every question, and leave with a clear, personalized plan.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Understanding your child\'s diagnosis and developmental profile',
                  'Reviewing evaluation reports and therapy recommendations',
                  'Preparing for IEP meetings and advocating effectively',
                  'Building a home support strategy tailored to your family',
                  'Guidance on selecting and evaluating therapists and providers',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(46,187,80,0.18)' }}>
                      <svg className="w-2.5 h-2.5" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#2EBB50" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://light-2-minds.myshopify.com/products/book-a-family-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-[14px] font-bold text-navy-900 px-7 py-3.5 rounded-full transition-all duration-150 hover:-translate-y-0.5"
                  style={{ backgroundColor: GOLD, boxShadow: '0 5px 0 #C4A800, 0 8px 20px rgba(0,0,0,0.3)' }}
                >
                  Book Family Consultation
                  <ArrowRight />
                </a>
                <a
                  href="https://wa.me/15613772473"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] font-medium px-2 py-3.5 transition-colors"
                  style={{ color: 'rgba(255,255,255,0.40)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.40)')}
                >
                  Message on WhatsApp
                  <span className="w-4 h-px bg-current ml-1" />
                </a>
              </div>
            </motion.div>

            {/* Right — testimonials */}
            <motion.div {...fade} transition={{ duration: 0.5, delay: 0.12 }}>
              <div className="rounded-2xl p-6 border" style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-5" style={{ color: 'rgba(255,255,255,0.30)' }}>
                  What parents say
                </p>
                <div className="space-y-6">
                  <blockquote>
                    <Stars />
                    <p className="text-[13.5px] italic leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      &ldquo;After our session I finally understood my daughter&apos;s evaluation report. I went to the IEP meeting prepared, and for the first time I actually advocated for what she needed.&rdquo;
                    </p>
                    <cite className="text-[11px] font-semibold not-italic tracking-[0.06em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>— Florida Parent</cite>
                  </blockquote>
                  <div className="pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <blockquote>
                      <Stars />
                      <p className="text-[13.5px] italic leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        &ldquo;The session gave me a roadmap I didn&apos;t know I needed — and the confidence to use it.&rdquo;
                      </p>
                      <cite className="text-[11px] font-semibold not-italic tracking-[0.06em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>— Florida Parent</cite>
                    </blockquote>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── ABA Therapy ── */}
      <section className="bg-white py-10 lg:py-14 border-t border-stone-200/60" id="aba">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.55 }} className="mb-6 max-w-xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-2">ABA Therapy</p>
            <h2 className="text-[clamp(1.4rem,2.8vw,1.9rem)] font-bold text-navy-900 tracking-[-0.02em] leading-[1.1]">
              What every parent should understand about ABA
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {[
              { color: SKY, title: 'What Is ABA?', body: 'ABA applies our understanding of how behavior works to real-life situations — then uses that knowledge to teach skills and improve quality of life.' },
              { color: GREEN, title: 'Who Is on the Team?', body: 'A BCBA designs and supervises the program. Registered Behavior Technicians (RBTs) implement it directly with your child.' },
              { color: GOLD, title: 'What Does a Session Look Like?', body: 'Sessions use naturalistic play, skill-building exercises, and positive reinforcement — at home, school, or a clinic.' },
            ].map((card, i) => (
              <motion.div key={card.title} {...fade} transition={{ duration: 0.35, delay: i * 0.06 }}
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: card.color + '30', backgroundColor: card.color + '08' }}
              >
                <div className="h-[3px] w-full" style={{ backgroundColor: card.color }} />
                <div className="p-5">
                  <h3 className="text-[13.5px] font-semibold text-navy-900 mb-2">{card.title}</h3>
                  <p className="text-[12.5px] text-navy-800/55 leading-relaxed">{card.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade} transition={{ duration: 0.5, delay: 0.1 }} className="max-w-2xl">
            <Accordion items={abaFaqItems} openFirst />
          </motion.div>
        </div>
      </section>

      {/* ── IEP & School ── */}
      <section className="bg-stone-50 py-12 lg:py-16 border-t border-stone-200/60" id="iep">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <motion.div {...fade} transition={{ duration: 0.55 }} className="mb-8 max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-2">School &amp; IEP</p>
            <h2 className="text-[clamp(1.4rem,2.8vw,1.9rem)] font-bold text-navy-900 tracking-[-0.02em] leading-[1.1] mb-3">
              Your child has legal rights at school.
            </h2>
            <p className="text-[13.5px] text-navy-800/50 leading-relaxed">
              Under IDEA, every eligible child is entitled to a Free Appropriate Public Education. Here&apos;s what that means in practice.
            </p>
          </motion.div>

          {/* Two main panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">

            {/* Rights */}
            <motion.div {...fade} transition={{ duration: 0.4, delay: 0.05 }}
              className="bg-white rounded-2xl overflow-hidden border border-sky-100"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
            >
              <div className="h-[3px] w-full" style={{ backgroundColor: SKY }} />
              <div className="p-6">
                <h3 className="text-[13.5px] font-bold mb-4" style={{ color: '#1A6B96' }}>Your Rights as a Parent</h3>
                <ul className="space-y-2.5">
                  {[
                    'You are a full and equal member of your child\'s IEP team.',
                    'You can request an evaluation at no cost if you believe your child has a disability.',
                    'You must receive written notice before any change to placement or services.',
                    'You can request an Independent Educational Evaluation (IEE) if you disagree with the school\'s assessment.',
                    'You can bring a support person or advocate to any IEP meeting.',
                    'You are entitled to a copy of all educational records — at no cost.',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3 text-[12.5px] text-navy-800/60 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: SKY }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* IEP components */}
            <motion.div {...fade} transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-green-100"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
            >
              <div className="h-[3px] w-full" style={{ backgroundColor: GREEN }} />
              <div className="p-6">
                <h3 className="text-[13.5px] font-bold mb-4" style={{ color: '#1A7A3C' }}>What an IEP Must Include</h3>
                <ul className="space-y-2.5">
                  {[
                    'Present levels of academic achievement and functional performance',
                    'Annual measurable goals — academic and functional',
                    'Special education and related services (speech, OT, ABA)',
                    'Accommodation and modification list',
                    'Least restrictive environment (LRE) statement',
                    'Transition plan (required at age 16 in Florida)',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3 text-[12.5px] text-navy-800/60 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: GREEN }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

          </div>

          {/* Florida ESE callout */}
          <motion.div {...fade} transition={{ duration: 0.4, delay: 0.15 }}
            className="rounded-2xl px-6 py-5 mb-6 border"
            style={{ backgroundColor: GOLD + '12', borderColor: GOLD + '50' }}
          >
            <p className="text-[12px] font-bold uppercase tracking-[0.1em] mb-1" style={{ color: '#8A6A00' }}>Florida Families — ESE Services</p>
            <p className="text-[13px] text-navy-800/60 leading-relaxed">
              Florida&apos;s term for special education is <strong className="text-navy-900/70">Exceptional Student Education (ESE)</strong>. Contact your school district&apos;s ESE office — they are legally required to respond to your evaluation request within 60 days and provide services at no cost.
            </p>
          </motion.div>

          <motion.div {...fade} transition={{ duration: 0.4, delay: 0.18 }}>
            <Link href="/tools#parent-tools"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy-900 border border-navy-900/15 px-5 py-2.5 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200">
              IEP Prep Checklist
              <ArrowRight />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ── Home Strategies ── */}
      <section className="bg-white py-10 lg:py-14 border-t border-stone-200/60" id="strategies">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.55 }} className="mb-6 max-w-xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-2">Home Life</p>
            <h2 className="text-[clamp(1.4rem,2.8vw,1.9rem)] font-bold text-navy-900 tracking-[-0.02em] leading-[1.1]">
              7 strategies that work — even on the hardest days.
            </h2>
          </motion.div>
          <motion.div {...fade} transition={{ duration: 0.5, delay: 0.08 }} className="max-w-2xl">
            <Accordion items={strategyItems} />
          </motion.div>
        </div>
      </section>

      {/* ── Downloads ── */}
      <section className="bg-stone-50 py-10 lg:py-14 border-t border-stone-200/60" id="downloads">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.55 }} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-2">Free Resources</p>
              <h2 className="text-[clamp(1.4rem,2.8vw,1.9rem)] font-bold text-navy-900 tracking-[-0.02em] leading-[1.1]">
                Your parent toolkit — free.
              </h2>
            </div>
            <Link href="/tools" className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy-900 border border-navy-900/15 px-5 py-2.5 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200 flex-shrink-0">
              View all tools <ArrowRight />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {downloads.map((d, i) => (
              <motion.div key={d.title} {...fade} transition={{ duration: 0.35, delay: i * 0.05 }}
                className="bg-white border border-stone-200/70 rounded-2xl overflow-hidden flex flex-col">
                <div className="h-[3px] w-full" style={{ backgroundColor: d.color }} />
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-[13.5px] font-semibold text-navy-900 mb-1.5 leading-snug">{d.title}</h3>
                  <p className="text-[12px] text-navy-800/45 leading-relaxed flex-1 mb-4">{d.body}</p>
                  <button
                    className="inline-flex items-center gap-2 text-[12px] font-bold self-start px-3.5 py-1.5 rounded-full transition-all duration-150 hover:-translate-y-0.5"
                    style={{ backgroundColor: d.color + '15', color: d.color === GOLD ? '#B8900E' : d.color }}
                  >
                    Download Free
                    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M7 1v8M4 6l3 3 3-3M2 11h10" /></svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ backgroundColor: '#0D1B2E' }} className="py-12 lg:py-16 border-t border-navy-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.6 }} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-[clamp(1.4rem,2.8vw,2rem)] font-bold text-white tracking-[-0.025em] leading-[1.1] mb-3">
                You&apos;re not navigating this alone.
              </h2>
              <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Everything we&apos;ve built is here for your family — clear answers, practical tools, and the confidence to advocate for your child.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link href="/tools"
                className="inline-flex items-center justify-center gap-2.5 text-[13.5px] font-bold text-navy-900 px-6 py-3 rounded-full transition-all duration-150 hover:-translate-y-0.5"
                style={{ backgroundColor: GOLD, boxShadow: '0 4px 0 #C4A800' }}
              >
                Browse All Resources <ArrowRight />
              </Link>
              <a href="mailto:info@light2minds.com"
                className="inline-flex items-center justify-center gap-2.5 text-[13.5px] font-semibold text-white px-6 py-3 rounded-full border transition-all duration-200 hover:bg-white hover:text-navy-900"
                style={{ borderColor: 'rgba(255,255,255,0.20)' }}
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
