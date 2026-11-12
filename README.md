# StorefrontApp — Multi-Store Shopify React Native Prototype

A reusable React Native (TypeScript) shopping app prototype demonstrating how multiple Shopify stores can run on a **single shared codebase** using centralized store configuration, consistent variant/cart logic, persistent local bag storage, and isolated third-party adapters.

> **Note:** Product catalog and reviews data in `src/data/mockCatalog.ts` are **labelled sample/mock data**. Production Shopify Storefront GraphQL operations are defined in `src/services/storefrontQueries.ts` and decoupled behind `src/services/shopifyService.ts` and `src/services/cartService.ts`.

---

## Project Structure (AuraCampus Conventions)

```text
StorefrontApp/
├── App.tsx                         # Root entry exporting src/index.tsx
├── src/
│   ├── index.tsx                   # SafeAreaProvider + StoreProvider + MainNavigation
│   ├── types/index.ts              # Shared TypeScript interfaces
│   ├── config/stores.ts            # Centralized Store A & Store B configurations
│   ├── theme/                      # colors.ts, dimensions.ts (perfectSize), styles.ts
│   ├── common/                     # asyncServices.ts (AsyncStorage), formatters.ts (cent-safe math)
│   ├── data/mockCatalog.ts         # Labelled mock products & reviews
│   ├── services/                   # storefrontQueries.ts, shopifyService.ts, cartService.ts, reviewsService.ts
│   ├── context/StoreContext.tsx    # Store config switching, loading/error states, persisted cart
│   ├── components/                 # PrimaryText, PrimaryButton, PrimaryLoader, AppHeader, ProductCard, ReviewsSection, ErrorRetryView
│   ├── navigation/MainNavigation.tsx
│   └── screens/                    # Welcome, Home, ProductDetails, Cart
├── __tests__/                      # Jest unit & render tests
└── docs/
    ├── ARCHITECTURE_AND_INTEGRATION.md
    └── SUBMISSION_AND_DEMO.md
```

---

## Setup & Run Instructions

### Prerequisites
- Node.js `>= 22.11.0`
- React Native CLI environment (Android SDK / Xcode + CocoaPods for native builds)

### 1. Install Dependencies & Configure `.env`
```bash
npm install
```

Edit [.env](file:///Users/ajaypatidar/Desktop/StorefrontApp/.env) (copied from `.env.example`) to connect a live Shopify store whenever ready:
```env
USE_LIVE_SHOPIFY=true
SHOPIFY_API_VERSION=2025-01
STORE_A_DOMAIN=your-store.myshopify.com
STORE_A_STOREFRONT_TOKEN=your_public_storefront_access_token
```
`metro.config.js` automatically runs `scripts/syncEnv.js` on startup to sync `.env` into `src/config/env.generated.ts` (you can also run `node scripts/syncEnv.js` manually). When `USE_LIVE_SHOPIFY=false` or tokens are empty, the app uses labelled sample data in `src/data/mockCatalog.ts`. When `USE_LIVE_SHOPIFY=true` and a Storefront token is set, `shopifyService` and `cartService` execute the dynamic GraphQL operations in `src/services/storefrontQueries.ts`.

### 2. Run Verification Checks
```bash
npx tsc --noEmit
npm run lint
npm test -- --watchAll=false
```

### 3. Run on Android
```bash
npm start
# In a second terminal:
npm run android
```

### 4. Run on iOS
```bash
# Install CocoaPods dependencies first if ios/Pods is not present:
bundle install && bundle exec pod install --project-directory=ios
npm run ios
```

---

## Switching Store Configurations Without Editing Screens

- **In-app switcher:** Tap the `Store A ⇄` / `Store B ⇄` pill in the top header or the selector cards on the Welcome screen.
- **Default store config:** Change `DEFAULT_STORE_ID` in `src/config/stores.ts` between `'store-a'` and `'store-b'`.
  - **Store A (`APEX ATHLETICS`)**: Black/white Gymshark-inspired sportswear theme, `reviews: true`, `loyalty: false`.
  - **Store B (`MAISON ROSE`)**: Pink/white boutique fashion theme, `reviews: false`, `loyalty: true`.
