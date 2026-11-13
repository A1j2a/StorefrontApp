export type StoreId = 'store-a' | 'store-b';

export interface StoreTheme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  surfaceColor: string;
  cardColor: string;
  textColor: string;
  mutedTextColor: string;
  borderColor: string;
  accentSoftColor: string;
  onPrimaryColor: string;
  badgeBgColor: string;
  badgeTextColor: string;
}

export interface StoreFeatures {
  reviews: boolean;
  loyalty: boolean;
  loyaltyPointsPerDollar?: number;
}

export interface StoreConfig {
  storeId: StoreId;
  storeName: string;
  logoText: string;
  logoSubtext: string;
  tagline: string;
  welcomeTitle: string;
  welcomeMessage: string;
  heroBadge: string;
  shopifyDomain: string;
  storefrontAccessToken: string;
  storefrontApiVersion: string;
  currencyCode: string;
  currencySymbol: string;
  theme: StoreTheme;
  features: StoreFeatures;
}

export interface ProductVariant {
  id: string;
  title: string;
  size: string;
  color: string;
  price: number;
  availableForSale: boolean;
  quantityAvailable: number;
  sku: string;
}

export interface Product {
  id: string;
  storeId: StoreId;
  handle: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  badge?: string;
  variants: ProductVariant[];
}

export interface CartItem {
  lineId: string;
  storeId: StoreId;
  productId: string;
  variantId: string;
  productTitle: string;
  variantTitle: string;
  price: number;
  quantity: number;
  quantityAvailable: number;
  imageUrl: string;
}

export interface PersistedCartState {
  cartId: string | null;
  checkoutUrl: string | null;
  items: CartItem[];
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
}

export interface ReviewsResponse {
  status: 'success' | 'unavailable';
  averageRating: number;
  totalCount: number;
  reviews: ProductReview[];
  fallbackMessage?: string;
}

export type ScreenName = 'Welcome' | 'Home' | 'ProductDetails' | 'Cart';

