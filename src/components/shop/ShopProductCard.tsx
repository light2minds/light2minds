'use client'

import Image from 'next/image'
import Link from 'next/link'
import { formatPrice, getFirstImage, getDefaultVariant, ShopifyProduct } from '@/lib/shopify'
import BuyNowButton from '@/components/shop/BuyNowButton'

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

function BookSvg({ color }: { color: string }) {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.35">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

function BoxSvg({ color }: { color: string }) {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.35">
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect x="1" y="3" width="22" height="5" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  )
}

export default function ShopProductCard({
  product,
  accentBar,
  accentText,
  isPlaceholder,
  buyLabel,
}: {
  product: ShopifyProduct
  accentBar: string
  accentText: string
  isPlaceholder?: boolean
  buyLabel?: string
}) {
  const image          = getFirstImage(product)
  const defaultVariant = getDefaultVariant(product)
  const blurb          = BLURBS[product.handle] ?? product.description
  const price          = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode,
  )
  const isKit        = ['kit', 'box'].some(k => product.productType.toLowerCase().includes(k))
  const isDigital    = ['guide', 'digital'].some(k => product.productType.toLowerCase().includes(k))
  const resolvedLabel = buyLabel ?? (isDigital ? 'Buy Digital Guide' : 'Buy Now')
  const available = !!(defaultVariant?.availableForSale && product.availableForSale)

  return (
    <div className="bg-white border border-stone-200/60 rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-0.5 hover:shadow-lg hover:shadow-stone-200/70 transition-all duration-200">
      <div className="h-[3px] w-full" style={{ backgroundColor: accentBar }} />

      {/* Image — links to product page */}
      <Link href={`/products/${product.handle}`} className="relative block aspect-square bg-stone-50 overflow-hidden">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: accentBar + '0C' }}>
            {isKit ? <BoxSvg color={accentText} /> : <BookSvg color={accentText} />}
          </div>
        )}
        {isPlaceholder && (
          <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
            Preview
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {product.productType && (
          <span
            className="text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full inline-block mb-2 self-start"
            style={{ backgroundColor: accentBar + '14', color: accentText }}
          >
            {product.productType}
          </span>
        )}

        <h3 className="text-[13.5px] font-semibold text-navy-900 leading-snug mb-1.5">
          {product.title}
        </h3>

        {blurb && (
          <p className="text-[12px] text-navy-800/50 leading-relaxed line-clamp-2 flex-1 mb-3">
            {blurb}
          </p>
        )}

        {/* Price + actions */}
        <div className="mt-auto pt-3 border-t border-stone-100 space-y-2">
          <p className="text-[17px] font-bold text-navy-900">{price}</p>

          {isPlaceholder ? (
            <button disabled className="w-full py-3 rounded-xl text-[13px] font-medium text-navy-800/30 bg-stone-100 border border-stone-200 cursor-not-allowed">
              Preview Only
            </button>
          ) : (
            <BuyNowButton
              variantId={defaultVariant?.id ?? ''}
              available={available}
              label={resolvedLabel}
            />
          )}

          <Link
            href={`/products/${product.handle}`}
            className="block text-center text-[11.5px] font-medium text-navy-800/40 hover:text-navy-800 transition-colors pt-0.5"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
