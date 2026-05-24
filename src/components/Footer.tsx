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
    heading: 'ABA Center',
    links: [
      { label: 'Business Planning', href: '/aba-center#business' },
      { label: 'Operations Setup',  href: '/aba-center#operations' },
      { label: 'Compliance Guide',  href: '/aba-center#compliance' },
      { label: 'Billing Workflow',  href: '/aba-center#billing' },
      { label: 'Templates',         href: '/aba-center#templates' },
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
              Behavioral and neurodevelopmental guidance for Florida families and professionals.
            </p>
            <p className="mt-4 text-xs text-navy-800/35 leading-relaxed">
              Florida, USA
            </p>
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
