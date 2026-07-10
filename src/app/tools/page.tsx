'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const fade = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

type ToolCard = {
  title: string
  description: string
  format: string
  audience: string
  category: 'clinical' | 'parent' | 'rbt'
  searchTerms?: string
  file?: string
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
    file: '/downloads/IEP_Meeting_Prep_Checklist-L2M.pdf',
  },
  {
    title: 'Home Behavior Observation Log',
    description: 'Parent-friendly form for tracking behaviors at home — time, setting, what triggered it, what happened after, and your child\'s emotional state. Share with your child\'s therapy team.',
    format: 'PDF',
    audience: 'For Families',
    category: 'parent',
    searchTerms: 'Behavior Observation Log Home Parent',
    file: '/downloads/Light2Minds_Home_Behavior_Observation_Log.pdf',
  },
  {
    title: 'Visual Morning Schedule',
    description: 'A printable visual schedule for morning routines — wake up, get dressed, eat breakfast, brush teeth, and more. Supports predictability and reduces transition-related behaviors.',
    format: 'PDF',
    audience: 'For Families',
    category: 'parent',
    searchTerms: 'Visual Morning Schedule Home Routine Autism ADHD',
    file: '/downloads/Visual_Morning_Schedule-L2M.pdf',
  },
  {
    title: 'Visual Bedtime Routine',
    description: 'An editable, printable visual chart for bedtime routines — bath, pajamas, brushing teeth, story time, and lights out. Supports predictability and reduces bedtime transition struggles.',
    format: 'PDF',
    audience: 'For Families',
    category: 'parent',
    searchTerms: 'Visual Bedtime Routine Chart Home Autism ADHD',
    file: '/downloads/Visual_Bedtime_Routine-L2M.pdf',
  },
  {
    title: 'Bedtime Schedule Card — Boy & Girl',
    description: 'A simple, single-page bedtime schedule card with matching boy and girl versions. A quick, ready-to-print alternative to the full bedtime routine chart.',
    format: 'PDF',
    audience: 'For Families',
    category: 'parent',
    searchTerms: 'Bedtime Schedule Card Boy Girl Simple Routine',
    file: '/downloads/Bedtime_Schedule_Boy_and_Girl-L2M.pdf',
  },
  {
    title: 'First-Then Board System',
    description: 'A printable First-Then visual support board to help children understand what comes next — pairs a less-preferred task with a preferred one to build cooperation and reduce transition resistance.',
    format: 'PDF',
    audience: 'For Families',
    category: 'parent',
    searchTerms: 'First Then Board Visual Support Autism ADHD',
    file: '/downloads/L2M_First_Then_Board_System.pdf',
  },
  {
    title: 'ABA Terms for Parents — Glossary',
    description: 'A plain-language guide to the therapy terms your child\'s ABA team will use — so you always feel informed, not confused, in meetings and calls.',
    format: 'PDF',
    audience: 'For Families',
    category: 'parent',
    searchTerms: 'ABA Glossary Terms Parents Plain Language',
    file: '/downloads/Light2Minds_ABA_Terms_for_Parents_Glossary.pdf',
  },
  {
    title: 'Provider Interview Question Guide',
    description: '25 essential questions to ask before choosing an ABA provider, speech therapist, or occupational therapist. Know what good looks like before you commit.',
    format: 'PDF',
    audience: 'For Families',
    category: 'parent',
    searchTerms: 'Provider Interview Questions ABA Speech OT',
    file: '/downloads/Provider_Interview_Question_Guide-L2M.pdf',
  },
  {
    title: 'Home Strategy Quick-Reference Guide',
    description: 'Seven proven home strategies — visual schedules, child-led play, positive reinforcement, simple language, and more — explained simply and practically for everyday use.',
    format: 'PDF',
    audience: 'For Families',
    category: 'parent',
    searchTerms: 'Home Strategy Guide Parenting Autism ADHD',
    file: '/downloads/L2M_Home_Strategy_Quick_Reference_Guide.pdf',
  },
  {
    title: 'After the Diagnosis — A Parent Roadmap',
    description: 'A compassionate, step-by-step guide for parents in the first weeks after a diagnosis. What to do, who to call, and how to take care of yourself too.',
    format: 'PDF',
    audience: 'For Families',
    category: 'parent',
    searchTerms: 'First Diagnosis Guide What to Do After Autism ADHD',
    file: '/downloads/After_the_Diagnosis_Roadmap-L2M.pdf',
  },
  {
    title: 'Reinforcement Menu for Home',
    description: 'A customizable menu of reinforcer categories (activities, social, sensory, edible, tangible) to help parents identify what motivates their child and use it intentionally to build positive behaviors.',
    format: 'PDF',
    audience: 'Families & Professionals',
    category: 'parent',
    searchTerms: 'Reinforcement Menu Reward Chart Children',
    file: '/downloads/Reinforcement_Menu_for_Home-L2M.pdf',
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

const TABS = [
  { id: 'all', label: 'All Resources' },
  { id: 'parent', label: 'Parent Resources' },
  { id: 'clinical', label: 'Clinical Forms' },
  { id: 'rbt', label: 'Therapist Study' },
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
        {tool.file ? (
          <a
            href={tool.file}
            download
            className={`text-[12px] font-semibold px-4 py-1.5 rounded-full border transition-all duration-150 ${accent}`}
          >
            Download
          </a>
        ) : (
          <button
            disabled
            className="text-[12px] font-semibold px-4 py-1.5 rounded-full border border-stone-200 text-navy-800/25 cursor-not-allowed"
          >
            Coming Soon
          </button>
        )}
      </div>
    </div>
  )
}

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [query, setQuery] = useState('')

  const allTools = useMemo(() => [...clinicalTools, ...parentTools, ...rbtTools], [])

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
    { value: '3', label: 'Resource Categories', color: 'text-forest-700' },
    { value: 'PDF', label: 'Print-Ready Formats', color: 'text-gold-600' },
    { value: 'Free', label: 'No Sign-Up Required', color: 'text-sage-700' },
  ]

  return (
    <main>

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-8 lg:pt-32 lg:pb-10 border-b border-navy-800" style={{ backgroundColor: '#0D1B2E' }}>
        <span className="absolute bottom-0 right-8 text-[8rem] font-bold leading-none select-none pointer-events-none" style={{ color: 'rgba(255,255,255,0.025)' }} aria-hidden="true">FREE</span>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-3 flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.30)' }}>
              <span className="block w-5 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.20)' }} />
              Free Resources
            </p>
            <h1 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-white tracking-[-0.03em] leading-[1.08] mb-3">
              Tools &amp; Resources
            </h1>
            <p className="text-[14px] leading-relaxed mb-6 max-w-xl" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Free, printable tools for families and ABA professionals — ready to download, no sign-up required.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a href="#parent-tools"
                className="inline-flex items-center text-[12.5px] font-semibold px-4 py-2 rounded-full transition-all duration-150 hover:opacity-85"
                style={{ backgroundColor: '#2EBB50', color: '#fff' }}>
                Parent Resources
              </a>
              <a href="#clinical-tools"
                className="inline-flex items-center text-[12.5px] font-semibold text-white px-4 py-2 rounded-full transition-all duration-150 hover:opacity-85"
                style={{ backgroundColor: '#5BC4F8', color: '#0D1B2E' }}>
                Clinical Forms
              </a>
              <a href="#rbt-tools"
                className="inline-flex items-center text-[12.5px] font-semibold px-4 py-2 rounded-full transition-all duration-150 hover:opacity-85"
                style={{ backgroundColor: '#FFE030', color: '#0D1B2E' }}>
                Therapist Study
              </a>
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
              {/* Parent Resources */}
              {showSection('parent') && (
                <div id="parent-tools" className="mb-16">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 h-px bg-stone-100" />
                    <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-navy-800/30 whitespace-nowrap">Parent Resources &amp; Handouts</p>
                    <div className="flex-1 h-px bg-stone-100" />
                  </div>

                  {/* AAC Board — featured download */}
                  <div className="mb-6 bg-white border border-[#5BC4F8]/30 rounded-2xl overflow-hidden flex flex-col sm:flex-row">
                    <div className="sm:w-64 flex-shrink-0 bg-stone-50 border-b sm:border-b-0 sm:border-r border-stone-100 flex items-center justify-center p-4">
                      <Image
                        src="/aac-communication-board.jpg"
                        alt="AAC Core Vocabulary Communication Board"
                        width={320}
                        height={240}
                        className="rounded-xl w-full h-auto object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between p-6 flex-1">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full bg-[#5BC4F8]/15 text-[#3A9ECE]">For Families</span>
                          <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full bg-[#2EBB50]/12 text-[#1E8E3E]">AAC / Communication</span>
                          <span className="text-[10px] font-bold tracking-[0.06em] uppercase bg-forest-50 text-forest-700 px-1.5 py-0.5 rounded">FREE</span>
                        </div>
                        <h4 className="text-[16px] font-bold text-navy-900 mb-2 leading-snug">AAC Core Vocabulary Communication Board</h4>
                        <p className="text-[13.5px] text-navy-800/50 leading-relaxed">
                          A full-color, print-ready AAC core vocabulary board featuring 80+ high-frequency words with visual symbols. Designed for children who use Augmentative and Alternative Communication — supports verbal and non-verbal learners in home, school, and therapy settings.
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mt-5">
                        <a
                          href="/downloads/AAC_Board_HighRes.pdf"
                          download="AAC-Core-Vocabulary-Board-Light2Minds.pdf"
                          className="inline-flex items-center gap-2 text-[13px] font-bold text-white px-5 py-2.5 rounded-full transition-all duration-150 hover:-translate-y-[1px]"
                          style={{ backgroundColor: '#2EBB50', boxShadow: '0 4px 0 #1E8E3E' }}
                        >
                          Download Free
                          <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 1v8M4 6l3 3 3-3M2 11h10" />
                          </svg>
                        </a>
                        <span className="text-[12px] text-navy-800/35">PDF · Print at full size for best results</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {parentTools.map((tool) => (
                      <ToolCardItem key={tool.title} tool={tool} accent="text-forest-700 border-forest-200 hover:bg-forest-700 hover:text-white hover:border-forest-700" />
                    ))}
                  </div>
                </div>
              )}

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

              {/* Therapist Study Materials */}
              {showSection('rbt') && (
                <div id="rbt-tools" className="mb-16">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 h-px bg-stone-100" />
                    <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-navy-800/30 whitespace-nowrap">Therapist Study Materials</p>
                    <div className="flex-1 h-px bg-stone-100" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rbtTools.map((tool) => (
                      <ToolCardItem key={tool.title} tool={tool} accent="text-navy-700 border-navy-900/15 hover:bg-navy-900 hover:text-white hover:border-navy-900" />
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
          <div className="bg-white border border-stone-200/60 rounded-3xl px-10 py-14 lg:px-16">
            <motion.div {...fade} transition={{ duration: 0.65 }} className="max-w-2xl mb-10">
              <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
                Need Something You Don&apos;t See Here?
              </h2>
              <p className="text-[15px] text-navy-800/50 leading-relaxed">
                Our resource library is growing. If you&apos;re a parent or professional who needs a specific tool, reach out and let us know — we may already have it or we&apos;ll create it.
              </p>
            </motion.div>
            <motion.div
              {...fade}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="mailto:info@light2minds.com"
                className="inline-flex items-center gap-3 text-[13px] font-semibold text-navy-900 border border-navy-900/20 px-6 py-3 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200"
              >
                Request a Resource
              </a>
              <Link
                href="/parents"
                className="inline-flex items-center gap-3 text-[13px] font-semibold text-navy-900 border border-navy-900/20 px-6 py-3 rounded-full hover:bg-navy-900 hover:text-white transition-all duration-200"
              >
                Parent Resources
              </Link>
              <Link
                href="/professionals"
                className="inline-flex items-center gap-3 text-[13px] font-medium text-navy-700/50 hover:text-navy-900 transition-colors duration-200 px-2 py-3"
              >
                Therapist Professional Hub
                <span className="w-4 h-px bg-current" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  )
}
