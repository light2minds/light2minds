/**
 * Shopify Storefront API Client
 *
 * To activate:
 * 1. Create a Shopify store at mystore.myshopify.com
 * 2. Install the "Headless" sales channel app
 * 3. Generate a Storefront API access token (public)
 * 4. Add to .env.local:
 *    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=mystore.myshopify.com
 *    NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your_token_here
 * 5. Replace the stub functions below with real API calls
 */

const DOMAIN  = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN  ?? ''
const TOKEN   = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? ''
const API_URL = `https://${DOMAIN}/api/2024-01/graphql.json`

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })
  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`)
  const json = await res.json()
  if (json.errors) throw new Error(json.errors[0].message)
  return json.data as T
}

// ── Cart operations ──────────────────────────────────────────────────────────

export async function createCart() {
  const query = `
    mutation cartCreate {
      cartCreate {
        cart { id checkoutUrl }
        userErrors { field message }
      }
    }
  `
  const data = await shopifyFetch<{ cartCreate: { cart: { id: string; checkoutUrl: string } } }>(query)
  return data.cartCreate.cart
}

export async function addToCart(cartId: string, variantId: string, quantity: number) {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { id totalQuantity cost { totalAmount { amount currencyCode } } }
        userErrors { field message }
      }
    }
  `
  return shopifyFetch(query, { cartId, lines: [{ merchandiseId: variantId, quantity }] })
}

export async function removeFromCart(cartId: string, lineId: string) {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { id }
        userErrors { field message }
      }
    }
  `
  return shopifyFetch(query, { cartId, lineIds: [lineId] })
}

// ── Checkout ─────────────────────────────────────────────────────────────────

/**
 * Creates a Shopify checkout and returns the checkout URL.
 * For a fully custom checkout experience, use Draft Orders API (admin)
 * or integrate Shopify's checkout.js for embedded payments.
 *
 * For digital-only products, a webhook on order creation can trigger
 * the download email via your email service (Klaviyo, Mailchimp, etc.)
 */
export async function createCheckout(
  lineItems: { variantId: string; quantity: number }[],
  email: string
) {
  const query = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout { id webUrl totalPriceV2 { amount currencyCode } }
        checkoutUserErrors { field message }
      }
    }
  `
  return shopifyFetch(query, {
    input: {
      email,
      lineItems,
      allowPartialAddresses: true,
    },
  })
}

// ── Products ─────────────────────────────────────────────────────────────────

export async function getProducts(first = 20) {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id handle title descriptionHtml
            priceRange { minVariantPrice { amount currencyCode } }
            variants(first: 1) { edges { node { id } } }
            tags
          }
        }
      }
    }
  `
  return shopifyFetch(query, { first })
}
