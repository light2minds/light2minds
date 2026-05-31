'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Accordion from '@/components/Accordion'

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

const abaFaqItems = [
  {
    trigger: 'What is positive reinforcement and why does it matter?',
    content: (
      <p>Positive reinforcement means adding something enjoyable after a behavior, which makes that behavior more likely to happen again. In ABA, therapists identify what is motivating for your child (called &ldquo;reinforcers&rdquo;) and use them strategically to build skills. This is not bribery — it&apos;s teaching, the same way we learn.</p>
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
      <p>Progress in ABA is data-driven. Your BCBA will track skill acquisition and challenging behavior with daily data collection. You should receive regular progress reports and meetings to review goals. Ask questions — you are a critical part of the team.</p>
    ),
  },
  {
    trigger: 'Is ABA only for autism?',
    content: (
      <p>No. While ABA is most widely known for autism treatment, the principles of behavior analysis apply to any individual who would benefit from skill-building or behavior support — including children with ADHD, developmental delays, intellectual disabilities, and behavioral challenges.</p>
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

const strategies = [
  {
    num: '1',
    title: 'Build a Predictable Routine',
    body: 'Children with autism, ADHD, and developmental delays thrive with structure. Use visual schedules (pictures or words) to show what\'s coming next. Warn your child before transitions ("In 5 minutes, we\'re leaving the park"). Predictability reduces anxiety and challenging behavior.',
  },
  {
    num: '2',
    title: 'Follow Your Child\'s Lead',
    body: 'During play, join what your child is already doing instead of redirecting. Get on the floor, imitate their actions, and comment on what you see. Child-led play builds joint attention, language, and social connection — the building blocks of communication.',
  },
  {
    num: '3',
    title: 'Use Clear, Simple Language',
    body: 'Keep instructions short and specific. Instead of "stop it," say "hands down." Instead of "behave," say "sit in your chair." For children with limited language, use their language level plus one word. ("Ball!" → "Roll ball!")',
  },
  {
    num: '4',
    title: 'Catch the Positives',
    body: 'For every correction, aim for 4–5 positive comments. Specific praise teaches: "I love how you put your shoes on by yourself!" rather than just "Good job!" Positive reinforcement builds the behaviors you want to see more of.',
  },
  {
    num: '5',
    title: 'Understand the Function of Behavior',
    body: 'Before reacting to challenging behavior, ask: What is my child trying to get or avoid? Most behavior serves one of four functions: attention, access to something, escape from something, or sensory stimulation. Identifying the function helps you respond more effectively.',
  },
  {
    num: '6',
    title: 'Create a Sensory-Friendly Home',
    body: 'Reduce overwhelming stimuli where possible — dim harsh lights, minimize background noise, provide a quiet space. At the same time, offer sensory input your child seeks: a swing, textured toys, movement breaks, or deep pressure. An OT can help you design a personalized sensory diet.',
  },
  {
    num: '7',
    title: 'Take Care of Yourself Too',
    body: 'Caregiver burnout is real and it affects your child\'s wellbeing directly. You cannot pour from an empty cup. Connect with a parent support group, ask for respite care, and know that needing help is not weakness — it\'s wisdom.',
  },
]

const downloads = [
  { title: 'IEP Meeting Preparation Checklist', body: 'Know exactly what to bring, what to ask, and what to look out for in your child\'s IEP meeting.' },
  { title: 'Behavior Observation Log', body: 'Track behaviors at home to share with your child\'s therapy team — includes time, trigger, and outcome fields.' },
  { title: 'Visual Daily Schedule Template', body: 'A customizable visual schedule for home use — ideal for children who benefit from routine and predictability.' },
  { title: 'Sensory Profile Questionnaire', body: 'Help identify your child\'s sensory sensitivities and preferences to share with their occupational therapist.' },
  { title: 'ABA Terms for Parents Glossary', body: 'A plain-language guide to the therapy terms your child\'s ABA team will use — so you always know what they mean.' },
  { title: 'Provider Interview Question Guide', body: '25 questions to ask before choosing an ABA provider, speech therapist, or occupational therapist.' },
]

export default function ParentsPage() {
  return (
    <main>

      {/* Hero */}
      <section className="bg-stone-50 pt-36 pb-24 lg:pt-44 lg:pb-28 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-6 h-px bg-forest-700/40" />
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-forest-700/55">For Parents & Families</p>
            </div>
            <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-bold text-navy-900 tracking-[-0.03em] leading-[1.06] mb-6">
              For Parents &amp; Families
            </h1>
            <p className="text-[clamp(1rem,1.5vw,1.15rem)] font-light text-navy-800/55 leading-relaxed max-w-xl mb-10">
              You are not alone. Light2minds is here to walk alongside you with warm, clear, and practical information — from the moment of diagnosis and every step beyond.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { href: '#diagnosis', label: 'Understanding Diagnosis' },
                { href: '#strategies', label: 'Home Strategies' },
                { href: 'mailto:info@light2minds.com', label: 'Book a Session' },
              ].map(btn => (
                <a key={btn.href} href={btn.href}
                  className="text-[12px] font-semibold text-navy-800/60 border border-stone-200 bg-white px-4 py-2 rounded-full hover:border-navy-900/30 hover:text-navy-900 transition-all duration-150">
                  {btn.label}
                </a>
              ))}
            </div>
            {/* Quick nav anchors */}
            <div className="flex flex-wrap gap-2 mt-5">
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
                  className="text-[11px] font-medium text-navy-800/45 hover:text-navy-800 transition-colors duration-150 underline underline-offset-2">
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-white border-b border-stone-200/60 py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[12px] text-navy-800/45 leading-relaxed max-w-4xl">
            <span className="font-semibold text-navy-800/60">Important:</span>{' '}
            All content on this page is for educational purposes only. It is not a substitute for professional medical evaluation, diagnosis, therapy, or clinical supervision. Please work with qualified healthcare providers for your child&apos;s individualized care plan.
          </p>
        </div>
      </div>

      {/* Understanding Diagnosis */}
      <section className="bg-white py-24 lg:py-32" id="diagnosis">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-12">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">Understanding Your Child</p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
              Understanding your child&apos;s diagnosis.
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed max-w-2xl">
              A diagnosis is not a ceiling — it&apos;s a doorway to the right support. Here&apos;s what we help you understand across the most common neurodevelopmental conditions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'Autism Spectrum Disorder (ASD)',
                body: 'ASD is a neurodevelopmental condition that affects social communication, sensory processing, and behavior. It\'s called a "spectrum" because it looks very different in every child. Early intervention — including ABA therapy, speech therapy, and occupational therapy — can make a meaningful difference.',
                insight: 'Autism is not caused by parenting. It is a neurological difference that requires understanding, not fixing.',
              },
              {
                title: 'ADHD',
                body: 'Attention-Deficit/Hyperactivity Disorder affects focus, impulse control, and activity regulation. Children with ADHD often have exceptional creativity, energy, and problem-solving skills. Support includes behavioral strategies, school accommodations, and in some cases, medication — always under a doctor\'s guidance.',
                insight: 'ADHD is not a behavior problem. It is a neurological difference in how the brain manages attention and executive function.',
              },
              {
                title: 'Developmental Delays',
                body: 'A developmental delay means a child is reaching milestones — like walking, talking, or social skills — later than expected. Delays may affect one area or several, and many children with early support catch up significantly. Early intervention services (often free through public programs) are critical.',
                insight: '"Wait and see" is rarely the right approach. Early intervention is always more effective than waiting.',
              },
              {
                title: 'Language Delays',
                body: 'Language delays affect a child\'s ability to understand or express language. This can involve spoken words, sentence structure, or both. A speech-language pathologist (SLP) can conduct an evaluation and recommend therapy. Parents play a crucial role in building communication through daily interaction.',
                insight: null,
              },
              {
                title: 'Sensory Processing Difficulties',
                body: 'Some children are over- or under-sensitive to sounds, textures, lights, and movement. This can lead to meltdowns, avoidance, or difficulty in environments like school. An occupational therapist can assess sensory needs and create a "sensory diet" — a personalized set of activities to regulate the sensory system.',
                insight: null,
              },
              {
                title: 'Behavioral Challenges',
                body: 'Behavioral challenges — such as aggression, self-injury, tantrums, or refusal — are usually communication. When a child can\'t express their needs, their behavior does the talking. ABA therapy helps identify the function of behavior and teach more effective replacement skills.',
                insight: 'All behavior serves a function. Understanding the "why" is the first step to change.',
              },
            ].map((cond, i) => (
              <motion.div
                key={cond.title}
                {...fade}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white border border-stone-200/70 rounded-2xl p-7"
              >
                <h3 className="text-[14px] font-semibold text-navy-900 mb-3">{cond.title}</h3>
                <p className="text-[13px] text-navy-800/50 leading-relaxed">{cond.body}</p>
                {cond.insight && (
                  <div className="mt-4 bg-forest-50 border border-forest-100 rounded-xl px-4 py-3">
                    <p className="text-[12px] text-forest-800/80 leading-relaxed">
                      <span className="font-semibold">Key insight:</span> {cond.insight}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect After Diagnosis */}
      <section className="bg-stone-50 py-24 lg:py-32 border-t border-stone-200/60" id="after-diagnosis">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-12 max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">What&apos;s Next</p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
              What to expect after diagnosis.
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed">
              The period after a diagnosis can feel overwhelming. Here&apos;s a realistic roadmap of what typically comes next — and how to navigate it.
            </p>
          </motion.div>

          <div className="space-y-3 max-w-3xl">
            {[
              {
                num: '1',
                title: 'Process the News — Give Yourself Grace',
                body: "It's normal to feel grief, relief, fear, or all three at once. A diagnosis doesn't change who your child is — it gives you and the team a clearer picture of how they experience the world. Give yourself time before making any big decisions.",
              },
              {
                num: '2',
                title: "Request the Full Evaluation Report",
                body: "Get a written copy of your child's evaluation. This document is the foundation of their support plan and is required for school services, insurance authorization, and therapy referrals. Keep several copies.",
              },
              {
                num: '3',
                title: 'Connect with Early Intervention or School Services',
                body: "In Florida, children under 3 may qualify for Early Steps (Florida's early intervention program). Children 3 and older are entitled to a free appropriate public education (FAPE) — including an IEP — through their school district. Contact your district's Exceptional Student Education (ESE) department.",
              },
              {
                num: '4',
                title: 'Explore Therapy Options',
                body: "Depending on the diagnosis, your child may benefit from ABA therapy, speech-language therapy, occupational therapy, physical therapy, or a combination. Ask your pediatrician for referrals and check your insurance for covered providers.",
              },
              {
                num: '5',
                title: 'Understand Your Insurance Benefits',
                body: "Florida law (Chapters 627 and 641) requires most insurance plans to cover autism spectrum disorder treatment, including ABA therapy. Contact your insurance company to understand your specific benefits, co-pays, and prior authorization requirements.",
              },
              {
                num: '6',
                title: 'Build Your Support Network',
                body: "Connect with other families, join parent advocacy groups, and consider working with a parent advocate if IEP meetings feel difficult. You don't have to navigate this alone — and you learn fastest from people who've been there.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                {...fade}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex gap-5 bg-white border border-stone-200/70 rounded-2xl p-6"
              >
                <div className="w-8 h-8 rounded-full bg-navy-900 text-white text-[12px] font-bold flex items-center justify-center flex-shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-navy-900 mb-1.5">{step.title}</h3>
                  <p className="text-[13px] text-navy-800/50 leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How ABA Therapy Works */}
      <section className="bg-white py-24 lg:py-32 border-t border-stone-200/60" id="aba">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-12 max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">ABA Therapy</p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
              How ABA therapy works.
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed">
              Applied Behavior Analysis (ABA) is an evidence-based approach to understanding and changing behavior. Here&apos;s what every parent should know before starting services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              {
                title: 'What Is ABA?',
                body: 'ABA applies our understanding of how behavior works to real-life situations. It looks at the relationship between the environment and behavior — and uses that knowledge to teach skills, reduce challenging behaviors, and improve quality of life.',
                color: 'bg-navy-50 border-navy-100',
              },
              {
                title: 'Who Is on the Team?',
                body: 'An ABA team typically includes a Board Certified Behavior Analyst (BCBA), who designs and supervises the therapy, and one or more Registered Behavior Technicians (RBTs), who implement the program directly with your child.',
                color: 'bg-forest-50 border-forest-100',
              },
              {
                title: 'What Does a Session Look Like?',
                body: 'Sessions are structured but can take place at home, school, or a clinic. Therapists use naturalistic play, skill-building exercises, and positive reinforcement to teach everything from daily living skills to communication and social behavior.',
                color: 'bg-stone-50 border-stone-200',
              },
            ].map((card, i) => (
              <motion.div key={card.title} {...fade} transition={{ duration: 0.4, delay: i * 0.07 }}
                className={`border rounded-2xl p-7 ${card.color}`}>
                <h3 className="text-[14px] font-semibold text-navy-900 mb-3">{card.title}</h3>
                <p className="text-[13px] text-navy-800/50 leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade} transition={{ duration: 0.55, delay: 0.15 }}>
            <Accordion items={abaFaqItems} openFirst />
          </motion.div>
        </div>
      </section>

      {/* IEP Guidance */}
      <section className="bg-navy-50 py-24 lg:py-32 border-t border-navy-100/60" id="iep">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-12">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">School Support</p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
              IEP guidance &amp; school support.
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed max-w-2xl">
              The Individualized Education Program (IEP) is a legally binding document that outlines the supports your child is entitled to in public school. Here&apos;s how to navigate it confidently.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <motion.div {...fade} transition={{ duration: 0.55 }} className="bg-white border border-stone-200/70 rounded-2xl p-8">
              <h3 className="text-[15px] font-semibold text-navy-900 mb-5">Your Rights as a Parent</h3>
              <ul className="space-y-3">
                {[
                  'You are a full and equal member of your child\'s IEP team.',
                  'You have the right to request an evaluation — for free — if you suspect your child has a disability.',
                  'You must receive written notice before any change to your child\'s placement or services.',
                  'You can request an Independent Educational Evaluation (IEE) if you disagree with the school\'s evaluation.',
                  'You can bring a support person or advocate to any IEP meeting.',
                  'You can request a copy of all educational records — at no cost.',
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

            <motion.div {...fade} transition={{ duration: 0.55, delay: 0.1 }} className="bg-white border border-stone-200/70 rounded-2xl p-8">
              <h3 className="text-[15px] font-semibold text-navy-900 mb-5">What Goes Inside an IEP?</h3>
              <ul className="space-y-3">
                {[
                  'Present levels of academic achievement and functional performance',
                  'Annual measurable goals (academic and functional)',
                  'Special education services and related services (speech, OT, ABA)',
                  'Accommodation and modification list',
                  'Least restrictive environment (LRE) statement',
                  'Transition plan (age 16+ in Florida)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[13px] text-navy-800/60">
                    <span className="w-4 h-4 rounded-full bg-forest-100 border border-forest-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-2 h-2 text-forest-700" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div {...fade} transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gold-50 border border-gold-200 rounded-2xl px-6 py-5 mb-6">
            <p className="text-[13px] text-navy-800/65 leading-relaxed">
              <span className="font-semibold text-navy-800/80">Florida Tip:</span> Florida follows IDEA (Individuals with Disabilities Education Act). Exceptional Student Education (ESE) is Florida&apos;s term for special education. Contact your district&apos;s ESE office — they are required by law to respond to your request for evaluation within 60 days.
            </p>
          </motion.div>

          <div className="flex gap-3 flex-wrap">
            <Link href="/tools#parent-tools"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy-900 border border-navy-900/18 px-5 py-2.5 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200">
              IEP Prep Checklist
            </Link>
            <Link href="/tools#parent-tools"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-navy-700/60 hover:text-navy-900 transition-colors duration-150 px-2 py-2.5">
              Parent Handouts
              <span className="w-4 h-px bg-current" />
            </Link>
          </div>
        </div>
      </section>

      {/* Home Strategies */}
      <section className="bg-white py-24 lg:py-32 border-t border-stone-200/60" id="strategies">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-12 max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">Home Life</p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
              Home strategies that make a real difference.
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed">
              You don&apos;t need to be a therapist to support your child&apos;s development. These evidence-based strategies can be naturally woven into everyday routines.
            </p>
          </motion.div>

          <div className="space-y-3 max-w-3xl mb-8">
            {strategies.map((s, i) => (
              <motion.div
                key={s.num}
                {...fade}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex gap-5 bg-stone-50 border border-stone-200/60 rounded-2xl p-6"
              >
                <div className="w-8 h-8 rounded-full bg-navy-900 text-white text-[12px] font-bold flex items-center justify-center flex-shrink-0">
                  {s.num}
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-navy-900 mb-1.5">{s.title}</h3>
                  <p className="text-[13px] text-navy-800/50 leading-relaxed">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <Link href="/tools#parent-tools"
            className="inline-flex items-center gap-3 text-[13px] font-semibold text-navy-900 border border-navy-900/18 px-6 py-3 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200">
            Download Home Strategy Guides
          </Link>
        </div>
      </section>

      {/* 1-on-1 Sessions */}
      <section className="bg-stone-50 py-24 lg:py-32 border-t border-stone-200/60" id="sessions">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <motion.div {...fade} transition={{ duration: 0.65 }}>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">Personalized Support</p>
              <h2 className="text-[clamp(1.7rem,3.5vw,2.4rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-5">
                Parent 1-on-1 Educational Sessions
              </h2>
              <p className="text-[15px] text-navy-800/50 leading-relaxed mb-7">
                Sometimes you need more than a guide — you need a conversation. Our parent education sessions give you dedicated time with a specialist to discuss your child&apos;s specific situation, ask every question you&apos;ve been holding, and leave with a clear plan.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Understanding your child\'s specific diagnosis and profile',
                  'Reviewing reports and therapy recommendations',
                  'Preparing for IEP meetings and advocating for your child',
                  'Creating a home support strategy tailored to your family',
                  'Guidance on selecting therapists and providers',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-[13px] text-navy-800/65">
                    <span className="w-4 h-4 rounded-full bg-forest-100 border border-forest-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-2 h-2 text-forest-600" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 flex-wrap">
                <a href="mailto:info@light2minds.com"
                  className="inline-flex items-center gap-3 text-[13px] font-semibold text-navy-900 bg-gold-400 px-6 py-3 rounded-full hover:bg-gold-300 transition-colors duration-200">
                  Book a Session
                </a>
                <a href="mailto:info@light2minds.com"
                  className="inline-flex items-center gap-3 text-[13px] font-medium text-navy-700/50 hover:text-navy-900 transition-colors duration-200 px-2 py-3">
                  Email Us
                  <span className="w-4 h-px bg-current" />
                </a>
              </div>
            </motion.div>

            <motion.div {...fade} transition={{ duration: 0.55, delay: 0.12 }}
              className="bg-white rounded-2xl p-8">
              <h3 className="text-[15px] font-semibold text-navy-900 mb-6">What Parents Say</h3>
              <div className="space-y-5">
                <blockquote className="border-l-2 border-forest-300 pl-5">
                  <p className="text-[13px] italic text-navy-800/60 leading-relaxed mb-2">
                    &ldquo;After our session I finally felt like I understood what was in my daughter&apos;s evaluation report. I went to the next IEP meeting prepared, and for the first time I actually advocated for what she needed.&rdquo;
                  </p>
                  <cite className="text-[11px] text-navy-800/35 not-italic">— Florida Parent</cite>
                </blockquote>
                <blockquote className="border-l-2 border-navy-200 pl-5">
                  <p className="text-[13px] italic text-navy-800/60 leading-relaxed mb-2">
                    &ldquo;I had so many questions after my son was diagnosed with autism. The session gave me a roadmap I didn&apos;t know I needed.&rdquo;
                  </p>
                  <cite className="text-[11px] text-navy-800/35 not-italic">— Florida Parent</cite>
                </blockquote>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="bg-stone-50 py-24 lg:py-32 border-t border-stone-200/60" id="downloads">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">Free Resources</p>
              <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
                Downloadable parent tools.
              </h2>
              <p className="text-[15px] text-navy-800/45 leading-relaxed mt-3 max-w-md">
                Practical, print-ready resources to support your family at home and in school meetings.
              </p>
            </div>
            <Link href="/tools"
              className="inline-flex items-center gap-3 text-[13px] font-semibold text-navy-900 border border-navy-900/18 px-6 py-3 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200 self-start lg:self-auto">
              View All Resources
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {downloads.map((d, i) => (
              <motion.div key={d.title} {...fade} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white border border-stone-200/70 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.08em] text-navy-800/25 bg-stone-50 border border-stone-100 rounded px-1.5 py-0.5 mb-3 inline-block">PDF</span>
                  <h3 className="text-[14px] font-semibold text-navy-900 mb-2">{d.title}</h3>
                  <p className="text-[13px] text-navy-800/45 leading-relaxed">{d.body}</p>
                </div>
                <button className="mt-5 text-[12px] font-semibold text-navy-600/50 hover:text-navy-900 transition-colors duration-150 flex items-center gap-2 self-start">
                  Download Free
                  <span className="w-3 h-px bg-current" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade} transition={{ duration: 0.65 }} className="bg-stone-50 border border-stone-200/60 rounded-3xl px-10 py-12 lg:px-16">
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
              Every child deserves the right support.
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed mb-8 max-w-xl">
              Light2minds is here to make sure families and professionals have what they need to provide it. Explore our full library of tools and resources.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools"
                className="inline-flex items-center gap-3 text-[13px] font-semibold text-navy-900 border border-navy-900/20 px-6 py-3 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200">
                Browse All Resources
              </Link>
              <a href="mailto:info@light2minds.com"
                className="inline-flex items-center gap-3 text-[13px] font-semibold text-navy-900 bg-gold-400 px-6 py-3 rounded-full hover:bg-gold-300 transition-colors duration-200">
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
