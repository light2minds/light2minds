import {
  getAllCollections, getConsultationProducts, isShopifyConfigured,
  ShopifyProduct, ShopifyCollection,
} from '@/lib/shopify'
import ShopPageClient from '@/components/shop/ShopPageClient'

export const revalidate = 60

export const metadata = {
  title: 'Shop — Light 2 Minds',
  description: 'Practical tools, study guides, and curated kits designed for families and behavior professionals.',
}

// ── Placeholder data (shown when Shopify token is not yet configured) ─────────
const BLURBS: Record<string, string> = {
  'bcba-bcaba-study-guide':          'Comprehensive preparation for board certification.',
  'rbt-study-guide':                 'Everything you need to pass the RBT competency assessment.',
  'rbt-exam-study-guide-spanish':    'Guía completa en español para el examen de competencia RBT.',
  'professional-therapy-box™':       'Essential tools and resources for your first ABA sessions.',
  'sensory-travel-kit':              'Keep your child regulated and comfortable wherever you go.',
  'bedtime-regulation-box':          'Build a calming nighttime routine that works every night.',
  'calm-focus-box':                  'Sensory tools to help children regulate, focus, and thrive.',
  'book-a-family-consultation':      'Personalized guidance for your child\'s needs, behavior concerns, and next steps.',
  'book-professional-mentorship':    'One-on-one mentorship for RBTs and behavior professionals seeking clinical growth.',
  'rbt-competency-assessment':       'Schedule your RBT Initial or Renewal Competency Assessment with a qualified assessor.',
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
      { node: ph('ph-7', 'calm-focus-box',         'Calm & Focus Box',       '49.99', 'Kit') },
      { node: ph('ph-6', 'sensory-travel-kit',     'Sensory Travel Kit',     '59.99', 'Kit') },
    ] },
  },
  {
    id: 'ph-pro', handle: 'professionals', title: 'Professional Resources', description: '',
    products: { edges: [
      { node: ph('ph-1', 'bcba-bcaba-study-guide',    'BCBA / BCaBA Study Guide',           '149.99', 'Study Guide') },
      { node: ph('ph-4', 'professional-therapy-box™', 'Behavior Therapist Starter Kit™',   '79.99',  'Kit') },
      { node: ph('ph-2', 'rbt-study-guide',           'RBT Exam Study Guide (3rd Ed)',      '59.99',  'Study Guide') },
      { node: ph('ph-3', 'rbt-exam-study-guide-spanish', 'RBT Exam Study Guide (Spanish)', '59.99',  'Study Guide') },
    ] },
  },
]

const PLACEHOLDER_SERVICES: ShopifyProduct[] = [
  ph('ph-s1', 'book-a-family-consultation',   'Family Consultation',             '75.00', 'Consultation'),
  ph('ph-s2', 'book-professional-mentorship', 'Professional Mentorship Session', '85.00', 'Mentorship'),
  ph('ph-s3', 'rbt-competency-assessment',    'RBT Competency Assessment',       '99.00', 'Assessment'),
]

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
    <ShopPageClient
      configured={configured}
      isPlaceholder={isPlaceholder}
      famProducts={famProducts}
      proProducts={proProducts}
      svcProducts={svcProducts}
    />
  )
}
