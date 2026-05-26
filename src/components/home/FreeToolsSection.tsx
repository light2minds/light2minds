'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/language'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
})

const tools = [
  {
    color: '#5BC4F8',
    audience: { en: 'For Families', es: 'Para Familias' },
    title: { en: 'IEP Meeting Preparation Checklist', es: 'Lista de Preparación para Reunión del IEP' },
    desc: {
      en: 'Walk into your child\'s IEP meeting prepared. Know what to ask, what to bring, and what to expect — in plain language.',
      es: 'Entra a la reunión del IEP de tu hijo preparado. Sabe qué preguntar, qué llevar y qué esperar — en lenguaje claro.',
    },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h8M8 11h8M8 15h5" />
      </svg>
    ),
  },
  {
    color: '#2EBB50',
    audience: { en: 'For Families', es: 'Para Familias' },
    title: { en: 'Autism & ADHD Diagnosis Glossary', es: 'Glosario de Diagnóstico de Autismo y TDAH' },
    desc: {
      en: 'Decode the clinical language. 60+ terms explained in parent-friendly language — from ABA to sensory processing.',
      es: 'Descifra el lenguaje clínico. Más de 60 términos explicados para padres — desde ABA hasta procesamiento sensorial.',
    },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    color: '#FFE030',
    audience: { en: 'For Professionals', es: 'Para Profesionales' },
    title: { en: 'RBT Exam Quick Reference', es: 'Referencia Rápida para el Examen RBT' },
    desc: {
      en: 'Core concepts, task list summaries, and key definitions — everything you need for the RBT competency assessment.',
      es: 'Conceptos clave, resúmenes de la lista de tareas y definiciones — todo lo que necesitas para la evaluación de competencia RBT.',
    },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
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
    // Wire up to Mailchimp / ConvertKit / Formspree
    setSubmitted(true)
  }

  return (
    <section className="bg-white py-24 lg:py-32 border-t border-stone-200/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <motion.div {...fade()} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-5 h-px flex-shrink-0" style={{ backgroundColor: '#2EBB50' }} />
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-700/50">
              {lang === 'es' ? 'Recursos Gratuitos' : 'Free Resources'}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-[clamp(1.8rem,3.8vw,2.8rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
              {lang === 'es'
                ? <>Try it free.<br />No account required.</>
                : <>Try it free.<br />No account required.</>}
            </h2>
            <Link
              href="/tools"
              className="text-[13px] font-semibold text-navy-600 hover:text-navy-900 transition-colors flex items-center gap-2 flex-shrink-0"
            >
              {lang === 'es' ? 'Ver todos los recursos' : 'Browse all 40+ tools'}
              <span className="w-4 h-px bg-current" />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {tools.map((tool, i) => (
            <motion.div key={i} {...fade(i * 0.08)}>
              <Link
                href="/tools"
                className="group flex flex-col h-full rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg bg-stone-50/60"
                style={{ borderColor: tool.color + '35' }}
              >
                <div className="flex items-start justify-between mb-5">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: tool.color + '18', color: tool.color === '#FFE030' ? '#B8900E' : tool.color }}
                  >
                    <span className="w-5 h-5">{tool.icon}</span>
                  </span>
                  <span
                    className="text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: tool.color + '18', color: tool.color === '#FFE030' ? '#B8900E' : tool.color }}
                  >
                    {t(tool.audience)}
                  </span>
                </div>

                <h3 className="text-[1rem] font-bold text-navy-900 tracking-[-0.015em] leading-snug mb-3 flex-1">
                  {t(tool.title)}
                </h3>
                <p className="text-[13px] text-navy-800/55 leading-relaxed mb-5">
                  {t(tool.desc)}
                </p>

                <span
                  className="inline-flex items-center gap-2 text-[12.5px] font-bold transition-opacity opacity-70 group-hover:opacity-100"
                  style={{ color: tool.color === '#FFE030' ? '#B8900E' : tool.color }}
                >
                  {lang === 'es' ? 'Descargar gratis' : 'Download free'}
                  <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 1v8M4 6l3 3 3-3M2 11h10" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Email capture strip */}
        <motion.div
          {...fade(0.2)}
          className="rounded-2xl p-8 md:p-10 border border-stone-200/70"
          style={{ backgroundColor: 'rgba(91,196,248,0.05)' }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            <div className="flex-1">
              <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-navy-700/40 mb-1.5">
                {lang === 'es' ? 'Sin spam. Cancela cuando quieras.' : 'No spam. Unsubscribe anytime.'}
              </p>
              <h3 className="text-[1.2rem] font-bold text-navy-900 tracking-[-0.02em]">
                {lang === 'es'
                  ? 'Recibe nuevos recursos en tu bandeja de entrada.'
                  : 'Get new resources delivered to your inbox.'}
              </h3>
            </div>

            <div className="flex-shrink-0 w-full md:w-auto md:min-w-[380px]">
              {submitted ? (
                <div className="flex items-center gap-3 py-3">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(46,187,80,0.12)' }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="#2EBB50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8l3 3 7-6" />
                    </svg>
                  </span>
                  <p className="text-[14px] font-semibold text-navy-900">
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
                    placeholder={lang === 'es' ? 'tu@correo.com' : 'you@example.com'}
                    className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-stone-200 text-[14px] text-navy-900 placeholder-navy-800/25 outline-none focus:border-sky-400 transition-colors duration-150 bg-white"
                  />
                  <button
                    type="submit"
                    className="flex-shrink-0 px-5 py-3 rounded-xl text-[13.5px] font-bold text-navy-900 transition-all duration-150 hover:translate-y-[-1px] active:translate-y-[1px] whitespace-nowrap"
                    style={{
                      backgroundColor: '#FFE030',
                      boxShadow: '0 4px 0 #C4A800, 0 6px 14px rgba(0,0,0,0.08)',
                    }}
                  >
                    {lang === 'es' ? 'Suscribirme' : 'Get free resources'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
