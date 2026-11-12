import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ASYNC_KEY, getAsyncData, setAsyncData } from '../common';
import { isLiveShopifyEnabled } from '../config/env';
import { DEFAULT_STORE_ID, getStoreConfig } from '../config/stores';
import { cartService, shopifyService } from '../services';
import {
  CartItem,
  PersistedCartState,
  Product,
  ProductVariant,
  StoreConfig,
  StoreId,
} from '../types';

interface StoreContextValue {
  storeId: StoreId;
  storeConfig: StoreConfig;
  isLiveMode: boolean;
  products: Product[];
  isLoadingProducts: boolean;
  productsError: string | null;
  cartId: string | null;
  checkoutUrl: string | null;
  cartItems: CartItem[];
  isCartHydrated: boolean;
  cartItemCount: number;
  cartSubtotal: number;
  switchStore: (nextStoreId: StoreId) => Promise<void>;
  reloadProducts: (simulateError?: boolean) => Promise<void>;
  addToCart: (product: Product, variant: ProductVariant) => void;
  updateCartQuantity: (variantId: string, nextQuantity: number) => void;
  removeFromCart: (variantId: string) => void;
  clearCart: () => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [storeId, setStoreId] = useState<StoreId>(DEFAULT_STORE_ID);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [cartState, setCartState] = useState<PersistedCartState>({
    cartId: null,
    checkoutUrl: null,
    items: [],
  });
  const [isCartHydrated, setIsCartHydrated] = useState<boolean>(false);

  const storeConfig = useMemo(() => getStoreConfig(storeId), [storeId]);
  const isLiveMode = useMemo(() => isLiveShopifyEnabled(storeId), [storeId]);

  const loadStoreData = useCallback(
    async (targetStoreId: StoreId, simulateError = false) => {
      setIsLoadingProducts(true);
      setProductsError(null);

      const savedCart = await cartService.loadCartState(targetStoreId);
      setCartState(savedCart);
      setIsCartHydrated(true);

      try {
        const loadedProducts = await shopifyService.fetchProducts(
          targetStoreId,
          { simulateError },
        );
        setProducts(loadedProducts);

        if (savedCart.cartId && isLiveShopifyEnabled(targetStoreId)) {
          const remoteCart = await cartService.fetchRemoteCart(
            getStoreConfig(targetStoreId),
            savedCart.cartId,
          );
          if (remoteCart) {
            setCartState(remoteCart);
            await cartService.saveCartState(targetStoreId, remoteCart);
          }
        }
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Unable to load store catalog.';
        setProductsError(message);
      } finally {
        setIsLoadingProducts(false);
      }
    },
    [],
  );

  useEffect(() => {
    let mounted = true;
    const bootstrap = async () => {
      const savedStoreId = await getAsyncData<StoreId>(ASYNC_KEY.ACTIVE_STORE);
      const initialStore: StoreId =
        savedStoreId === 'store-a' || savedStoreId === 'store-b'
          ? savedStoreId
          : DEFAULT_STORE_ID;
      if (!mounted) {
        return;
      }
      setStoreId(initialStore);
      await loadStoreData(initialStore);
    };
    bootstrap();
    return () => {
      mounted = false;
    };
  }, [loadStoreData]);

  const switchStore = useCallback(
    async (nextStoreId: StoreId) => {
      if (nextStoreId === storeId) {
        return;
      }
      setStoreId(nextStoreId);
      setIsCartHydrated(false);
      await setAsyncData(ASYNC_KEY.ACTIVE_STORE, nextStoreId);
      await loadStoreData(nextStoreId);
    },
    [loadStoreData, storeId],
  );

  const reloadProducts = useCallback(
    async (simulateError = false) => {
      await loadStoreData(storeId, simulateError);
    },
    [loadStoreData, storeId],
  );

  const addToCart = useCallback(
    (product: Product, variant: ProductVariant) => {
      let currentCartId: string | null = null;
      setCartState(prev => {
        currentCartId = prev.cartId;
        const nextItems = cartService.addItem(prev.items, product, variant);
        const nextState: PersistedCartState = { ...prev, items: nextItems };
        cartService.saveCartState(storeId, nextState);
        return nextState;
      });

      if (isLiveShopifyEnabled(storeId)) {
        cartService
          .syncAddVariant(storeConfig, currentCartId, variant.id, 1)
          .then(remote => {
            if (remote) {
              setCartState(remote);
              cartService.saveCartState(storeId, remote);
            }
          })
          .catch(err => {
            console.warn('[StoreContext] Live cart add sync failed:', err);
          });
      }
    },
    [storeConfig, storeId],
  );

  const updateCartQuantity = useCallback(
    (variantId: string, nextQuantity: number) => {
      let targetCartId: string | null = null;
      let targetLineId: string | null = null;

      setCartState(prev => {
        targetCartId = prev.cartId;
        targetLineId =
          prev.items.find(i => i.variantId === variantId)?.lineId ?? null;
        const nextItems = cartService.updateQuantity(
          prev.items,
          variantId,
          nextQuantity,
        );
        const nextState: PersistedCartState = { ...prev, items: nextItems };
        cartService.saveCartState(storeId, nextState);
        return nextState;
      });

      if (isLiveShopifyEnabled(storeId) && targetCartId && targetLineId) {
        cartService
          .syncUpdateLine(storeConfig, targetCartId, targetLineId, nextQuantity)
          .then(remote => {
            if (remote) {
              setCartState(remote);
              cartService.saveCartState(storeId, remote);
            }
          })
          .catch(err => {
            console.warn('[StoreContext] Live cart update sync failed:', err);
          });
      }
    },
    [storeConfig, storeId],
  );

  const removeFromCart = useCallback(
    (variantId: string) => {
      let targetCartId: string | null = null;
      let targetLineId: string | null = null;

      setCartState(prev => {
        targetCartId = prev.cartId;
        targetLineId =
          prev.items.find(i => i.variantId === variantId)?.lineId ?? null;
        const nextItems = cartService.removeItem(prev.items, variantId);
        const nextState: PersistedCartState = { ...prev, items: nextItems };
        cartService.saveCartState(storeId, nextState);
        return nextState;
      });

      if (isLiveShopifyEnabled(storeId) && targetCartId && targetLineId) {
        cartService
          .syncRemoveLine(storeConfig, targetCartId, targetLineId)
          .then(remote => {
            if (remote) {
              setCartState(remote);
              cartService.saveCartState(storeId, remote);
            }
          })
          .catch(err => {
            console.warn('[StoreContext] Live cart remove sync failed:', err);
          });
      }
    },
    [storeConfig, storeId],
  );

  const clearCart = useCallback(() => {
    const empty: PersistedCartState = {
      cartId: null,
      checkoutUrl: null,
      items: [],
    };
    setCartState(empty);
    cartService.saveCartState(storeId, empty);
  }, [storeId]);

  const totals = useMemo(
    () => cartService.calculateTotals(cartState.items),
    [cartState.items],
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      storeId,
      storeConfig,
      isLiveMode,
      products,
      isLoadingProducts,
      productsError,
      cartId: cartState.cartId,
      checkoutUrl: cartState.checkoutUrl,
      cartItems: cartState.items,
      isCartHydrated,
      cartItemCount: totals.itemCount,
      cartSubtotal: totals.subtotal,
      switchStore,
      reloadProducts,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
    }),
    [
      storeId,
      storeConfig,
      isLiveMode,
      products,
      isLoadingProducts,
      productsError,
      cartState.cartId,
      cartState.checkoutUrl,
      cartState.items,
      isCartHydrated,
      totals.itemCount,
      totals.subtotal,
      switchStore,
      reloadProducts,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
    ],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStore = (): StoreContextValue => {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used inside StoreProvider');
  }
  return ctx;
};
