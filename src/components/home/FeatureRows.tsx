'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/language'

const fade = { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

export function FeatureFamilies() {
  const { lang } = useLang()
  const tx = (en: string, es: string) => lang === 'es' ? es : en

  const bullets = [
    tx('Plain-language guides on autism, ADHD, and developmental delays', 'Guías en lenguaje sencillo sobre autismo, TDAH y retrasos del desarrollo'),
    tx('What to expect after diagnosis — the real, unfiltered picture', 'Qué esperar después del diagnóstico — el panorama real y sin filtros'),
    tx('How ABA therapy works and what to look for in a provider', 'Cómo funciona la terapia ABA y qué buscar en un proveedor'),
    tx('Navigating IEPs, school accommodations, and 504 plans', 'Navegando el IEP, las adaptaciones escolares y los planes 504'),
    tx('Home-based strategies that actually fit real family life', 'Estrategias en el hogar que realmente se adaptan a la vida familiar'),
    tx('1-on-1 parent education sessions with a specialist', 'Sesiones individuales de educación para padres con un especialista'),
  ]

  return (
    <section className="bg-white py-24 lg:py-32 border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div {...fade} transition={{ duration: 0.65 }}>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase mb-4" style={{ color: '#2EBB50' }}>
              {tx('For Families', 'Para Familias')}
            </p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-5">
              {tx("You don't have to figure this out alone.", "No tienes que resolver esto solo.")}
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed mb-8">
              {tx(
                'Receiving a diagnosis for your child can feel like the ground shifting beneath you. Light2minds exists to give you a steady place to stand — with honest information, practical strategies, and a compassionate community.',
                'Recibir un diagnóstico para tu hijo puede sentirse como si el suelo se moviera bajo tus pies. Light2minds existe para darte un lugar firme donde pararte — con información honesta, estrategias prácticas y una comunidad compasiva.'
              )}
            </p>
            <Link
              href="/parents"
              className="inline-flex items-center gap-3 text-[13px] font-semibold text-white px-6 py-3 rounded-full transition-all duration-200"
              style={{ backgroundColor: '#2EBB50' }}
            >
              {tx('Parent Resource Center', 'Centro de Recursos para Padres')}
              <span className="w-4 h-px bg-current" />
            </Link>
          </motion.div>
          <motion.div {...fade} transition={{ duration: 0.55, delay: 0.1 }}>
            <ul className="space-y-3">
              {bullets.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14px] text-navy-800/65 leading-relaxed">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-[1px]" style={{ backgroundColor: '#2EBB5022' }}>
                    <svg className="w-2.5 h-2.5" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#2EBB50" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function FeatureProfessionals() {
  const { lang } = useLang()
  const tx = (en: string, es: string) => lang === 'es' ? es : en

  const bullets = [
    tx('Full RBT task list coverage with study guides & mock exams', 'Cobertura completa de la lista de tareas RBT con guías de estudio y exámenes de práctica'),
    tx('ABA terminology flashcards and quick-reference sheets', 'Tarjetas didácticas de terminología ABA y hojas de referencia rápida'),
    tx('Ethics module aligned with the BACB code', 'Módulo de ética alineado con el código del BACB'),
    tx('Session documentation templates and competency prep', 'Plantillas de documentación de sesiones y preparación de competencias'),
    tx('Resume writing, interview prep, and career resources', 'Redacción de currículum, preparación para entrevistas y recursos profesionales'),
    tx('Step-by-step ABA center startup guide for entrepreneurs', 'Guía paso a paso de inicio de centro ABA para emprendedores'),
  ]

  return (
    <section className="bg-stone-50 py-24 lg:py-32 border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div {...fade} transition={{ duration: 0.55, delay: 0.1 }}>
            <ul className="space-y-3">
              {bullets.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14px] text-navy-800/65 leading-relaxed">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-[1px]" style={{ backgroundColor: '#5BC4F822' }}>
                    <svg className="w-2.5 h-2.5" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#5BC4F8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fade} transition={{ duration: 0.65 }}>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">
              {tx('For RBTs & Professionals', 'Para TRCs y Profesionales')}
            </p>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-5">
              {tx('Build your career on a solid foundation.', 'Construye tu carrera sobre una base sólida.')}
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed mb-8">
              {tx(
                "The field of ABA therapy is growing rapidly. Whether you're sitting for the RBT exam, advancing your career, or opening your own practice, Light2minds gives you the tools to do it with confidence.",
                'El campo de la terapia ABA está creciendo rápidamente. Ya sea que estés presentando el examen RBT, avanzando en tu carrera o abriendo tu propia práctica, Light2minds te da las herramientas para hacerlo con confianza.'
              )}
            </p>
            <Link
              href="/professionals"
              className="inline-flex items-center gap-3 text-[13px] font-semibold text-navy-900 px-6 py-3 rounded-full transition-all duration-200"
              style={{ backgroundColor: '#5BC4F8', color: '#fff' }}
            >
              {tx('Professional Hub', 'Centro Profesional')}
              <span className="w-4 h-px bg-current" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
