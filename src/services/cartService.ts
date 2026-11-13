import {
  ASYNC_KEY,
  calculateSubtotalCents,
  centsToAmount,
  getAsyncData,
  setAsyncData,
} from '../common';
import { isLiveShopifyEnabled } from '../config/env';
import {
  CartItem,
  PersistedCartState,
  Product,
  ProductVariant,
  StoreConfig,
  StoreId,
} from '../types';
import { executeStorefrontGraphQL } from './graphqlClient';
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  GET_CART_QUERY,
} from './storefrontQueries';

export interface CartTotals {
  itemCount: number;
  subtotal: number;
}

interface ShopifyCartNode {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          availableForSale?: boolean;
          quantityAvailable?: number | null;
          price: { amount: string };
          image?: { url?: string } | null;
          product: {
            id: string;
            title: string;
            featuredImage?: { url?: string } | null;
          };
        };
      };
    }>;
  };
}

interface CartUserError {
  field?: string[];
  message: string;
}

export const CART_STOREFRONT_OPERATIONS = {
  getCart: GET_CART_QUERY,
  cartCreate: CART_CREATE_MUTATION,
  linesAdd: CART_LINES_ADD_MUTATION,
  linesUpdate: CART_LINES_UPDATE_MUTATION,
  linesRemove: CART_LINES_REMOVE_MUTATION,
} as const;

const getStorageKey = (storeId: StoreId): string =>
  `${ASYNC_KEY.CART_PREFIX}${storeId}`;

const mapShopifyCart = (
  cart: ShopifyCartNode,
  storeId: StoreId,
): PersistedCartState => ({
  cartId: cart.id,
  checkoutUrl: cart.checkoutUrl,
  items: cart.lines.edges.map(({ node }) => ({
    lineId: node.id,
    storeId,
    productId: node.merchandise.product.id,
    variantId: node.merchandise.id,
    productTitle: node.merchandise.product.title,
    variantTitle: node.merchandise.title,
    price: Number.parseFloat(node.merchandise.price.amount) || 0,
    quantity: node.quantity,
    quantityAvailable:
      typeof node.merchandise.quantityAvailable === 'number'
        ? node.merchandise.quantityAvailable
        : 10,
    imageUrl:
      node.merchandise.image?.url ||
      node.merchandise.product.featuredImage?.url ||
      '',
  })),
});

const assertNoUserErrors = (userErrors?: CartUserError[]) => {
  if (userErrors && userErrors.length > 0) {
    throw new Error(userErrors.map(e => e.message).join('; '));
  }
};

export const cartService = {
  async loadCartState(storeId: StoreId): Promise<PersistedCartState> {
    const raw = await getAsyncData<PersistedCartState | CartItem[]>(
      getStorageKey(storeId),
    );
    if (Array.isArray(raw)) {
      return { cartId: null, checkoutUrl: null, items: raw };
    }
    if (raw && Array.isArray(raw.items)) {
      return {
        cartId: raw.cartId ?? null,
        checkoutUrl: raw.checkoutUrl ?? null,
        items: raw.items,
      };
    }
    return { cartId: null, checkoutUrl: null, items: [] };
  },

  async loadCart(storeId: StoreId): Promise<CartItem[]> {
    const state = await this.loadCartState(storeId);
    return state.items;
  },

  async saveCartState(
    storeId: StoreId,
    state: PersistedCartState,
  ): Promise<void> {
    await setAsyncData(getStorageKey(storeId), state);
  },

  async saveCart(storeId: StoreId, items: CartItem[]): Promise<void> {
    await this.saveCartState(storeId, {
      cartId: null,
      checkoutUrl: null,
      items,
    });
  },

  addItem(
    currentItems: CartItem[],
    product: Product,
    variant: ProductVariant,
  ): CartItem[] {
    const maxStock =
      typeof variant.quantityAvailable === 'number'
        ? variant.quantityAvailable
        : variant.availableForSale
          ? 10
          : 0;

    if (!variant.availableForSale || maxStock <= 0) {
      throw new Error('Selected variant is out of stock and cannot be added.');
    }

    const existingIndex = currentItems.findIndex(
      item => item.variantId === variant.id,
    );

    if (existingIndex >= 0) {
      const existing = currentItems[existingIndex];
      if (existing.quantity >= maxStock) {
        throw new Error(
          `Cannot add more. Only ${maxStock} item(s) available in stock.`,
        );
      }
      return currentItems.map((item, idx) =>
        idx === existingIndex
          ? {
              ...item,
              price: variant.price,
              quantity: item.quantity + 1,
              quantityAvailable: maxStock,
            }
          : item,
      );
    }

    const newItem: CartItem = {
      lineId: `line-${variant.id}`,
      storeId: product.storeId,
      productId: product.id,
      variantId: variant.id,
      productTitle: product.title,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      quantityAvailable: maxStock,
      imageUrl: product.imageUrl,
    };

    return [...currentItems, newItem];
  },

  updateQuantity(
    currentItems: CartItem[],
    variantId: string,
    nextQuantity: number,
  ): CartItem[] {
    if (nextQuantity <= 0) {
      return this.removeItem(currentItems, variantId);
    }

    return currentItems.map(item => {
      if (item.variantId !== variantId) {
        return item;
      }
      const maxStock =
        typeof item.quantityAvailable === 'number' && item.quantityAvailable > 0
          ? item.quantityAvailable
          : 99;
      const clampedQty = Math.min(nextQuantity, maxStock);
      return { ...item, quantity: clampedQty };
    });
  },

  removeItem(currentItems: CartItem[], variantId: string): CartItem[] {
    return currentItems.filter(item => item.variantId !== variantId);
  },

  calculateTotals(items: CartItem[]): CartTotals {
    let totalCents = 0;
    let itemCount = 0;

    for (const item of items) {
      const safeQty = Math.max(0, item.quantity);
      itemCount += safeQty;
      totalCents += calculateSubtotalCents(item.price, safeQty);
    }

    return {
      itemCount,
      subtotal: centsToAmount(totalCents),
    };
  },

  /**
   * Dynamic Storefront GraphQL cart synchronization used when USE_LIVE_SHOPIFY=true.
   */
  async syncAddVariant(
    storeConfig: StoreConfig,
    cartId: string | null,
    variantId: string,
    quantity = 1,
  ): Promise<PersistedCartState | null> {
    if (!isLiveShopifyEnabled(storeConfig.storeId)) {
      return null;
    }

    if (!cartId) {
      const res = await executeStorefrontGraphQL<{
        cartCreate: { cart: ShopifyCartNode | null; userErrors: CartUserError[] };
      }>(storeConfig, CART_CREATE_MUTATION, {
        lines: [{ merchandiseId: variantId, quantity }],
      });
      assertNoUserErrors(res.cartCreate.userErrors);
      return res.cartCreate.cart
        ? mapShopifyCart(res.cartCreate.cart, storeConfig.storeId)
        : null;
    }

    const res = await executeStorefrontGraphQL<{
      cartLinesAdd: { cart: ShopifyCartNode | null; userErrors: CartUserError[] };
    }>(storeConfig, CART_LINES_ADD_MUTATION, {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    });
    assertNoUserErrors(res.cartLinesAdd.userErrors);
    return res.cartLinesAdd.cart
      ? mapShopifyCart(res.cartLinesAdd.cart, storeConfig.storeId)
      : null;
  },

  async syncUpdateLine(
    storeConfig: StoreConfig,
    cartId: string,
    lineId: string,
    quantity: number,
  ): Promise<PersistedCartState | null> {
    if (!isLiveShopifyEnabled(storeConfig.storeId)) {
      return null;
    }
    if (quantity <= 0) {
      return this.syncRemoveLine(storeConfig, cartId, lineId);
    }

    const res = await executeStorefrontGraphQL<{
      cartLinesUpdate: {
        cart: ShopifyCartNode | null;
        userErrors: CartUserError[];
      };
    }>(storeConfig, CART_LINES_UPDATE_MUTATION, {
      cartId,
      lines: [{ id: lineId, quantity }],
    });
    assertNoUserErrors(res.cartLinesUpdate.userErrors);
    return res.cartLinesUpdate.cart
      ? mapShopifyCart(res.cartLinesUpdate.cart, storeConfig.storeId)
      : null;
  },

  async syncRemoveLine(
    storeConfig: StoreConfig,
    cartId: string,
    lineId: string,
  ): Promise<PersistedCartState | null> {
    if (!isLiveShopifyEnabled(storeConfig.storeId)) {
      return null;
    }

    const res = await executeStorefrontGraphQL<{
      cartLinesRemove: {
        cart: ShopifyCartNode | null;
        userErrors: CartUserError[];
      };
    }>(storeConfig, CART_LINES_REMOVE_MUTATION, {
      cartId,
      lineIds: [lineId],
    });
    assertNoUserErrors(res.cartLinesRemove.userErrors);
    return res.cartLinesRemove.cart
      ? mapShopifyCart(res.cartLinesRemove.cart, storeConfig.storeId)
      : null;
  },

  async fetchRemoteCart(
    storeConfig: StoreConfig,
    cartId: string,
  ): Promise<PersistedCartState | null> {
    if (!isLiveShopifyEnabled(storeConfig.storeId)) {
      return null;
    }
    const res = await executeStorefrontGraphQL<{
      cart: ShopifyCartNode | null;
    }>(storeConfig, GET_CART_QUERY, { cartId });
    return res.cart ? mapShopifyCart(res.cart, storeConfig.storeId) : null;
  },
};
