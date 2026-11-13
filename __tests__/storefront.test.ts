import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV } from '../src/config/env';
import { getStoreConfig } from '../src/config/stores';
import { MOCK_PRODUCTS_BY_STORE } from '../src/data/mockCatalog';
import {
  cartService,
  executeStorefrontGraphQL,
  GET_PRODUCTS_QUERY,
  reviewsService,
  shopifyService,
} from '../src/services';

describe('Storefront core business logic', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  test('multi-store configs define distinct themes and optional features', () => {
    const storeA = getStoreConfig('store-a');
    const storeB = getStoreConfig('store-b');

    expect(storeA.theme.primaryColor).toBe('#111111');
    expect(storeA.features.reviews).toBe(true);
    expect(storeA.features.loyalty).toBe(false);

    expect(storeB.theme.primaryColor).toBe('#D81B60');
    expect(storeB.features.reviews).toBe(false);
    expect(storeB.features.loyalty).toBe(true);
  });

  test('prevents adding unavailable variants to cart', () => {
    const product = MOCK_PRODUCTS_BY_STORE['store-a'][0];
    const unavailableVariant = product.variants.find(v => !v.availableForSale);

    expect(unavailableVariant).toBeDefined();
    expect(() =>
      cartService.addItem([], product, unavailableVariant!),
    ).toThrow('out of stock');
  });

  test('calculates cart quantities and totals accurately without float drift', () => {
    const product = MOCK_PRODUCTS_BY_STORE['store-a'][0];
    const availableVariant = product.variants.find(v => v.availableForSale)!;

    let cart = cartService.addItem([], product, availableVariant);
    cart = cartService.updateQuantity(cart, availableVariant.id, 3);

    const totals = cartService.calculateTotals(cart);
    expect(totals.itemCount).toBe(3);
    expect(totals.subtotal).toBe(Number((availableVariant.price * 3).toFixed(2)));
  });

  test('enforces available quantity limits when adding and updating items', () => {
    const product = MOCK_PRODUCTS_BY_STORE['store-a'][0];
    // Find variant with limited stock, e.g. quantityAvailable = 2
    const lowStockVariant = product.variants.find(
      v => v.availableForSale && v.quantityAvailable === 2,
    )!;

    expect(lowStockVariant).toBeDefined();

    // 1. Add first item
    let cart = cartService.addItem([], product, lowStockVariant);
    expect(cart[0].quantity).toBe(1);

    // 2. Add second item (reaches max stock of 2)
    cart = cartService.addItem(cart, product, lowStockVariant);
    expect(cart[0].quantity).toBe(2);

    // 3. Attempting to add 3rd item when stock is 2 must throw error
    expect(() => cartService.addItem(cart, product, lowStockVariant)).toThrow(
      'Only 2 item(s) available in stock',
    );

    // 4. Updating quantity beyond available stock clamps to max available stock
    const clampedCart = cartService.updateQuantity(cart, lowStockVariant.id, 99);
    expect(clampedCart[0].quantity).toBe(2);
  });

  test('persists and restores cart across app restarts per store', async () => {
    const product = MOCK_PRODUCTS_BY_STORE['store-b'][0];
    const variant = product.variants.find(v => v.availableForSale)!;

    const cart = cartService.addItem([], product, variant);
    await cartService.saveCart('store-b', cart);

    const restoredB = await cartService.loadCart('store-b');
    const restoredA = await cartService.loadCart('store-a');

    expect(restoredB).toHaveLength(1);
    expect(restoredB[0].variantId).toBe(variant.id);
    expect(restoredA).toHaveLength(0);
  });

  test('shopifyService supports loading and error/retry recovery', async () => {
    await expect(
      shopifyService.fetchProducts('store-a', {
        simulateError: true,
        delayMs: 0,
      }),
    ).rejects.toThrow('Unable to reach Shopify Storefront API');

    const recovered = await shopifyService.fetchProducts('store-a', {
      simulateError: false,
      delayMs: 0,
    });
    expect(recovered.length).toBeGreaterThan(0);
  });

  test('reviewsService returns success and unavailable fallback states', async () => {
    const product = MOCK_PRODUCTS_BY_STORE['store-a'][0];

    const ok = await reviewsService.fetchProductReviews(product.id, {
      simulateUnavailable: false,
      delayMs: 0,
    });
    expect(ok.status).toBe('success');
    expect(ok.reviews.length).toBeGreaterThan(0);

    const down = await reviewsService.fetchProductReviews(product.id, {
      simulateUnavailable: true,
      delayMs: 0,
    });
    expect(down.status).toBe('unavailable');
    expect(down.fallbackMessage).toBeTruthy();
  });

  test('executes dynamic Storefront GraphQL request with store token', async () => {
    const storeA = {
      ...getStoreConfig('store-a'),
      shopifyDomain: 'live-shop.myshopify.com',
      storefrontAccessToken: 'public-storefront-token',
    };

    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          products: {
            edges: [],
          },
        },
      }),
    });
    (globalThis as unknown as { fetch: typeof fetch }).fetch =
      mockFetch as unknown as typeof fetch;

    const result = await executeStorefrontGraphQL<{
      products: { edges: unknown[] };
    }>(storeA, GET_PRODUCTS_QUERY, { first: 10 });

    expect(ENV.shopifyApiVersion).toBe('2025-01');
    expect(result.products.edges).toEqual([]);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://live-shop.myshopify.com/api/2025-01/graphql.json',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'X-Shopify-Storefront-Access-Token': 'public-storefront-token',
        }),
      }),
    );
  });
});
