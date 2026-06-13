'use client'

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

const trustPoints = [
  {
    en: 'Written by credentialed behavioral health professionals',
    es: 'Escrito por profesionales de salud conductual certificados',
  },
  {
    en: 'Aligned with BACB standards and current ABA best practices',
    es: 'Alineado con los estándares del BACB y las mejores prácticas actuales de ABA',
  },
  {
    en: 'Designed for families and professionals — not just clinicians',
    es: 'Diseñado para familias y profesionales — no solo para clínicos',
  },
  {
    en: '40+ free, downloadable tools — no account or paywall',
    es: 'Más de 40 herramientas gratuitas y descargables — sin cuenta ni pago',
  },
  {
    en: 'Available in English and Spanish',
    es: 'Disponible en inglés y español',
  },
]


export default function MissionSection() {
  const { lang } = useLang()
  const t = (obj: { en: string; es: string }) => obj[lang]

  return (
    <section
      style={{ backgroundColor: WARM_BG }}
      className="relative overflow-hidden py-10 lg:py-14 border-t border-stone-200/40"
    >
      {/* Ghost watermark */}
      <span
        className="absolute bottom-0 right-6 text-[clamp(4rem,20vw,16rem)] font-black leading-none select-none pointer-events-none"
        style={{ color: 'rgba(13,27,46,0.025)' }}
        aria-hidden="true"
      >
        L2M
      </span>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">

        {/* ── Layer 1: Mission headline (left) + trust checkpoints (right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

          {/* Left — sticky on scroll */}
          <motion.div {...fade()} className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-5 h-px flex-shrink-0" style={{ backgroundColor: '#2EBB50' }} />
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-700/50">
                {lang === 'es' ? 'Nuestra Misión' : 'Our Mission'}
              </span>
            </div>

            <h2
              className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.06] tracking-[-0.03em] mb-4"
              style={GRAD_TEXT}
            >
              {lang === 'es'
                ? <>Orientación conductual<br />que realmente ayuda.</>
                : <>Behavioral guidance<br />that actually helps.</>}
            </h2>

            <p className="text-[15px] text-navy-800/55 leading-relaxed max-w-lg">
              {lang === 'es'
                ? 'Light2Minds existe en la intersección de dos necesidades: familias que navegan diagnósticos sin un mapa, y profesionales que construyen carreras sin suficientes herramientas. Llenamos ese espacio con orientación que es cálida, precisa y genuinamente útil.'
                : 'Light2Minds exists at the intersection of two needs: families navigating diagnoses without a map, and professionals building careers without enough tools. We fill that gap with guidance that is warm, accurate, and genuinely useful.'}
            </p>
          </motion.div>

          {/* Right — trust checkpoints as editorial rows */}
          <motion.div {...fade(0.12)} className="space-y-px">
            {trustPoints.map((pt, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-4 border-b border-stone-200/50 last:border-b-0"
              >
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-[2px]"
                  style={{ backgroundColor: 'rgba(46,187,80,0.12)' }}
                >
                  <svg className="w-3 h-3" viewBox="0 0 12 10" fill="none">
                    <path
                      d="M1 5L4.5 8.5L11 1"
                      stroke="#2EBB50"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="text-[14px] text-navy-800/65 leading-relaxed">{t(pt)}</p>
              </div>
            ))}
          </motion.div>

        </div>


      </div>
    </section>
  )
}
