/**
 * Shopify Storefront API placeholder.
 *
 * Production path:
 * 1. Create the Shopify store + products.
 * 2. Create a Storefront API access token.
 * 3. Add VITE_SHOPIFY_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN to .env.
 * 4. Replace the prototype product data with fetchProducts().
 *
 * Never place Shopify Admin API secrets in frontend code.
 */

const domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

export async function fetchProducts() {
  if (!domain || !token) {
    return null;
  }

  const query = `
    query Products {
      products(first: 40) {
        nodes {
          id
          handle
          title
          description
          featuredImage { url altText }
          images(first: 2) { nodes { url altText } }
          variants(first: 20) {
            nodes {
              id
              availableForSale
              quantityAvailable
              price { amount currencyCode }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(`https://${domain}/api/2026-07/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error('Unable to load Shopify products.');
  }

  return response.json();
}

export async function createCart() {
  // Wire to Shopify cartCreate/cartLinesAdd in production.
  throw new Error('Shopify cart is not connected yet.');
}
