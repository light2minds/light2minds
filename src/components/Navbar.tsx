'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const SHOP_SHADOW_GOLD  = '0 4px 0 #C4A800, 0 6px 14px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.45)'
const SHOP_SHADOW_GREEN = '0 4px 0 #1E8E3E, 0 6px 14px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.30)'

const links = [
  { href: '/parents',       label: 'Families' },
  { href: '/professionals', label: 'Professionals' },
  { href: '/aba-center',    label: 'ABA Center' },
  { href: '/tools',         label: 'Tools' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const pathname                  = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isHome      = pathname === '/'
  const overHero    = isHome && !scrolled

  return (
    <>
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

          {/* Desktop nav */}
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
                  {/* Tiny brand-green dot under the active link */}
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

          {/* Desktop CTA — yellow 3D pill */}
          <Link
            href="/parents"
            className="hidden lg:inline-flex items-center text-[12.5px] font-semibold px-5 py-2.5 rounded-full transition-all duration-150 hover:translate-y-[2px] active:translate-y-[4px]"
            style={{ backgroundColor: '#FFE030', color: '#0D1B2E', boxShadow: SHOP_SHADOW_GOLD }}
          >
            Shop
          </Link>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="lg:hidden flex flex-col gap-[5px] p-2 -mr-2"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={[
                'block w-[22px] h-[1.5px] bg-navy-900 transition-all duration-300 origin-center',
                menuOpen ? 'rotate-45 translate-y-[6.5px]' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block w-[22px] h-[1.5px] bg-navy-900 transition-all duration-300',
                menuOpen ? 'opacity-0 scale-x-0' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block w-[22px] h-[1.5px] bg-navy-900 transition-all duration-300 origin-center',
                menuOpen ? '-rotate-45 -translate-y-[6.5px]' : '',
              ].join(' ')}
            />
          </button>

        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed top-[68px] left-0 right-0 z-40 bg-white/97 backdrop-blur-md border-b border-stone-100 px-5 py-3 flex flex-col gap-0.5 lg:hidden shadow-sm shadow-stone-100"
          >
            {links.map((l) => {
              const active = pathname.startsWith(l.href)
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={[
                    'flex items-center gap-3 px-4 py-4 text-[15px] rounded-xl transition-colors duration-150',
                    active
                      ? 'font-semibold text-navy-900 bg-stone-50'
                      : 'font-medium text-navy-700 hover:bg-stone-50/70 active:bg-stone-100',
                  ].join(' ')}
                >
                  <span
                    className="w-[5px] h-[5px] rounded-full flex-shrink-0 transition-opacity duration-150"
                    style={{
                      backgroundColor: '#2EBB50',
                      opacity: active ? 1 : 0,
                    }}
                  />
                  {l.label}
                </Link>
              )
            })}

            <div className="pt-3 mt-1 border-t border-stone-100/80">
              <Link
                href="/parents"
                className="block w-full text-center text-[14px] font-semibold text-white py-4 rounded-xl transition-all duration-150 hover:translate-y-[2px] active:translate-y-[4px]"
                style={{ backgroundColor: '#2EBB50', boxShadow: SHOP_SHADOW_GREEN }}
              >
                Shop
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
