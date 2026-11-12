import { isLiveShopifyEnabled } from '../config/env';
import { getStoreConfig } from '../config/stores';
import { MOCK_PRODUCTS_BY_STORE } from '../data/mockCatalog';
import { Product, ProductVariant, StoreConfig, StoreId } from '../types';
import { executeStorefrontGraphQL } from './graphqlClient';
import {
  CART_CREATE_MUTATION,
  GET_PRODUCT_BY_HANDLE_QUERY,
  GET_PRODUCTS_QUERY,
} from './storefrontQueries';

export interface FetchProductsOptions {
  simulateError?: boolean;
  delayMs?: number;
  first?: number;
  searchQuery?: string;
}

interface ShopifyProductEdgeNode {
  id: string;
  handle: string;
  title: string;
  productType?: string;
  description?: string;
  tags?: string[];
  featuredImage?: { url?: string } | null;
  variants?: {
    edges?: Array<{
      node: {
        id: string;
        title: string;
        sku?: string | null;
        availableForSale: boolean;
        price: { amount: string };
        selectedOptions?: Array<{ name: string; value: string }>;
      };
    }>;
  };
}

interface GetProductsGQLResult {
  products: {
    edges: Array<{ node: ShopifyProductEdgeNode }>;
  };
}

interface GetProductByHandleGQLResult {
  productByHandle: ShopifyProductEdgeNode | null;
}

const wait = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(() => resolve(), ms));

const mapShopifyProduct = (
  node: ShopifyProductEdgeNode,
  storeId: StoreId,
): Product => {
  const variants: ProductVariant[] = (node.variants?.edges ?? []).map(
    ({ node: v }) => {
      const options = v.selectedOptions ?? [];
      const sizeOpt = options.find(
        o => o.name.toLowerCase() === 'size',
      )?.value;
      const colorOpt = options.find(
        o => o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'colour',
      )?.value;

      return {
        id: v.id,
        title: v.title,
        size: sizeOpt ?? v.title,
        color: colorOpt ?? 'Standard',
        price: Number.parseFloat(v.price.amount) || 0,
        availableForSale: Boolean(v.availableForSale),
        sku: v.sku || v.id.split('/').pop() || 'SKU',
      };
    },
  );

  return {
    id: node.id,
    storeId,
    handle: node.handle,
    title: node.title,
    category: node.productType || 'Collection',
    description: node.description || '',
    imageUrl: node.featuredImage?.url || '',
    badge: node.tags?.[0]?.toUpperCase(),
    variants,
  };
};

export const STOREFRONT_OPERATIONS = {
  getProducts: GET_PRODUCTS_QUERY,
  getProductByHandle: GET_PRODUCT_BY_HANDLE_QUERY,
  cartCreate: CART_CREATE_MUTATION,
} as const;

export const shopifyService = {
  async fetchProducts(
    storeId: StoreId,
    options: FetchProductsOptions = {},
  ): Promise<Product[]> {
    const {
      simulateError = false,
      delayMs = 280,
      first = 20,
      searchQuery,
    } = options;

    if (simulateError) {
      if (delayMs > 0) {
        await wait(delayMs);
      }
      throw new Error(
        'Unable to reach Shopify Storefront API. Please check your connection and try again.',
      );
    }

    if (isLiveShopifyEnabled(storeId)) {
      const storeConfig = getStoreConfig(storeId);
      const data = await executeStorefrontGraphQL<
        GetProductsGQLResult,
        { first: number; query?: string }
      >(storeConfig, GET_PRODUCTS_QUERY, {
        first,
        ...(searchQuery ? { query: searchQuery } : {}),
      });

      return data.products.edges.map(({ node }) =>
        mapShopifyProduct(node, storeId),
      );
    }

    if (delayMs > 0) {
      await wait(delayMs);
    }

    return MOCK_PRODUCTS_BY_STORE[storeId] ?? [];
  },

  async fetchProductByHandle(
    storeId: StoreId,
    handle: string,
  ): Promise<Product | null> {
    if (isLiveShopifyEnabled(storeId)) {
      const storeConfig = getStoreConfig(storeId);
      const data = await executeStorefrontGraphQL<
        GetProductByHandleGQLResult,
        { handle: string }
      >(storeConfig, GET_PRODUCT_BY_HANDLE_QUERY, { handle });

      return data.productByHandle
        ? mapShopifyProduct(data.productByHandle, storeId)
        : null;
    }

    const list = MOCK_PRODUCTS_BY_STORE[storeId] ?? [];
    return list.find(p => p.handle === handle) ?? null;
  },

  buildProductionCheckoutDetails(
    storeConfig: StoreConfig,
    cartId?: string | null,
    liveCheckoutUrl?: string | null,
  ): { checkoutUrl: string; explanation: string; mutation: string } {
    const safeId = cartId ? cartId.split('/').pop() ?? 'demo-session' : 'demo-session';
    const checkoutUrl =
      liveCheckoutUrl ||
      `https://${storeConfig.shopifyDomain}/checkouts/cn/${encodeURIComponent(
        safeId,
      )}`;

    return {
      checkoutUrl,
      mutation: STOREFRONT_OPERATIONS.cartCreate,
      explanation:
        `In production, ${storeConfig.storeName} executes Storefront API cartCreate / cartLinesAdd ` +
        `and opens cart.checkoutUrl (${checkoutUrl}) via Shopify Checkout Sheet Kit ` +
        `or a secure in-app browser (ASWebAuthenticationSession / Chrome Custom Tabs). ` +
        `Shopify handles taxes, shipping, PCI-compliant payment, and Shop Pay without exposing Admin API keys.`,
    };
  },
};
