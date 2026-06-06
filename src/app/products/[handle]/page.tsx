'use client'

import { useState, useEffect } from 'react'
import { useParams, notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProduct, formatPrice, ShopifyProduct, ShopifyVariant } from '@/lib/shopify'
import AddToCartButton from '@/components/shop/AddToCartButton'

const WARM_BG = '#F8F5EF'

export default function ProductPage() {
  const params  = useParams<{ handle: string }>()
  const handle  = params?.handle ?? ''

  const [product,  setProduct]  = useState<ShopifyProduct | null | undefined>(undefined)
  const [selected, setSelected] = useState<ShopifyVariant | null>(null)
  const [imgIdx,   setImgIdx]   = useState(0)

  useEffect(() => {
    if (!handle) return
    getProduct(handle).then(p => {
      setProduct(p)
      if (p) setSelected(p.variants.edges[0]?.node ?? null)
    })
  }, [handle])

  if (product === undefined) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: WARM_BG }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-sky-400/30 border-t-sky-400 animate-spin" />
          <p className="text-[13px] text-navy-800/40">Loading product…</p>
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: WARM_BG }}>
        <div className="text-center">
          <p className="text-[15px] text-navy-800/40 mb-4">Product not found.</p>
          <Link href="/shop" className="text-[13px] font-semibold text-navy-900 underline underline-offset-2">Back to Shop</Link>
        </div>
      </main>
    )
  }

  const images   = product.images.edges.map(e => e.node)
  const variants = product.variants.edges.map(e => e.node)
  const hasOptions = variants.length > 1 && variants[0].title !== 'Default Title'
  const price    = selected?.price ?? product.priceRange.minVariantPrice
  const compare  = selected?.compareAtPrice ?? product.compareAtPriceRange.minVariantPrice
  const discount = parseFloat(compare.amount) > parseFloat(price.amount)

  return (
    <main className="min-h-screen" style={{ backgroundColor: WARM_BG }}>

      {/* Breadcrumb */}
      <div className="border-b border-stone-200/60 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 flex items-center gap-2 text-[12px] text-navy-800/40">
          <Link href="/shop" className="hover:text-navy-900 transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-navy-900/60">{product.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* ── Images ── */}
          <div className="space-y-3">
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden bg-white border border-stone-200/60 aspect-square">
              {images.length > 0 ? (
                <Image
                  src={images[imgIdx]?.url ?? images[0].url}
                  alt={images[imgIdx]?.altText ?? product.title}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-24 h-24 text-navy-900/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
              )}
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${i === imgIdx ? 'border-sky-400' : 'border-stone-200 opacity-60 hover:opacity-100'}`}
                  >
                    <Image src={img.url} alt={img.altText ?? ''} fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Details (sticky on desktop) ── */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-6">

            {/* Type + title */}
            {product.productType && (
              <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-sky-500">{product.productType}</p>
            )}
            <h1 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <p className="text-[28px] font-bold text-navy-900">
                {formatPrice(price.amount, price.currencyCode)}
              </p>
              {discount && (
                <p className="text-[16px] text-navy-800/35 line-through">
                  {formatPrice(compare.amount, compare.currencyCode)}
                </p>
              )}
              {discount && (
                <span className="text-[12px] font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: '#2EBB50' }}>
                  Save {Math.round((1 - parseFloat(price.amount) / parseFloat(compare.amount)) * 100)}%
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-[14.5px] text-navy-800/60 leading-relaxed">{product.description}</p>
            )}

            {/* Variant selector */}
            {hasOptions && (
              <div>
                <p className="text-[12px] font-semibold text-navy-800/55 mb-2.5 tracking-[0.04em]">
                  {variants[0].selectedOptions[0]?.name ?? 'Option'}:
                  <span className="text-navy-900 ml-1">{selected?.title}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {variants.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setSelected(v)}
                      disabled={!v.availableForSale}
                      className={[
                        'px-4 py-2 rounded-xl text-[13px] font-semibold border transition-all',
                        selected?.id === v.id
                          ? 'border-sky-400 bg-sky-50 text-sky-700'
                          : 'border-stone-200 bg-white text-navy-800/70 hover:border-navy-400',
                        !v.availableForSale ? 'opacity-40 cursor-not-allowed line-through' : '',
                      ].join(' ')}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            {selected && (
              <AddToCartButton
                variantId={selected.id}
                available={selected.availableForSale && product.availableForSale}
                label="Add to Cart"
                size="lg"
                fullWidth
              />
            )}

            {/* Trust */}
            <div className="space-y-2.5 pt-2">
              {[
                { icon: '⚡', text: 'Instant digital download after purchase' },
                { icon: '🔒', text: 'Secure checkout — 256-bit SSL' },
                { icon: '↩', text: '7-day satisfaction guarantee' },
              ].map(t => (
                <div key={t.text} className="flex items-center gap-2.5 text-[12.5px] text-navy-800/45">
                  <span>{t.icon}</span>
                  {t.text}
                </div>
              ))}
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {product.tags.map(tag => (
                  <span key={tag} className="text-[11px] text-navy-800/35 bg-stone-100 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Long description HTML ── */}
        {product.descriptionHtml && product.descriptionHtml !== `<p>${product.description}</p>` && (
          <div className="mt-16 max-w-3xl">
            <h2 className="text-[1.2rem] font-bold text-navy-900 mb-6">Product Details</h2>
            <div
              className="prose prose-sm prose-navy max-w-none text-navy-800/65 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>
        )}

        {/* Back */}
        <div className="mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy-800/45 hover:text-navy-900 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 7H2M6 3L2 7l4 4" /></svg>
            Back to Shop
          </Link>
        </div>
      </div>
    </main>
  )
}
