'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/language'

const WARM_BG = '#F8F5EF'

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
      en: 'From RBT exam preparation to opening your own therapy center — study guides, mentorship, clinical tools, and career frameworks to support every stage of your professional journey.',
      es: 'Desde la preparación para el examen RBT hasta abrir tu propio centro de terapia — guías de estudio, mentoría, herramientas clínicas y marcos de carrera para cada etapa de tu camino profesional.',
    },
    href: '/professionals',
    cta: { en: 'Professional Hub', es: 'Centro Profesional' },
  },
]

export default function GoalsSection() {
  const { lang } = useLang()
  const t = (obj: { en: string; es: string }) => obj[lang]

  return (
    <section className="bg-white py-10 lg:py-14 border-t border-stone-200/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <motion.div {...fade()} className="mb-8 max-w-xl">
          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-3">
            {lang === 'es' ? 'Dos Caminos' : 'Two Pathways'}
          </p>
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
            {lang === 'es'
              ? 'Todo lo que necesitas, en un solo lugar.'
              : 'Everything you need, in one place.'}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {pillars.map((p, i) => (
            <motion.div key={p.num} {...fade(i * 0.1)}>
              <Link
                href={p.href}
                className="group flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-250 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  borderColor: p.borderColor,
                  backgroundColor: WARM_BG,
                  boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
                }}
              >
                {/* Colored top bar */}
                <div className="h-1 w-full flex-shrink-0" style={{ backgroundColor: p.color }} />

                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-3 mb-4">
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

                  <p className="text-[13.5px] text-navy-800/55 leading-relaxed flex-1 mb-5">
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
  )
}
