'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

const WARM_BG = '#F8F5EF'

const BTN_SHADOW_LIGHT = 'inset 0 1px 0 rgba(255,255,255,0.28), 0 1px 4px rgba(0,0,0,0.10)'
const BTN_SHADOW_GOLD  = 'inset 0 1px 0 rgba(255,255,255,0.45), 0 1px 4px rgba(0,0,0,0.08)'

// Headline: gradient flows logo blue → teal → logo green
// Drop-shadows make gradient text readable on any video frame
const HEADLINE_GRADIENT = {
  background: 'linear-gradient(90deg, #5BC4F8 0%, #FFE030 50%, #2EBB50 100%)',
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
  backgroundClip: 'text' as const,
  filter: 'drop-shadow(0 1px 6px rgba(4,12,26,0.70)) drop-shadow(0 3px 18px rgba(4,12,26,0.45))',
}

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
        Overlay system — stronger coverage through the centre (where the
        headline lives) while keeping the right side open and vivid.

        Layer A  Warm directional: extended so it holds 51% at 45% width
                 (was only 24% there before). Headline zone stays clearly
                 warm-toned, fades to transparent at 78%.

        Layer B  Cinematic dark vignette: extends to 50% width coverage so
                 the text contrast is solid through the middle of the frame.

        Layer C  Radial at lower-centre: softens "Light2Minds" video text.

        Mobile   Extra uniform tint for full-width text legibility.
        Bottom   Eases lower edge without masking puzzle or child.
      */}

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

      {/* Layer B — dark vignette: left text zone only, gone by 58% */}
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

      {/* Right-edge fade: kid/puzzle zone is fully clear, then the far-right
          edge dissolves gradually to pure white so the hero flows into the
          next section naturally */}
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

          {/* Headline — full logo-colour gradient across entire text block */}
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.4rem,5.5vw,4.6rem)] font-bold leading-[1.04] tracking-[-0.03em]"
            style={HEADLINE_GRADIENT}
          >
            Guiding families.<br />
            Empowering professionals.
          </motion.h1>
        </motion.div>
      </div>

      {/* ── CTAs: pinned to bottom ── */}
      <motion.div
        style={{ opacity: contentOp }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.5 }}
        className="absolute z-10 bottom-12 sm:bottom-14 lg:bottom-16 left-0 right-0"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center gap-3">

            <Link
              href="/parents"
              className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold text-white px-7 py-3.5 rounded-full transition-all duration-250 hover:opacity-[0.87] active:scale-[0.97]"
              style={{ backgroundColor: '#5BC4F8', boxShadow: BTN_SHADOW_LIGHT }}
            >
              For Families
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/professionals"
              className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold px-7 py-3.5 rounded-full transition-all duration-250 hover:opacity-[0.87] active:scale-[0.97]"
              style={{ backgroundColor: '#FFE030', color: '#0D1B2E', boxShadow: BTN_SHADOW_GOLD }}
            >
              For Professionals
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

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
