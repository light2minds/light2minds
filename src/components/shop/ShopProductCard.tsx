'use client'

import Image from 'next/image'
import Link from 'next/link'
import { formatPrice, getFirstImage, getDefaultVariant, ShopifyProduct } from '@/lib/shopify'
import AddToCartButton from '@/components/shop/AddToCartButton'

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
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

function BoxSvg({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect x="1" y="3" width="22" height="5" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  )
}

export default function ShopProductCard({
  product,
  accentBar,
  accentText,
  isPlaceholder,
}: {
  product: ShopifyProduct
  accentBar: string
  accentText: string
  isPlaceholder?: boolean
}) {
  const image          = getFirstImage(product)
  const defaultVariant = getDefaultVariant(product)
  const blurb          = BLURBS[product.handle] ?? product.description
  const price          = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode,
  )
  const isKit = ['kit', 'box'].some(k => product.productType.toLowerCase().includes(k))

  return (
    <div className="bg-white border border-stone-200/70 rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-0.5 hover:shadow-md hover:shadow-stone-200/60 transition-all duration-200">
      <div className="h-[3px] w-full" style={{ backgroundColor: accentBar }} />

      {/* Image */}
      <div className="relative aspect-[4/3] bg-stone-50 overflow-hidden">
        {image ? (
          <Link href={`/products/${product.handle}`} className="absolute inset-0 block">
            <Image
              src={image.url}
              alt={image.altText ?? product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </Link>
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: accentBar + '0A' }}>
            {isKit ? <BoxSvg color={accentText} /> : <BookSvg color={accentText} />}
          </div>
        )}
        {isPlaceholder && (
          <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
            Preview
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {product.productType && (
          <span
            className="text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full inline-block mb-3 self-start"
            style={{ backgroundColor: accentBar + '14', color: accentText }}
          >
            {product.productType}
          </span>
        )}
        <h3 className="text-[14px] font-semibold text-navy-900 leading-snug mb-1.5">{product.title}</h3>
        {blurb && (
          <p className="text-[12.5px] text-navy-800/50 leading-relaxed line-clamp-2 flex-1 mb-4">{blurb}</p>
        )}

        <div className="pt-3.5 border-t border-stone-100 mt-auto">
          <p className="text-[16px] font-bold text-navy-900 mb-3">{price}</p>
          {isPlaceholder ? (
            <span className="text-[12px] text-navy-800/30 font-medium">Coming soon</span>
          ) : defaultVariant ? (
            <AddToCartButton
              variantId={defaultVariant.id}
              available={defaultVariant.availableForSale && product.availableForSale}
              size="sm"
              fullWidth
            />
          ) : (
            <Link
              href={`/products/${product.handle}`}
              className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold"
              style={{ color: accentText }}
            >
              View Product <ArrowRight />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
