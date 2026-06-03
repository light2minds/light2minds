'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Accordion from '@/components/Accordion'

const WARM_BG = '#F8F5EF'
const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

function ArrowRight() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 1v8M4 6l3 3 3-3M2 11h10" />
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

const abaFaqItems = [
  {
    trigger: 'What is positive reinforcement and why does it matter?',
    content: (
      <p>Positive reinforcement means adding something enjoyable after a behavior, which makes that behavior more likely to happen again. In ABA, therapists identify what is motivating for your child (called &ldquo;reinforcers&rdquo;) and use them strategically to build skills. This is not bribery — it&apos;s teaching, the same way we all learn.</p>
    ),
  },
  {
    trigger: 'How many hours per week does my child need?',
    content: (
      <p>Intensity varies based on your child&apos;s age, needs, and goals. Research supports anywhere from 10 to 40 hours per week. The BCBA will conduct a comprehensive assessment and recommend an appropriate level of intensity. Medicaid and many private insurers in Florida cover intensive ABA.</p>
    ),
  },
  {
    trigger: 'How do I know if my child is making progress?',
    content: (
      <p>Progress in ABA is data-driven. Your BCBA tracks skill acquisition and challenging behavior with daily data collection. You should receive regular progress reports and team meetings to review goals. Ask questions freely — you are a critical part of the team, not just an observer.</p>
    ),
  },
  {
    trigger: 'Is ABA only for autism?',
    content: (
      <p>No. While ABA is most widely known for autism treatment, the principles of behavior analysis apply to any child who would benefit from skill-building or behavior support — including children with ADHD, developmental delays, intellectual disabilities, and behavioral challenges.</p>
    ),
  },
  {
    trigger: 'What questions should I ask a potential ABA provider?',
    content: (
      <ul>
        <li>Is the supervising clinician a BCBA? Are RBTs registered with the BACB?</li>
        <li>How are goals developed and how often are they reviewed?</li>
        <li>Will services be provided at home, in a center, or both?</li>
        <li>How will you communicate with me about my child&apos;s progress?</li>
        <li>What does parent training look like in your program?</li>
        <li>What is your approach to challenging behavior?</li>
      </ul>
    ),
  },
]

const conditions = [
  {
    color: '#5BC4F8',
    title: 'Autism Spectrum Disorder',
    body: 'ASD is a neurodevelopmental condition that affects social communication, sensory processing, and behavior. It presents differently in every child — which is why it\'s called a spectrum. Early intervention including ABA therapy, speech therapy, and occupational therapy produces the strongest outcomes.',
    insight: 'Autism is not caused by parenting. It is a neurological difference that requires understanding, not fixing.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    color: '#2EBB50',
    title: 'ADHD',
    body: 'ADHD affects focus, impulse control, and activity regulation. Children with ADHD often show exceptional creativity, energy, and problem-solving strengths alongside these challenges. Effective support combines behavioral strategies, school accommodations, and — when needed — medical guidance.',
    insight: 'ADHD is not a behavior problem. It is a neurological difference in how the brain manages attention, impulse control, and executive function.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    color: '#FFE030',
    title: 'Developmental Delays',
    body: 'A developmental delay means a child is reaching milestones — walking, talking, social skills — later than expected. Delays may affect one area or several. With early support, many children make significant gains. Early intervention services through public programs are often available at no cost.',
    insight: '"Wait and see" is rarely the right approach. Early intervention consistently produces better outcomes than watching and waiting.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12M12 12C12 12 8 9 8 6a4 4 0 0 1 8 0c0 3-4 6-4 6z" /><path d="M8 14s-4 1-4 4h16c0-3-4-4-4-4" />
      </svg>
    ),
  },
  {
    color: '#5BC4F8',
    title: 'Language Delays',
    body: 'Language delays affect a child\'s ability to understand or express language — spoken words, sentence structure, or both. A speech-language pathologist (SLP) can evaluate and guide therapy. What parents do at home every day has an enormous impact on language development.',
    insight: 'Daily communication strategies — practiced consistently at home — are among the most powerful interventions for language delays. You don\'t need a therapy room to make a difference.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    color: '#2EBB50',
    title: 'Sensory Processing Difficulties',
    body: 'Some children are over- or under-sensitive to sounds, textures, lights, and movement. This can result in meltdowns, avoidance, or difficulty in environments like school or public spaces. An occupational therapist can assess sensory needs and design a personalized sensory plan.',
    insight: 'Many behaviors labeled as "defiance" or "meltdowns" are sensory responses to an overwhelming environment. Understanding the trigger changes the entire approach.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" />
      </svg>
    ),
  },
  {
    color: '#FFE030',
    title: 'Behavioral Challenges',
    body: 'Behaviors like aggression, self-injury, tantrums, or refusal are almost always communication. When a child can\'t express their needs, their behavior does the talking. ABA therapy identifies the function behind behavior and teaches more effective, socially appropriate ways to communicate.',
    insight: 'All behavior serves a function. Understanding the "why" behind a behavior is always the first — and most important — step toward meaningful change.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
]

const steps = [
  {
    num: '1',
    color: '#5BC4F8',
    title: 'Give Yourself Grace',
    body: "It's normal to feel grief, relief, fear, or all three at once. A diagnosis doesn't change who your child is — it gives you and your team a clearer picture of how they experience the world. Give yourself time before making any major decisions.",
  },
  {
    num: '2',
    color: '#2EBB50',
    title: 'Request the Full Evaluation Report',
    body: "Get a written copy of every evaluation. This document is the foundation of your child's support plan — required for school services, insurance authorization, and therapy referrals. Keep multiple copies and ask for it in plain language if anything is unclear.",
  },
  {
    num: '3',
    color: '#FFE030',
    title: 'Connect with Early Intervention or School Services',
    body: "In Florida, children under 3 may qualify for Early Steps (Florida's early intervention program). Children 3 and older are entitled to a free appropriate public education (FAPE) — including an IEP — through their school district. Contact your district's ESE department as soon as possible.",
  },
  {
    num: '4',
    color: '#5BC4F8',
    title: 'Explore Therapy Options',
    body: "Depending on the diagnosis, your child may benefit from ABA therapy, speech-language therapy, occupational therapy, physical therapy, or a combination. Ask your pediatrician for referrals and verify which providers are covered by your insurance plan.",
  },
  {
    num: '5',
    color: '#2EBB50',
    title: 'Understand Your Insurance Coverage',
    body: "Florida law (Chapters 627 and 641) requires most insurance plans to cover autism spectrum disorder treatment, including ABA therapy. Contact your insurer to confirm benefits, co-pays, and prior authorization requirements before scheduling services.",
  },
  {
    num: '6',
    color: '#FFE030',
    title: 'Build Your Support Network',
    body: "Connect with other families, join parent advocacy groups, and consider working with a parent advocate if IEP meetings feel difficult. You learn fastest from people who've been exactly where you are — and the community is more accessible than you might think.",
  },
]

const strategies = [
  {
    num: '1',
    title: 'Build a Predictable Routine',
    body: 'Children with autism, ADHD, and developmental delays thrive with structure. Use visual schedules (pictures or words) to show what\'s coming next. Warn your child before transitions ("In 5 minutes, we\'re leaving the park"). Predictability reduces anxiety and challenging behavior significantly.',
  },
  {
    num: '2',
    title: 'Follow Your Child\'s Lead',
    body: 'During play, join what your child is already doing instead of redirecting. Get on the floor, imitate their actions, and comment on what you see. Child-led play builds joint attention, language, and social connection — the building blocks of communication.',
  },
  {
    num: '3',
    title: 'Use Clear, Simple Language',
    body: 'Keep instructions short and specific. Instead of "stop it," say "hands down." Instead of "behave," say "sit in your chair." For children with limited language, use their level plus one word: "Ball!" → "Roll ball!"',
  },
  {
    num: '4',
    title: 'Catch the Positives',
    body: 'For every correction, aim for 4–5 specific positive comments. "I love how you put your shoes on by yourself" teaches far more than "Good job!" Positive reinforcement builds the behaviors you want to see more of — naturally and consistently.',
  },
  {
    num: '5',
    title: 'Understand the Function of Behavior',
    body: 'Before reacting to challenging behavior, ask: What is my child trying to get or avoid? Most behavior serves one of four functions: attention, access to something, escape, or sensory stimulation. Identifying the function helps you respond — not just react.',
  },
  {
    num: '6',
    title: 'Create a Sensory-Friendly Home',
    body: 'Reduce overwhelming stimuli where possible — dim harsh lights, minimize background noise, create a quiet space. Offer sensory input your child seeks: a swing, textured toys, movement breaks, or deep pressure. An occupational therapist can help design a personalized sensory plan.',
  },
  {
    num: '7',
    title: 'Take Care of Yourself Too',
    body: 'Caregiver burnout is real and it directly affects your child\'s wellbeing. Connect with a parent support group, ask for respite care, and know that needing help is not weakness. You cannot give your child what you don\'t have. Caring for yourself is caring for them.',
    highlight: true,
  },
]

const downloads = [
  {
    color: '#5BC4F8',
    title: 'IEP Meeting Preparation Checklist',
    body: 'Know exactly what to bring, what to ask, and what to look out for in your child\'s IEP meeting.',
  },
  {
    color: '#2EBB50',
    title: 'Behavior Observation Log',
    body: 'Track behaviors at home to share with your child\'s therapy team — includes time, trigger, and outcome fields.',
  },
  {
    color: '#FFE030',
    title: 'Visual Daily Schedule Template',
    body: 'A customizable visual schedule for home use — ideal for children who benefit from routine and predictability.',
  },
  {
    color: '#5BC4F8',
    title: 'Sensory Profile Questionnaire',
    body: 'Help identify your child\'s sensory sensitivities and preferences to share with their occupational therapist.',
  },
  {
    color: '#2EBB50',
    title: 'ABA Terms for Parents Glossary',
    body: 'A plain-language guide to the therapy terms your child\'s ABA team will use — so you always know what they mean.',
  },
  {
    color: '#FFE030',
    title: 'Provider Interview Question Guide',
    body: '25 questions to ask before choosing an ABA provider, speech therapist, or occupational therapist.',
  },
]

export default function ParentsPage() {
  return (
    <main>

      {/* ── Hero ── */}
      <section
        style={{ backgroundColor: WARM_BG }}
        className="pt-36 pb-16 lg:pt-44 lg:pb-20 border-b border-stone-200/60"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-6 h-px" style={{ backgroundColor: '#5BC4F8' }} />
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/45">For Families</p>
            </div>
            <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-bold text-navy-900 tracking-[-0.03em] leading-[1.06] mb-6">
              Navigate your child&apos;s<br />diagnosis with confidence.
            </h1>
            <p className="text-[clamp(1rem,1.5vw,1.1rem)] font-light text-navy-800/55 leading-relaxed max-w-xl mb-10">
              Evidence-based guidance, practical tools, and personalized support — for every stage of your family&apos;s journey.
            </p>
            <div className="flex flex-wrap gap-3 mb-7">
              <a
                href="mailto:info@light2minds.com"
                className="inline-flex items-center gap-2.5 text-[13.5px] font-bold text-navy-900 px-7 py-3.5 rounded-full transition-all duration-150 hover:translate-y-[-1px]"
                style={{ backgroundColor: '#FFE030', boxShadow: '0 4px 0 #C4A800, 0 6px 14px rgba(0,0,0,0.08)' }}
              >
                Book a 1-on-1 Session
                <ArrowRight />
              </a>
              <a
                href="#downloads"
                className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold text-navy-900 px-7 py-3.5 rounded-full border border-navy-900/18 hover:bg-navy-900 hover:text-white transition-all duration-200"
              >
                Browse free tools
                <ArrowRight />
              </a>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              {[
                { href: '#diagnosis', label: 'Diagnosis' },
                { href: '#after-diagnosis', label: "What's Next" },
                { href: '#aba', label: 'ABA Therapy' },
                { href: '#iep', label: 'IEP & School' },
                { href: '#strategies', label: 'Home Tips' },
                { href: '#sessions', label: '1-on-1 Sessions' },
                { href: '#downloads', label: 'Downloads' },
              ].map(link => (
                <a key={link.href} href={link.href}
                  className="text-[11.5px] font-medium text-navy-800/38 hover:text-navy-800 transition-colors duration-150 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-current opacity-60" />
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>


      {/* ── Understanding Diagnosis ── */}
      <section className="bg-white py-16 lg:py-24" id="diagnosis">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-12">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">Understanding Your Child</p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
                What your child&apos;s diagnosis<br />means — and what it doesn&apos;t
              </h2>
              <p className="text-[14px] text-navy-800/45 leading-relaxed max-w-sm sm:text-right">
                A diagnosis is a doorway to the right support — not a verdict. Here&apos;s what you need to know about each condition.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {conditions.map((cond, i) => (
              <motion.div
                key={cond.title}
                {...fade}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white border border-stone-200/70 rounded-2xl overflow-hidden flex flex-col"
              >
                <div className="h-[3px] w-full" style={{ backgroundColor: cond.color }} />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: cond.color + '14',
                        color: cond.color === '#FFE030' ? '#B8900E' : cond.color,
                      }}
                    >
                      <span className="w-4 h-4">{cond.icon}</span>
                    </span>
                    <h3 className="text-[14px] font-semibold text-navy-900 leading-snug">{cond.title}</h3>
                  </div>
                  <p className="text-[13px] text-navy-800/55 leading-relaxed flex-1">{cond.body}</p>
                  <div
                    className="mt-4 rounded-xl px-4 py-3"
                    style={{ backgroundColor: cond.color + '0E', borderLeft: `3px solid ${cond.color}` }}
                  >
                    <p
                      className="text-[12px] leading-relaxed"
                      style={{ color: cond.color === '#FFE030' ? '#8A6A00' : cond.color === '#5BC4F8' ? '#1A6B96' : '#1A7A3C' }}
                    >
                      <span className="font-semibold">Key insight: </span>{cond.insight}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── After Diagnosis ── */}
      <section
        style={{ backgroundColor: WARM_BG }}
        className="py-16 lg:py-24 border-t border-stone-200/60"
        id="after-diagnosis"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-12 max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">What&apos;s Next</p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
              What to expect after diagnosis.
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed">
              The period after a diagnosis is overwhelming. Here&apos;s a roadmap of what typically comes next, and how to navigate it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-w-5xl">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                {...fade}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex gap-4 bg-white border border-stone-200/60 rounded-2xl p-5"
              >
                <div
                  className="w-8 h-8 rounded-full text-white text-[12px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: step.color === '#FFE030' ? '#C4A800' : step.color }}
                >
                  {step.num}
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-navy-900 mb-1.5">{step.title}</h3>
                  <p className="text-[13px] text-navy-800/50 leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mid-page CTA */}
          <motion.div {...fade} transition={{ duration: 0.5, delay: 0.2 }} className="mt-10 flex items-center gap-4 max-w-5xl">
            <p className="text-[14px] text-navy-800/45">Have questions about these steps?</p>
            <a
              href="#sessions"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy-900 border border-navy-900/20 px-5 py-2.5 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200 flex-shrink-0"
            >
              Book a 1-on-1 session
              <ArrowRight />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── ABA Therapy ── */}
      <section className="bg-white py-16 lg:py-24 border-t border-stone-200/60" id="aba">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-12 max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">ABA Therapy</p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
              What every parent should<br />understand about ABA
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed">
              Applied Behavior Analysis is the most evidence-supported treatment for autism and related conditions. Here&apos;s how it works — without the clinical jargon.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              {
                color: '#5BC4F8',
                title: 'What Is ABA?',
                body: 'ABA applies our understanding of how behavior works to real-life situations. It examines the relationship between the environment and behavior — then uses that knowledge to teach skills, reduce challenges, and improve quality of life.',
              },
              {
                color: '#2EBB50',
                title: 'Who Is on the Team?',
                body: 'An ABA team includes a Board Certified Behavior Analyst (BCBA), who designs and supervises the therapy program, and one or more Registered Behavior Technicians (RBTs), who implement it directly with your child.',
              },
              {
                color: '#FFE030',
                title: 'What Does a Session Look Like?',
                body: 'Sessions are structured but flexible — and can take place at home, school, or a clinic. Therapists use naturalistic play, skill-building exercises, and positive reinforcement to teach communication, daily living skills, and social behavior.',
              },
            ].map((card, i) => (
              <motion.div key={card.title} {...fade} transition={{ duration: 0.4, delay: i * 0.07 }}
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: card.color + '30', backgroundColor: card.color + '08' }}
              >
                <div className="h-[3px] w-full" style={{ backgroundColor: card.color }} />
                <div className="p-6">
                  <h3 className="text-[14px] font-semibold text-navy-900 mb-3">{card.title}</h3>
                  <p className="text-[13px] text-navy-800/55 leading-relaxed">{card.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade} transition={{ duration: 0.55, delay: 0.15 }}>
            <Accordion items={abaFaqItems} openFirst />
          </motion.div>
        </div>
      </section>

      {/* ── IEP Guidance ── */}
      <section className="bg-stone-50 py-16 lg:py-24 border-t border-stone-200/60" id="iep">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-12">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">School & IEP</p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
                Your child has legal rights<br />at school. Here&apos;s how to use them.
              </h2>
              <p className="text-[14px] text-navy-800/45 max-w-sm sm:text-right leading-relaxed">
                The IEP is a legally binding document — and you are one of its authors. Understanding your rights changes the dynamic in every meeting.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <motion.div {...fade} transition={{ duration: 0.55 }} className="bg-white border border-stone-200/70 rounded-2xl p-7">
              <h3 className="text-[15px] font-semibold text-navy-900 mb-5">Your Rights as a Parent</h3>
              <ul className="space-y-3">
                {[
                  'You are a full and equal member of your child\'s IEP team.',
                  'You have the right to request an evaluation — at no cost — if you believe your child has a disability.',
                  'You must receive written notice before any change to your child\'s placement or services.',
                  'You can request an Independent Educational Evaluation (IEE) if you disagree with the school\'s assessment.',
                  'You can bring a support person or advocate to any IEP meeting.',
                  'You are entitled to a copy of all educational records — at no cost.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[13px] text-navy-800/65 leading-relaxed">
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'rgba(46,187,80,0.12)' }}
                    >
                      <svg className="w-2.5 h-2.5" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#2EBB50" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fade} transition={{ duration: 0.55, delay: 0.1 }} className="bg-white border border-stone-200/70 rounded-2xl p-7">
              <h3 className="text-[15px] font-semibold text-navy-900 mb-5">What an IEP Must Include</h3>
              <ul className="space-y-3">
                {[
                  'Present levels of academic achievement and functional performance',
                  'Annual measurable goals — academic and functional',
                  'Special education and related services (speech, OT, ABA)',
                  'Accommodation and modification list',
                  'Least restrictive environment (LRE) statement',
                  'Transition plan (required at age 16 in Florida)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[13px] text-navy-800/65 leading-relaxed">
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'rgba(91,196,248,0.12)' }}
                    >
                      <svg className="w-2.5 h-2.5" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#5BC4F8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div {...fade} transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl px-6 py-5 mb-6 border"
            style={{ backgroundColor: 'rgba(255,224,48,0.07)', borderColor: 'rgba(255,224,48,0.35)' }}
          >
            <p className="text-[13px] text-navy-800/70 leading-relaxed">
              <span className="font-semibold text-navy-800/85">Florida families: </span>
              Florida&apos;s term for special education is Exceptional Student Education (ESE). Contact your school district&apos;s ESE office — they are legally required to respond to your evaluation request within 60 days and to provide services at no cost.
            </p>
          </motion.div>

          <div className="flex gap-3 flex-wrap">
            <Link href="/tools#parent-tools"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy-900 border border-navy-900/18 px-5 py-2.5 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200">
              IEP Prep Checklist
            </Link>
            <Link href="/tools#parent-tools"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-navy-700/55 hover:text-navy-900 transition-colors duration-150 px-2 py-2.5">
              Parent Handouts
              <span className="w-4 h-px bg-current" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Home Strategies ── */}
      <section className="bg-white py-16 lg:py-24 border-t border-stone-200/60" id="strategies">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-12 max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">Home Life</p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
              7 strategies that work —<br />even on the hardest days
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed">
              You don&apos;t need a therapy degree to make a difference at home. These evidence-based approaches fit into everyday routines — and they work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-8">
            {strategies.map((s, i) => (
              <motion.div
                key={s.num}
                {...fade}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className={[
                  'flex gap-4 rounded-2xl p-5 border',
                  s.highlight
                    ? 'border-forest-200/60 lg:col-span-2'
                    : 'bg-stone-50 border-stone-200/60',
                ].join(' ')}
                style={s.highlight ? { backgroundColor: 'rgba(46,187,80,0.06)', borderColor: 'rgba(46,187,80,0.25)' } : {}}
              >
                <div
                  className="w-8 h-8 rounded-full text-white text-[12px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 flex-shrink-0"
                  style={{ backgroundColor: '#5BC4F8' }}
                >
                  {s.num}
                </div>
                <div className={s.highlight ? 'max-w-2xl' : ''}>
                  <h3 className="text-[14px] font-semibold text-navy-900 mb-1.5">{s.title}</h3>
                  <p className="text-[13px] text-navy-800/55 leading-relaxed">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <Link href="/tools#parent-tools"
            className="inline-flex items-center gap-3 text-[13px] font-semibold text-navy-900 border border-navy-900/18 px-6 py-3 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200">
            Download Home Strategy Guides
            <ArrowRight />
          </Link>
        </div>
      </section>

      {/* ── 1-on-1 Sessions ── */}
      <section
        style={{ backgroundColor: WARM_BG }}
        className="py-16 lg:py-24 border-t border-stone-200/60"
        id="sessions"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div {...fade} transition={{ duration: 0.65 }}>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">Personalized Support</p>
              <h2 className="text-[clamp(1.7rem,3.5vw,2.4rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-5">
                Sometimes a guide<br />isn&apos;t enough.
              </h2>
              <p className="text-[15px] text-navy-800/50 leading-relaxed mb-7">
                Our 1-on-1 parent education sessions give you dedicated time with a behavioral health specialist to discuss your child&apos;s specific situation, ask every question you&apos;ve been holding, and leave with a clear, personalized plan.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Understanding your child\'s specific diagnosis and developmental profile',
                  'Reviewing evaluation reports and therapy recommendations',
                  'Preparing for IEP meetings and advocating effectively',
                  'Building a home support strategy tailored to your family',
                  'Guidance on selecting and evaluating therapists and providers',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-[13px] text-navy-800/65 leading-relaxed">
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'rgba(46,187,80,0.12)' }}
                    >
                      <svg className="w-2.5 h-2.5" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#2EBB50" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 flex-wrap">
                <a
                  href="mailto:info@light2minds.com"
                  className="inline-flex items-center gap-2.5 text-[13.5px] font-bold text-navy-900 px-7 py-3.5 rounded-full transition-all duration-150 hover:translate-y-[-1px]"
                  style={{ backgroundColor: '#FFE030', boxShadow: '0 4px 0 #C4A800, 0 6px 14px rgba(0,0,0,0.08)' }}
                >
                  Book a Session
                  <ArrowRight />
                </a>
                <a
                  href="https://wa.me/15613772473"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-navy-700/50 hover:text-navy-900 transition-colors duration-200 px-2 py-3"
                >
                  Message on WhatsApp
                  <span className="w-4 h-px bg-current" />
                </a>
              </div>
            </motion.div>

            <motion.div {...fade} transition={{ duration: 0.55, delay: 0.12 }}>
              <div className="bg-white rounded-2xl p-7 border border-stone-200/60">
                <h3 className="text-[14px] font-semibold text-navy-900 mb-5">What parents say</h3>
                <div className="space-y-6">
                  <blockquote>
                    <Stars />
                    <p className="text-[13.5px] italic text-navy-800/65 leading-relaxed mb-3">
                      &ldquo;After our session I finally understood what was in my daughter&apos;s evaluation report. I went to the IEP meeting prepared, and for the first time I actually advocated for what she needed.&rdquo;
                    </p>
                    <cite className="text-[11px] font-semibold text-navy-800/35 not-italic tracking-[0.04em] uppercase">— Florida Parent</cite>
                  </blockquote>
                  <div className="border-t border-stone-100 pt-6">
                    <blockquote>
                      <Stars />
                      <p className="text-[13.5px] italic text-navy-800/65 leading-relaxed mb-3">
                        &ldquo;I had so many questions after my son was diagnosed with autism. The session gave me a roadmap I didn&apos;t know I needed — and the confidence to use it.&rdquo;
                      </p>
                      <cite className="text-[11px] font-semibold text-navy-800/35 not-italic tracking-[0.04em] uppercase">— Florida Parent</cite>
                    </blockquote>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Downloads ── */}
      <section className="bg-stone-50 py-16 lg:py-24 border-t border-stone-200/60" id="downloads">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">Free Resources</p>
              <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-2">
                Your complete parent toolkit.
              </h2>
              <p className="text-[14px] text-navy-800/45 leading-relaxed max-w-md mt-2">
                Six professionally designed resources to support your family at home and in every clinical setting. Free — no account required.
              </p>
            </div>
            <Link href="/tools"
              className="inline-flex items-center gap-3 text-[13px] font-semibold text-navy-900 border border-navy-900/18 px-6 py-3 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200 self-start lg:self-auto flex-shrink-0">
              View all resources
              <ArrowRight />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {downloads.map((d, i) => (
              <motion.div key={d.title} {...fade} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white border border-stone-200/70 rounded-2xl overflow-hidden flex flex-col">
                <div className="h-[3px] w-full" style={{ backgroundColor: d.color }} />
                <div className="p-6 flex flex-col flex-1">
                  <span
                    className="text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full inline-block mb-4 self-start"
                    style={{
                      backgroundColor: d.color + '18',
                      color: d.color === '#FFE030' ? '#B8900E' : d.color,
                    }}
                  >
                    PDF
                  </span>
                  <h3 className="text-[14px] font-semibold text-navy-900 mb-2 leading-snug">{d.title}</h3>
                  <p className="text-[13px] text-navy-800/45 leading-relaxed flex-1 mb-5">{d.body}</p>
                  <button
                    className="inline-flex items-center gap-2 text-[12px] font-bold self-start px-4 py-2 rounded-full transition-all duration-150 hover:translate-y-[-1px]"
                    style={{
                      backgroundColor: d.color + '15',
                      color: d.color === '#FFE030' ? '#B8900E' : d.color,
                    }}
                  >
                    Download Free
                    <DownloadIcon />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        style={{ backgroundColor: '#0D1B2E' }}
        className="py-16 lg:py-20 border-t border-navy-900"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-white tracking-[-0.025em] leading-[1.1] mb-4">
                You&apos;re not navigating this alone.
              </h2>
              <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.50)' }}>
                Light2Minds was built for this moment — when you need clear answers, practical tools, and the confidence to advocate for your child. Everything we&apos;ve created is here for your family.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2.5 text-[13.5px] font-bold text-navy-900 px-7 py-3.5 rounded-full transition-all duration-150 hover:translate-y-[-1px]"
                style={{ backgroundColor: '#FFE030', boxShadow: '0 4px 0 #C4A800' }}
              >
                Browse All Resources
                <ArrowRight />
              </Link>
              <a
                href="mailto:info@light2minds.com"
                className="inline-flex items-center justify-center gap-2.5 text-[13.5px] font-semibold text-white px-7 py-3.5 rounded-full border transition-all duration-200 hover:bg-white hover:text-navy-900"
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
