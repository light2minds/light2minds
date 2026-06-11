/**
 * Shopify Storefront API — Headless Client
 * Store: light-2-minds.myshopify.com
 * API Version: 2024-01
 */

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? 'light-2-minds.myshopify.com'
const TOKEN  = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? ''
const API    = `https://${DOMAIN}/api/2024-01/graphql.json`

// ── Core fetch ───────────────────────────────────────────────────────────────

async function shopify<T>(
  query: string,
  variables?: Record<string, unknown>,
  opts?: { cache?: RequestCache; revalidate?: number }
): Promise<T> {
  const res = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    ...(opts?.revalidate != null
      ? { next: { revalidate: opts.revalidate } }
      : opts?.cache
      ? { cache: opts.cache }
      : { next: { revalidate: 60 } }),
  })

  if (!res.ok) throw new Error(`Shopify ${res.status}: ${res.statusText}`)
  const { data, errors } = await res.json()
  if (errors?.length) throw new Error(errors[0].message)
  return data as T
}

// ── Types ────────────────────────────────────────────────────────────────────

export type Money = { amount: string; currencyCode: string }
export type ShopifyImage = { url: string; altText: string | null }

export type ShopifyVariant = {
  id: string
  title: string
  availableForSale: boolean
  price: Money
  compareAtPrice: Money | null
  selectedOptions: { name: string; value: string }[]
}

export type ShopifyProduct = {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  availableForSale: boolean
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money }
  compareAtPriceRange: { minVariantPrice: Money }
  images: { edges: { node: ShopifyImage }[] }
  variants: { edges: { node: ShopifyVariant }[] }
  tags: string[]
  productType: string
}

export type ShopifyCollection = {
  id: string
  handle: string
  title: string
  description: string
  products: { edges: { node: ShopifyProduct }[] }
}

export type CartLine = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: Money
    product: {
      id: string
      title: string
      handle: string
      images: { edges: { node: ShopifyImage }[] }
    }
  }
}

export type ShopifyCart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    subtotalAmount: Money
    totalTaxAmount: Money | null
    totalAmount: Money
  }
  lines: { edges: { node: CartLine }[] }
}

// ── GraphQL fragments ────────────────────────────────────────────────────────

const PRODUCT_FIELDS = `
  id handle title description descriptionHtml availableForSale
  priceRange {
    minVariantPrice { amount currencyCode }
    maxVariantPrice { amount currencyCode }
  }
  compareAtPriceRange { minVariantPrice { amount currencyCode } }
  images(first: 5) { edges { node { url altText } } }
  variants(first: 20) {
    edges {
      node {
        id title availableForSale
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        selectedOptions { name value }
      }
    }
  }
  tags productType
`

const CART_FIELDS = `
  id checkoutUrl totalQuantity
  cost {
    subtotalAmount { amount currencyCode }
    totalTaxAmount  { amount currencyCode }
    totalAmount     { amount currencyCode }
  }
  lines(first: 100) {
    edges {
      node {
        id quantity
        merchandise {
          ... on ProductVariant {
            id title
            price { amount currencyCode }
            product {
              id title handle
              images(first: 1) { edges { node { url altText } } }
            }
          }
        }
      }
    }
  }
`

// ── Collections ──────────────────────────────────────────────────────────────

export async function getCollection(
  handle: string,
  first = 24
): Promise<ShopifyCollection | null> {
  try {
    const data = await shopify<{ collection: ShopifyCollection | null }>(
      `query getCollection($handle: String!, $first: Int!) {
        collection(handle: $handle) {
          id handle title description
          products(first: $first, sortKey: MANUAL) {
            edges { node { ${PRODUCT_FIELDS} } }
          }
        }
      }`,
      { handle, first },
      { revalidate: 60 }
    )
    return data.collection
  } catch {
    return null
  }
}

export async function getAllCollections(): Promise<ShopifyCollection[]> {
  const [families, professionals, downloads] = await Promise.allSettled([
    getCollection('families'),
    getCollection('professionals'),
    getCollection('downloads'),
  ])
  return [families, professionals, downloads]
    .map(r => (r.status === 'fulfilled' ? r.value : null))
    .filter(Boolean) as ShopifyCollection[]
}

// Candidate collection handles for Consultation & Professional Services,
// ordered by most-likely match first.
const CONSULTATION_HANDLES = [
  'consultation-professional-services',
  'consultation-and-professional-services',
  'services',
  'consultation-services',
  'professional-services',
  'consultations',
]

export async function getProductsByQuery(
  queryString: string,
  first = 50
): Promise<ShopifyProduct[]> {
  try {
    const data = await shopify<{ products: { edges: { node: ShopifyProduct }[] } }>(
      `query getProductsByQuery($query: String!, $first: Int!) {
        products(first: $first, query: $query) {
          edges { node { ${PRODUCT_FIELDS} } }
        }
      }`,
      { query: queryString, first },
      { revalidate: 60 }
    )
    return data.products.edges.map(e => e.node)
  } catch {
    return []
  }
}

// Tries every known collection handle in parallel, returns the first non-empty
// result. Falls back to a broad product-type / tag query so new products added
// under ANY of those handles (or tagged "consultation") appear automatically.
export async function getConsultationProducts(first = 50): Promise<ShopifyProduct[]> {
  const results = await Promise.allSettled(
    CONSULTATION_HANDLES.map(h => getCollection(h, first))
  )

  for (const result of results) {
    if (result.status === 'fulfilled' && result.value?.products.edges.length) {
      return result.value.products.edges.map(e => e.node)
    }
  }

  // Fallback: search directly by product type or tag
  return getProductsByQuery(
    'product_type:Consultation OR product_type:Assessment OR product_type:Mentorship ' +
    'OR product_type:Service OR product_type:Coaching OR product_type:Professional Services ' +
    'OR tag:consultation OR tag:services OR tag:professional-services',
    first
  )
}

// ── Products ─────────────────────────────────────────────────────────────────

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  try {
    const data = await shopify<{ product: ShopifyProduct | null }>(
      `query getProduct($handle: String!) {
        product(handle: $handle) { ${PRODUCT_FIELDS} }
      }`,
      { handle },
      { revalidate: 60 }
    )
    return data.product
  } catch {
    return null
  }
}

export async function getProductHandles(): Promise<string[]> {
  try {
    const data = await shopify<{ products: { edges: { node: { handle: string } }[] } }>(
      `query getAllHandles {
        products(first: 250) { edges { node { handle } } }
      }`,
      {},
      { revalidate: 3600 }
    )
    return data.products.edges.map(e => e.node.handle)
  } catch {
    return []
  }
}

// ── Cart ─────────────────────────────────────────────────────────────────────

export async function cartCreate(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  const data = await shopify<{ cartCreate: { cart: ShopifyCart; userErrors: { message: string }[] } }>(
    `mutation cartCreate($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }`,
    { lines },
    { cache: 'no-store' }
  )
  if (data.cartCreate.userErrors.length) throw new Error(data.cartCreate.userErrors[0].message)
  return data.cartCreate.cart
}

export async function cartLinesAdd(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  const data = await shopify<{ cartLinesAdd: { cart: ShopifyCart } }>(
    `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
      }
    }`,
    { cartId, lines },
    { cache: 'no-store' }
  )
  return data.cartLinesAdd.cart
}

export async function cartLinesRemove(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const data = await shopify<{ cartLinesRemove: { cart: ShopifyCart } }>(
    `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FIELDS} }
      }
    }`,
    { cartId, lineIds },
    { cache: 'no-store' }
  )
  return data.cartLinesRemove.cart
}

export async function cartLinesUpdate(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<ShopifyCart> {
  const data = await shopify<{ cartLinesUpdate: { cart: ShopifyCart } }>(
    `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
      }
    }`,
    { cartId, lines },
    { cache: 'no-store' }
  )
  return data.cartLinesUpdate.cart
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  try {
    const data = await shopify<{ cart: ShopifyCart | null }>(
      `query getCart($cartId: ID!) {
        cart(id: $cartId) { ${CART_FIELDS} }
      }`,
      { cartId },
      { cache: 'no-store' }
    )
    return data.cart
  } catch {
    return null
  }
}

// ── Configuration ────────────────────────────────────────────────────────────

// The store domain is always set (hardcoded fallback), and the Storefront API
// for this store works without an access token, so we check the domain only.
export function isShopifyConfigured(): boolean {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? DOMAIN
  return !!domain && !domain.includes('your-store')
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function formatPrice(amount: string, currencyCode = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount))
}

export function getFirstImage(product: ShopifyProduct): ShopifyImage | null {
  return product.images.edges[0]?.node ?? null
}

export function getDefaultVariant(product: ShopifyProduct): ShopifyVariant | null {
  return product.variants.edges[0]?.node ?? null
}

export function hasDiscount(product: ShopifyProduct): boolean {
  const compare = product.compareAtPriceRange.minVariantPrice.amount
  const price   = product.priceRange.minVariantPrice.amount
  return parseFloat(compare) > parseFloat(price)
}
