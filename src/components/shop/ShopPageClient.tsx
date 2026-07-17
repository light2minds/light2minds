'use client'

import Link from 'next/link'
import { ShopifyProduct } from '@/lib/shopify'
import ShopProductCard from '@/components/shop/ShopProductCard'
import { useLang } from '@/lib/language'

const WARM_BG   = '#F8F5EF'
const SKY       = '#5BC4F8'
const GOLD      = '#FFE030'
const GOLD_TEXT  = '#8A6A00'
const GREEN      = '#2EBB50'
const GREEN_TEXT = '#1A7A3C'

function EmptySection({ label, message }: { label: string; message?: string }) {
  const { lang } = useLang()
  return (
    <div className="text-center py-12 rounded-2xl border border-dashed border-stone-200">
      <p className="text-[14px] font-medium text-navy-800/40 mb-1">
        {message ?? (lang === 'es' ? `No se encontraron productos de ${label}` : `No ${label} products found`)}
      </p>
      {!message && (
        <p className="text-[13px] text-navy-800/30">
          {lang === 'es' ? <>Agrega productos a la colección <strong>{label}</strong> en tu tienda Shopify.</> : <>Add products to the <strong>{label}</strong> collection in your Shopify store.</>}
        </p>
      )}
    </div>
  )
}

export default function ShopPageClient({
  configured,
  isPlaceholder,
  famProducts,
  proProducts,
  svcProducts,
}: {
  configured: boolean
  isPlaceholder: boolean
  famProducts: ShopifyProduct[]
  proProducts: ShopifyProduct[]
  svcProducts: ShopifyProduct[]
}) {
  const { lang } = useLang()

  const whyItems = lang === 'es' ? [
    'Apoyo personalizado',
    'Recomendaciones basadas en evidencia',
    'Experiencia práctica del mundo real',
    'Citas virtuales flexibles',
    'Creado por profesionales certificados',
    'Metodología basada en evidencia',
    'Confiado por familias y clínicos',
    'Checkout seguro de Shopify',
  ] : [
    'Personalized support',
    'Evidence-based recommendations',
    'Practical real-world experience',
    'Flexible virtual appointments',
    'Created by certified professionals',
    'Evidence-based methodology',
    'Trusted by families and clinicians',
    'Secure Shopify checkout',
  ]

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
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-700/40 mb-2">{lang === 'es' ? 'Tienda' : 'Shop'}</p>
          <h1 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1] mb-1.5">
            {lang === 'es' ? 'Recursos Que Apoyan el Crecimiento' : 'Resources That Support Growth'}
          </h1>
          <p className="text-[13.5px] text-navy-800/45 mb-5">
            {lang === 'es'
              ? 'Kits, guías de estudio y servicios de expertos para familias y profesionales de la salud conductual.'
              : 'Kits, study guides, and expert services for families and behavioral health professionals.'}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="#families"
              className="inline-flex items-center gap-2 text-[13px] font-bold text-white px-5 py-2.5 rounded-full transition-all duration-150 hover:-translate-y-px"
              style={{ backgroundColor: SKY, boxShadow: '0 3px 0 #2A8FB8' }}
            >
              {lang === 'es' ? 'Recursos para Familias' : 'Family Resources'}
            </Link>
            <Link
              href="#professionals"
              className="inline-flex items-center gap-2 text-[13px] font-bold text-navy-900 px-5 py-2.5 rounded-full transition-all duration-150 hover:-translate-y-px"
              style={{ backgroundColor: GOLD, boxShadow: '0 3px 0 #C4A800' }}
            >
              {lang === 'es' ? 'Recursos Profesionales' : 'Professional Resources'}
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center gap-2 text-[13px] font-bold text-white px-5 py-2.5 rounded-full transition-all duration-150 hover:-translate-y-px"
              style={{ backgroundColor: GREEN, boxShadow: '0 3px 0 #1A7A3C' }}
            >
              {lang === 'es' ? 'Servicios de Consulta' : 'Consultation Services'}
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
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-1" style={{ color: SKY }}>{lang === 'es' ? 'Para Familias' : 'For Families'}</p>
            <h2 className="text-[clamp(1.2rem,2.5vw,1.6rem)] font-bold text-navy-900 tracking-[-0.02em] leading-[1.1]">
              {lang === 'es' ? 'Recursos para Familias' : 'Family Resources'}
            </h2>
            <p className="text-[13px] text-navy-800/45 mt-1">
              {lang === 'es'
                ? 'Kits sensoriales y herramientas para apoyar la regulación, la rutina y el desarrollo en casa.'
                : 'Sensory kits and tools to support regulation, routine, and development at home.'}
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
            <EmptySection label={lang === 'es' ? 'familia' : 'family'} />
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PROFESSIONAL RESOURCES
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="professionals" className="bg-stone-50 py-8 lg:py-12 border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-5">
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-1" style={{ color: GOLD_TEXT }}>{lang === 'es' ? 'Para Profesionales' : 'For Professionals'}</p>
            <h2 className="text-[clamp(1.2rem,2.5vw,1.6rem)] font-bold text-navy-900 tracking-[-0.02em] leading-[1.1]">
              {lang === 'es' ? 'Recursos Profesionales' : 'Professional Resources'}
            </h2>
            <p className="text-[13px] text-navy-800/45 mt-1">
              {lang === 'es'
                ? 'Guías de estudio y kits de inicio para RBTs, BCaBAs, BCBAs y terapeutas de conducta.'
                : 'Study guides and starter kits for RBTs, BCaBAs, BCBAs, and behavior therapists.'}
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
            <EmptySection label={lang === 'es' ? 'profesional' : 'professional'} />
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CONSULTATION & PROFESSIONAL SERVICES
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="services" className="bg-white py-8 lg:py-12 border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-5">
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-1" style={{ color: GREEN_TEXT }}>{lang === 'es' ? 'Servicios de Expertos' : 'Expert Services'}</p>
            <h2 className="text-[clamp(1.2rem,2.5vw,1.6rem)] font-bold text-navy-900 tracking-[-0.02em] leading-[1.1]">
              {lang === 'es' ? 'Consultas y Servicios Profesionales' : 'Consultation & Professional Services'}
            </h2>
            <p className="text-[13px] text-navy-800/45 mt-1">
              {lang === 'es'
                ? 'Sesiones individuales para familias y profesionales — reserva y paga directamente a través de nuestro checkout seguro.'
                : '1-on-1 sessions for families and professionals — book and pay directly through our secure checkout.'}
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
                  buyLabel={lang === 'es' ? 'Reservar Ahora' : 'Book Now'}
                />
              ))}
            </div>
          ) : (
            <EmptySection
              label={lang === 'es' ? 'servicios' : 'services'}
              message={lang === 'es'
                ? 'No hay productos de consulta o servicios profesionales disponibles en este momento.'
                : 'No consultation or professional service products are currently available.'}
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
            {lang === 'es' ? '¿Por Qué Trabajar con Light 2 Minds?' : 'Why Work With Light 2 Minds?'}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {whyItems.map(item => (
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
