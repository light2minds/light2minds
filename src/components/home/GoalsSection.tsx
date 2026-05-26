'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/language'

const WARM_BG = '#F8F5EF'

const GRAD_TEXT = {
  background: 'linear-gradient(90deg, #FFE030 0%, #2EBB50 100%)',
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
  backgroundClip: 'text' as const,
  filter: 'drop-shadow(1px 1px 0 rgba(4,12,26,0.30)) drop-shadow(2px 2px 0 rgba(4,12,26,0.14))',
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
})

const pillars = [
  {
    num: '01',
    color: '#5BC4F8',
    borderColor: 'rgba(91,196,248,0.35)',
    title: { en: 'For Families', es: 'Para Familias' },
    body: {
      en: "You shouldn't need a clinical degree to advocate for your child. We translate diagnoses, therapy plans, IEP meetings, and school systems into clear, actionable guidance — so you walk into every room prepared, confident, and heard.",
      es: 'No necesitas un título clínico para abogar por tu hijo. Traducimos diagnósticos, planes de terapia, reuniones del IEP y sistemas escolares en orientación clara — para que entres a cada reunión preparado, con confianza.',
    },
    href: '/parents',
    cta: { en: 'Parent Resource Center', es: 'Centro de Recursos' },
  },
  {
    num: '02',
    color: '#2EBB50',
    borderColor: 'rgba(46,187,80,0.35)',
    title: { en: 'For Professionals', es: 'Para Profesionales' },
    body: {
      en: 'From RBT exam prep to running your own ABA practice — Light2Minds gives behavioral health professionals the study tools, clinical documentation systems, and career frameworks to grow at every stage of their journey.',
      es: 'Desde la preparación para el examen RBT hasta dirigir tu propia práctica ABA — Light2Minds da a los profesionales las herramientas de estudio, documentación clínica y marcos de carrera para crecer en cada etapa.',
    },
    href: '/professionals',
    cta: { en: 'Professional Hub', es: 'Centro Profesional' },
  },
  {
    num: '03',
    color: '#FFE030',
    borderColor: 'rgba(255,224,48,0.50)',
    title: { en: 'ABA Center Startup', es: 'Inicio Centro ABA' },
    body: {
      en: 'Opening a therapy practice is one of the most rewarding decisions in behavioral healthcare — and one of the most complex. Our step-by-step guide walks you through business formation, credentialing, staffing, billing, compliance, and clinical operations.',
      es: 'Abrir una práctica de terapia es una de las decisiones más gratificantes — y complejas — en la salud conductual. Nuestra guía te lleva por formación empresarial, acreditación, personal, facturación y operaciones clínicas.',
    },
    href: '/aba-center',
    cta: { en: 'ABA Startup Guide', es: 'Guía de Inicio ABA' },
  },
]

const trustPoints = [
  { en: 'Written by Florida-based behavioral health professionals', es: 'Escrito por profesionales de salud conductual con sede en Florida' },
  { en: 'Aligned with BACB standards and current ABA best practices', es: 'Alineado con los estándares del BACB y las mejores prácticas actuales de ABA' },
  { en: 'Designed for families and professionals — not just clinicians', es: 'Diseñado para familias y profesionales — no solo para clínicos' },
  { en: '40+ free, downloadable tools — no account or paywall', es: 'Más de 40 herramientas gratuitas y descargables — sin cuenta ni pago' },
]

export default function GoalsSection() {
  const { lang } = useLang()
  const t = (obj: { en: string; es: string }) => obj[lang]

  return (
    <>
      {/* ── Mission statement ── */}
      <section
        style={{ backgroundColor: WARM_BG }}
        className="relative overflow-hidden py-24 lg:py-36 border-t border-stone-200/40"
      >
        <span
          className="absolute bottom-0 right-6 text-[16rem] font-black leading-none select-none pointer-events-none"
          style={{ color: 'rgba(13,27,46,0.025)' }}
          aria-hidden="true"
        >
          L2M
        </span>

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <motion.div {...fade()}>
              <div className="flex items-center gap-3 mb-7">
                <span className="w-5 h-px flex-shrink-0" style={{ backgroundColor: '#2EBB50' }} />
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-700/50">
                  {lang === 'es' ? 'Nuestra Misión' : 'Our Mission'}
                </span>
              </div>
              <h2
                className="text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.06] tracking-[-0.03em] mb-7"
                style={GRAD_TEXT}
              >
                {lang === 'es'
                  ? <>Orientación conductual<br />que realmente ayuda.</>
                  : <>Behavioral guidance<br />that actually helps.</>
                }
              </h2>
              <p className="text-[15px] text-navy-800/55 leading-relaxed max-w-lg">
                {lang === 'es'
                  ? 'Light2Minds existe en la intersección de dos necesidades: familias que navegan diagnósticos sin un mapa, y profesionales que construyen carreras sin suficientes herramientas. Llenamos ese espacio con orientación cálida, precisa y práctica.'
                  : 'Light2Minds exists at the intersection of two needs: families navigating diagnoses without a map, and professionals building careers without enough tools. We fill that gap with guidance that is warm, accurate, and genuinely useful.'}
              </p>
            </motion.div>

            <motion.div {...fade(0.12)} className="space-y-4">
              {trustPoints.map((pt, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-[1px]"
                    style={{ backgroundColor: 'rgba(46,187,80,0.15)' }}
                  >
                    <svg className="w-2.5 h-2.5" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#2EBB50" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p className="text-[14px] text-navy-800/60 leading-relaxed">{t(pt)}</p>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Three pillars ── */}
      <section className="bg-white py-24 lg:py-36 border-t border-stone-200/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <motion.div {...fade()} className="mb-14 max-w-xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">
              {lang === 'es' ? 'Tres Caminos' : 'Three Pathways'}
            </p>
            <h2 className="text-[clamp(1.8rem,3.8vw,2.8rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
              {lang === 'es'
                ? 'Todo lo que necesitas, en un solo lugar.'
                : 'Everything you need, in one place.'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <motion.div key={p.num} {...fade(i * 0.1)}>
                <Link
                  href={p.href}
                  className="group flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-250 hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    borderColor: p.borderColor,
                    backgroundColor: WARM_BG,
                    boxShadow: `0 2px 20px rgba(0,0,0,0.04)`,
                  }}
                >
                  {/* Colored top bar */}
                  <div className="h-1 w-full flex-shrink-0" style={{ backgroundColor: p.color }} />

                  <div className="flex flex-col flex-1 p-8">
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="text-[11px] font-bold tracking-[0.12em]"
                        style={{ color: p.color === '#FFE030' ? '#B8900E' : p.color }}
                      >
                        {p.num}
                      </span>
                      <span
                        className="text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: p.color + '20',
                          color: p.color === '#FFE030' ? '#B8900E' : p.color,
                        }}
                      >
                        {t(p.title)}
                      </span>
                    </div>

                    <h3 className="text-[1.2rem] font-bold text-navy-900 tracking-[-0.02em] leading-snug mb-4">
                      {t(p.title)}
                    </h3>

                    <p className="text-[13.5px] text-navy-800/55 leading-relaxed flex-1 mb-7">
                      {t(p.body)}
                    </p>

                    <span
                      className="inline-flex items-center gap-2 text-[13px] font-semibold transition-opacity duration-200 opacity-70 group-hover:opacity-100"
                      style={{ color: p.color === '#FFE030' ? '#B8900E' : p.color }}
                    >
                      {t(p.cta)}
                      <span className="w-4 h-px bg-current" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
