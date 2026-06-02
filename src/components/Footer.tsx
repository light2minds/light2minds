import Link from 'next/link'

const cols = [
  {
    heading: 'Families',
    links: [
      { label: 'Understanding Diagnosis', href: '/parents#diagnosis' },
      { label: 'ABA Therapy Guide',        href: '/parents#aba' },
      { label: 'IEP Guidance',             href: '/parents#iep' },
      { label: 'Home Strategies',          href: '/parents#strategies' },
      { label: '1-on-1 Sessions',          href: '/parents#sessions' },
    ],
  },
  {
    heading: 'Professionals',
    links: [
      { label: 'RBT Exam Prep',    href: '/professionals#exam' },
      { label: 'Study Materials',  href: '/professionals#materials' },
      { label: 'Ethics Module',    href: '/professionals#ethics' },
      { label: 'Career Tools',     href: '/professionals#career' },
      { label: 'Clinical Forms',   href: '/professionals#forms' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'All Tools',         href: '/tools' },
      { label: 'Parent Handouts',   href: '/tools#parent-tools' },
      { label: 'Data Forms',        href: '/tools#clinical-tools' },
      { label: 'Sensory Tools',     href: '/tools#sensory-tools' },
      { label: 'RBT Study',         href: '/tools#rbt-tools' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-stone-100 border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 lg:pt-20 pb-10">

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 pb-12 border-b border-stone-200/60">
          <div className="flex-shrink-0 max-w-[240px]">
            <Link href="/" className="inline-block font-bold text-xl tracking-tight mb-4">
              <span style={{ color: '#5BC4F8' }}>Light</span><span style={{ color: '#FFE030' }}>2</span><span style={{ color: '#2EBB50' }}>minds</span>
            </Link>
            <p className="text-sm text-navy-800/50 leading-relaxed">
              Behavioral and neurodevelopmental guidance for families and professionals.
            </p>
            <div className="mt-4 space-y-2">
              <a href="tel:+15613772473" className="flex items-center gap-2 text-xs text-navy-800/50 hover:text-navy-900 transition-colors group">
                <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 2h3l1.5 3.5-1.8 1.1a9 9 0 004.7 4.7l1.1-1.8L15 11v3a1 1 0 01-1 1C6.2 15 1 9.8 1 3a1 1 0 011-1z" />
                </svg>
                +1 (561) 377-2473
              </a>
              <a href="https://wa.me/15613772473" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-navy-800/50 hover:text-navy-900 transition-colors">
                <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <p className="text-xs text-navy-800/35">Florida, USA</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 flex-1">
            {cols.map((col) => (
              <div key={col.heading}>
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-navy-700/40 mb-4">
                  {col.heading}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-[13px] text-navy-800/55 hover:text-navy-900 transition-colors duration-150"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <p className="text-xs text-navy-800/30">
            &copy; {new Date().getFullYear()} Light2minds. All rights reserved.
          </p>
          <p className="text-xs text-navy-800/25 max-w-xl lg:text-right leading-relaxed">
            Educational content only. Not a substitute for professional medical advice, diagnosis, supervision, or therapy.
          </p>
        </div>
      </div>
    </footer>
  )
}
