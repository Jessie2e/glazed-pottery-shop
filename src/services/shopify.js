const domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

const endpoint = `https://${domain}/api/2026-07/graphql.json`;

async function shopifyFetch(query, variables = {}) {
  if (!domain || !token) {
    throw new Error(
      'Shopify is not configured. Check VITE_SHOPIFY_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN.',
    );
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await response.json();

  if (!response.ok || json.errors) {
    console.error('Shopify API error:', json.errors || json);

    throw new Error(
      json.errors?.[0]?.message || 'Unable to communicate with Shopify.',
    );
  }

  return json.data;
}

function checkCartErrors(payload) {
  if (payload?.userErrors?.length) {
    console.error('Shopify cart error:', payload.userErrors);

    throw new Error(
      payload.userErrors[0]?.message || 'Unable to update the cart.',
    );
  }

  return payload.cart;
}

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity

  cost {
    subtotalAmount {
      amount
      currencyCode
    }

    totalAmount {
      amount
      currencyCode
    }
  }

  lines(first: 100) {
    nodes {
      id
      quantity

      cost {
        totalAmount {
          amount
          currencyCode
        }
      }

      merchandise {
        ... on ProductVariant {
          id
          title
          availableForSale

          price {
            amount
            currencyCode
          }

          image {
            url
            altText
          }

          product {
            id
            handle
            title

            featuredImage {
              url
              altText
            }
          }
        }
      }
    }
  }
`;

export async function fetchProducts(first = 40) {
  const query = `
    query Products($first: Int!) {
      products(first: $first) {
        nodes {
          id
          handle
          title
          productType
          description
          availableForSale
          tags

          featuredImage {
            url
            altText
          }

          images(first: 5) {
            nodes {
              url
              altText
            }
          }

          variants(first: 20) {
            nodes {
              id
              title
              availableForSale
              quantityAvailable

              price {
                amount
                currencyCode
              }

              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch(query, { first });

  return data.products.nodes;
}

export async function createCart(variantId, quantity = 1) {
  const mutation = `
    mutation CreateCart($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          ${CART_FIELDS}
        }

        userErrors {
          field
          message
        }

        warnings {
          code
          message
        }
      }
    }
  `;

  const data = await shopifyFetch(mutation, {
    input: {
      lines: [
        {
          merchandiseId: variantId,
          quantity,
        },
      ],
    },
  });

  return checkCartErrors(data.cartCreate);
}

export async function addCartLine(
  cartId,
  variantId,
  quantity = 1,
) {
  const mutation = `
    mutation AddCartLine(
      $cartId: ID!
      $lines: [CartLineInput!]!
    ) {
      cartLinesAdd(
        cartId: $cartId
        lines: $lines
      ) {
        cart {
          ${CART_FIELDS}
        }

        userErrors {
          field
          message
        }

        warnings {
          code
          message
        }
      }
    }
  `;

  const data = await shopifyFetch(mutation, {
    cartId,
    lines: [
      {
        merchandiseId: variantId,
        quantity,
      },
    ],
  });

  return checkCartErrors(data.cartLinesAdd);
}

export async function updateCartLine(
  cartId,
  lineId,
  quantity,
) {
  const mutation = `
    mutation UpdateCartLine(
      $cartId: ID!
      $lines: [CartLineUpdateInput!]!
    ) {
      cartLinesUpdate(
        cartId: $cartId
        lines: $lines
      ) {
        cart {
          ${CART_FIELDS}
        }

        userErrors {
          field
          message
        }

        warnings {
          code
          message
        }
      }
    }
  `;

  const data = await shopifyFetch(mutation, {
    cartId,
    lines: [
      {
        id: lineId,
        quantity,
      },
    ],
  });

  return checkCartErrors(data.cartLinesUpdate);
}

export async function removeCartLine(cartId, lineId) {
  const mutation = `
    mutation RemoveCartLine(
      $cartId: ID!
      $lineIds: [ID!]!
    ) {
      cartLinesRemove(
        cartId: $cartId
        lineIds: $lineIds
      ) {
        cart {
          ${CART_FIELDS}
        }

        userErrors {
          field
          message
        }

        warnings {
          code
          message
        }
      }
    }
  `;

  const data = await shopifyFetch(mutation, {
    cartId,
    lineIds: [lineId],
  });

  return checkCartErrors(data.cartLinesRemove);
}

export async function getCart(cartId) {
  const query = `
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        ${CART_FIELDS}
      }
    }
  `;

  const data = await shopifyFetch(query, {
    cartId,
  });

  return data.cart;
}