import Link from 'next/link'
import Image from 'next/image'
import {
  getAllCollections, isShopifyConfigured,
  formatPrice, getFirstImage, getDefaultVariant,
  hasDiscount, ShopifyProduct, ShopifyCollection,
} from '@/lib/shopify'
import AddToCartButton from '@/components/shop/AddToCartButton'

export const revalidate = 60

export const metadata = {
  title: 'Shop — Light2Minds',
  description: 'Curated guides, toolkits, and study materials for families and behavioral health professionals.',
}

const WARM_BG = '#F8F5EF'

const COLLECTION_META: Record<string, { label: string; color: string; desc: string }> = {
  families:      { label: 'For Families',      color: '#5BC4F8', desc: 'Resources for parents navigating autism, ADHD, and developmental challenges.' },
  professionals: { label: 'For Professionals', color: '#2EBB50', desc: 'Study guides, clinical tools, and career resources for ABA professionals.' },
  downloads:     { label: 'Downloads',         color: '#FFE030', desc: 'Instant digital downloads — ready the moment you purchase.' },
}

// ── Placeholder data shown while Shopify is not yet connected ────────────────

function p(
  id: string, handle: string, title: string, description: string,
  price: string, productType: string, tags: string[] = [], compare?: string
): ShopifyProduct {
  const money = (a: string) => ({ amount: a, currencyCode: 'USD' })
  return {
    id, handle, title, description,
    descriptionHtml: `<p>${description}</p>`,
    availableForSale: true,
    priceRange:          { minVariantPrice: money(price), maxVariantPrice: money(price) },
    compareAtPriceRange: { minVariantPrice: money(compare ?? price) },
    images:   { edges: [] },
    variants: { edges: [{ node: { id: `pv-${id}`, title: 'Default Title', availableForSale: true, price: money(price), compareAtPrice: compare ? money(compare) : null, selectedOptions: [] } }] },
    tags, productType,
  }
}

const PLACEHOLDER_COLLECTIONS: ShopifyCollection[] = [
  {
    id: 'ph-families', handle: 'families',
    title: 'Resources for Families', description: '',
    products: { edges: [
      { node: p('ph-1', 'parents-guide-autism',       "Parent's Guide to Autism Diagnosis",    'A step-by-step guide for families navigating a new diagnosis — what to expect, who to call, and how to advocate.', '24.99', 'Guide',      ['bestseller']) },
      { node: p('ph-2', 'adhd-behavior-toolkit',       'ADHD Behavior Support Toolkit',         'Practical strategies, visual aids, and daily routines to support children with ADHD at home and school.',           '29.99', 'Toolkit',    [],           '39.99') },
      { node: p('ph-3', 'visual-schedule-bundle',      'Visual Schedule Bundle — Home Edition', 'Printable visual schedules and routine cards designed for children with autism and developmental delays.',           '19.99', 'Bundle') },
      { node: p('ph-4', 'after-diagnosis-roadmap',     'After-Diagnosis Roadmap for Families',  'Know exactly what to do next — therapies, school rights, insurance, and community support in one place.',           '14.99', 'Guide') },
    ] },
  },
  {
    id: 'ph-professionals', handle: 'professionals',
    title: 'Professional Resources', description: '',
    products: { edges: [
      { node: p('ph-5', 'rbt-exam-study-guide',        'RBT Exam Study Guide',                  'Task-list walkthroughs, practice questions, and mnemonics — everything you need to pass on the first try.',         '34.99', 'Study Guide', ['bestseller']) },
      { node: p('ph-6', 'bcba-supervision-tracker',    'BCBA Supervision Tracker',               'Track supervised hours, document competency checks, and stay BACB-compliant with this structured tracker.',         '24.99', 'Tool') },
      { node: p('ph-7', 'aba-data-collection-pack',    'ABA Data Collection Forms Pack',         '25 printable data sheets for frequency, duration, interval recording, and behavior reduction programs.',            '19.99', 'Download') },
    ] },
  },
  {
    id: 'ph-downloads', handle: 'downloads',
    title: 'Instant Downloads', description: '',
    products: { edges: [
      { node: p('ph-8', 'token-economy-board',         'Token Economy Board (Printable)',        'Customizable token economy boards for home and classroom. Print, laminate, and reuse indefinitely.',               '7.99',  'Printable') },
      { node: p('ph-9', 'social-stories-template-pack','Social Stories Template Pack',           '10 editable social story templates covering daily routines, transitions, social skills, and more.',                 '12.99', 'Template') },
    ] },
  },
]

// ── Product card ─────────────────────────────────────────────────────────────

function ProductCard({ product, isPlaceholder }: { product: ShopifyProduct; isPlaceholder?: boolean }) {
  const image    = getFirstImage(product)
  const variant  = getDefaultVariant(product)
  const discount = hasDiscount(product)
  const color    = '#5BC4F8'

  const imageEl = image ? (
    <Image
      src={image.url}
      alt={image.altText ?? product.title}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-500"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: color + '0F' }}>
      <svg className="w-16 h-16" style={{ color: color + '60' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    </div>
  )

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-100 hover:shadow-xl hover:shadow-stone-200/50 hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full">
      {/* Image */}
      <div className="relative overflow-hidden bg-stone-50 aspect-[4/3]">
        {isPlaceholder ? (
          <div className="relative w-full h-full">
            {imageEl}
            <span className="absolute top-2 left-2 text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
              Preview
            </span>
          </div>
        ) : (
          <Link href={`/products/${product.handle}`} className="block relative w-full h-full">
            {imageEl}
            {discount && (
              <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: '#2EBB50' }}>Sale</span>
            )}
            {product.tags.includes('bestseller') && (
              <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: '#5BC4F8' }}>Bestseller</span>
            )}
          </Link>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {product.productType && (
          <p className="text-[10.5px] font-bold tracking-[0.1em] uppercase mb-2" style={{ color }}>
            {product.productType}
          </p>
        )}

        {isPlaceholder ? (
          <div className="flex-1">
            <h3 className="text-[14.5px] font-bold text-navy-900 leading-snug mb-2">{product.title}</h3>
            {product.description && (
              <p className="text-[12.5px] text-navy-800/50 leading-relaxed line-clamp-2">{product.description}</p>
            )}
          </div>
        ) : (
          <Link href={`/products/${product.handle}`} className="group/title flex-1">
            <h3 className="text-[14.5px] font-bold text-navy-900 leading-snug group-hover/title:text-sky-600 transition-colors mb-2">
              {product.title}
            </h3>
            {product.description && (
              <p className="text-[12.5px] text-navy-800/50 leading-relaxed line-clamp-2">{product.description}</p>
            )}
          </Link>
        )}

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
          <div>
            <p className="text-[16px] font-bold text-navy-900">
              {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
            </p>
            {discount && (
              <p className="text-[12px] text-navy-800/35 line-through">
                {formatPrice(product.compareAtPriceRange.minVariantPrice.amount)}
              </p>
            )}
          </div>
          {isPlaceholder ? (
            <button disabled className="px-4 py-2 rounded-xl text-[12px] font-semibold text-navy-800/30 bg-stone-100 border border-stone-200 cursor-not-allowed">
              Coming Soon
            </button>
          ) : (
            variant && (
              <AddToCartButton
                variantId={variant.id}
                available={variant.availableForSale}
                size="sm"
              />
            )
          )}
        </div>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function ShopPage() {
  const configured  = isShopifyConfigured()
  const live        = await getAllCollections()
  const collections = live.length > 0 ? live : (configured ? [] : PLACEHOLDER_COLLECTIONS)
  const isPlaceholder = !configured || live.length === 0 && !configured

  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section style={{ backgroundColor: WARM_BG }} className="pt-28 pb-14 lg:pt-36 lg:pb-20 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-6 h-px" style={{ backgroundColor: '#FFE030' }} />
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-navy-700/45">Light2Minds Shop</p>
            </div>
            <h1 className="text-[clamp(2.2rem,5vw,3.8rem)] font-bold text-navy-900 leading-[1.04] tracking-[-0.03em] mb-5">
              Resources built by<br />behavioral health professionals.
            </h1>
            <p className="text-[16px] text-navy-800/55 leading-relaxed max-w-xl mb-7">
              Every guide, toolkit, and study material is developed by credentialed ABA professionals and ready to use the moment you download.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Instant Download', color: '#5BC4F8' },
                { label: 'BCBA-Reviewed',    color: '#2EBB50' },
                { label: '7-Day Guarantee',  color: '#FFE030' },
                { label: 'Secure Checkout',  color: '#5BC4F8' },
              ].map(b => (
                <span key={b.label} className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: b.color + '15', color: b.color === '#FFE030' ? '#9A7A00' : b.color }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: b.color === '#FFE030' ? '#C4A800' : b.color }} />
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Setup notice ── */}
      {!configured && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-start gap-3">
            <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="8" cy="8" r="6" /><path d="M8 5v3M8 10v.5" /></svg>
            <p className="text-[13px] text-amber-800 leading-relaxed">
              <strong>Preview mode.</strong> Add your <code className="bg-amber-100 px-1 rounded text-[12px]">NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN</code> to <code className="bg-amber-100 px-1 rounded text-[12px]">.env.local</code> to load real products. See setup instructions in that file.
            </p>
          </div>
        </div>
      )}

      {/* ── Collections ── */}
      {collections.length > 0 ? (
        <div>
          {collections.map((col, ci) => {
            if (!col) return null
            const meta     = COLLECTION_META[col.handle] ?? { label: col.title, color: '#5BC4F8', desc: col.description }
            const products = col.products.edges.map(e => e.node)
            if (products.length === 0) return null
            const isEven   = ci % 2 === 0

            return (
              <section
                key={col.id}
                id={col.handle}
                className="py-14 lg:py-20 border-t border-stone-200/50"
                style={{ backgroundColor: isEven ? '#ffffff' : WARM_BG }}
              >
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-5 h-px flex-shrink-0" style={{ backgroundColor: meta.color }} />
                        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase" style={{ color: meta.color === '#FFE030' ? '#9A7A00' : meta.color }}>
                          {meta.label}
                        </p>
                      </div>
                      <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
                        {col.title}
                      </h2>
                      {meta.desc && (
                        <p className="text-[14px] text-navy-800/45 leading-relaxed mt-2 max-w-md">{meta.desc}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {products.map(product => (
                      <ProductCard key={product.id} product={product} isPlaceholder={isPlaceholder} />
                    ))}
                  </div>
                </div>
              </section>
            )
          })}
        </div>
      ) : (
        <section className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-navy-900/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h2 className="text-[1.4rem] font-bold text-navy-900 mb-3">No products found</h2>
            <p className="text-[14px] text-navy-800/40 max-w-md mx-auto">
              Add products to the <strong>families</strong>, <strong>professionals</strong>, and <strong>downloads</strong> collections in your Shopify store.
            </p>
          </div>
        </section>
      )}

      {/* ── Expert CTA ── */}
      <section className="py-14 lg:py-20 border-t border-stone-200/50" style={{ backgroundColor: '#0D1B2E' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.30)' }}>
                Not sure where to start?
              </p>
              <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-bold text-white tracking-[-0.025em] leading-[1.15] mb-3">
                Tell us about your situation.
              </h2>
              <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Our behavioral health team can point you toward the right resources — no sales pitch, just guidance.
              </p>
            </div>
            <a
              href="mailto:info@light2minds.com"
              className="inline-flex items-center justify-center gap-2 text-[13.5px] font-bold text-navy-900 px-7 py-4 rounded-full flex-shrink-0 transition-all hover:translate-y-[-1px]"
              style={{ backgroundColor: '#FFE030', boxShadow: '0 4px 0 #C4A800' }}
            >
              Contact Our Team
              <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
