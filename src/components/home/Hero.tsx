'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLang } from '@/lib/language'

const WARM_BG = '#F8F5EF'

// 3D raised button shadows — each colour has a matching darker bottom edge
const BTN_SHADOW_BLUE  = '0 5px 0 #3A9ECE, 0 8px 16px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.30)'
const BTN_SHADOW_GOLD  = '0 5px 0 #C4A800, 0 8px 16px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.45)'
const BTN_SHADOW_GREEN = '0 5px 0 #1E8E3E, 0 8px 16px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.30)'

// Headline gradient: logo yellow → green, with 3D extruded drop-shadow
const HEADLINE_GRADIENT = {
  background: 'linear-gradient(90deg, #FFE030 0%, #2EBB50 100%)',
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
  backgroundClip: 'text' as const,
  // Two stacked offset shadows create an extruded / 3D depth effect
  filter: [
    'drop-shadow(2px 2px 0 rgba(4,12,26,0.55))',
    'drop-shadow(4px 4px 0 rgba(4,12,26,0.30))',
    'drop-shadow(0 8px 20px rgba(4,12,26,0.40))',
  ].join(' '),
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const { lang } = useLang()
  const tx = (en: string, es: string) => lang === 'es' ? es : en

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY  = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const contentOp = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const videoY    = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setReducedMotion(true)
      videoRef.current?.pause()
    } else {
      const v = videoRef.current
      if (v) {
        // Older iOS Safari attributes to suppress the play button overlay
        v.setAttribute('webkit-playsinline', 'true')
        v.setAttribute('x-webkit-airplay', 'deny')
        v.play().catch(() => {})
      }
    }
  }, [])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: WARM_BG, minHeight: '100svh' }}
    >
      {/* ── Cinematic full-bleed video ── */}
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
            preload="auto"
            disablePictureInPicture
            poster="/logo.jpg"
            className="w-full h-full object-cover"
            style={{ pointerEvents: 'none' }}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(135deg, #5BC4F818 0%, #2EBB5012 40%, #FFE03012 100%)`,
              backgroundColor: WARM_BG,
            }}
          />
        )}
      </motion.div>

      {/*
        Overlay system — centre is fully open (kid + puzzle unshaded).
        Both left and right edges dissolve to white creating a "portal" feel.

        Left edge  → white (narrow fade, doesn't touch text)
        Layer A    → warm directional, ends at 62%
        Layer B    → dark vignette for text contrast, ends at 58%
        Right edge → white (gradual fade from ~64% onward)
        Bottom     → subtle depth
      */}

      {/* Left-edge white fade — mirrors right side for symmetric portal frame */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `linear-gradient(to right,
            rgba(255,255,255,1.00) 0%,
            rgba(255,255,255,0.82) 8%,
            rgba(255,255,255,0.32) 20%,
            transparent 36%)`,
        }}
      />

      {/* Layer A — warm directional: left text zone only, gone by 62% */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `linear-gradient(to right,
            ${WARM_BG}E0 0%,
            ${WARM_BG}CC 16%,
            ${WARM_BG}99 38%,
            ${WARM_BG}28 55%,
            transparent 62%)`,
        }}
      />

      {/* Layer B — dark vignette for text contrast, gone by 58% */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `linear-gradient(105deg,
            rgba(8,18,34,0.32) 0%,
            rgba(8,18,34,0.24) 20%,
            rgba(8,18,34,0.06) 45%,
            transparent 58%)`,
        }}
      />

      {/* Right-edge fade to white — kid/puzzle zone is clear, far right dissolves */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `linear-gradient(to left,
            rgba(255,255,255,1.00) 0%,
            rgba(255,255,255,0.82) 8%,
            rgba(255,255,255,0.32) 20%,
            transparent 36%)`,
        }}
      />

      {/* Mobile supplemental */}
      <div
        className="md:hidden absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ backgroundColor: `${WARM_BG}50` }}
      />

      {/* Bottom depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `linear-gradient(to top,
            ${WARM_BG}6E 0%,
            ${WARM_BG}18 32%,
            transparent 52%)`,
        }}
      />

      {/* ── Headline: upper zone ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-32 sm:pt-40 lg:pt-44">
        <motion.div
          style={{ y: contentY, opacity: contentOp }}
          className="max-w-xl lg:max-w-2xl"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-7 sm:mb-8"
          >
            <span className="w-5 h-px flex-shrink-0" style={{ backgroundColor: '#2EBB50' }} />
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-700/60">
              {tx('Compassionate Care · Brighter Futures', 'Cuidado Compasivo · Futuros Más Brillantes')}
            </span>
          </motion.div>

          {/* Headline — logo gradient with 3D extruded drop-shadows */}
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.4rem,5.5vw,4.6rem)] font-bold leading-[1.04] tracking-[-0.03em]"
            style={HEADLINE_GRADIENT}
          >
            {tx('Guiding families.', 'Guiando familias.')}<br />
            {tx('Empowering professionals.', 'Empoderando profesionales.')}
          </motion.h1>
        </motion.div>
      </div>

      {/* ── CTAs: 3D raised pill buttons pinned to bottom ── */}
      <motion.div
        style={{ opacity: contentOp }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.5 }}
        className="absolute z-10 bottom-12 sm:bottom-14 lg:bottom-16 left-0 right-0"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center gap-3">

            {/* Blue */}
            <Link
              href="/parents"
              className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold text-white px-7 py-3.5 rounded-full transition-all duration-150 hover:translate-y-[3px] active:translate-y-[5px]"
              style={{ backgroundColor: '#5BC4F8', boxShadow: BTN_SHADOW_BLUE }}
            >
              {tx('For Families', 'Para Familias')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Gold */}
            <Link
              href="/professionals"
              className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold px-7 py-3.5 rounded-full transition-all duration-150 hover:translate-y-[3px] active:translate-y-[5px]"
              style={{ backgroundColor: '#FFE030', color: '#0D1B2E', boxShadow: BTN_SHADOW_GOLD }}
            >
              {tx('For Professionals', 'Para Profesionales')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Green */}
            <Link
              href="/aba-center"
              className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold text-white px-7 py-3.5 rounded-full transition-all duration-150 hover:translate-y-[3px] active:translate-y-[5px]"
              style={{ backgroundColor: '#2EBB50', boxShadow: BTN_SHADOW_GREEN }}
            >
              {tx('ABA Center Startup', 'Inicio Centro ABA')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-stone-200/30" />
    </section>
  )
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  )
}
