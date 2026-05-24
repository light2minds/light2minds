'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

const WARM_BG = '#F8F5EF'

// Inline shadow for premium glass-like button depth — no heavy drop shadow
const BTN_SHADOW_LIGHT = 'inset 0 1px 0 rgba(255,255,255,0.28), 0 1px 4px rgba(0,0,0,0.10)'
const BTN_SHADOW_GOLD  = 'inset 0 1px 0 rgba(255,255,255,0.45), 0 1px 4px rgba(0,0,0,0.08)'

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
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: WARM_BG }}
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
            preload="metadata"
            className="w-full h-full object-cover"
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
        Overlay system — three composited layers, each handling one job:

        A  Warm directional: brand-warm tone concentrated in the text zone.
           Softened to 75% max (was 80%) — text stays readable, video breathes.

        B  Cinematic dark vignette: warm-navy depth for headline contrast.
           Reduced to 23% max (was 30%) — natural shadow, not a box.

        C  Center-lower radial: very subtle warm haze over the "Light2Minds"
           video watermark so it supports rather than competes with the headline.
           Only 20% opacity — the text remains visible but steps back visually.

        Bottom vignette: eases the lower edge without masking the puzzle.
      */}

      {/* Layer A — warm directional (text zone only, fades right) */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `linear-gradient(to right,
            ${WARM_BG}BF 0%,
            ${WARM_BG}96 17%,
            ${WARM_BG}3D 38%,
            ${WARM_BG}0A 56%,
            transparent 70%)`,
        }}
      />

      {/* Layer B — cinematic warm-dark vignette (slightly reduced) */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `linear-gradient(105deg,
            rgba(8,18,34,0.23) 0%,
            rgba(8,18,34,0.15) 22%,
            rgba(8,18,34,0.05) 44%,
            transparent 58%)`,
        }}
      />

      {/* Layer C — gentle center radial to soften "Light2Minds" video watermark */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 62% 48% at 58% 76%,
            rgba(248,245,239,0.20) 0%,
            rgba(248,245,239,0.10) 55%,
            transparent 100%)`,
        }}
      />

      {/* Mobile supplemental */}
      <div
        className="md:hidden absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ backgroundColor: `${WARM_BG}50` }}
      />

      {/* Bottom depth — eases lower edge, supports watermark softening */}
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

      {/* ── Headline: upper zone — more breathing room via increased top padding ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-48 lg:pt-44">
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
              Compassionate Care · Brighter Futures
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.4rem,5.5vw,4.6rem)] font-bold leading-[1.04] tracking-[-0.03em] text-navy-900"
          >
            <span style={{ color: '#5BC4F8' }}>Guiding</span> families.<br />
            <span style={{ color: '#2EBB50' }}>Empowering</span> professionals.
          </motion.h1>
        </motion.div>
      </div>

      {/* ── CTAs: pinned to bottom — more space gives composition room to breathe ── */}
      <motion.div
        style={{ opacity: contentOp }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.5 }}
        className="absolute z-10 bottom-12 sm:bottom-14 lg:bottom-16 left-0 right-0"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center gap-3">

            {/* Blue — logo "Light" */}
            <Link
              href="/parents"
              className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold text-white px-7 py-3.5 rounded-full transition-all duration-250 hover:opacity-[0.87] active:scale-[0.97]"
              style={{ backgroundColor: '#5BC4F8', boxShadow: BTN_SHADOW_LIGHT }}
            >
              For Families
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Gold — logo "2" — dark text for contrast */}
            <Link
              href="/professionals"
              className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold px-7 py-3.5 rounded-full transition-all duration-250 hover:opacity-[0.87] active:scale-[0.97]"
              style={{ backgroundColor: '#FFE030', color: '#0D1B2E', boxShadow: BTN_SHADOW_GOLD }}
            >
              For Professionals
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Green — logo "Minds" */}
            <Link
              href="/aba-center"
              className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold text-white px-7 py-3.5 rounded-full transition-all duration-250 hover:opacity-[0.87] active:scale-[0.97]"
              style={{ backgroundColor: '#2EBB50', boxShadow: BTN_SHADOW_LIGHT }}
            >
              ABA Center Startup
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
