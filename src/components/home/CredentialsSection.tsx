'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/lib/language'

const WARM_BG = '#F8F5EF'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export default function CredentialsSection() {
  const { lang } = useLang()

  return (
    <section
      style={{ backgroundColor: WARM_BG }}
      className="py-24 lg:py-36 border-t border-stone-200/40"
      id="about"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <motion.div {...fade()} className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-5 h-px flex-shrink-0" style={{ backgroundColor: '#5BC4F8' }} />
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-700/50">
              {lang === 'es' ? 'Sobre el Fundador' : 'About the Founder'}
            </span>
          </div>
          <h2 className="text-[clamp(1.8rem,3.8vw,2.8rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
            {lang === 'es' ? 'Quién está detrás de Light2Minds.' : 'Who is behind Light2Minds.'}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 items-start">

          {/* Photo placeholder */}
          <motion.div {...fade(0.08)}>
            <div
              className="w-full aspect-[3/4] rounded-2xl flex items-center justify-center border border-stone-200"
              style={{ backgroundColor: 'rgba(91,196,248,0.07)' }}
            >
              <div className="text-center px-6">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(91,196,248,0.15)' }}
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#5BC4F8" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-[12px] text-navy-800/35 leading-relaxed">
                  {lang === 'es' ? 'Foto próximamente' : 'Photo coming soon'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Credentials — placeholder */}
          <motion.div {...fade(0.14)} className="lg:col-span-2 space-y-6">

            {/* Name + title placeholder */}
            <div className="pb-6 border-b border-stone-200/70">
              <div className="h-7 w-48 rounded-lg mb-2" style={{ backgroundColor: 'rgba(13,27,46,0.06)' }} />
              <div className="h-4 w-64 rounded-lg" style={{ backgroundColor: 'rgba(13,27,46,0.04)' }} />
            </div>

            {/* Credential cards placeholder */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="rounded-xl p-4 border border-stone-200/60"
                  style={{ backgroundColor: 'rgba(13,27,46,0.02)' }}
                >
                  <div className="h-3 w-20 rounded mb-2" style={{ backgroundColor: 'rgba(13,27,46,0.06)' }} />
                  <div className="h-4 w-32 rounded" style={{ backgroundColor: 'rgba(13,27,46,0.04)' }} />
                </div>
              ))}
            </div>

            {/* Bio placeholder */}
            <div className="space-y-2 pt-2">
              {[100, 90, 95, 70].map((w, i) => (
                <div
                  key={i}
                  className="h-3.5 rounded"
                  style={{ width: `${w}%`, backgroundColor: 'rgba(13,27,46,0.04)' }}
                />
              ))}
            </div>

            <p className="text-[13px] text-navy-800/35 italic pt-2">
              {lang === 'es'
                ? '— Credenciales completas próximamente —'
                : '— Full credentials coming soon —'}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
