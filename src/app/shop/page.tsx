import Link from 'next/link'
import Image from 'next/image'
import {
  getAllCollections, isShopifyConfigured,
  formatPrice, getFirstImage,
  ShopifyProduct, ShopifyCollection,
} from '@/lib/shopify'
import ShopProductCard from '@/components/shop/ShopProductCard'

export const revalidate = 60

export const metadata = {
  title: 'Shop — Light 2 Minds',
  description: 'Practical tools, study guides, and curated kits designed for families and behavior professionals.',
}

const WARM_BG   = '#F8F5EF'
const SKY       = '#5BC4F8'
const GOLD      = '#FFE030'
const GOLD_TEXT  = '#8A6A00'
const GREEN      = '#2EBB50'
const GREEN_TEXT = '#1A7A3C'

// ── Placeholder data ──────────────────────────────────────────────────────────
const BLURBS: Record<string, string> = {
  'bcba-bcaba-study-guide':         'Comprehensive preparation for board certification.',
  'rbt-exam-study-guide':           'Everything you need to pass the RBT competency assessment.',
  'rbt-exam-study-guide-3rd':       'Everything you need to pass the RBT competency assessment.',
  'rbt-exam-study-guide-spanish':   'Guía completa en español para el examen de competencia RBT.',
  'behavior-therapist-starter-kit': 'Essential tools and resources for your first ABA sessions.',
  'sensory-travel-kit':             'Keep your child regulated and comfortable wherever you go.',
  'bedtime-regulation-box':         'Build a calming nighttime routine that works every night.',
  'calm-and-focus-box':             'Sensory tools to help children regulate, focus, and thrive.',
}

function ph(
  id: string, handle: string, title: string,
  price: string, productType: string,
): ShopifyProduct {
  const m = (a: string) => ({ amount: a, currencyCode: 'USD' })
  return {
    id, handle, title,
    description: BLURBS[handle] ?? '',
    descriptionHtml: '',
    availableForSale: true,
    priceRange:          { minVariantPrice: m(price), maxVariantPrice: m(price) },
    compareAtPriceRange: { minVariantPrice: m(price) },
    images:   { edges: [] },
    variants: { edges: [{ node: { id: `pv-${id}`, title: 'Default Title', availableForSale: true, price: m(price), compareAtPrice: null, selectedOptions: [] } }] },
    tags: [], productType,
  }
}

const PLACEHOLDER_COLLECTIONS: ShopifyCollection[] = [
  {
    id: 'ph-pro', handle: 'professionals', title: 'Professional Resources', description: '',
    products: { edges: [
      { node: ph('ph-1', 'bcba-bcaba-study-guide',         'BCBA / BCaBA Study Guide',       '149.99', 'Study Guide') },
      { node: ph('ph-2', 'rbt-exam-study-guide-3rd',       'RBT Exam Study Guide (3rd Ed)',  '59.99',  'Study Guide') },
      { node: ph('ph-3', 'rbt-exam-study-guide-spanish',   'RBT Exam Study Guide (Spanish)', '59.99',  'Study Guide') },
      { node: ph('ph-4', 'behavior-therapist-starter-kit', 'Behavior Therapist Starter Kit', '79.99',  'Kit') },
    ] },
  },
  {
    id: 'ph-fam', handle: 'families', title: 'Family Resources', description: '',
    products: { edges: [
      { node: ph('ph-5', 'sensory-travel-kit',    'Sensory Travel Kit',     '59.99', 'Kit') },
      { node: ph('ph-6', 'bedtime-regulation-box','Bedtime Regulation Box', '79.99', 'Kit') },
      { node: ph('ph-7', 'calm-and-focus-box',    'Calm & Focus Box',       '49.99', 'Kit') },
    ] },
  },
]

// ── Atoms ─────────────────────────────────────────────────────────────────────
function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  )
}

function SectionLabel({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="block w-6 h-px" style={{ backgroundColor: color }} />
      <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/45">{label}</p>
    </div>
  )
}

// ── Consultation service cards ─────────────────────────────────────────────────
const SERVICE_ITEMS = [
  {
    id: 'family',
    badge: 'For Families',
    accentBar: SKY,
    accentBadgeBg: 'rgba(91,196,248,0.12)',
    accentBadge: SKY,
    title: 'Book a Family Consultation',
    description: 'Receive personalized guidance for your child\'s needs, behavior concerns, autism-related questions, service navigation, school support, and next steps. Designed for parents and caregivers seeking practical, evidence-based recommendations.',
    href: '#CALENDLY-FAMILY',
  },
  {
    id: 'mentorship',
    badge: 'For Professionals',
    accentBar: GOLD,
    accentBadgeBg: 'rgba(255,224,48,0.12)',
    accentBadge: GOLD_TEXT,
    title: 'Book Professional Mentorship',
    description: 'One-on-one mentorship for RBTs, BCaBAs, BCBAs, and aspiring behavior professionals. Discuss clinical topics, professional development, study strategies, supervision-related questions, and career growth opportunities.',
    href: '#CALENDLY-MENTORSHIP',
  },
  {
    id: 'competency',
    badge: 'Assessment',
    accentBar: GREEN,
    accentBadgeBg: 'rgba(46,187,80,0.12)',
    accentBadge: GREEN_TEXT,
    title: 'Book a Competency Assessment',
    description: 'Schedule your RBT Initial or Renewal Competency Assessment with a qualified assessor. Complete required skill demonstrations and receive guidance throughout the assessment process.',
    href: '#CALENDLY-COMPETENCY',
  },
]

function ServiceCard({
  badge,
  accentBar,
  accentBadgeBg,
  accentBadge,
  title,
  description,
  href,
}: {
  badge: string
  accentBar: string
  accentBadgeBg: string
  accentBadge: string
  title: string
  description: string
  href: string
}) {
  return (
    <div className="bg-white border border-stone-200/70 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-0.5 hover:shadow-md hover:shadow-stone-200/60 transition-all duration-200">
      <div className="h-[3px] w-full" style={{ backgroundColor: accentBar }} />
      <div className="p-7 flex flex-col flex-1">
        <span
          className="text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-0.5 rounded-full inline-block mb-4 self-start"
          style={{ backgroundColor: accentBadgeBg, color: accentBadge }}
        >
          {badge}
        </span>
        <h3 className="text-[15px] font-semibold text-navy-900 leading-snug mb-3">{title}</h3>
        <p className="text-[13.5px] text-navy-800/55 leading-relaxed flex-1 mb-6">{description}</p>
        <a
          href={href}
          className="inline-flex items-center justify-center gap-2 text-[13.5px] font-bold text-navy-900 px-6 py-3 rounded-full transition-all duration-150 hover:translate-y-[-1px]"
          style={{ backgroundColor: GOLD, boxShadow: '0 4px 0 #C4A800, 0 6px 14px rgba(0,0,0,0.08)' }}
        >
          Book Now <Arrow />
        </a>
      </div>
    </div>
  )
}

function EmptySection({ label }: { label: string }) {
  return (
    <div className="text-center py-16 rounded-2xl border border-dashed border-stone-200">
      <p className="text-[14px] font-medium text-navy-800/40 mb-1">No {label} products found</p>
      <p className="text-[13px] text-navy-800/30">
        Add products to the <strong>{label}</strong> collection in your Shopify store.
      </p>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function ShopPage() {
  const configured  = isShopifyConfigured()
  const live        = await getAllCollections()
  const collections = live.length > 0 ? live : (configured ? [] : PLACEHOLDER_COLLECTIONS)
  const isPlaceholder = !configured

  const proProducts = collections.find(c => c.handle === 'professionals')?.products.edges.map(e => e.node) ?? []
  const famProducts = collections.find(c => c.handle === 'families')?.products.edges.map(e => e.node) ?? []

  const bundleProduct = proProducts.find(p => p.handle === 'behavior-therapist-starter-kit')
  const bundleImage   = bundleProduct ? getFirstImage(bundleProduct) : null
  const bundlePrice   = bundleProduct
    ? formatPrice(bundleProduct.priceRange.minVariantPrice.amount, bundleProduct.priceRange.minVariantPrice.currencyCode)
    : '$79.99'

  return (
    <main>

      {/* ── Dev notice ── */}
      {!configured && (
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-3">
          <div className="max-w-7xl mx-auto">
            <p className="text-[12.5px] text-amber-800">
              <strong>Preview mode —</strong> add{' '}
              <code className="bg-amber-100 px-1 rounded text-[11.5px]">NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN</code>{' '}
              to <code className="bg-amber-100 px-1 rounded text-[11.5px]">.env.local</code> to load live products.
            </p>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        style={{ backgroundColor: WARM_BG }}
        className="pt-36 pb-14 lg:pt-44 lg:pb-20 border-b border-stone-200/60"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-6 h-px" style={{ backgroundColor: SKY }} />
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/45">Light 2 Minds · Shop</p>
            </div>
            <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-bold text-navy-900 tracking-[-0.03em] leading-[1.06] mb-5">
              Shop Resources That<br />Support Growth
            </h1>
            <p className="text-[clamp(1rem,1.5vw,1.1rem)] font-light text-navy-800/55 leading-relaxed max-w-xl mb-8">
              Practical tools, study guides, and curated kits designed for families and behavior professionals.
            </p>
            <div className="flex flex-wrap gap-3 mb-7">
              <Link
                href="#families"
                className="inline-flex items-center gap-2.5 text-[13.5px] font-bold text-white px-7 py-3.5 rounded-full transition-all duration-150 hover:translate-y-[-1px]"
                style={{ backgroundColor: SKY, boxShadow: '0 4px 0 #2A8FB8, 0 6px 14px rgba(0,0,0,0.08)' }}
              >
                Family Resources <Arrow />
              </Link>
              <Link
                href="#professionals"
                className="inline-flex items-center gap-2.5 text-[13.5px] font-bold text-navy-900 px-7 py-3.5 rounded-full transition-all duration-150 hover:translate-y-[-1px]"
                style={{ backgroundColor: GOLD, boxShadow: '0 4px 0 #C4A800, 0 6px 14px rgba(0,0,0,0.08)' }}
              >
                Professional Resources <Arrow />
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              {['Created by certified professionals', 'Evidence-informed methodology', 'Trusted by families and clinicians'].map(label => (
                <span key={label} className="text-[11.5px] font-medium text-navy-800/38 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-current opacity-60" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FAMILY RESOURCES
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="families" className="bg-white py-14 lg:py-20 border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-10">
            <SectionLabel color={SKY} label="For Families" />
            <h2 className="text-[clamp(1.7rem,3.5vw,2.4rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-3">
              Family Resources
            </h2>
            <p className="text-[14px] text-navy-800/45 max-w-md leading-relaxed">
              Support everyday routines, regulation, and success at home and on the go.
            </p>
          </div>

          {famProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {famProducts.map(product => (
                <ShopProductCard
                  key={product.id}
                  product={product}
                  accentBar={SKY}
                  accentText={SKY}
                  isPlaceholder={isPlaceholder}
                />
              ))}
            </div>
          ) : (
            <EmptySection label="family" />
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PROFESSIONAL RESOURCES
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="professionals" className="bg-stone-50 py-14 lg:py-20 border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-10">
            <SectionLabel color={GOLD} label="For Professionals" />
            <h2 className="text-[clamp(1.7rem,3.5vw,2.4rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-3">
              Professional Resources
            </h2>
            <p className="text-[14px] text-navy-800/45 max-w-md leading-relaxed">
              Designed for aspiring and practicing behavior professionals.
            </p>
          </div>

          {proProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {proProducts.map(product => (
                <ShopProductCard
                  key={product.id}
                  product={product}
                  accentBar={GOLD}
                  accentText={GOLD_TEXT}
                  isPlaceholder={isPlaceholder}
                />
              ))}
            </div>
          ) : (
            <EmptySection label="professional" />
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FEATURED BUNDLE
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-14 lg:py-20 border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-stone-50 border border-stone-200/60 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Image side */}
              <div className="relative min-h-[280px] flex items-center justify-center overflow-hidden" style={{ backgroundColor: SKY + '08' }}>
                {bundleImage ? (
                  <Image
                    src={bundleImage.url}
                    alt={bundleImage.altText ?? 'Behavior Therapist Starter Kit'}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                ) : (
                  <div className="text-center p-10">
                    <div
                      className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                      style={{ backgroundColor: SKY + '18' }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={SKY} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="21 8 21 21 3 21 3 8" />
                        <rect x="1" y="3" width="22" height="5" />
                        <line x1="10" y1="12" x2="14" y2="12" />
                      </svg>
                    </div>
                    <p className="text-[12px] font-medium text-navy-800/35">Starter Kit</p>
                  </div>
                )}
              </div>

              {/* Content side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <SectionLabel color={SKY} label="Featured Bundle" />
                <h2 className="text-[clamp(1.3rem,2.5vw,1.9rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.15] mb-3">
                  Everything You Need for Your First ABA Sessions
                </h2>
                <p className="text-[14px] text-navy-800/50 leading-relaxed mb-5">
                  The Behavior Therapist Starter Kit includes session tools, data forms, reinforcement guides, and practical reference materials — curated for RBTs and new behavior technicians.
                </p>
                <p className="text-[22px] font-bold text-navy-900 mb-6">{bundlePrice}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/products/behavior-therapist-starter-kit"
                    className="inline-flex items-center justify-center gap-2 text-[13.5px] font-bold text-navy-900 px-7 py-3.5 rounded-full transition-all duration-150 hover:translate-y-[-1px]"
                    style={{ backgroundColor: GOLD, boxShadow: '0 4px 0 #C4A800' }}
                  >
                    View Bundle <Arrow />
                  </Link>
                  <Link
                    href="#professionals"
                    className="inline-flex items-center justify-center gap-2 text-[13.5px] font-semibold text-navy-800/55 px-7 py-3.5 rounded-full border border-navy-900/15 hover:bg-navy-900 hover:text-white transition-all duration-200"
                  >
                    All Professional Resources
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CONSULTATION & PROFESSIONAL SERVICES
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="services" style={{ backgroundColor: WARM_BG }} className="py-14 lg:py-20 border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Header */}
          <div className="mb-10 max-w-2xl">
            <SectionLabel color={SKY} label="Services" />
            <h2 className="text-[clamp(1.7rem,3.5vw,2.4rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-4">
              Consultation &amp; Professional Services
            </h2>
            <p className="text-[15px] text-navy-800/50 leading-relaxed">
              Personalized support for families, caregivers, behavior therapists, and professionals seeking guidance, mentorship, and assessment services.
            </p>
          </div>

          {/* Service cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
            {SERVICE_ITEMS.map(item => (
              <ServiceCard key={item.id} {...item} />
            ))}
          </div>

          {/* Trust strip */}
          <div className="bg-white border border-stone-200/60 rounded-2xl px-6 py-5 lg:px-8 lg:py-6">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/45 mb-4">
              Why Work With Light 2 Minds?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                'Personalized support',
                'Evidence-based recommendations',
                'Practical real-world experience',
                'Flexible virtual appointments',
              ].map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(91,196,248,0.12)' }}
                  >
                    <svg className="w-2.5 h-2.5" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#5BC4F8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p className="text-[13px] text-navy-800/65">{item}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        style={{ backgroundColor: '#0D1B2E' }}
        className="py-14 lg:py-20 border-t border-navy-900"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-white tracking-[-0.025em] leading-[1.1] mb-4">
                Find the right resource<br />for your journey.
              </h2>
              <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.50)' }}>
                Whether you are supporting a child at home or advancing your professional career, Light 2 Minds provides practical tools designed to help you move forward with confidence.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                href="#families"
                className="inline-flex items-center justify-center gap-2.5 text-[13.5px] font-bold text-navy-900 px-7 py-3.5 rounded-full transition-all duration-150 hover:translate-y-[-1px]"
                style={{ backgroundColor: GOLD, boxShadow: '0 4px 0 #C4A800' }}
              >
                Family Resources <Arrow />
              </Link>
              <Link
                href="#professionals"
                className="inline-flex items-center justify-center gap-2.5 text-[13.5px] font-semibold text-white px-7 py-3.5 rounded-full border transition-all duration-200 hover:bg-white hover:text-navy-900"
                style={{ borderColor: 'rgba(255,255,255,0.20)' }}
              >
                Professional Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
