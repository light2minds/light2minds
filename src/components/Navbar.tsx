'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

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
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isHome = pathname === '/'

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled || !isHome
            ? 'bg-white/95 backdrop-blur-md border-b border-stone-200/60'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-18">

          <Link href="/" aria-label="Light2minds home">
            <LogoMark />
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={[
                  'px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200',
                  pathname.startsWith(l.href)
                    ? 'text-navy-900 bg-navy-50'
                    : 'text-navy-600 hover:text-navy-900 hover:bg-stone-100',
                ].join(' ')}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/parents"
            className="hidden lg:inline-flex items-center text-sm font-semibold text-white bg-forest-500 border border-forest-500 px-5 py-2 rounded-full hover:bg-forest-600 hover:border-forest-600 transition-all duration-200"
          >
            Get Started
          </Link>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="lg:hidden flex flex-col gap-[5px] p-2 -mr-2"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={['block w-6 h-[1.5px] bg-navy-900 transition-all duration-300 origin-center', menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''].join(' ')} />
            <span className={['block w-6 h-[1.5px] bg-navy-900 transition-all duration-300', menuOpen ? 'opacity-0 scale-x-0' : ''].join(' ')} />
            <span className={['block w-6 h-[1.5px] bg-navy-900 transition-all duration-300 origin-center', menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''].join(' ')} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-stone-200/60 px-6 py-5 flex flex-col gap-1 lg:hidden shadow-sm"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-3 text-base font-medium text-navy-900 hover:bg-stone-50 rounded-xl transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-4 mt-1 border-t border-stone-100">
              <Link
                href="/parents"
                className="block w-full text-center text-sm font-semibold text-white bg-forest-500 px-5 py-3 rounded-full hover:bg-forest-600 transition-colors"
              >
                Get Started
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
        {/* Sunburst rays above the 2 */}
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
