import { StoreId } from '../types';
import { GENERATED_ENV } from './env.generated';

const readFlag = (value: string | undefined): boolean =>
  String(value).toLowerCase() === 'true';

export const ENV = {
  useLiveShopify: readFlag(GENERATED_ENV.USE_LIVE_SHOPIFY),
  shopifyApiVersion: GENERATED_ENV.SHOPIFY_API_VERSION || '2025-01',
  stores: {
    'store-a': {
      domain: GENERATED_ENV.STORE_A_DOMAIN,
      storefrontAccessToken: GENERATED_ENV.STORE_A_STOREFRONT_TOKEN,
    },
    'store-b': {
      domain: GENERATED_ENV.STORE_B_DOMAIN,
      storefrontAccessToken: GENERATED_ENV.STORE_B_STOREFRONT_TOKEN,
    },
  },
  reviewsApiUrl: GENERATED_ENV.REVIEWS_API_URL,
  reviewsApiKey: GENERATED_ENV.REVIEWS_API_KEY,
} as const;

export const isLiveShopifyEnabled = (storeId: StoreId): boolean =>
  ENV.useLiveShopify &&
  Boolean(ENV.stores[storeId]?.domain) &&
  Boolean(ENV.stores[storeId]?.storefrontAccessToken?.trim());

