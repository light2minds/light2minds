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
    <footer className="bg-navy-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 lg:pt-20 pb-10">

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 pb-12 border-b border-white/[0.07]">
          <div className="flex-shrink-0 max-w-[240px]">
            <Link href="/" className="inline-block font-bold text-xl tracking-tight text-white mb-4">
              Light<span className="text-gold-400">2</span>minds
            </Link>
            <p className="text-sm text-white/40 leading-relaxed">
              Behavioral and neurodevelopmental guidance for Florida families and professionals.
            </p>
            <p className="mt-4 text-xs text-white/25 leading-relaxed">
              Florida, USA
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 flex-1">
            {cols.map((col) => (
              <div key={col.heading}>
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/25 mb-4">
                  {col.heading}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-[13px] text-white/45 hover:text-white/80 transition-colors duration-150"
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
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Light2minds. All rights reserved.
          </p>
          <p className="text-xs text-white/18 max-w-xl lg:text-right leading-relaxed">
            Educational content only. Not a substitute for professional medical advice, diagnosis, supervision, or therapy.
          </p>
        </div>
      </div>
    </footer>
  )
}
