'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/language'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
})

const tools = [
  {
    color: '#5BC4F8',
    audience: { en: 'For Families', es: 'Para Familias' },
    title: { en: 'IEP Meeting Preparation Checklist', es: 'Lista de Preparación para el IEP' },
    desc: {
      en: 'What to ask, what to bring, and what to expect — in plain language.',
      es: 'Qué preguntar, qué llevar y qué esperar — en lenguaje claro.',
    },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h8M8 11h8M8 15h5" />
      </svg>
    ),
  },
  {
    color: '#5BC4F8',
    audience: { en: 'For Families', es: 'Para Familias' },
    title: { en: 'Diagnosis Glossary', es: 'Glosario de Diagnóstico' },
    desc: {
      en: '60+ clinical terms explained in plain, parent-friendly language.',
      es: 'Más de 60 términos clínicos explicados en lenguaje para padres.',
    },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    color: '#2EBB50',
    audience: { en: 'For Professionals', es: 'Para Profesionales' },
    title: { en: 'RBT Exam Quick Reference', es: 'Referencia Rápida RBT' },
    desc: {
      en: 'Core concepts and key definitions for the RBT competency assessment.',
      es: 'Conceptos clave y definiciones para la evaluación de competencia RBT.',
    },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    color: '#2EBB50',
    audience: { en: 'For Professionals', es: 'Para Profesionales' },
    title: { en: 'ABC Data Collection Sheet', es: 'Hoja de Recolección ABC' },
    desc: {
      en: 'Printable form for daily clinical documentation and FBA support.',
      es: 'Formulario imprimible para documentación clínica y apoyo de FBA.',
    },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9M3 15h6" />
      </svg>
    ),
  },
]

export default function FreeToolsSection() {
  const { lang } = useLang()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const t = (obj: { en: string; es: string }) => obj[lang]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="bg-white py-8 lg:py-12 border-t border-stone-200/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div {...fade()} className="mb-5">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-4 h-px flex-shrink-0" style={{ backgroundColor: '#2EBB50' }} />
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-700/50">
              {lang === 'es' ? 'Recursos Gratuitos' : 'Free Resources'}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
              {lang === 'es' ? 'Pruébalo gratis. Sin cuenta.' : 'Try it free. No account required.'}
            </h2>
            <Link
              href="/tools"
              className="text-[12.5px] font-semibold text-navy-600 hover:text-navy-900 transition-colors flex items-center gap-2 flex-shrink-0"
            >
              {lang === 'es' ? 'Ver todos los recursos' : 'Browse all 40+ tools'}
              <span className="w-4 h-px bg-current" />
            </Link>
          </div>
        </motion.div>

        {/* Tool cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {tools.map((tool, i) => (
            <motion.div key={i} {...fade(i * 0.06)}>
              <Link
                href="/tools"
                className="group flex flex-col h-full rounded-xl border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md bg-stone-50/60"
                style={{ borderColor: tool.color + '30' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: tool.color + '18', color: tool.color }}
                  >
                    <span className="w-4 h-4">{tool.icon}</span>
                  </span>
                  <span
                    className="text-[9.5px] font-bold tracking-[0.08em] uppercase px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: tool.color + '18', color: tool.color }}
                  >
                    {t(tool.audience)}
                  </span>
                </div>

                <h3 className="text-[13.5px] font-bold text-navy-900 leading-snug mb-2 flex-1">
                  {t(tool.title)}
                </h3>
                <p className="text-[12.5px] text-navy-800/50 leading-relaxed mb-3">
                  {t(tool.desc)}
                </p>

                <span
                  className="inline-flex items-center gap-1.5 text-[11.5px] font-bold transition-opacity opacity-60 group-hover:opacity-100"
                  style={{ color: tool.color }}
                >
                  {lang === 'es' ? 'Ver recurso' : 'View resource'}
                  <svg className="w-3 h-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 1v8M4 6l3 3 3-3M2 11h10" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Email capture */}
        <motion.div
          {...fade(0.15)}
          className="rounded-xl px-5 py-4 border border-stone-200/70 flex flex-col sm:flex-row sm:items-center gap-4"
          style={{ backgroundColor: 'rgba(91,196,248,0.05)' }}
        >
          <div className="flex-1">
            <p className="text-[10.5px] font-semibold tracking-[0.12em] uppercase text-navy-700/35 mb-0.5">
              {lang === 'es' ? 'Sin spam. Cancela cuando quieras.' : 'No spam · Unsubscribe anytime'}
            </p>
            <p className="text-[13px] font-bold text-navy-900">
              {lang === 'es' ? 'Recibe nuevos recursos cuando salen.' : 'New resources, delivered when they launch.'}
            </p>
          </div>
          <div className="flex-shrink-0 w-full sm:w-auto sm:min-w-[340px]">
            {submitted ? (
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(46,187,80,0.12)' }}>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="#2EBB50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8l3 3 7-6" />
                  </svg>
                </span>
                <p className="text-[13px] font-semibold text-navy-900">
                  {lang === 'es' ? '¡Listo! Te llegará el primer recurso pronto.' : "You're in! First resource on its way."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={lang === 'es' ? 'tu@correo.com' : 'Your email address'}
                  className="flex-1 min-w-0 px-3.5 py-2.5 rounded-lg border border-stone-200 text-[13px] text-navy-900 placeholder-navy-800/25 outline-none focus:border-sky-400 transition-colors bg-white"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 px-4 py-2.5 rounded-lg text-[12.5px] font-bold text-navy-900 transition-all duration-150 hover:-translate-y-px whitespace-nowrap"
                  style={{ backgroundColor: '#FFE030', boxShadow: '0 3px 0 #C4A800' }}
                >
                  {lang === 'es' ? 'Suscribirme' : 'Get free resources'}
                </button>
              </form>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
