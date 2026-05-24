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

      {/* Layer A — warm directional */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `linear-gradient(to right,
            ${WARM_BG}CC 0%,
            ${WARM_BG}A8 16%,
            ${WARM_BG}5C 36%,
            ${WARM_BG}14 54%,
            transparent 68%)`,
        }}
      />
      {/* Layer B — cinematic warm-dark vignette for text contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `linear-gradient(105deg,
            rgba(8,18,34,0.30) 0%,
            rgba(8,18,34,0.22) 20%,
            rgba(8,18,34,0.08) 42%,
            transparent 58%)`,
        }}
      />
      {/* Mobile supplemental */}
      <div
        className="md:hidden absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ backgroundColor: `${WARM_BG}55` }}
      />
      {/* Bottom depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: `linear-gradient(to top, ${WARM_BG}73 0%, transparent 40%)` }}
      />

      {/*
        Layout: two separate zones.
        - Headline block: top of hero, sits above the video's "Light 2 Minds" text
        - CTA block: pinned to the bottom edge, below the video's watermark
      */}

      {/* ── Headline: upper zone ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-44 lg:pt-40">
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
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-700/70">
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

      {/* ── CTAs: pinned to bottom of hero, below "Light 2 Minds" video text ── */}
      <motion.div
        style={{ opacity: contentOp }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.46 }}
        className="absolute z-10 bottom-10 sm:bottom-12 lg:bottom-14 left-0 right-0"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center gap-3">
            {/* Blue — logo "Light" color */}
            <Link
              href="/parents"
              className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold text-white px-7 py-3.5 rounded-full shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-md active:scale-[0.97]"
              style={{ backgroundColor: '#5BC4F8' }}
            >
              For Families
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Yellow — logo "2" color; dark text for contrast on gold */}
            <Link
              href="/professionals"
              className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold px-7 py-3.5 rounded-full transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
              style={{ backgroundColor: '#FFE030', color: '#0D1B2E' }}
            >
              For Professionals
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Green — logo "Minds" color */}
            <Link
              href="/aba-center"
              className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold text-white px-7 py-3.5 rounded-full shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-md active:scale-[0.97]"
              style={{ backgroundColor: '#2EBB50' }}
            >
              ABA Center Startup
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-stone-200/40" />
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
