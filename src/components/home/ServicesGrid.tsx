'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/language'
import { Lang } from '@/lib/language'

function getServices(lang: Lang) {
  const tx = (en: string, es: string) => lang === 'es' ? es : en
  return [
    {
      num: '01',
      title: tx('Parent Education & Support', 'Educación y Apoyo para Padres'),
      body: tx(
        'Clear, jargon-free guidance on autism, ADHD, developmental delays, sensory challenges, and behavioral conditions — written for families, not clinicians.',
        'Orientación clara y sin jerga sobre autismo, TDAH, retrasos del desarrollo, desafíos sensoriales y condiciones conductuales — escrita para familias, no para clínicos.'
      ),
      href: '/parents',
      label: tx('Learn More', 'Saber Más'),
      bar: 'bg-forest-500',
      numColor: 'text-forest-500',
      hover: 'hover:border-forest-300',
    },
    {
      num: '02',
      title: tx('RBT Exam Preparation', 'Preparación para el Examen RBT'),
      body: tx(
        'Structured study materials including mock exams, flashcards, ABA terminology glossaries, ethics case studies, and competency checklists.',
        'Materiales de estudio estructurados que incluyen exámenes de práctica, tarjetas didácticas, glosarios de terminología ABA, estudios de casos de ética y listas de verificación de competencias.'
      ),
      href: '/professionals#exam',
      label: tx('Explore Materials', 'Ver Materiales'),
      bar: 'bg-sky-400',
      numColor: 'text-sky-500',
      hover: 'hover:border-sky-300',
    },
    {
      num: '03',
      title: tx('Sensory & Developmental Tools', 'Herramientas Sensoriales y del Desarrollo'),
      body: tx(
        'Practical sensory tool recommendations, developmental activity guides, visual schedules, and reinforcement menus for home and classroom use.',
        'Recomendaciones prácticas de herramientas sensoriales, guías de actividades del desarrollo, horarios visuales y menús de refuerzo para uso en el hogar y en el aula.'
      ),
      href: '/tools',
      label: tx('View Tools', 'Ver Herramientas'),
      bar: 'bg-forest-500',
      numColor: 'text-forest-500',
      hover: 'hover:border-forest-300',
    },
    {
      num: '05',
      title: tx('School Support & IEP Guidance', 'Apoyo Escolar y Guía del IEP'),
      body: tx(
        'Help parents understand IEP meetings, request evaluations, advocate for services, and collaborate effectively with school teams.',
        'Ayudar a los padres a comprender las reuniones del IEP, solicitar evaluaciones, abogar por servicios y colaborar eficazmente con los equipos escolares.'
      ),
      href: '/parents#iep',
      label: tx('IEP Resources', 'Recursos del IEP'),
      bar: 'bg-sky-400',
      numColor: 'text-sky-500',
      hover: 'hover:border-sky-300',
    },
    {
      num: '06',
      title: tx('Data & Documentation Forms', 'Formularios de Datos y Documentación'),
      body: tx(
        'Printable and downloadable ABC data sheets, behavior tracking forms, session notes, parent handouts, and clinical intake packets.',
        'Hojas de datos ABC, formularios de seguimiento de comportamiento, notas de sesión, folletos para padres y paquetes de admisión clínica imprimibles y descargables.'
      ),
      href: '/tools',
      label: tx('Download Forms', 'Descargar Formularios'),
      bar: 'bg-gold-400',
      numColor: 'text-gold-500',
      hover: 'hover:border-gold-300',
    },
  ]
}

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

export default function ServicesGrid() {
  const { lang } = useLang()
  const tx = (en: string, es: string) => lang === 'es' ? es : en
  const services = getServices(lang)

  return (
    <section className="bg-stone-50 py-24 lg:py-32 border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div {...fade} transition={{ duration: 0.65 }} className="mb-14">
          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">
            {tx('What We Offer', 'Lo Que Ofrecemos')}
          </p>
          <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
            {tx('Comprehensive support in six areas.', 'Apoyo integral en seis áreas.')}
          </h2>
          <p className="text-[15px] text-navy-800/50 leading-relaxed max-w-xl">
            {tx(
              'From understanding a diagnosis to launching a clinic — Light2minds covers the full spectrum of behavioral and developmental support.',
              'Desde comprender un diagnóstico hasta lanzar una clínica — Light2minds cubre el espectro completo de apoyo conductual y del desarrollo.'
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <motion.div
              key={svc.num}
              {...fade}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                href={svc.href}
                className={`group block bg-white rounded-2xl overflow-hidden border border-stone-100 ${svc.hover} hover:-translate-y-0.5 hover:shadow-md hover:shadow-stone-200/50 transition-all duration-200 h-full`}
              >
                {/* Colored accent bar at top */}
                <div className={`h-[3px] w-full ${svc.bar}`} />
                <div className="p-7">
                  <p className={`text-[11px] font-bold tracking-[0.12em] ${svc.numColor} mb-4`}>{svc.num}</p>
                  <h3 className="text-[15px] font-semibold text-navy-900 mb-3 leading-snug group-hover:text-navy-700 transition-colors duration-150">{svc.title}</h3>
                  <p className="text-[13px] text-navy-800/45 leading-relaxed mb-6">{svc.body}</p>
                  <p className={`text-[12px] font-semibold ${svc.numColor} opacity-70 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2`}>
                    {svc.label}
                    <span className="w-4 h-px bg-current" />
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
