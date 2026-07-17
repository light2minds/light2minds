'use client'

import { motion } from 'framer-motion'
import ContactSection from '@/components/home/ContactSection'
import { useLang } from '@/lib/language'

const WARM_BG = '#F8F5EF'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
})

const facts = [
  {
    color: '#5BC4F8',
    en: 'Based in Florida',
    es: 'Con sede en Florida',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4.5 8-12a8 8 0 0 0-16 0c0 7.5 8 12 8 12z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    color: '#2EBB50',
    en: 'Free & bilingual — EN/ES',
    es: 'Gratis y bilingüe — EN/ES',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18" />
      </svg>
    ),
  },
  {
    color: '#B8900E',
    en: 'Built by BACB-aligned clinicians',
    es: 'Creado por clínicos alineados a la BACB',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5z" /><path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
]

const values = [
  {
    color: '#5BC4F8',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    en: {
      title: 'Warmth over clinical distance',
      body: 'A diagnosis changes a family\'s world overnight. We write for that moment — clear, human, and free of jargon.',
    },
    es: {
      title: 'Calidez sobre distancia clínica',
      body: 'Un diagnóstico cambia el mundo de una familia de la noche a la mañana. Escribimos para ese momento — claro, humano y sin jerga.',
    },
  },
  {
    color: '#2EBB50',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    en: {
      title: 'Practical over theoretical',
      body: 'Everything here is meant to be used — in an IEP meeting, a session note, or a conversation with a school team.',
    },
    es: {
      title: 'Práctico sobre teórico',
      body: 'Todo aquí está diseñado para usarse — en una reunión del IEP, una nota de sesión o una conversación con la escuela.',
    },
  },
  {
    color: '#FFE030',
    colorText: '#B8900E',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4.5 8-12a8 8 0 0 0-16 0c0 7.5 8 12 8 12z" /><path d="M9.5 12l1.8 1.8L15 10" />
      </svg>
    ),
    en: {
      title: 'Accessible to everyone',
      body: 'Our core resources are free, require no account, and come in English and Spanish — guidance should be a starting point, not a privilege.',
    },
    es: {
      title: 'Accesible para todos',
      body: 'Nuestros recursos principales son gratuitos, no requieren cuenta y están en inglés y español — la orientación debería ser un punto de partida, no un privilegio.',
    },
  },
]

export default function AboutPage() {
  const { lang } = useLang()
  const tx = (en: string, es: string) => lang === 'es' ? es : en

  return (
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <section
        style={{ backgroundColor: WARM_BG }}
        className="pt-28 pb-8 lg:pt-32 lg:pb-10 border-b border-stone-200/50"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade()} className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-5 h-px flex-shrink-0" style={{ backgroundColor: '#5BC4F8' }} />
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-700/50">
                {tx('About Us', 'Sobre Nosotros')}
              </span>
            </div>
            <h1 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 leading-[1.08] tracking-[-0.03em] mb-3">
              {tx('We exist because the gap is real.', 'Existimos porque la brecha es real.')}
            </h1>
            <p className="text-[14px] text-navy-800/55 leading-relaxed max-w-xl mb-6">
              {tx(
                'Families get a diagnosis without a roadmap. Professionals build careers without enough support. We bridge that gap.',
                'Las familias reciben un diagnóstico sin un mapa. Los profesionales construyen carreras sin suficiente apoyo. Nosotros cerramos esa brecha.',
              )}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {facts.map((f) => (
                <span
                  key={f.en}
                  className="inline-flex items-center gap-2 text-[12px] font-semibold text-navy-800/70 bg-white border border-stone-200/70 px-3.5 py-2 rounded-full"
                >
                  <span className="w-3.5 h-3.5 flex-shrink-0" style={{ color: f.color }}>{f.icon}</span>
                  {tx(f.en, f.es)}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="bg-white py-14 lg:py-20 border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

            <motion.div {...fade(0.05)}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-5 h-px flex-shrink-0" style={{ backgroundColor: '#2EBB50' }} />
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-700/50">
                  {tx('Our Story', 'Nuestra Historia')}
                </span>
              </div>
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-6">
                {tx('Built from clinical experience.', 'Construido desde la experiencia clínica.')}
              </h2>
              <p className="text-[15px] text-navy-800/55 leading-relaxed">
                {tx(
                  'Light2Minds was created by Florida-based behavioral health professionals who saw the same problem again and again — families leaving appointments overwhelmed, and professionals entering the field without practical tools. What began as internal guides became a platform: written by practitioners, reviewed against BACB standards, built to be genuinely useful.',
                  'Light2Minds fue creado por profesionales de salud conductual en Florida que vieron el mismo problema una y otra vez — familias saliendo de citas abrumadas, y profesionales sin herramientas prácticas. Lo que empezó como guías internas se convirtió en una plataforma: escrita por practicantes, revisada bajo estándares del BACB, hecha para ser realmente útil.',
                )}
              </p>
            </motion.div>

            <motion.div {...fade(0.12)} className="space-y-3">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group flex items-start gap-4 rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  style={{ borderColor: v.color + '28', backgroundColor: v.color + '07' }}
                >
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                    style={{ backgroundColor: v.color + '1c', color: v.colorText ?? v.color }}
                  >
                    <span className="w-[18px] h-[18px]">{v.icon}</span>
                  </span>
                  <div>
                    <p
                      className="text-[11px] font-bold tracking-[0.1em] uppercase mb-1.5"
                      style={{ color: v.colorText ?? v.color }}
                    >
                      {lang === 'es' ? v.es.title : v.en.title}
                    </p>
                    <p className="text-[13.5px] text-navy-800/60 leading-relaxed">
                      {lang === 'es' ? v.es.body : v.en.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <ContactSection />

    </main>
  )
}
