'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Tool = {
  id: string
  title: string
  description: string
  category: string
  format: string
  audience: 'families' | 'professionals' | 'both'
}

const tools: Tool[] = [
  // Parent tools
  { id: 'p1', title: 'Autism Diagnosis Guide', description: 'Plain-language overview of the autism diagnosis process, what to expect, and next steps for newly diagnosed families.', category: 'parent-tools', format: 'PDF', audience: 'families' },
  { id: 'p2', title: 'ADHD Parent Handbook', description: 'Understanding ADHD diagnoses, medication decisions, behavioral strategies, and school accommodations.', category: 'parent-tools', format: 'PDF', audience: 'families' },
  { id: 'p3', title: 'ABA Therapy Explained', description: 'What ABA therapy is, what it is not, what to look for in a provider, and questions to ask your BCBA.', category: 'parent-tools', format: 'PDF', audience: 'families' },
  { id: 'p4', title: 'IEP Preparation Checklist', description: 'A step-by-step checklist to prepare for IEP meetings, including rights under IDEA and questions to ask the school team.', category: 'parent-tools', format: 'PDF', audience: 'families' },
  { id: 'p5', title: 'Visual Schedule Templates', description: 'Printable daily schedule templates in three formats: picture-based, text-based, and first-then board.', category: 'parent-tools', format: 'PDF', audience: 'families' },
  { id: 'p6', title: 'Behavior Regulation Strategies', description: 'Evidence-based strategies for managing challenging behavior at home, including antecedent manipulation and positive reinforcement.', category: 'parent-tools', format: 'PDF', audience: 'families' },
  { id: 'p7', title: 'Token Board System', description: 'Customizable token economy boards for home use with instructions for setup and implementation.', category: 'parent-tools', format: 'PDF', audience: 'families' },
  { id: 'p8', title: 'Insurance Appeal Letter Template', description: 'Template letter for appealing ABA therapy coverage denials, with instructions for customizing to your situation.', category: 'parent-tools', format: 'DOCX', audience: 'families' },
  { id: 'p9', title: 'Sensory Profile Guide', description: 'Overview of sensory processing differences, sensory diets, and activities to support regulation at home.', category: 'parent-tools', format: 'PDF', audience: 'families' },
  { id: 'p10', title: 'Communication Strategies Guide', description: 'Augmentative and alternative communication (AAC) overview and strategies for supporting language development at home.', category: 'parent-tools', format: 'PDF', audience: 'families' },
  { id: 'p11', title: 'Reinforcement Menu Worksheet', description: 'Blank and sample reinforcement preference surveys for parents to identify motivating items and activities.', category: 'parent-tools', format: 'PDF', audience: 'families' },
  { id: 'p12', title: 'Family Advocacy Resource Guide', description: 'Florida-specific resources for navigating school systems, therapy access, and family support services.', category: 'parent-tools', format: 'PDF', audience: 'families' },

  // Clinical tools
  { id: 'c1', title: 'ABC Data Collection Sheet', description: 'Antecedent-behavior-consequence recording form for structured functional behavior assessment data collection.', category: 'clinical-tools', format: 'PDF', audience: 'professionals' },
  { id: 'c2', title: 'Partial Interval Recording Sheet', description: 'Interval recording template with 10-second and 30-second interval formats for behavior observation.', category: 'clinical-tools', format: 'PDF', audience: 'professionals' },
  { id: 'c3', title: 'Whole Interval Recording Sheet', description: 'Whole interval recording template for behaviors that must occur throughout the entire interval.', category: 'clinical-tools', format: 'PDF', audience: 'professionals' },
  { id: 'c4', title: 'Task Analysis Template', description: 'Blank task analysis data sheet for skill chaining programs with trial-by-trial and date-based formats.', category: 'clinical-tools', format: 'PDF', audience: 'professionals' },
  { id: 'c5', title: 'Paired Stimulus Preference Assessment', description: 'Paired stimulus assessment protocol and data recording sheet for identifying high-preference reinforcers.', category: 'clinical-tools', format: 'PDF', audience: 'professionals' },
  { id: 'c6', title: 'MSWO Preference Assessment', description: 'Multiple stimulus without replacement preference assessment protocol and data form.', category: 'clinical-tools', format: 'PDF', audience: 'professionals' },
  { id: 'c7', title: 'SOAP Session Note Template', description: 'Structured session note format (Subjective, Objective, Assessment, Plan) formatted for ABA therapy sessions.', category: 'clinical-tools', format: 'DOCX', audience: 'professionals' },
  { id: 'c8', title: 'Behavior Intervention Plan Template', description: 'Blank BIP template with sections for operational definitions, function hypothesis, replacement behaviors, and intervention strategies.', category: 'clinical-tools', format: 'DOCX', audience: 'professionals' },

  // Developmental tools
  { id: 'd1', title: 'Developmental Milestones Guide (0–3)', description: 'Communication, motor, and social milestone checklists for children ages 0–36 months.', category: 'developmental-tools', format: 'PDF', audience: 'both' },
  { id: 'd2', title: 'Developmental Milestones Guide (3–6)', description: 'Expanded milestone checklist for preschool-age children including pre-academic and social skills.', category: 'developmental-tools', format: 'PDF', audience: 'both' },
  { id: 'd3', title: 'Fine Motor Activity Guide', description: '30 structured fine motor activities organized by skill level for home and therapy implementation.', category: 'developmental-tools', format: 'PDF', audience: 'both' },
  { id: 'd4', title: 'Gross Motor Activity Guide', description: 'Age-appropriate gross motor activities with instructions and progression criteria.', category: 'developmental-tools', format: 'PDF', audience: 'both' },
  { id: 'd5', title: 'Social Skills Activity Cards', description: 'Printable activity cards for practicing greetings, turn-taking, and conversation skills.', category: 'developmental-tools', format: 'PDF', audience: 'both' },
  { id: 'd6', title: 'Early Literacy Skill-Building Guide', description: 'Pre-reading activities and phonological awareness tasks for children ages 3–6.', category: 'developmental-tools', format: 'PDF', audience: 'both' },
  { id: 'd7', title: 'Daily Living Skills Checklist', description: 'Self-care and adaptive behavior skill checklists for preschool and school-age children.', category: 'developmental-tools', format: 'PDF', audience: 'both' },
  { id: 'd8', title: 'Play Skills Development Guide', description: 'Overview of play skill stages and structured activities for advancing from solitary to cooperative play.', category: 'developmental-tools', format: 'PDF', audience: 'both' },
  { id: 'd9', title: 'Language Development Activity Pack', description: 'A 10-activity pack for supporting expressive and receptive language development at home.', category: 'developmental-tools', format: 'PDF', audience: 'both' },
  { id: 'd10', title: 'Attention and Focus Activity Guide', description: 'Structured attention-building activities and environmental strategies for children with ADHD.', category: 'developmental-tools', format: 'PDF', audience: 'both' },

  // RBT tools
  { id: 'r1', title: 'RBT Task List Study Guide', description: 'Complete coverage of the RBT Task List (2nd Edition) organized by domain with definitions and examples.', category: 'rbt-tools', format: 'PDF', audience: 'professionals' },
  { id: 'r2', title: 'RBT Mock Exam (85 Questions)', description: 'Full-length practice exam modeled after the BACB RBT examination format with answer key and rationale.', category: 'rbt-tools', format: 'PDF', audience: 'professionals' },
  { id: 'r3', title: 'ABA Terminology Flashcards', description: '120 digital-format flashcards covering core ABA terminology, concepts, and principles.', category: 'rbt-tools', format: 'PDF', audience: 'professionals' },
  { id: 'r4', title: 'Ethics Reference Sheet', description: 'Quick-reference summary of RBT ethics, professional conduct standards, and BACB disciplinary guidelines.', category: 'rbt-tools', format: 'PDF', audience: 'professionals' },
  { id: 'r5', title: 'Supervision Log Template', description: 'BACB-compliant supervision meeting log for tracking required supervision hours and topics covered.', category: 'rbt-tools', format: 'PDF', audience: 'professionals' },
  { id: 'r6', title: 'Competency Assessment Checklist', description: 'Initial and ongoing competency assessment checklist for RBTs covering all required skill areas.', category: 'rbt-tools', format: 'PDF', audience: 'professionals' },
  { id: 'r7', title: 'RBT Resume Template', description: 'Professional resume template formatted for entry-level RBT positions with guidance on clinical experience descriptions.', category: 'rbt-tools', format: 'DOCX', audience: 'professionals' },
  { id: 'r8', title: 'RBT Interview Preparation Guide', description: 'Common RBT interview questions with guidance on how to frame your clinical experience and knowledge.', category: 'rbt-tools', format: 'PDF', audience: 'professionals' },
  { id: 'r9', title: 'Career Pathway Map: RBT to BCBA', description: 'Visual roadmap of the RBT → BCaBA → BCBA certification pathway with timeline estimates and requirements.', category: 'rbt-tools', format: 'PDF', audience: 'professionals' },
  { id: 'r10', title: 'ABA Principles Quick Reference', description: 'One-page summary of core ABA principles: reinforcement, punishment, extinction, schedules, and stimulus control.', category: 'rbt-tools', format: 'PDF', audience: 'professionals' },
  { id: 'r11', title: 'Measurement Systems Reference', description: 'Guide to frequency, rate, duration, latency, and inter-response time measurement with examples.', category: 'rbt-tools', format: 'PDF', audience: 'professionals' },
  { id: 'r12', title: 'Graphing and Data Analysis Guide', description: 'Instructions for creating and interpreting behavior graphs, trend lines, and celeration charts.', category: 'rbt-tools', format: 'PDF', audience: 'professionals' },
  { id: 'r13', title: 'DTT Procedure Reference Card', description: 'Step-by-step reference for discrete trial teaching, error correction, and prompt fading procedures.', category: 'rbt-tools', format: 'PDF', audience: 'professionals' },
  { id: 'r14', title: 'Natural Environment Teaching Guide', description: 'Overview of incidental teaching, pivotal response training, and embedded trial procedures with examples.', category: 'rbt-tools', format: 'PDF', audience: 'professionals' },
  { id: 'r15', title: 'BCBA Exam Application Checklist', description: 'Step-by-step checklist for completing the BCBA exam application including supervision verification requirements.', category: 'rbt-tools', format: 'PDF', audience: 'professionals' },
]

const categories = [
  { id: 'all', label: 'All Resources', count: tools.length },
  { id: 'parent-tools', label: 'Parent Resources', count: tools.filter(t => t.category === 'parent-tools').length },
  { id: 'clinical-tools', label: 'Clinical Forms', count: tools.filter(t => t.category === 'clinical-tools').length },
  { id: 'developmental-tools', label: 'Developmental Guides', count: tools.filter(t => t.category === 'developmental-tools').length },
  { id: 'rbt-tools', label: 'RBT Study Materials', count: tools.filter(t => t.category === 'rbt-tools').length },
]

const fade = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } }

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = tools.filter(t => {
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory
    const matchesQuery = query.trim() === '' || [t.title, t.description].join(' ').toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  })

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
              {tools.length}+ resources,<br />free and ready.
            </h1>
            <p className="text-[clamp(1rem,1.5vw,1.1rem)] font-light text-navy-800/55 leading-relaxed max-w-xl mb-10">
              Downloadable guides, templates, and tools for families navigating behavioral and developmental challenges, and for ABA professionals building their practice.
            </p>

            {/* Search */}
            <div className="relative max-w-md">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search resources..."
                className="w-full bg-white border border-stone-200 rounded-full px-5 py-3 text-[14px] text-navy-900 placeholder-navy-800/30 outline-none focus:border-navy-400/50 transition-colors duration-150"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-800/25" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="7" cy="7" r="4.5" />
                  <path d="M10.5 10.5 14 14" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-[12px] font-semibold px-4 py-2 rounded-full border transition-all duration-150 ${
                  activeCategory === cat.id
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'bg-white text-navy-800/55 border-stone-200 hover:border-navy-900/30 hover:text-navy-800'
                }`}
              >
                {cat.label}
                <span className={`ml-2 text-[11px] ${activeCategory === cat.id ? 'text-white/50' : 'text-navy-800/30'}`}>
                  {cat.id === 'all' ? tools.length : cat.count}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Results count */}
          <p className="text-[12px] text-navy-800/35 font-medium mb-8">
            {filtered.length} {filtered.length === 1 ? 'resource' : 'resources'}{query ? ` matching "${query}"` : ''}
          </p>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory + query}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filtered.map((tool, i) => (
                  <motion.div
                    key={tool.id}
                    {...fade}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="group border border-stone-200/70 rounded-2xl p-6 hover:shadow-sm hover:shadow-stone-200/60 hover:-translate-y-0.5 transition-all duration-200 bg-white flex flex-col"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-[14px] font-semibold text-navy-900 leading-snug">{tool.title}</h3>
                      <span className="text-[10px] font-bold tracking-[0.08em] text-navy-800/25 bg-stone-50 border border-stone-100 rounded px-1.5 py-0.5 flex-shrink-0">
                        {tool.format}
                      </span>
                    </div>
                    <p className="text-[13px] text-navy-800/45 leading-relaxed flex-1">{tool.description}</p>
                    <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-navy-800/30 capitalize">
                        {tool.audience === 'both' ? 'Families & Professionals' : tool.audience === 'families' ? 'Families' : 'Professionals'}
                      </span>
                      <button className="text-[12px] font-semibold text-navy-600/50 group-hover:text-navy-900 transition-colors duration-200 flex items-center gap-1.5">
                        Download
                        <span className="w-3 h-px bg-current" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center"
              >
                <p className="text-[15px] text-navy-800/40">No resources match your search.</p>
                <button
                  onClick={() => { setQuery(''); setActiveCategory('all') }}
                  className="mt-4 text-[13px] font-semibold text-navy-600/60 hover:text-navy-900 transition-colors duration-150"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

    </main>
  )
}
