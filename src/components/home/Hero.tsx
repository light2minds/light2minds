'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

const WARM_BG = '#F8F5EF'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY  = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const contentOp = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const videoY    = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setReducedMotion(true)
      videoRef.current?.pause()
    }
  }, [])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: WARM_BG }}
    >
      {/* ── Full-bleed cinematic video background ── */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {!reducedMotion ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(135deg, #5BC4F812 0%, #2EBB5010 40%, #FFE03010 100%)',
            }}
          />
        )}
      </motion.div>

      {/* Warm directional overlay: strong on left (text area), dissolves right (video shows through) */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `linear-gradient(to right,
            ${WARM_BG}F2 0%,
            ${WARM_BG}D9 28%,
            ${WARM_BG}99 52%,
            ${WARM_BG}3D 74%,
            ${WARM_BG}0D 100%)`,
        }}
      />
      {/* Bottom vignette for depth and bottom section transition */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `linear-gradient(to top, ${WARM_BG}CC 0%, transparent 45%)`,
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center min-h-screen py-32 lg:py-24">
          <motion.div style={{ y: contentY, opacity: contentOp }} className="max-w-2xl">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-9"
            >
              <span className="w-5 h-px" style={{ backgroundColor: '#2EBB50' }} />
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-700/60">
                Compassionate Care · Brighter Futures
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.6rem,5.5vw,4.6rem)] font-bold leading-[1.04] tracking-[-0.03em] text-navy-900 mb-7"
            >
              <span style={{ color: '#5BC4F8' }}>Guiding</span> families.<br />
              <span style={{ color: '#2EBB50' }}>Empowering</span> professionals.
            </motion.h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="text-[1.05rem] font-light text-navy-800/65 leading-[1.75] max-w-lg mb-11"
            >
              Light2minds bridges the gap between families navigating
              neurodevelopmental challenges and the professionals dedicated to
              supporting them — with education, tools, and compassionate guidance.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.46 }}
              className="flex flex-wrap items-center gap-3 mb-16"
            >
              <Link
                href="/parents"
                className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold text-white px-7 py-3.5 rounded-full shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-md"
                style={{ backgroundColor: '#2EBB50' }}
              >
                For Families
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/professionals"
                className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold px-7 py-3.5 rounded-full border-2 transition-all duration-200"
                style={{ color: '#5BC4F8', borderColor: '#5BC4F8' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#5BC4F8'
                  ;(e.currentTarget as HTMLElement).style.color = '#fff'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                  ;(e.currentTarget as HTMLElement).style.color = '#5BC4F8'
                }}
              >
                For Professionals
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/aba-center"
                className="text-[13px] font-medium text-navy-700/50 hover:text-navy-700 transition-colors duration-150 px-3 py-3.5"
              >
                ABA Center Startup →
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.62 }}
              className="flex gap-0 divide-x divide-stone-400/30"
            >
              {[
                { value: '5+', label: 'Areas of Support' },
                { value: '100+', label: 'Free Resources' },
                { value: '2', label: 'Specialized Wings' },
              ].map((stat, i) => (
                <div key={stat.label} className={`${i === 0 ? 'pr-8' : 'px-8'}`}>
                  <p className="text-[1.7rem] font-bold text-navy-900 tracking-[-0.03em] leading-none mb-1.5">
                    {stat.value}
                  </p>
                  <p className="text-[11px] font-medium text-navy-800/50 tracking-[0.04em]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-stone-200/60" />
    </section>
  )
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  )
}
