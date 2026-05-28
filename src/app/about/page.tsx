'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLang } from '@/lib/language'
import CredentialsSection from '@/components/home/CredentialsSection'

const WARM_BG = '#F8F5EF'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
})

const pillars = [
  {
    color: '#5BC4F8',
    en: { title: 'Families First', body: 'We built Light2Minds for the parent who just received a diagnosis and doesn\'t know where to start. Every resource is written in plain language, grounded in evidence, and respectful of the real challenges families face.' },
    es: { title: 'Familias Primero', body: 'Construimos Light2Minds para el padre que acaba de recibir un diagnóstico y no sabe por dónde empezar. Cada recurso está escrito en lenguaje sencillo, fundamentado en evidencia y respetuoso de los desafíos reales.' },
  },
  {
    color: '#2EBB50',
    en: { title: 'Clinically Grounded', body: 'Everything on this platform — guides, tools, product recommendations — is reviewed through a behavioral health lens. We don\'t publish content we wouldn\'t hand to a family in a clinical setting.' },
    es: { title: 'Base Clínica', body: 'Todo en esta plataforma — guías, herramientas, productos — se revisa desde una perspectiva de salud conductual. No publicamos contenido que no entregaríamos a una familia en un entorno clínico.' },
  },
  {
    color: '#FFE030',
    colorText: '#B8900E',
    en: { title: 'Community Driven', body: 'Light2Minds grows with its community. We listen to families, professionals, and ABA center directors to understand what resources are missing and build them — together.' },
    es: { title: 'Impulsado por la Comunidad', body: 'Light2Minds crece con su comunidad. Escuchamos a familias, profesionales y directores de centros ABA para entender qué recursos faltan y construirlos — juntos.' },
  },
]

export default function AboutPage() {
  const { lang } = useLang()
  const tx = (en: string, es: string) => lang === 'es' ? es : en

  return (
    <main className="min-h-screen">

      {/* ── Page hero ── */}
      <section
        style={{ backgroundColor: WARM_BG }}
        className="pt-28 pb-16 lg:pt-36 lg:pb-20 border-b border-stone-200/50"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade()} className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-5 h-px flex-shrink-0" style={{ backgroundColor: '#5BC4F8' }} />
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-700/50">
                {tx('About Light2Minds', 'Sobre Light2Minds')}
              </span>
            </div>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-navy-900 leading-[1.06] tracking-[-0.03em] mb-5">
              {tx('Guidance rooted in care,', 'Orientación basada en el cuidado,')}
              <br />
              {tx('built for real families.', 'hecha para familias reales.')}
            </h1>
            <p className="text-[15px] text-navy-800/55 leading-relaxed max-w-xl">
              {tx(
                'Light2Minds is a Florida-based behavioral health platform supporting families of children with autism, ADHD, and developmental challenges — and the professionals who serve them.',
                'Light2Minds es una plataforma de salud conductual con base en Florida que apoya a familias de niños con autismo, TDAH y desafíos del desarrollo — y a los profesionales que los sirven.',
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="bg-white py-16 lg:py-24 border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <motion.div {...fade(0.05)}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-5 h-px flex-shrink-0" style={{ backgroundColor: '#2EBB50' }} />
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-700/50">
                  {tx('Our Mission', 'Nuestra Misión')}
                </span>
              </div>
              <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-6">
                {tx('No family should navigate a diagnosis alone.', 'Ninguna familia debería navegar un diagnóstico sola.')}
              </h2>
              <p className="text-[15px] text-navy-800/60 leading-relaxed mb-5">
                {tx(
                  'We exist to close the gap between clinical expertise and everyday family life. Too many parents leave a diagnostic appointment overwhelmed, unsure what to do next, and without access to the professional guidance that could change everything.',
                  'Existimos para cerrar la brecha entre la experiencia clínica y la vida familiar cotidiana. Demasiados padres salen de una cita de diagnóstico abrumados, sin saber qué hacer a continuación y sin acceso a la orientación profesional que podría cambiarlo todo.',
                )}
              </p>
              <p className="text-[15px] text-navy-800/60 leading-relaxed">
                {tx(
                  'Light2Minds bridges that gap — providing free guides, vetted tools, and expert-backed resources that empower families to advocate confidently for their children.',
                  'Light2Minds cierra esa brecha — proporcionando guías gratuitas, herramientas verificadas y recursos respaldados por expertos que empoderan a las familias para abogar con confianza por sus hijos.',
                )}
              </p>
            </motion.div>

            <motion.div {...fade(0.12)} className="grid grid-cols-1 gap-4">
              {pillars.map((p, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-2xl p-5 border"
                  style={{ borderColor: p.color + '30', backgroundColor: p.color + '08' }}
                >
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: p.color }} />
                  <div>
                    <p
                      className="text-[11px] font-bold tracking-[0.1em] uppercase mb-1"
                      style={{ color: p.colorText ?? p.color }}
                    >
                      {lang === 'es' ? p.es.title : p.en.title}
                    </p>
                    <p className="text-[13.5px] text-navy-800/65 leading-relaxed">
                      {lang === 'es' ? p.es.body : p.en.body}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Who we serve ── */}
      <section style={{ backgroundColor: WARM_BG }} className="py-16 lg:py-24 border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade()} className="mb-10 max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-5 h-px flex-shrink-0" style={{ backgroundColor: '#5BC4F8' }} />
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-700/50">
                {tx('Who We Serve', 'A Quién Servimos')}
              </span>
            </div>
            <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
              {tx('Built for three communities.', 'Construido para tres comunidades.')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                color: '#5BC4F8',
                href: '/parents',
                en: { label: 'Families', desc: 'Parents and caregivers of children with autism, ADHD, and developmental differences navigating diagnosis, therapy, school, and daily life.' },
                es: { label: 'Familias', desc: 'Padres y cuidadores de niños con autismo, TDAH y diferencias del desarrollo navegando diagnóstico, terapia, escuela y vida diaria.' },
              },
              {
                color: '#FFE030',
                colorText: '#B8900E',
                href: '/professionals',
                en: { label: 'Professionals', desc: 'RBTs, BCBAs, and behavioral health professionals seeking career resources, clinical tools, and continuing education support.' },
                es: { label: 'Profesionales', desc: 'RBTs, BCBAs y profesionales de salud conductual que buscan recursos de carrera, herramientas clínicas y apoyo de educación continua.' },
              },
              {
                color: '#2EBB50',
                href: '/aba-center',
                en: { label: 'ABA Center Startups', desc: 'New and growing ABA practices looking for operational guidance, compliance resources, and tools to build sustainable behavioral health businesses.' },
                es: { label: 'Centros ABA', desc: 'Prácticas ABA nuevas y en crecimiento que buscan orientación operativa, recursos de cumplimiento y herramientas para construir negocios sostenibles.' },
              },
            ].map((item, i) => (
              <motion.div key={i} {...fade(i * 0.08)}>
                <Link
                  href={item.href}
                  className="flex flex-col h-full rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-stone-200/60"
                  style={{ borderColor: item.color + '30', backgroundColor: item.color + '0A' }}
                >
                  <span
                    className="w-8 h-1 rounded-full mb-4"
                    style={{ backgroundColor: item.color }}
                  />
                  <p
                    className="text-[13px] font-bold tracking-[0.06em] uppercase mb-2"
                    style={{ color: item.colorText ?? item.color }}
                  >
                    {lang === 'es' ? item.es.label : item.en.label}
                  </p>
                  <p className="text-[13.5px] text-navy-800/60 leading-relaxed flex-1">
                    {lang === 'es' ? item.es.desc : item.en.desc}
                  </p>
                  <span className="mt-4 text-[12px] font-semibold flex items-center gap-1.5" style={{ color: item.colorText ?? item.color }}>
                    {tx('Learn more', 'Saber más')}
                    <svg className="w-3 h-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 7h10M8 3l4 4-4 4" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About the Founder ── */}
      <CredentialsSection />

    </main>
  )
}
