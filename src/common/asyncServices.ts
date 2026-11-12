import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncData = async <T>(key: string, value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.warn('[asyncServices] Failed to save key:', key, error);
  }
};

export const getAsyncData = async <T>(key: string): Promise<T | null> => {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (error) {
    console.warn('[asyncServices] Failed to read key:', key, error);
    return null;
  }
};

export const removeAsyncData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.warn('[asyncServices] Failed to remove key:', key, error);
  }
};

export const ASYNC_KEY = {
  CART_PREFIX: 'storefront_cart_',
  ACTIVE_STORE: 'storefront_active_store',
};

