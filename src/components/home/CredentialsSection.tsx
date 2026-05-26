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

const credentialBadges = [
  { color: '#5BC4F8', label: { en: 'Certification', es: 'Certificación' }, value: { en: 'BCBA / RBT', es: 'BCBA / RBT' } },
  { color: '#2EBB50', label: { en: 'Location', es: 'Ubicación' }, value: { en: 'Florida, USA', es: 'Florida, EE.UU.' } },
  { color: '#FFE030', label: { en: 'Specialty', es: 'Especialidad' }, value: { en: 'Behavioral Health · ABA', es: 'Salud Conductual · ABA' } },
  { color: '#5BC4F8', label: { en: 'Focus', es: 'Enfoque' }, value: { en: 'Autism · ADHD · Development', es: 'Autismo · TDAH · Desarrollo' } },
]

const testimonialSlots = [
  { audience: { en: 'Florida Parent', es: 'Madre de Florida' } },
  { audience: { en: 'RBT Professional', es: 'Profesional RBT' } },
  { audience: { en: 'ABA Center Director', es: 'Director de Centro ABA' } },
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

          {/* Photo */}
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

          {/* Bio */}
          <motion.div {...fade(0.14)} className="md:col-span-2 space-y-7">

            <div className="pb-6 border-b border-stone-200/70">
              <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-navy-700/40 mb-2">
                {lang === 'es' ? 'Fundador y Director' : 'Founder & Director'}
              </p>
              <p className="text-[1.25rem] font-bold text-navy-900/30 italic">
                {lang === 'es' ? 'Perfil completo próximamente' : 'Full profile coming soon'}
              </p>
            </div>

            <p className="text-[15px] text-navy-800/65 leading-relaxed">
              {lang === 'es'
                ? 'El fundador de Light2Minds aporta años de experiencia en salud conductual a cada guía, herramienta y recurso de este sitio. Sus credenciales completas y biografía estarán publicadas aquí pronto.'
                : 'The founder of Light2Minds brings years of behavioral health experience to every guide, tool, and resource on this site. Their full credentials and biography will be published here shortly.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    <p className="text-[10px] font-bold tracking-[0.1em] uppercase mb-0.5" style={{ color: badge.color === '#FFE030' ? '#B8900E' : badge.color }}>
                      {t(badge.label)}
                    </p>
                    <p className="text-[13.5px] font-semibold text-navy-900">
                      {t(badge.value)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="#contact"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy-600 hover:text-navy-900 transition-colors duration-150"
            >
              {lang === 'es' ? 'Contáctanos con preguntas' : 'Reach out with questions'}
              <span className="w-4 h-px bg-current" />
            </Link>
          </motion.div>

        </div>

        {/* Testimonials */}
        <motion.div {...fade(0.22)} className="mt-20 pt-16 border-t border-stone-200/40">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4" viewBox="0 0 16 16" fill="#FFE030">
                  <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 2 .7-4L2.2 5.2l4-.6z" />
                </svg>
              ))}
            </div>
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-navy-700/50">
              {lang === 'es' ? 'Lo que dicen las familias' : 'What Families Are Saying'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {testimonialSlots.map((slot, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 border border-stone-200/70 bg-white/60 flex flex-col justify-between min-h-[140px]"
              >
                <p className="text-[13px] text-navy-800/35 italic leading-relaxed mb-5">
                  {lang === 'es'
                    ? '"Testimonio próximamente — comparte tu experiencia con nosotros."'
                    : '"Testimonial coming soon — share your story with us."'}
                </p>
                <p className="text-[12px] font-semibold text-navy-900/30">
                  — {t(slot.audience)}
                </p>
              </div>
            ))}
          </div>

          <p className="text-[11.5px] text-navy-800/30 mt-5 text-center">
            {lang === 'es'
              ? 'Comparte tu historia — '
              : 'Share your story — '}
            <a href="mailto:hello@light2minds.com" className="underline underline-offset-2 hover:text-navy-600 transition-colors">
              hello@light2minds.com
            </a>
          </p>
        </motion.div>

      </div>
    </section>
  )
}
