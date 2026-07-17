import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getProduct, getFirstImage } from '@/lib/shopify'
import ProductDetails from '@/components/shop/ProductDetails'
import ShopBreadcrumbLabel from '@/components/shop/ShopBreadcrumbLabel'

export const revalidate = 60
export const dynamicParams = true

type Props = { params: Promise<{ handle: string }> }

async function resolveProduct(raw: string) {
  const product = await getProduct(raw)
  if (product) return product
  // Fallback: handle may arrive still percent-encoded from some routing layers
  try {
    const decoded = decodeURIComponent(raw)
    if (decoded !== raw) return getProduct(decoded)
  } catch {}
  return null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const product = await resolveProduct(handle)
  if (!product) return { title: 'Product Not Found' }
  const image = getFirstImage(product)
  return {
    title: product.title,
    description: product.description,
    openGraph: image ? { images: [{ url: image.url, alt: product.title }] } : undefined,
  }
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params
  const product = await resolveProduct(handle)
  if (!product) notFound()

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F8F5EF' }}>
      <div className="border-b border-stone-200/60 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 flex items-center gap-2 text-[12px] text-navy-800/40">
          <Link href="/shop" className="hover:text-navy-900 transition-colors"><ShopBreadcrumbLabel /></Link>
          <span>/</span>
          <span className="text-navy-900/60">{product.title}</span>
        </div>
      </div>
      <ProductDetails product={product} />
    </main>
  )
}
