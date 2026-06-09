import Link from 'next/link'
import Image from 'next/image'
import {
  getAllCollections, isShopifyConfigured,
  formatPrice, getFirstImage,
  ShopifyProduct, ShopifyCollection,
} from '@/lib/shopify'

export const revalidate = 60

export const metadata = {
  title: 'Shop — Light 2 Minds',
  description: 'Practical tools, study guides, and curated kits designed for families and behavior professionals.',
}

// ── Brand palette ─────────────────────────────────────────────────────────────
const B  = '#3BA7F0'   // blue
const Y  = '#F5C842'   // yellow (button fill)
const YT = '#9A6F00'   // dark amber — yellow text readable on white
const TX = '#0F172A'   // near-black text
const MT = '#64748B'   // muted text (slate-500)

// ── Product short-description overrides ──────────────────────────────────────
const BLURBS: Record<string, string> = {
  'bcba-bcaba-study-guide':          'Comprehensive preparation for board certification.',
  'rbt-exam-study-guide':            'Everything you need to pass the RBT competency assessment.',
  'rbt-exam-study-guide-3rd':        'Everything you need to pass the RBT competency assessment.',
  'rbt-exam-study-guide-spanish':    'Guía completa en español para el examen de competencia RBT.',
  'behavior-therapist-starter-kit':  'Essential tools and resources for your first ABA sessions.',
  'sensory-travel-kit':              'Keep your child regulated and comfortable wherever you go.',
  'bedtime-regulation-box':          'Build a calming nighttime routine that works every night.',
  'calm-and-focus-box':              'Sensory tools to help children regulate, focus, and thrive.',
}

// ── Placeholder data (shown before Shopify is connected) ─────────────────────
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
      { node: ph('ph-1', 'bcba-bcaba-study-guide',         'BCBA / BCaBA Study Guide',             '149.99', 'Study Guide') },
      { node: ph('ph-2', 'rbt-exam-study-guide-3rd',       'RBT Exam Study Guide (3rd Ed)',         '59.99',  'Study Guide') },
      { node: ph('ph-3', 'rbt-exam-study-guide-spanish',   'RBT Exam Study Guide (Spanish)',        '59.99',  'Study Guide') },
      { node: ph('ph-4', 'behavior-therapist-starter-kit', 'Behavior Therapist Starter Kit',       '79.99',  'Kit') },
    ] },
  },
  {
    id: 'ph-fam', handle: 'families', title: 'Family Resources', description: '',
    products: { edges: [
      { node: ph('ph-5', 'sensory-travel-kit',    'Sensory Travel Kit',      '59.99', 'Kit') },
      { node: ph('ph-6', 'bedtime-regulation-box','Bedtime Regulation Box',  '79.99', 'Kit') },
      { node: ph('ph-7', 'calm-and-focus-box',    'Calm & Focus Box',        '49.99', 'Kit') },
    ] },
  },
]

// ── SVG atoms ─────────────────────────────────────────────────────────────────
function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  )
}

function BookIcon({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.45">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

function BoxIcon({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.45">
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect x="1" y="3" width="22" height="5" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  )
}

// ── Product card ──────────────────────────────────────────────────────────────
function ProductCard({
  product, accent, isPlaceholder,
}: { product: ShopifyProduct; accent: string; isPlaceholder?: boolean }) {
  const image = getFirstImage(product)
  const blurb = BLURBS[product.handle] ?? product.description
  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode,
  )
  const isKit = product.productType.toLowerCase().includes('kit') || product.productType.toLowerCase().includes('box')

  const imageArea = image ? (
    <Image
      src={image.url}
      alt={image.altText ?? product.title}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center" style={{ background: accent + '0C' }}>
      {isKit ? <BoxIcon color={accent} /> : <BookIcon color={accent} />}
    </div>
  )

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 hover:shadow-lg hover:shadow-slate-100/80 hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-slate-50">
        {isPlaceholder ? (
          <>
            {imageArea}
            <span className="absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 tracking-wide">
              Preview
            </span>
          </>
        ) : (
          <Link href={`/products/${product.handle}`} className="absolute inset-0 block">
            {imageArea}
          </Link>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {product.productType && (
          <p className="text-[10px] font-bold tracking-[0.13em] uppercase mb-2" style={{ color: accent }}>
            {product.productType}
          </p>
        )}
        <h3 className="text-[14.5px] font-semibold leading-snug mb-2" style={{ color: TX }}>
          {product.title}
        </h3>
        {blurb && (
          <p className="text-[12.5px] leading-relaxed line-clamp-2 flex-1 mb-4" style={{ color: MT }}>
            {blurb}
          </p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <p className="text-[17px] font-bold" style={{ color: TX }}>{price}</p>
          {isPlaceholder ? (
            <span className="text-[12px] font-medium" style={{ color: '#CBD5E1' }}>Coming Soon</span>
          ) : (
            <Link
              href={`/products/${product.handle}`}
              className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold transition-colors"
              style={{ color: accent }}
            >
              View Product <Arrow />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function ShopPage() {
  const configured    = isShopifyConfigured()
  const live          = await getAllCollections()
  const collections   = live.length > 0 ? live : (configured ? [] : PLACEHOLDER_COLLECTIONS)
  const isPlaceholder = !configured

  const proProducts = collections.find(c => c.handle === 'professionals')?.products.edges.map(e => e.node) ?? []
  const famProducts = collections.find(c => c.handle === 'families')?.products.edges.map(e => e.node) ?? []

  return (
    <main className="bg-white" style={{ color: TX }}>

      {/* ── Dev notice ── */}
      {!configured && (
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-3">
          <div className="max-w-7xl mx-auto">
            <p className="text-[12.5px] text-amber-800">
              <strong>Preview mode —</strong> add <code className="bg-amber-100 px-1 rounded text-[11.5px]">NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN</code> to <code className="bg-amber-100 px-1 rounded text-[11.5px]">.env.local</code> to load live products.
            </p>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-5" style={{ color: B }}>
              Light 2 Minds Shop
            </p>
            <h1 className="text-[clamp(2.1rem,4.5vw,3.1rem)] font-bold tracking-[-0.03em] leading-[1.07] mb-5">
              Shop Resources That<br />Support Growth
            </h1>
            <p className="text-[16px] leading-relaxed mb-8" style={{ color: MT }}>
              Practical tools, study guides, and curated kits designed for families and behavior professionals.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="#families"
                className="inline-flex items-center justify-center gap-2 text-[13.5px] font-semibold px-6 py-3.5 rounded-xl text-white transition-all hover:-translate-y-px"
                style={{ backgroundColor: B, boxShadow: '0 1px 3px rgba(59,167,240,0.30)' }}
              >
                Shop Family Resources <Arrow />
              </Link>
              <Link
                href="#professionals"
                className="inline-flex items-center justify-center gap-2 text-[13.5px] font-semibold px-6 py-3.5 rounded-xl transition-all hover:-translate-y-px"
                style={{ backgroundColor: Y, color: TX, boxShadow: '0 1px 3px rgba(245,200,66,0.35)' }}
              >
                Shop Professional Resources <Arrow />
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                { label: 'Created by certified professionals', color: B },
                { label: 'Evidence-informed methodology',       color: '#22C55E' },
                { label: 'Trusted by families and clinicians',  color: '#F5C842' },
              ].map(t => (
                <span key={t.label} className="flex items-center gap-2 text-[12px]" style={{ color: MT }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: t.color }} />
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — FAMILY RESOURCES
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="families" className="py-20 lg:py-28 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: B }}>
                For Families
              </p>
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.025em] mb-2">
                Family Resources
              </h2>
              <p className="text-[14.5px] max-w-md" style={{ color: MT }}>
                Support everyday routines, regulation, and success at home and on the go.
              </p>
            </div>
          </div>

          {famProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {famProducts.map(product => (
                <ProductCard key={product.id} product={product} accent={B} isPlaceholder={isPlaceholder} />
              ))}
            </div>
          ) : (
            <EmptySection label="family" />
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3 — PROFESSIONAL RESOURCES
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="professionals" className="py-20 lg:py-28 border-t border-slate-100" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: YT }}>
                For Professionals
              </p>
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.025em] mb-2">
                Professional Resources
              </h2>
              <p className="text-[14.5px] max-w-md" style={{ color: MT }}>
                Designed for aspiring and practicing behavior professionals.
              </p>
            </div>
          </div>

          {proProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {proProducts.map(product => (
                <ProductCard key={product.id} product={product} accent={YT} isPlaceholder={isPlaceholder} />
              ))}
            </div>
          ) : (
            <EmptySection label="professional" />
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4 — FEATURED BUNDLE
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 border-t border-slate-100" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden" style={{ boxShadow: '0 4px 24px rgba(59,167,240,0.07)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Image side */}
              <div className="relative min-h-[320px] lg:min-h-[440px] flex items-center justify-center" style={{ backgroundColor: B + '0A' }}>
                <div className="text-center p-12">
                  <div className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: B + '18' }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={B} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="21 8 21 21 3 21 3 8" />
                      <rect x="1" y="3" width="22" height="5" />
                      <line x1="10" y1="12" x2="14" y2="12" />
                    </svg>
                  </div>
                  <p className="text-[13px] font-semibold" style={{ color: B + 'AA' }}>Featured Bundle</p>
                </div>
              </div>

              {/* Content side */}
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <p className="text-[10.5px] font-bold tracking-[0.16em] uppercase mb-4" style={{ color: B }}>
                  Featured Bundle
                </p>
                <h2 className="text-[clamp(1.4rem,2.8vw,1.9rem)] font-bold tracking-[-0.025em] leading-[1.15] mb-4">
                  Everything You Need for Your First ABA Sessions
                </h2>
                <p className="text-[14.5px] leading-relaxed mb-2" style={{ color: MT }}>
                  The Behavior Therapist Starter Kit includes session tools, data forms, reinforcement guides, and practical reference materials — curated for RBTs and new behavior technicians.
                </p>
                <p className="text-[22px] font-bold mb-8" style={{ color: TX }}>$79.99</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/products/behavior-therapist-starter-kit"
                    className="inline-flex items-center justify-center gap-2 text-[13.5px] font-semibold px-7 py-3.5 rounded-xl text-white transition-all hover:-translate-y-px"
                    style={{ backgroundColor: B, boxShadow: '0 1px 3px rgba(59,167,240,0.30)' }}
                  >
                    View Bundle <Arrow />
                  </Link>
                  <Link
                    href="#professionals"
                    className="inline-flex items-center justify-center gap-2 text-[13.5px] font-semibold px-7 py-3.5 rounded-xl transition-all"
                    style={{ color: MT, border: '1.5px solid #E2E8F0' }}
                  >
                    See All Professional Resources
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 7 — FINAL CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-5" style={{ color: MT }}>
            Ready to Get Started?
          </p>
          <h2 className="text-[clamp(1.7rem,3.5vw,2.4rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-5">
            Find the Right Resource for Your Journey
          </h2>
          <p className="text-[16px] leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: MT }}>
            Whether you are supporting a child at home or advancing your professional career, Light 2 Minds provides practical tools designed to help you move forward with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="#families"
              className="inline-flex items-center justify-center gap-2 text-[13.5px] font-semibold px-7 py-3.5 rounded-xl text-white transition-all hover:-translate-y-px"
              style={{ backgroundColor: B, boxShadow: '0 1px 3px rgba(59,167,240,0.30)' }}
            >
              Shop Family Resources <Arrow />
            </Link>
            <Link
              href="#professionals"
              className="inline-flex items-center justify-center gap-2 text-[13.5px] font-semibold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-px"
              style={{ backgroundColor: Y, color: TX, boxShadow: '0 1px 3px rgba(245,200,66,0.35)' }}
            >
              Shop Professional Resources <Arrow />
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}

function EmptySection({ label }: { label: string }) {
  return (
    <div className="text-center py-16 rounded-2xl border border-dashed border-slate-200">
      <p className="text-[14px] font-medium mb-1" style={{ color: MT }}>No {label} products found</p>
      <p className="text-[13px]" style={{ color: '#94A3B8' }}>
        Add products to the <strong>{label}</strong> collection in your Shopify store.
      </p>
    </div>
  )
}
