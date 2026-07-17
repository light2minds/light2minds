'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice, ShopifyProduct, ShopifyVariant } from '@/lib/shopify'
import AddToCartButton from '@/components/shop/AddToCartButton'
import { useLang, type Lang } from '@/lib/language'

function ShareButton({ title, lang }: { title: string; lang: Lang }) {
  const share = () => {
    if (navigator.share) {
      navigator.share({ title, url: window.location.href }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert(lang === 'es' ? '¡Enlace copiado!' : 'Link copied!'))
        .catch(() => {})
    }
  }

  return (
    <button
      onClick={share}
      className="flex items-center gap-2 text-[12.5px] text-navy-800/40 hover:text-navy-800 transition-colors"
    >
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
      {lang === 'es' ? 'Compartir este producto' : 'Share this product'}
    </button>
  )
}

export default function ProductDetails({ product }: { product: ShopifyProduct }) {
  const { lang } = useLang()
  const [selected, setSelected] = useState<ShopifyVariant | null>(
    product.variants.edges[0]?.node ?? null
  )
  const [imgIdx, setImgIdx] = useState(0)

  const images   = product.images.edges.map(e => e.node)
  const variants = product.variants.edges.map(e => e.node)
  const hasOptions = variants.length > 1 && variants[0].title !== 'Default Title'
  const price    = selected?.price ?? product.priceRange.minVariantPrice
  const compare  = selected?.compareAtPrice ?? product.compareAtPriceRange.minVariantPrice
  const discount = parseFloat(compare.amount) > parseFloat(price.amount)

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

        {/* ── Images ── */}
        <div className="space-y-3">
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

        {/* ── Details ── */}
        <div className="lg:sticky lg:top-24 lg:self-start space-y-6">

          {product.productType && (
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-sky-500">{product.productType}</p>
          )}
          <h1 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold text-navy-900 tracking-[-0.025em] leading-[1.1]">
            {product.title}
          </h1>

          <div className="flex items-baseline gap-3">
            <p className="text-[28px] font-bold text-navy-900">
              {formatPrice(price.amount, price.currencyCode)}
            </p>
            {discount && (
              <>
                <p className="text-[16px] text-navy-800/35 line-through">
                  {formatPrice(compare.amount, compare.currencyCode)}
                </p>
                <span className="text-[12px] font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: '#2EBB50' }}>
                  {lang === 'es' ? 'Ahorra' : 'Save'} {Math.round((1 - parseFloat(price.amount) / parseFloat(compare.amount)) * 100)}%
                </span>
              </>
            )}
          </div>

          {product.descriptionHtml && (
            <div
              className="prose prose-sm max-w-none text-[14px] text-navy-800/65 leading-relaxed
                [&_p]:mb-3 [&_ul]:my-2 [&_ul]:pl-4 [&_li]:mb-1 [&_strong]:text-navy-900 [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          )}

          {hasOptions && (
            <div>
              <p className="text-[12px] font-semibold text-navy-800/55 mb-2.5 tracking-[0.04em]">
                {variants[0].selectedOptions[0]?.name ?? (lang === 'es' ? 'Opción' : 'Option')}:
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

          {selected && (
            <AddToCartButton
              variantId={selected.id}
              available={selected.availableForSale && product.availableForSale}
              label={lang === 'es' ? 'Añadir al Carrito' : 'Add to Cart'}
              size="lg"
              fullWidth
            />
          )}

          <ShareButton title={product.title} lang={lang} />

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

      <div className="mt-12">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy-800/45 hover:text-navy-900 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 7H2M6 3L2 7l4 4" /></svg>
          {lang === 'es' ? 'Volver a la Tienda' : 'Back to Shop'}
        </Link>
      </div>
    </div>
  )
}
