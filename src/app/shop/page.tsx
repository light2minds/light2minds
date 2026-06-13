import Link from 'next/link'
import Image from 'next/image'
import {
  getAllCollections, getConsultationProducts, isShopifyConfigured,
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

// ── Placeholder data (shown when Shopify token is not yet configured) ─────────
const BLURBS: Record<string, string> = {
  'bcba-bcaba-study-guide':         'Comprehensive preparation for board certification.',
  'rbt-exam-study-guide':           'Everything you need to pass the RBT competency assessment.',
  'rbt-exam-study-guide-3rd':       'Everything you need to pass the RBT competency assessment.',
  'rbt-exam-study-guide-spanish':   'Guía completa en español para el examen de competencia RBT.',
  'behavior-therapist-starter-kit': 'Essential tools and resources for your first ABA sessions.',
  'sensory-travel-kit':             'Keep your child regulated and comfortable wherever you go.',
  'bedtime-regulation-box':         'Build a calming nighttime routine that works every night.',
  'calm-and-focus-box':             'Sensory tools to help children regulate, focus, and thrive.',
  'family-consultation':            'Personalized guidance for your child\'s needs, behavior concerns, and next steps.',
  'professional-mentorship':        'One-on-one mentorship for RBTs and behavior professionals seeking clinical growth.',
  'rbt-competency-assessment':      'Schedule your RBT Initial or Renewal Competency Assessment with a qualified assessor.',
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
    id: 'ph-fam', handle: 'families', title: 'Family Resources', description: '',
    products: { edges: [
      { node: ph('ph-5', 'bedtime-regulation-box', 'Bedtime Regulation Box', '79.99', 'Kit') },
      { node: ph('ph-7', 'calm-and-focus-box',     'Calm & Focus Box',       '49.99', 'Kit') },
      { node: ph('ph-6', 'sensory-travel-kit',     'Sensory Travel Kit',     '59.99', 'Kit') },
    ] },
  },
  {
    id: 'ph-pro', handle: 'professionals', title: 'Professional Resources', description: '',
    products: { edges: [
      { node: ph('ph-1', 'bcba-bcaba-study-guide',         'BCBA / BCaBA Study Guide',        '149.99', 'Study Guide') },
      { node: ph('ph-4', 'behavior-therapist-starter-kit', 'Behavior Therapist Starter Kit',  '79.99',  'Kit') },
      { node: ph('ph-2', 'rbt-exam-study-guide-3rd',       'RBT Exam Study Guide (3rd Ed)',   '59.99',  'Study Guide') },
      { node: ph('ph-3', 'rbt-exam-study-guide-spanish',   'RBT Exam Study Guide (Spanish)',  '59.99',  'Study Guide') },
    ] },
  },
]

const PLACEHOLDER_SERVICES: ShopifyProduct[] = [
  ph('ph-s1', 'family-consultation',       'Family Consultation',             '75.00', 'Consultation'),
  ph('ph-s2', 'professional-mentorship',   'Professional Mentorship Session', '85.00', 'Mentorship'),
  ph('ph-s3', 'rbt-competency-assessment', 'RBT Competency Assessment',       '99.00', 'Assessment'),
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function EmptySection({ label, message }: { label: string; message?: string }) {
  return (
    <div className="text-center py-12 rounded-2xl border border-dashed border-stone-200">
      <p className="text-[14px] font-medium text-navy-800/40 mb-1">
        {message ?? `No ${label} products found`}
      </p>
      {!message && (
        <p className="text-[13px] text-navy-800/30">
          Add products to the <strong>{label}</strong> collection in your Shopify store.
        </p>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function ShopPage() {
  const configured  = isShopifyConfigured()
  const live        = await getAllCollections()
  const collections = live.length > 0 ? live : (configured ? [] : PLACEHOLDER_COLLECTIONS)
  const isPlaceholder = !configured

  const famProducts = collections.find(c => c.handle === 'families')?.products.edges.map(e => e.node) ?? []
  const proProducts = collections.find(c => c.handle === 'professionals')?.products.edges.map(e => e.node) ?? []

  const liveServices = configured ? await getConsultationProducts() : []
  const svcProducts = liveServices.length > 0 ? liveServices : (configured ? [] : PLACEHOLDER_SERVICES)

  return (
    <main>

      {/* ── Dev notice ── */}
      {!configured && (
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-2.5">
          <div className="max-w-7xl mx-auto">
            <p className="text-[12px] text-amber-800">
              <strong>Preview mode —</strong> add{' '}
              <code className="bg-amber-100 px-1 rounded text-[11px]">NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN</code>{' '}
              to <code className="bg-amber-100 px-1 rounded text-[11px]">.env.local</code> to load live products.
            </p>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          HERO — compact
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        style={{ backgroundColor: WARM_BG }}
        className="pt-[82px] pb-6 border-b border-stone-200/60"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-700/40 mb-2">Shop</p>
          <h1 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-1.5">
            Resources That Support Growth
          </h1>
          <p className="text-[13.5px] text-navy-800/45 mb-5">
            Kits, study guides, and expert services for families and behavioral health professionals.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="#families"
              className="inline-flex items-center gap-2 text-[13px] font-bold text-white px-5 py-2.5 rounded-full transition-all duration-150 hover:-translate-y-px"
              style={{ backgroundColor: SKY, boxShadow: '0 3px 0 #2A8FB8' }}
            >
              Family Resources
            </Link>
            <Link
              href="#professionals"
              className="inline-flex items-center gap-2 text-[13px] font-bold text-navy-900 px-5 py-2.5 rounded-full transition-all duration-150 hover:-translate-y-px"
              style={{ backgroundColor: GOLD, boxShadow: '0 3px 0 #C4A800' }}
            >
              Professional Resources
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center gap-2 text-[13px] font-bold text-white px-5 py-2.5 rounded-full transition-all duration-150 hover:-translate-y-px"
              style={{ backgroundColor: GREEN, boxShadow: '0 3px 0 #1A7A3C' }}
            >
              Consultation Services
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FAMILY RESOURCES
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="families" className="bg-white py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-5">
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-1" style={{ color: SKY }}>For Families</p>
            <h2 className="text-[clamp(1.2rem,2.5vw,1.6rem)] font-bold text-navy-900 tracking-[-0.02em] leading-[1.1]">
              Family Resources
            </h2>
            <p className="text-[13px] text-navy-800/45 mt-1">
              Sensory kits and tools to support regulation, routine, and development at home.
            </p>
          </div>

          {famProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
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
      <section id="professionals" className="bg-stone-50 py-8 lg:py-12 border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-5">
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-1" style={{ color: GOLD_TEXT }}>For Professionals</p>
            <h2 className="text-[clamp(1.2rem,2.5vw,1.6rem)] font-bold text-navy-900 tracking-[-0.02em] leading-[1.1]">
              Professional Resources
            </h2>
            <p className="text-[13px] text-navy-800/45 mt-1">
              Study guides and starter kits for RBTs, BCaBAs, BCBAs, and behavior therapists.
            </p>
          </div>

          {proProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
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
          CONSULTATION & PROFESSIONAL SERVICES
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="services" className="bg-white py-8 lg:py-12 border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-5">
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-1" style={{ color: GREEN_TEXT }}>Expert Services</p>
            <h2 className="text-[clamp(1.2rem,2.5vw,1.6rem)] font-bold text-navy-900 tracking-[-0.02em] leading-[1.1]">
              Consultation &amp; Professional Services
            </h2>
            <p className="text-[13px] text-navy-800/45 mt-1">
              1-on-1 sessions for families and professionals — book and pay directly through our secure checkout.
            </p>
          </div>

          {svcProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
              {svcProducts.map(product => (
                <ShopProductCard
                  key={product.id}
                  product={product}
                  accentBar={GREEN}
                  accentText={GREEN_TEXT}
                  isPlaceholder={isPlaceholder}
                  buyLabel="Book Now"
                />
              ))}
            </div>
          ) : (
            <EmptySection
              label="services"
              message="No consultation or professional service products are currently available."
            />
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          WHY LIGHT 2 MINDS — subtle footer strip
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-stone-200/50 py-5 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-navy-800/30 mb-3">
            Why Work With Light 2 Minds?
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {[
              'Personalized support',
              'Evidence-based recommendations',
              'Practical real-world experience',
              'Flexible virtual appointments',
              'Created by certified professionals',
              'Evidence-based methodology',
              'Trusted by families and clinicians',
              'Secure Shopify checkout',
            ].map(item => (
              <span key={item} className="flex items-center gap-1.5 text-[11.5px] text-navy-800/35">
                <svg className="w-2.5 h-2.5 flex-shrink-0" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="#2EBB50" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
