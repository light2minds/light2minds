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

const values = [
  {
    color: '#5BC4F8',
    en: {
      title: 'Warmth over clinical distance',
      body: 'A diagnosis changes a family\'s world overnight. We write and design every resource for that moment — clear, human, and free of the jargon that makes people feel smaller.',
    },
    es: {
      title: 'Calidez sobre distancia clínica',
      body: 'Un diagnóstico cambia el mundo de una familia de la noche a la mañana. Diseñamos cada recurso para ese momento — claro, humano y sin la jerga que hace sentir a las personas más pequeñas.',
    },
  },
  {
    color: '#2EBB50',
    en: {
      title: 'Practical over theoretical',
      body: 'We don\'t publish content for the sake of publishing. Everything here is meant to be used — in an IEP meeting, on a session note, at a hiring decision, or in a conversation with a school team.',
    },
    es: {
      title: 'Práctico sobre teórico',
      body: 'No publicamos contenido por publicar. Todo aquí está diseñado para usarse — en una reunión del IEP, en una nota de sesión, en una decisión de contratación o en una conversación con un equipo escolar.',
    },
  },
  {
    color: '#FFE030',
    colorText: '#B8900E',
    en: {
      title: 'Accessible to everyone',
      body: 'Our core resources are free, require no account, and are available in English and Spanish. Behavioral health guidance should not be a privilege — it should be a starting point.',
    },
    es: {
      title: 'Accesible para todos',
      body: 'Nuestros recursos principales son gratuitos, no requieren cuenta y están disponibles en inglés y español. La orientación en salud conductual no debería ser un privilegio — debería ser un punto de partida.',
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
        className="pt-28 pb-14 lg:pt-36 lg:pb-20 border-b border-stone-200/50"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade()} className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-5 h-px flex-shrink-0" style={{ backgroundColor: '#5BC4F8' }} />
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-700/50">
                {tx('About Us', 'Sobre Nosotros')}
              </span>
            </div>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-navy-900 leading-[1.06] tracking-[-0.03em] mb-5">
              {tx('We exist because the gap is real.', 'Existimos porque la brecha es real.')}
            </h1>
            <p className="text-[15px] text-navy-800/55 leading-relaxed max-w-xl">
              {tx(
                'Light2Minds was built at the intersection of two unmet needs — families who receive a diagnosis without a roadmap, and behavioral health professionals who build careers without enough support. We bridge that gap.',
                'Light2Minds fue construido en la intersección de dos necesidades insatisfechas — familias que reciben un diagnóstico sin un mapa, y profesionales de salud conductual que construyen carreras sin suficiente apoyo. Cerramos esa brecha.',
              )}
            </p>
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
              <p className="text-[15px] text-navy-800/55 leading-relaxed mb-5">
                {tx(
                  'Light2Minds was created by behavioral health professionals based in Florida who saw the same problem repeatedly: families leaving clinical appointments overwhelmed, and professionals entering the field without the practical tools to do their best work.',
                  'Light2Minds fue creado por profesionales de salud conductual con sede en Florida que vieron el mismo problema repetidamente: familias saliendo de citas clínicas abrumadas, y profesionales que entran al campo sin las herramientas prácticas para hacer su mejor trabajo.',
                )}
              </p>
              <p className="text-[15px] text-navy-800/55 leading-relaxed">
                {tx(
                  'What started as a set of internal guides and tools became a platform — one that serves both the families navigating neurodevelopmental diagnoses and the professionals supporting them. Everything here is written by practitioners, reviewed against BACB standards, and designed to be genuinely useful.',
                  'Lo que comenzó como un conjunto de guías y herramientas internas se convirtió en una plataforma — que sirve tanto a las familias que navegan diagnósticos del neurodesarrollo como a los profesionales que las apoyan. Todo aquí está escrito por practicantes, revisado bajo los estándares del BACB y diseñado para ser genuinamente útil.',
                )}
              </p>
            </motion.div>

            <motion.div {...fade(0.12)} className="space-y-4">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-2xl p-5 border"
                  style={{ borderColor: v.color + '28', backgroundColor: v.color + '07' }}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-[6px]"
                    style={{ backgroundColor: v.color }}
                  />
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
                </div>
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
