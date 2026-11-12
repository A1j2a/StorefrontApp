import { StoreConfig } from '../types';

export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

/**
 * Lightweight zero-dependency Shopify Storefront GraphQL client.
 * Uses only the public Storefront Access Token from storeConfig (.env).
 */
export async function executeStorefrontGraphQL<
  TData,
  TVariables extends Record<string, unknown> = Record<string, unknown>,
>(
  storeConfig: StoreConfig,
  query: string,
  variables?: TVariables,
): Promise<TData> {
  const endpoint = `https://${storeConfig.shopifyDomain}/api/${storeConfig.storefrontApiVersion}/graphql.json`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storeConfig.storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(
      `Shopify Storefront HTTP ${response.status}: ${response.statusText}`,
    );
  }

  const payload = (await response.json()) as GraphQLResponse<TData>;

  if (payload.errors && payload.errors.length > 0) {
    throw new Error(payload.errors.map(e => e.message).join('; '));
  }

  if (!payload.data) {
    throw new Error('Shopify Storefront API returned an empty data payload.');
  }

  return payload.data;
}

