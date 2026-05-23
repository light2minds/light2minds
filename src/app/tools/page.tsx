'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const fade = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

type ToolCard = {
  title: string
  description: string
  format: string
  audience: string
  category: 'clinical' | 'parent' | 'sensory' | 'developmental' | 'rbt' | 'center'
  searchTerms?: string
}

const clinicalTools: ToolCard[] = [
  {
    title: 'ABC Data Sheet',
    description: 'Antecedent-Behavior-Consequence data collection form for functional behavior assessment. Includes columns for time, setting, antecedent, behavior description, consequence, and hypothesized function.',
    format: 'PDF',
    audience: 'For Professionals',
    category: 'clinical',
    searchTerms: 'ABC Data Sheet Antecedent Behavior Consequence',
  },
  {
    title: 'Discrete Trial (DTT) Data Sheet',
    description: 'Track correct, incorrect, and prompted responses across trials. Includes target name, SD, prompt level, response recording (+ / – / P), and mastery criteria tracking.',
    format: 'PDF',
    audience: 'For Professionals',
    category: 'clinical',
    searchTerms: 'Discrete Trial DTT Data Sheet Skill Acquisition',
  },
  {
    title: 'Behavior Frequency Tracking Sheet',
    description: 'Simple event recording form for tracking frequency of target behaviors across a session. Supports up to 5 behaviors simultaneously with tally marks and totals.',
    format: 'PDF',
    audience: '',
    category: 'clinical',
    searchTerms: 'Behavior Frequency Tracking Event Recording',
  },
  {
    title: 'Duration & Latency Recording Form',
    description: 'Track how long behaviors last (duration) and how quickly they occur after a stimulus (latency). Includes start/stop times and calculation fields.',
    format: 'PDF',
    audience: '',
    category: 'clinical',
    searchTerms: 'Duration Latency Recording Form',
  },
  {
    title: 'Interval Recording Data Sheet',
    description: 'Whole-interval, partial-interval, and momentary time sampling recording forms. Pre-divided into 10-second intervals across a 30-minute observation period.',
    format: 'PDF',
    audience: '',
    category: 'clinical',
    searchTerms: 'Interval Recording Whole Partial Momentary Time Sampling',
  },
  {
    title: 'Session Note Template',
    description: 'Insurance-ready session note format covering all required documentation elements. Includes target summary, behavioral events, progress narrative, and next session plan.',
    format: 'PDF + Word',
    audience: '',
    category: 'clinical',
    searchTerms: 'Session Note Template Documentation',
  },
  {
    title: 'Task Analysis Data Sheet',
    description: 'Blank task analysis data sheet for chaining programs. Record independence (+), prompt level (P, G, M, PP, FP), or failure (–) for each step. Supports up to 20 steps and 10 sessions.',
    format: 'PDF',
    audience: '',
    category: 'clinical',
    searchTerms: 'Task Analysis Chaining Data Sheet',
  },
  {
    title: 'Preference Assessment Recording Form',
    description: 'Free operant and MSWO (Multiple Stimulus Without Replacement) preference assessment recording forms to identify potential reinforcers for individual learners.',
    format: 'PDF',
    audience: '',
    category: 'clinical',
    searchTerms: 'Preference Assessment MSWO Free Operant',
  },
]

const parentTools: ToolCard[] = [
  {
    title: 'IEP Meeting Preparation Checklist',
    description: 'Know exactly what to bring, what to ask, and what to look for in your child\'s IEP meeting. Includes a rights summary and post-meeting action steps.',
    format: 'PDF',
    audience: 'For Families',
    category: 'parent',
    searchTerms: 'IEP Preparation Checklist School Parents',
  },
  {
    title: 'Home Behavior Observation Log',
    description: 'Parent-friendly form for tracking behaviors at home — time, setting, what triggered it, what happened after, and your child\'s emotional state. Share with your child\'s therapy team.',
    format: 'PDF',
    audience: 'For Families',
    category: 'parent',
    searchTerms: 'Behavior Observation Log Home Parent',
  },
  {
    title: 'Visual Daily Schedule Template',
    description: 'Customizable visual schedule for home use. Available in morning routine, after-school, bedtime, and full-day formats. Supports predictability and reduces transition-related behaviors.',
    format: 'PDF',
    audience: 'For Families',
    category: 'parent',
    searchTerms: 'Visual Daily Schedule Home Routine Autism ADHD',
  },
  {
    title: 'ABA Terms for Parents — Glossary',
    description: 'A plain-language guide to the therapy terms your child\'s ABA team will use — so you always feel informed, not confused, in meetings and calls.',
    format: 'PDF',
    audience: 'For Families',
    category: 'parent',
    searchTerms: 'ABA Glossary Terms Parents Plain Language',
  },
  {
    title: 'Provider Interview Question Guide',
    description: '25 essential questions to ask before choosing an ABA provider, speech therapist, or occupational therapist. Know what good looks like before you commit.',
    format: 'PDF',
    audience: 'For Families',
    category: 'parent',
    searchTerms: 'Provider Interview Questions ABA Speech OT',
  },
  {
    title: 'Home Strategy Quick-Reference Guide',
    description: 'Seven proven home strategies — visual schedules, child-led play, positive reinforcement, simple language, and more — explained simply and practically for everyday use.',
    format: 'PDF',
    audience: 'For Families',
    category: 'parent',
    searchTerms: 'Home Strategy Guide Parenting Autism ADHD',
  },
  {
    title: 'After the Diagnosis — A Parent Roadmap',
    description: 'A compassionate, step-by-step guide for parents in the first weeks after a diagnosis. What to do, who to call, and how to take care of yourself too.',
    format: 'PDF',
    audience: 'For Families',
    category: 'parent',
    searchTerms: 'First Diagnosis Guide What to Do After Autism ADHD',
  },
  {
    title: 'Reinforcement Menu for Home',
    description: 'A customizable menu of reinforcer categories (activities, social, sensory, edible, tangible) to help parents identify what motivates their child and use it intentionally to build positive behaviors.',
    format: 'PDF',
    audience: 'Families & Professionals',
    category: 'parent',
    searchTerms: 'Reinforcement Menu Reward Chart Children',
  },
]

const sensoryItems = [
  {
    title: 'Weighted Vests & Blankets',
    body: 'Deep pressure tools that provide proprioceptive input to help calm and regulate children who seek heavy work or have trouble with sensory modulation.',
    tag: 'Deep Pressure',
  },
  {
    title: 'Noise-Canceling Headphones',
    body: 'Helpful for children with auditory hypersensitivity — in classrooms, grocery stores, or any high-stimulation environment. Available in child sizes.',
    tag: 'Auditory',
  },
  {
    title: 'Wobble Seats & Cushions',
    body: 'Provides vestibular and proprioceptive input for children who need movement to focus. Great for classroom or homework desk use.',
    tag: 'Vestibular',
  },
  {
    title: 'Fidget Tools',
    body: 'Textured fidgets, stress balls, and hand spinners provide tactile input and help channel sensory-seeking behavior in a controlled way during learning activities.',
    tag: 'Tactile',
  },
  {
    title: 'Oral Sensory Tools',
    body: 'Chew necklaces, vibrating oral tools, and chewy tubes for children who are oral sensory seekers — a safer, socially appropriate alternative to chewing clothing or objects.',
    tag: 'Oral',
  },
  {
    title: 'Sensory Bins & Play Materials',
    body: 'Sand, water, kinetic sand, slime, and rice bins provide controlled tactile and proprioceptive exploration — often used in sensory diets prescribed by OTs.',
    tag: 'Tactile',
  },
  {
    title: 'Visual Sensory Tools',
    body: 'Sunglasses for light sensitivity, visual timers (like Time Timer), calm-down glitter jars, and visual schedules to reduce visual overstimulation and support transitions.',
    tag: 'Visual',
  },
  {
    title: 'Calming Corner Essentials',
    body: 'A designated, low-stimulation area with soft lighting, a bean bag or crash pad, weighted lap pad, noise-canceling headphones, and a feelings chart for self-regulation.',
    tag: 'Self-Regulation',
  },
]

const developmentalTools: ToolCard[] = [
  {
    title: 'Early Language Development Activity Guide',
    description: '25 simple, play-based activities to support communication development in young children — from first words to two-word combinations. No materials required beyond everyday objects.',
    format: 'PDF',
    audience: '',
    category: 'developmental',
    searchTerms: 'Early Language Development Activities Play',
  },
  {
    title: 'Social Skills Activity Cards',
    description: '30 printable activity cards for building social skills at home — turn-taking, sharing, requesting, greeting, and perspective-taking activities for ages 3–10.',
    format: 'PDF',
    audience: '',
    category: 'developmental',
    searchTerms: 'Social Skills Play Activities Children Peers',
  },
  {
    title: 'Fine Motor Activity Guide',
    description: 'Easy fine motor activities to support hand strength, coordination, and pre-writing skills — using household materials like play-doh, tweezers, and stickers.',
    format: 'PDF',
    audience: '',
    category: 'developmental',
    searchTerms: 'Fine Motor Activities Development Children Preschool',
  },
  {
    title: 'Emotions & Feelings Cards',
    description: 'Printable emotions flashcards and a feelings check-in chart for children — supports emotional vocabulary and regulation skills. Available in simple and detailed versions.',
    format: 'PDF',
    audience: '',
    category: 'developmental',
    searchTerms: 'Emotion Feelings Regulation Cards Children',
  },
  {
    title: 'Developmental Milestone Checklist',
    description: 'Age-by-age developmental milestone checklist (birth to age 8) covering motor, language, cognitive, and social-emotional development. Use to track progress and identify areas of concern.',
    format: 'PDF',
    audience: '',
    category: 'developmental',
    searchTerms: 'Milestone Checklist Developmental Ages Stages',
  },
  {
    title: 'Daily Living Skills Task Cards',
    description: 'Visual step-by-step cards for common daily living skills — hand-washing, getting dressed, brushing teeth, and making a simple snack. Print, laminate, and post at eye level.',
    format: 'PDF',
    audience: '',
    category: 'developmental',
    searchTerms: 'Daily Living Skills Self Care Chores Independence',
  },
]

const rbtTools: ToolCard[] = [
  {
    title: 'RBT Terminology Glossary',
    description: 'Comprehensive ABA glossary covering all terms from the RBT Task List — definitions, examples, and exam tips for every concept you need to know.',
    format: 'PDF',
    audience: 'For RBTs',
    category: 'rbt',
    searchTerms: 'RBT Terminology Glossary Flashcards Study',
  },
  {
    title: 'Ethics Quick-Reference Sheet',
    description: 'Key BACB Ethics Code principles summarized for RBTs — confidentiality, scope of practice, dual relationships, reporting, and professional conduct in two pages.',
    format: 'PDF',
    audience: 'For RBTs',
    category: 'rbt',
    searchTerms: 'Ethics Quick Reference BACB Code Conduct',
  },
  {
    title: 'RBT Exam Study Guide',
    description: 'Organized by Task List section (A–F), this study guide covers every competency with explanations, examples, and exam-specific study tips.',
    format: 'PDF',
    audience: 'For RBTs',
    category: 'rbt',
    searchTerms: 'RBT Study Guide Task List Exam Preparation',
  },
  {
    title: 'Monthly Supervision Log',
    description: 'BACB-aligned monthly supervision log to track required supervision hours, skills covered, and supervisor signatures. Essential for RBT certification maintenance.',
    format: 'PDF',
    audience: 'For RBTs',
    category: 'rbt',
    searchTerms: 'Supervision Log Monthly Hours Documentation',
  },
  {
    title: 'Competency Self-Assessment Checklist',
    description: 'Self-rate your competency on each skill in the RBT Task List before your formal competency assessment — identify gaps and focus your preparation.',
    format: 'PDF',
    audience: 'For RBTs',
    category: 'rbt',
    searchTerms: 'Competency Checklist Self Assessment Skills',
  },
  {
    title: 'RBT Resume Template',
    description: 'Professionally designed resume template for RBT positions — highlights key competencies, clinical experience, and credentials in a clean, ATS-friendly format.',
    format: 'Word',
    audience: 'For RBTs',
    category: 'rbt',
    searchTerms: 'Resume Template Career RBT Job Application',
  },
]

const centerTools: ToolCard[] = [
  {
    title: 'Client Intake Packet',
    description: 'Complete intake packet template — consent for treatment, HIPAA notice, developmental history form, financial agreement, and authorization forms. Fully customizable.',
    format: 'PDF + Word',
    audience: '',
    category: 'center',
    searchTerms: 'Intake Packet Client Consent Forms ABA Practice',
  },
  {
    title: 'ABA Center Launch Checklist',
    description: 'A comprehensive pre-launch checklist covering legal, clinical, operational, HIPAA, and staffing milestones — so nothing falls through the cracks before you open your doors.',
    format: 'PDF',
    audience: '',
    category: 'center',
    searchTerms: 'Center Launch Checklist Startup ABA Practice Opening',
  },
  {
    title: 'ABA Billing Workflow Guide',
    description: 'Step-by-step billing workflow, CPT code reference card, prior authorization tracking log, and a denial management tracking sheet — all in one downloadable package.',
    format: 'PDF + Excel',
    audience: '',
    category: 'center',
    searchTerms: 'Billing Workflow CPT Codes ABA Insurance',
  },
  {
    title: 'Treatment Plan Template',
    description: 'BCBA-aligned treatment plan format with sections for present levels, long-term goals, short-term objectives, methodology, generalization plan, and parent training goals.',
    format: 'Word',
    audience: '',
    category: 'center',
    searchTerms: 'Treatment Plan Template BCBA Goals Objectives',
  },
]

const TABS = [
  { id: 'all', label: 'All Resources' },
  { id: 'clinical', label: 'Clinical Forms' },
  { id: 'parent', label: 'Parent Resources' },
  { id: 'sensory', label: 'Sensory Tools' },
  { id: 'developmental', label: 'Developmental Guides' },
  { id: 'rbt', label: 'RBT Study' },
  { id: 'center', label: 'ABA Center' },
]

function ToolCardItem({ tool, accent }: { tool: ToolCard; accent: string }) {
  return (
    <div className="bg-white border border-stone-200/70 rounded-2xl overflow-hidden flex flex-col hover:shadow-sm hover:shadow-stone-200/60 hover:-translate-y-0.5 transition-all duration-200">
      <div className="p-6 flex-1">
        <h4 className="text-[14px] font-semibold text-navy-900 mb-2 leading-snug">{tool.title}</h4>
        <p className="text-[13px] text-navy-800/45 leading-relaxed">{tool.description}</p>
      </div>
      <div className="px-6 py-4 border-t border-stone-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {tool.format.split(' + ').map((f) => (
            <span
              key={f}
              className={`text-[10px] font-bold tracking-[0.06em] uppercase px-1.5 py-0.5 rounded ${
                f === 'PDF' ? 'bg-red-50 text-red-700' :
                f === 'Word' ? 'bg-blue-50 text-blue-700' :
                f === 'Excel' ? 'bg-green-50 text-green-700' :
                'bg-stone-100 text-stone-500'
              }`}
            >
              {f}
            </span>
          ))}
          <span className="text-[10px] font-bold tracking-[0.06em] uppercase bg-forest-50 text-forest-700 px-1.5 py-0.5 rounded">FREE</span>
          {tool.audience && <span className="text-[11px] text-navy-800/30">{tool.audience}</span>}
        </div>
        <button className={`text-[12px] font-semibold px-4 py-1.5 rounded-full border transition-all duration-150 ${accent}`}>
          Download
        </button>
      </div>
    </div>
  )
}

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [query, setQuery] = useState('')

  const allTools = useMemo(() => [...clinicalTools, ...parentTools, ...developmentalTools, ...rbtTools, ...centerTools], [])

  const filterTools = (tools: ToolCard[]) => {
    if (!query.trim()) return tools
    const q = query.toLowerCase()
    return tools.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      (t.searchTerms || '').toLowerCase().includes(q)
    )
  }

  const showSection = (cat: string) => activeTab === 'all' || activeTab === cat
  const searchActive = query.trim().length > 0

  const searchResults = searchActive ? filterTools(allTools) : []

  const stats = [
    { value: '40+', label: 'Free Downloads', color: 'text-navy-700' },
    { value: '6', label: 'Resource Categories', color: 'text-forest-700' },
    { value: 'PDF', label: 'Print-Ready Formats', color: 'text-gold-600' },
    { value: 'Free', label: 'No Sign-Up Required', color: 'text-sage-700' },
  ]

  return (
    <main>

      {/* Hero */}
      <section className="bg-stone-50 pt-36 pb-16 lg:pt-44 lg:pb-20 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-3xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-6 flex items-center gap-3">
              <span className="block w-6 h-px bg-navy-700/30" />
              Free Resources
            </p>
            <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold text-navy-900 tracking-[-0.03em] leading-[1.06] mb-6">
              Tools &amp; Resources
            </h1>
            <p className="text-[clamp(1rem,1.5vw,1.1rem)] font-light text-navy-800/55 leading-relaxed max-w-xl mb-8">
              A growing library of free, practical tools for families and ABA professionals — printable, downloadable, and ready to use.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#clinical-tools" className="inline-flex items-center text-[12px] font-semibold text-navy-900/60 border border-stone-200 px-4 py-2 rounded-full hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-all duration-150">Clinical Forms</a>
              <a href="#parent-tools" className="inline-flex items-center text-[12px] font-semibold text-navy-900/60 border border-stone-200 px-4 py-2 rounded-full hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-all duration-150">Parent Resources</a>
              <a href="#sensory-tools" className="inline-flex items-center text-[12px] font-semibold text-navy-900/60 border border-stone-200 px-4 py-2 rounded-full hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-all duration-150">Sensory Tools</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-stone-100">
            {stats.map((s) => (
              <div key={s.label} className="py-6 px-6 text-center">
                <strong className={`text-[2rem] font-bold leading-none block mb-1 ${s.color}`}>{s.value}</strong>
                <span className="text-[12px] text-navy-800/40">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-stone-50 border-b border-stone-200/60 py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[12px] text-navy-800/50 leading-relaxed">
            <span className="font-semibold text-navy-800/70">Disclaimer: </span>
            All tools and resources provided by Light2minds are for educational and informational use only. They are not intended to replace professional clinical assessment, therapy, or individualized recommendations. Always consult a licensed clinician before implementing any therapeutic strategy.
          </p>
        </div>
      </div>

      {/* Search + Filter + Content */}
      <section id="all-tools" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Search */}
          <div className="relative max-w-md mx-auto mb-8">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search tools and resources..."
              aria-label="Search resources"
              className="w-full bg-white border-2 border-stone-200 rounded-full px-5 py-3.5 text-[14px] text-navy-900 placeholder-navy-800/30 outline-none focus:border-navy-400/50 transition-colors duration-150"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-800/25">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="7" cy="7" r="4.5" />
                <path d="M10.5 10.5 14 14" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-14" role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => { setActiveTab(tab.id); setQuery('') }}
                className={`text-[12px] font-semibold px-5 py-2 rounded-full border transition-all duration-150 ${
                  activeTab === tab.id
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'bg-white text-navy-800/55 border-stone-200 hover:border-navy-300 hover:text-navy-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search results */}
          {searchActive && (
            <div className="mb-16">
              <p className="text-[12px] text-navy-800/35 font-medium mb-6">
                {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
              </p>
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((tool) => (
                    <ToolCardItem key={tool.title} tool={tool} accent="text-navy-700 border-navy-900/15 hover:bg-navy-900 hover:text-white hover:border-navy-900" />
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <p className="text-[15px] text-navy-800/40 mb-4">No resources match your search.</p>
                  <button onClick={() => setQuery('')} className="text-[13px] font-semibold text-navy-600/60 hover:text-navy-900 transition-colors">
                    Clear search
                  </button>
                </div>
              )}
            </div>
          )}

          {!searchActive && (
            <>
              {/* Clinical Forms */}
              {showSection('clinical') && (
                <div id="clinical-tools" className="mb-16">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 h-px bg-stone-100" />
                    <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-navy-800/30 whitespace-nowrap">Clinical Data Forms</p>
                    <div className="flex-1 h-px bg-stone-100" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {clinicalTools.map((tool) => (
                      <ToolCardItem key={tool.title} tool={tool} accent="text-navy-700 border-navy-900/15 hover:bg-navy-900 hover:text-white hover:border-navy-900" />
                    ))}
                  </div>
                </div>
              )}

              {/* Parent Resources */}
              {showSection('parent') && (
                <div id="parent-tools" className="mb-16">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 h-px bg-stone-100" />
                    <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-navy-800/30 whitespace-nowrap">Parent Resources &amp; Handouts</p>
                    <div className="flex-1 h-px bg-stone-100" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {parentTools.map((tool) => (
                      <ToolCardItem key={tool.title} tool={tool} accent="text-forest-700 border-forest-200 hover:bg-forest-700 hover:text-white hover:border-forest-700" />
                    ))}
                  </div>
                </div>
              )}

              {/* Sensory Tools */}
              {showSection('sensory') && (
                <div id="sensory-tools" className="mb-16">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-stone-100" />
                    <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-navy-800/30 whitespace-nowrap">Sensory Tool Recommendations</p>
                    <div className="flex-1 h-px bg-stone-100" />
                  </div>
                  <p className="text-[14px] text-navy-800/50 leading-relaxed mb-8 max-w-2xl">
                    These are general sensory tool categories recommended by occupational therapists. Always consult an OT for individualized recommendations for your child.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {sensoryItems.map((item) => (
                      <div key={item.title} className="bg-white border border-stone-200/70 rounded-2xl p-5">
                        <h4 className="text-[14px] font-semibold text-navy-900 mb-2">{item.title}</h4>
                        <p className="text-[13px] text-navy-800/45 leading-relaxed mb-3">{item.body}</p>
                        <span className="inline-block text-[10px] font-bold tracking-[0.08em] uppercase bg-forest-50 text-forest-700 border border-forest-100 px-2 py-0.5 rounded-full">
                          {item.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-forest-50 border border-forest-100 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <p className="text-[13px] text-navy-800/65 flex-1">
                      <span className="font-semibold text-forest-700">Download: </span>
                      Sensory Profile Questionnaire — help identify your child&apos;s sensory profile to share with their occupational therapist.
                    </p>
                    <button className="text-[12px] font-semibold text-forest-700 border border-forest-200 px-4 py-2 rounded-full hover:bg-forest-700 hover:text-white hover:border-forest-700 transition-all duration-150 flex-shrink-0">
                      Download Free
                    </button>
                  </div>
                </div>
              )}

              {/* Developmental Guides */}
              {showSection('developmental') && (
                <div id="developmental-tools" className="mb-16">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 h-px bg-stone-100" />
                    <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-navy-800/30 whitespace-nowrap">Developmental Activity Guides</p>
                    <div className="flex-1 h-px bg-stone-100" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {developmentalTools.map((tool) => (
                      <ToolCardItem key={tool.title} tool={tool} accent="text-forest-700 border-forest-200 hover:bg-forest-700 hover:text-white hover:border-forest-700" />
                    ))}
                  </div>
                </div>
              )}

              {/* RBT Study Materials */}
              {showSection('rbt') && (
                <div id="rbt-tools" className="mb-16">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 h-px bg-stone-100" />
                    <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-navy-800/30 whitespace-nowrap">RBT Study Materials</p>
                    <div className="flex-1 h-px bg-stone-100" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rbtTools.map((tool) => (
                      <ToolCardItem key={tool.title} tool={tool} accent="text-navy-700 border-navy-900/15 hover:bg-navy-900 hover:text-white hover:border-navy-900" />
                    ))}
                  </div>
                </div>
              )}

              {/* ABA Center Templates */}
              {showSection('center') && (
                <div id="center-tools" className="mb-4">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 h-px bg-stone-100" />
                    <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-navy-800/30 whitespace-nowrap">ABA Center Startup Templates</p>
                    <div className="flex-1 h-px bg-stone-100" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {centerTools.map((tool) => (
                      <ToolCardItem key={tool.title} tool={tool} accent="text-gold-700 border-gold-200 hover:bg-gold-600 hover:text-white hover:border-gold-600" />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-50 py-20 lg:py-28 border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-navy-950 rounded-3xl px-10 py-14 lg:px-16">
            <motion.div {...fade} transition={{ duration: 0.65 }} className="max-w-2xl mb-10">
              <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-white tracking-[-0.025em] leading-[1.1] mb-4">
                Need Something You Don&apos;t See Here?
              </h2>
              <p className="text-[15px] text-white/40 leading-relaxed">
                Our resource library is growing. If you&apos;re a parent or professional who needs a specific tool, reach out and let us know — we may already have it or we&apos;ll create it.
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
                Request a Resource
              </a>
              <Link
                href="/parents"
                className="inline-flex items-center gap-3 text-[13px] font-semibold text-white border border-white/15 px-6 py-3 rounded-full hover:bg-white hover:text-navy-950 transition-all duration-200"
              >
                Parent Resources
              </Link>
              <Link
                href="/professionals"
                className="inline-flex items-center gap-3 text-[13px] font-medium text-white/50 hover:text-white transition-colors duration-200 px-2 py-3"
              >
                RBT Professional Hub
                <span className="w-4 h-px bg-current" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  )
}
