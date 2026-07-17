'use client'

import { motion } from 'framer-motion'
import { useLang, type Lang } from '@/lib/language'

const getStats = (lang: Lang) => [
  {
    value: lang === 'es' ? '1 de cada 36' : '1 in 36',
    label: lang === 'es'
      ? 'Niños son diagnosticados con trastorno del espectro autista en EE.UU.'
      : 'Children are diagnosed with autism spectrum disorder in the US',
    source: 'CDC, 2023',
  },
  {
    value: '9.8%',
    label: lang === 'es'
      ? 'De los niños de 3 a 17 años tiene un diagnóstico de TDAH'
      : 'Of children aged 3–17 have an ADHD diagnosis',
    source: 'CDC, 2022',
  },
  {
    value: '17%',
    label: lang === 'es'
      ? 'De los niños en EE.UU. tiene una discapacidad del desarrollo'
      : 'Of children in the US have a developmental disability',
    source: 'CDC, 2023',
  },
  {
    value: '40+',
    label: lang === 'es'
      ? 'Recursos gratuitos para descargar — sin cuenta ni pago requerido'
      : 'Free downloadable resources — no account or paywall required',
    source: 'Light2Minds Library',
  },
]

const STAT_COLORS = ['#5BC4F8', '#2EBB50', '#FFE030', '#64AF92']
const STAT_TEXT_COLORS = ['text-sky-600', 'text-forest-600', 'text-gold-600', 'text-sage-700']

export default function StatsStrip() {
  const { lang } = useLang()
  const stats = getStats(lang)

  return (
    <div className="bg-gradient-to-r from-sky-50 via-gold-50 to-forest-50 py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-stone-300/50">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="lg:px-10 first:lg:pl-0 last:lg:pr-0"
            >
              <span className="block w-8 h-1 rounded-full mb-3" style={{ backgroundColor: STAT_COLORS[i] }} />
              <p className={`text-[2rem] font-bold tracking-[-0.03em] leading-none mb-2 ${STAT_TEXT_COLORS[i]}`}>{stat.value}</p>
              <p className="text-[12px] text-navy-800/55 leading-relaxed mb-1.5">{stat.label}</p>
              <p className="text-[10px] text-navy-800/30 tracking-[0.04em]">— {stat.source}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
