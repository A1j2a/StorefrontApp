/**
 * Dynamic Shopify Storefront GraphQL Operations (API 2025-01).
 * Uses ONLY the public Storefront Access Token configured via .env.
 * Automatically executed when USE_LIVE_SHOPIFY=true and a token is provided.
 */

/**
 * Reusable Cart Fragment
 * Purpose: Cart ke common fields (id, checkoutUrl, totalQuantity, subtotal/total cost, aur line items with product variants)
 * ko reuse karne ke liye taki sabhi cart queries/mutations me consistent data structure mile.
 */
const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
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
    lines(first: 50) {
      edges {
        node {
          id
          quantity
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
              }
              product {
                id
                title
                featuredImage {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Get Products Query (Home / Collection Listing)
 * Purpose: Storefront ke products ki list fetch karne ke liye (supports limit/pagination aur optional search query).
 * Isse product title, featured image, price, tags, aur variants ki stock availability milti hai.
 */
export const GET_PRODUCTS_QUERY = /* GraphQL */ `
  query GetProducts($first: Int = 20, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          handle
          title
          productType
          description
          tags
          featuredImage {
            url
            altText
          }
          variants(first: 25) {
            edges {
              node {
                id
                title
                sku
                availableForSale
                price {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Get Product By Handle Query (Product Details Screen)
 * Purpose: Kisi specific product ka full detail fetch karne ke liye (using unique URL handle).
 * Isme full description, images, size/color options aur sabhi variants ka live availability & price fetch hota hai.
 */
export const GET_PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      productType
      description
      tags
      featuredImage {
        url
        altText
      }
      variants(first: 25) {
        edges {
          node {
            id
            title
            sku
            availableForSale
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

/**
 * Cart Create Mutation
 * Purpose: User jab pehli baar item cart me add karta hai tab naya Shopify Cart session create karta hai.
 * Response me cart ID aur live Shopify web checkoutUrl return karta hai.
 */
export const CART_CREATE_MUTATION = /* GraphQL */ `
  ${CART_FRAGMENT}
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/**
 * Cart Lines Add Mutation
 * Purpose: Existing Shopify Cart session me aur products / variants add karne ke liye.
 * Agar same variant already cart me hai toh quantity automatically update hoti hai.
 */
export const CART_LINES_ADD_MUTATION = /* GraphQL */ `
  ${CART_FRAGMENT}
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/**
 * Cart Lines Update Mutation
 * Purpose: Cart screen par kisi line item ki quantity ko increase ya decrease (+ / -) karne ke liye.
 */
export const CART_LINES_UPDATE_MUTATION = /* GraphQL */ `
  ${CART_FRAGMENT}
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/**
 * Cart Lines Remove Mutation
 * Purpose: Cart screen par "Remove" click karne par kisi specific item ko cart se completely delete karne ke liye.
 */
export const CART_LINES_REMOVE_MUTATION = /* GraphQL */ `
  ${CART_FRAGMENT}
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/**
 * Get Cart Query
 * Purpose: Saved cart ID se current cart state, line items, updated cost, aur checkoutUrl fetch karne ke liye (e.g. app restart ya pull-to-refresh par).
 */
export const GET_CART_QUERY = /* GraphQL */ `
  ${CART_FRAGMENT}
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFields
    }
  }
`;
