import { StoreConfig, StoreId } from '../types';
import { ENV } from './env';

/**
 * Change DEFAULT_STORE_ID (or switch via the in-app store switcher)
 * to re-theme and reconfigure the entire app without editing any screen.
 * Domain and Storefront token values are populated dynamically from .env via ENV.
 */
export const DEFAULT_STORE_ID: StoreId = 'store-a';

export const STORE_CONFIGS: Record<StoreId, StoreConfig> = {
  'store-a': {
    storeId: 'store-a',
    storeName: 'APEX ATHLETICS',
    logoText: 'APEX',
    logoSubtext: 'CONDITIONING CLUB',
    tagline: 'Engineered performance apparel for every rep.',
    welcomeTitle: 'TRAIN WITHOUT LIMITS',
    welcomeMessage:
      'High-compression silhouettes, breathable seamless knits, and gym-tested essentials built to move with you.',
    heroBadge: 'NEW DROP • TRAINING SERIES',
    shopifyDomain: ENV.stores['store-a'].domain,
    storefrontAccessToken: ENV.stores['store-a'].storefrontAccessToken,
    storefrontApiVersion: ENV.shopifyApiVersion,
    currencyCode: 'USD',
    currencySymbol: '$',
    theme: {
      primaryColor: '#111111',
      secondaryColor: '#FFFFFF',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#F4F4F5',
      cardColor: '#FFFFFF',
      textColor: '#111111',
      mutedTextColor: '#6B7280',
      borderColor: '#E4E4E7',
      accentSoftColor: '#EFEFEF',
      onPrimaryColor: '#FFFFFF',
      badgeBgColor: '#111111',
      badgeTextColor: '#FFFFFF',
    },
    features: {
      reviews: true,
      loyalty: false,
    },
  },
  'store-b': {
    storeId: 'store-b',
    storeName: 'MAISON ROSE',
    logoText: 'MAISON ROSE',
    logoSubtext: 'ATELIER BOUTIQUE',
    tagline: 'Effortless silhouettes & curated seasonal fashion.',
    welcomeTitle: 'ELEVATED EVERYDAY STYLE',
    welcomeMessage:
      'Tailored tailoring, fluid satin staples, and limited-run pieces designed for modern wardrobes.',
    heroBadge: 'SPRING EDIT • CAPSULE 04',
    shopifyDomain: ENV.stores['store-b'].domain,
    storefrontAccessToken: ENV.stores['store-b'].storefrontAccessToken,
    storefrontApiVersion: ENV.shopifyApiVersion,
    currencyCode: 'USD',
    currencySymbol: '$',
    theme: {
      primaryColor: '#D81B60',
      secondaryColor: '#FFFFFF',
      backgroundColor: '#FFF9FB',
      surfaceColor: '#FCE7F3',
      cardColor: '#FFFFFF',
      textColor: '#2D1220',
      mutedTextColor: '#7C4D63',
      borderColor: '#F9CEE0',
      accentSoftColor: '#FDE8F0',
      onPrimaryColor: '#FFFFFF',
      badgeBgColor: '#FCE7F3',
      badgeTextColor: '#9D174D',
    },
    features: {
      reviews: false,
      loyalty: true,
      loyaltyPointsPerDollar: 10,
    },
  },
};

export const STORE_LIST: StoreConfig[] = Object.values(STORE_CONFIGS);

export const getStoreConfig = (storeId: StoreId): StoreConfig =>
  STORE_CONFIGS[storeId] ?? STORE_CONFIGS[DEFAULT_STORE_ID];
