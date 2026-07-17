'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLang, type Lang } from '@/lib/language'

const getAreas = (lang: Lang) => [
  {
    id: '01',
    title: lang === 'es' ? 'Preparación para el RBT' : 'RBT Preparation',
    body: lang === 'es'
      ? 'Cobertura de la lista de tareas, exámenes de práctica, tarjetas de estudio y ética — estructurado para aprobar el examen RBT en el primer intento.'
      : 'Task list coverage, mock exams, flashcards, and ethics — structured to pass the RBT exam on the first attempt.',
    href: '/professionals#exam',
    badgeKey: 'start' as const,
    external: false,
  },
  {
    id: '02',
    title: lang === 'es' ? 'Documentación ABA y Herramientas Clínicas' : 'ABA Documentation & Clinical Tools',
    body: lang === 'es'
      ? 'Notas de sesión, hojas de datos, formularios ABC, registro de intervalos, bitácoras de supervisión y plantillas de análisis de tareas para el uso clínico diario.'
      : 'Session notes, data sheets, ABC forms, interval recording, supervision logs, and task analysis templates for daily clinical use.',
    href: '/tools',
    badgeKey: null,
    external: false,
  },
  {
    id: '03',
    title: lang === 'es' ? 'Prepárate para tu Primera Sesión' : 'Get Ready for Your First Session',
    body: lang === 'es'
      ? 'Todo lo que necesitas para tus primeras sesiones de ABA — herramientas, formularios y recursos en un solo kit listo para usar.'
      : 'Everything you need for your first ABA sessions — tools, forms, and resources in one ready-to-use kit.',
    href: '/shop#professionals',
    badgeKey: 'shop' as const,
    external: false,
  },
  {
    id: '04',
    title: lang === 'es' ? 'Preparación BCBA / BCaBA' : 'BCBA / BCaBA Preparation',
    body: lang === 'es'
      ? 'Seguimiento de horas de supervisión, repaso de áreas de contenido del examen, casos de ética y marcos de estudio para la certificación.'
      : 'Supervision hours tracking, exam content area review, ethics case studies, and study frameworks for board certification.',
    href: '/professionals#bcba',
    badgeKey: null,
    external: false,
  },
  {
    id: '05',
    title: lang === 'es' ? 'Desarrollo Profesional' : 'Career Development',
    body: lang === 'es'
      ? 'Plantillas de currículum, preparación para entrevistas, mentoría y mapas de trayectoria profesional de RBT a BCBA y más allá.'
      : 'Resume templates, interview prep, mentorship, and career pathway maps from RBT to BCBA and beyond.',
    href: '/tools',
    badgeKey: null,
    external: false,
  },
  {
    id: '06',
    title: lang === 'es' ? 'Apertura de tu Centro' : 'Center Startup',
    body: lang === 'es'
      ? 'Una guía completa para abrir tu propia práctica de ABA — desde la formación de la entidad hasta tu primera sesión con un cliente.'
      : 'A complete guide to opening your own ABA practice — from entity formation to your first client session.',
    href: '/aba-center',
    badgeKey: null,
    external: false,
  },
]

const AREA_COLORS = ['#5BC4F8', '#2EBB50', '#FFE030', '#8B5CF6', '#64AF92', '#5BC4F8']

export default function ProfessionalEcosystem() {
  const { lang } = useLang()
  const areas = getAreas(lang)
  const badgeLabel = (key: 'start' | 'shop') =>
    key === 'shop'
      ? (lang === 'es' ? 'Tienda' : 'Shop')
      : (lang === 'es' ? 'Empieza Aquí' : 'Start Here')

  return (
    <section className="bg-stone-50 py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-7"
        >
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/40 mb-4">
              {lang === 'es' ? 'Ecosistema Profesional' : 'Professional Ecosystem'}
            </p>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-3">
              {lang === 'es' ? <>Un sistema completo para<br />profesionales de ABA.</> : <>A complete system for<br />ABA professionals.</>}
            </h2>
            <p className="text-[13px] text-navy-800/40 leading-relaxed max-w-sm">
              {lang === 'es'
                ? 'Recursos para RBTs, BCaBAs, BCBAs, estudiantes y dueños de práctica — en cada etapa de tu carrera.'
                : 'Resources for RBTs, BCaBAs, BCBAs, students, and practice owners — at every stage of your career.'}
            </p>
          </div>
          <Link
            href="/professionals"
            className="inline-flex items-center gap-3 text-[13px] font-semibold text-white px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5 self-start lg:self-auto flex-shrink-0"
            style={{ backgroundColor: '#2EBB50', boxShadow: '0 4px 0 #1A7A3C, 0 6px 14px rgba(0,0,0,0.08)' }}
          >
            {lang === 'es' ? 'Explorar aquí' : 'Explore here'}
            <span className="w-4 h-px bg-current" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-200/60 border border-stone-200/60 rounded-2xl overflow-hidden">
          {areas.map((area, i) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={[
                'border-stone-200/60',
                i >= 3 ? 'lg:border-t' : '',
                i === 1 || i === 4 ? 'md:border-l' : '',
              ].join(' ')}
            >
              <Link
                href={area.href}
                target={area.external ? '_blank' : undefined}
                rel={area.external ? 'noopener noreferrer' : undefined}
                className="group block bg-white p-5 h-full transition-colors duration-300"
                style={{ borderTop: `2px solid ${AREA_COLORS[i % AREA_COLORS.length]}30` }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = AREA_COLORS[i % AREA_COLORS.length] + '08')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '')}
              >
                <div className="flex items-center justify-between mb-5">
                  <p className="text-[11px] font-bold tracking-[0.1em]" style={{ color: AREA_COLORS[i % AREA_COLORS.length] }}>{area.id}</p>
                  {area.badgeKey && (
                    <span
                      className="text-[9.5px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full"
                      style={area.badgeKey === 'shop'
                        ? { backgroundColor: 'rgba(255,224,48,0.25)', color: '#8A6A00' }
                        : { backgroundColor: 'rgba(46,187,80,0.15)', color: '#1A7A3C' }}
                    >
                      {badgeLabel(area.badgeKey)}
                    </span>
                  )}
                </div>
                <h3 className="text-[13.5px] font-semibold text-navy-900 mb-3 group-hover:text-green-600 transition-colors duration-200">
                  {area.title}
                </h3>
                <p className="text-[12.5px] text-navy-800/50 leading-relaxed">{area.body}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
