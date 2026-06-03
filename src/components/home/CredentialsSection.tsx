'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/language'

const WARM_BG = '#F8F5EF'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
})

const methodology = [
  {
    color: '#5BC4F8',
    title: { en: 'Written by Practitioners', es: 'Escrito por Profesionales' },
    body: {
      en: 'Every guide, tool, and resource is developed by credentialed behavioral health professionals with hands-on clinical and family support experience.',
      es: 'Cada guía, herramienta y recurso es desarrollado por profesionales de salud conductual certificados con experiencia clínica y de apoyo familiar.',
    },
  },
  {
    color: '#2EBB50',
    title: { en: 'BACB-Aligned Standards', es: 'Alineado con Estándares BACB' },
    body: {
      en: 'All professional content is reviewed for alignment with current BACB task lists, ethical guidelines, and ABA best practices before publication.',
      es: 'Todo el contenido profesional se revisa para alinearse con las listas de tareas del BACB, las pautas éticas y las mejores prácticas de ABA.',
    },
  },
  {
    color: '#FFE030',
    title: { en: 'Family-Tested Language', es: 'Lenguaje Probado con Familias' },
    body: {
      en: 'Parent-facing content is written for clarity and warmth — no clinical jargon, no overwhelming detail, just what families actually need to know.',
      es: 'El contenido para padres está escrito con claridad y calidez — sin jerga clínica, solo lo que las familias necesitan saber.',
    },
  },
]

const credentialBadges = [
  { color: '#5BC4F8', label: { en: 'Certification', es: 'Certificación' }, value: { en: 'BCBA / RBT', es: 'BCBA / RBT' } },
  { color: '#2EBB50', label: { en: 'Location', es: 'Ubicación' }, value: { en: 'Florida, USA', es: 'Florida, EE.UU.' } },
  { color: '#FFE030', label: { en: 'Specialty', es: 'Especialidad' }, value: { en: 'Behavioral Health · ABA', es: 'Salud Conductual · ABA' } },
  { color: '#5BC4F8', label: { en: 'Focus', es: 'Enfoque' }, value: { en: 'Autism · ADHD · Development', es: 'Autismo · TDAH · Desarrollo' } },
]

export default function CredentialsSection() {
  const { lang } = useLang()
  const t = (obj: { en: string; es: string }) => obj[lang]

  return (
    <section
      style={{ backgroundColor: WARM_BG }}
      className="py-24 lg:py-36 border-t border-stone-200/40"
      id="about"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div {...fade()} className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-5 h-px flex-shrink-0" style={{ backgroundColor: '#5BC4F8' }} />
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-700/50">
              {lang === 'es' ? 'Nuestra Metodología' : 'Our Approach'}
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-[clamp(1.8rem,3.8vw,2.8rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
              {lang === 'es'
                ? 'Construido por profesionales de salud conductual.'
                : 'Built by behavioral health professionals.'}
            </h2>
            <p className="text-[15px] text-navy-800/45 leading-relaxed max-w-sm lg:text-right">
              {lang === 'es'
                ? 'Light2Minds no es un sitio de contenido genérico. Es una plataforma construida con criterios clínicos reales.'
                : 'Light2Minds is not a generic content site. It is a platform built to clinical standards — by people who work in the field.'}
            </p>
          </div>
        </motion.div>

        {/* Methodology pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {methodology.map((m, i) => (
            <motion.div
              key={i}
              {...fade(i * 0.08)}
              className="rounded-2xl p-7 border"
              style={{ borderColor: m.color + '28', backgroundColor: m.color + '06' }}
            >
              <div
                className="w-8 h-1 rounded-full mb-5 flex-shrink-0"
                style={{ backgroundColor: m.color }}
              />
              <h3 className="text-[15px] font-semibold text-navy-900 mb-3">
                {t(m.title)}
              </h3>
              <p className="text-[13px] text-navy-800/55 leading-relaxed">
                {t(m.body)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Credential badges + contact CTA */}
        <motion.div
          {...fade(0.18)}
          className="flex flex-col lg:flex-row lg:items-center gap-8 pt-10 border-t border-stone-200/50"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
            {credentialBadges.map((badge, i) => (
              <div
                key={i}
                className="rounded-xl p-4 border flex items-start gap-3"
                style={{ borderColor: badge.color + '30', backgroundColor: badge.color + '08' }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-[5px]"
                  style={{ backgroundColor: badge.color }}
                />
                <div>
                  <p
                    className="text-[10px] font-bold tracking-[0.1em] uppercase mb-0.5"
                    style={{ color: badge.color === '#FFE030' ? '#B8900E' : badge.color }}
                  >
                    {t(badge.label)}
                  </p>
                  <p className="text-[13px] font-semibold text-navy-900">
                    {t(badge.value)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:pl-8 lg:border-l border-stone-200/50 flex-shrink-0">
            <p className="text-[13px] text-navy-800/50 leading-relaxed mb-4 max-w-xs">
              {lang === 'es'
                ? '¿Tienes preguntas sobre nuestro contenido o enfoque? Nos encantaría escucharte.'
                : 'Questions about our content or methodology? We\'d love to hear from you.'}
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy-600 hover:text-navy-900 transition-colors duration-150"
            >
              {lang === 'es' ? 'Contáctanos' : 'Get in touch'}
              <span className="w-4 h-px bg-current" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
