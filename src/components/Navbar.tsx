'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang, type Lang } from '@/lib/language'

const SHOP_SHADOW_GOLD  = '0 4px 0 #C4A800, 0 6px 14px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.45)'

const NAV_LINKS = {
  en: [
    { href: '/parents',       label: 'Families' },
    { href: '/professionals', label: 'Professionals' },
    { href: '/aba-center',    label: 'ABA Center' },
    { href: '/tools',         label: 'Tools' },
  ],
  es: [
    { href: '/parents',       label: 'Familias' },
    { href: '/professionals', label: 'Profesionales' },
    { href: '/aba-center',    label: 'Centro ABA' },
    { href: '/tools',         label: 'Herramientas' },
  ],
}

const SHOP_LABEL: Record<Lang, string> = { en: 'Shop', es: 'Tienda' }

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const pathname                  = usePathname()
  const { lang, setLang }         = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isHome   = pathname === '/'
  const overHero = isHome && !scrolled && !menuOpen
  const links    = NAV_LINKS[lang]

  return (
    <>
      {/* ── Header bar ── */}
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          overHero
            ? 'bg-transparent'
            : 'bg-white/97 backdrop-blur-md border-b border-stone-100',
        ].join(' ')}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-[68px]">

          <Link href="/" aria-label="Light2minds home" className="flex-shrink-0">
            <LogoMark />
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center" aria-label="Primary navigation">
            {links.map((l) => {
              const active = pathname.startsWith(l.href)
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={[
                    'relative px-4 py-2.5 text-[13px] tracking-[0.025em] transition-colors duration-200',
                    active
                      ? 'font-semibold text-navy-900'
                      : overHero
                      ? 'font-medium text-navy-800/60 hover:text-navy-900'
                      : 'font-medium text-navy-500 hover:text-navy-900',
                  ].join(' ')}
                >
                  {l.label}
                  {active && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full"
                      style={{ backgroundColor: '#2EBB50' }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* ── Desktop right: Shop → Language ── */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center text-[12.5px] font-semibold px-5 py-2.5 rounded-full transition-all duration-150 hover:translate-y-[2px] active:translate-y-[4px]"
              style={{ backgroundColor: '#FFE030', color: '#0D1B2E', boxShadow: SHOP_SHADOW_GOLD }}
            >
              {SHOP_LABEL[lang]}
            </Link>

            <div className="flex items-center gap-0.5 text-[11px] font-bold tracking-[0.06em] uppercase">
              {(['en', 'es'] as Lang[]).map((l, i) => (
                <span key={l} className="flex items-center">
                  {i > 0 && <span className="text-stone-300 select-none mx-0.5">|</span>}
                  <button
                    onClick={() => setLang(l)}
                    className={[
                      'px-2 py-1 rounded transition-colors duration-150',
                      lang === l
                        ? 'text-navy-900 bg-stone-100'
                        : 'text-navy-500/60 hover:text-navy-800',
                    ].join(' ')}
                  >
                    {l.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* ── Mobile right: Language toggle + Burger ── */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="flex items-center text-[11px] font-bold tracking-[0.06em] uppercase">
              {(['en', 'es'] as Lang[]).map((l, i) => (
                <span key={l} className="flex items-center">
                  {i > 0 && <span className="text-stone-300/70 select-none mx-0.5">|</span>}
                  <button
                    onClick={() => setLang(l)}
                    className={[
                      'px-1.5 py-1 rounded transition-colors duration-150',
                      lang === l
                        ? 'text-navy-900 font-extrabold'
                        : 'text-navy-500/50',
                    ].join(' ')}
                  >
                    {l.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="flex flex-col gap-[5px] p-2 -mr-2"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className={['block w-[22px] h-[1.5px] bg-navy-900 transition-all duration-300 origin-center', menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''].join(' ')} />
              <span className={['block w-[22px] h-[1.5px] bg-navy-900 transition-all duration-300', menuOpen ? 'opacity-0 scale-x-0' : ''].join(' ')} />
              <span className={['block w-[22px] h-[1.5px] bg-navy-900 transition-all duration-300 origin-center', menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''].join(' ')} />
            </button>
          </div>

        </div>
      </header>

      {/* ── Full-screen mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col lg:hidden"
          >
            {/* Spacer matching header height */}
            <div className="h-[68px] flex-shrink-0 border-b border-stone-100" />

            {/* Nav links */}
            <nav className="flex-1 flex flex-col px-6 pt-4 pb-2 overflow-y-auto">
              {links.map((l) => {
                const active = pathname.startsWith(l.href)
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={[
                      'flex items-center gap-4 py-5 text-[1.35rem] tracking-[-0.01em] border-b border-stone-100 last:border-b-0 transition-colors duration-150',
                      active
                        ? 'font-bold text-navy-900'
                        : 'font-medium text-navy-600 hover:text-navy-900',
                    ].join(' ')}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-opacity"
                      style={{ backgroundColor: '#2EBB50', opacity: active ? 1 : 0.18 }}
                    />
                    {l.label}
                  </Link>
                )
              })}
            </nav>

            {/* Shop CTA */}
            <div className="px-6 pt-4 pb-10 border-t border-stone-100">
              <Link
                href="/shop"
                className="block w-full text-center text-[15px] font-bold text-navy-900 py-4 rounded-2xl transition-all duration-150 active:scale-[0.98]"
                style={{ backgroundColor: '#FFE030', boxShadow: SHOP_SHADOW_GOLD }}
              >
                {SHOP_LABEL[lang]}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function LogoMark() {
  return (
    <span className="inline-flex items-end gap-0 select-none leading-none">
      <span className="font-black text-[1.22rem] tracking-tight" style={{ color: '#5BC4F8' }}>Light</span>
      <span className="inline-flex flex-col items-center mx-[2px]">
        <svg width="15" height="9" viewBox="0 0 15 9" fill="none" aria-hidden="true" style={{ marginBottom: '-1px' }}>
          <line x1="7.5" y1="8.5" x2="7.5" y2="0.5" stroke="#FFE030" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="7.5" y1="8.5" x2="2"   y2="2.5" stroke="#FFE030" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="7.5" y1="8.5" x2="13"  y2="2.5" stroke="#FFE030" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="7.5" y1="8.5" x2="0"   y2="6"   stroke="#FFE030" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
          <line x1="7.5" y1="8.5" x2="15"  y2="6"   stroke="#FFE030" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        </svg>
        <span className="font-black text-[1.22rem] leading-none" style={{ color: '#FFE030' }}>2</span>
      </span>
      <span className="font-black text-[1.22rem] tracking-tight" style={{ color: '#2EBB50' }}>Minds</span>
    </span>
  )
}
