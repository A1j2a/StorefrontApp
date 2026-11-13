# Assignment Submission & 3-Minute Demo Walkthrough

This document covers the **Submission Requirements** outlined in the assignment specification alongside [ARCHITECTURE_AND_INTEGRATION.md](./ARCHITECTURE_AND_INTEGRATION.md) and [README.md](../README.md).

---

## 1. Three-Minute Demo Walkthrough Script

### Minute 0:00 – 0:50 | Store A Shopping Journey (Apex Athletics)
1. **Welcome Screen (`src/screens/Welcome/index.tsx`)**:
   - App launches with **Store A** branding: Black/white sportswear styling inspired by Gymshark.
   - Shows store monogram, title (*TRAIN WITHOUT LIMITS*), welcome message, hero badge, and both **Get Started** and **Skip** buttons.
2. **Collection / Home Screen (`src/screens/Home/index.tsx`)**:
   - Tap **Get Started** to navigate to the Home screen.
   - Displays sample sportswear collection (*Apex Seamless Compression Tee*, *Stride 5" Training Shorts*, *Crest Heavyweight Hoodie*, *Sculpt High-Rise Leggings*).
   - Tap the **Test Error** button in the collection header to demonstrate the `ErrorRetryView` state; tap **Retry** to immediately restore the catalog.
3. **Product Details Screen (`src/screens/ProductDetails/index.tsx`)**:
   - Tap *Apex Seamless Compression Tee*.
   - View product image, description, and the **VariantSelector** component.
   - Tap an unavailable variant (*Onyx Black / L* — dashed border, marked `Unavailable`). Show that the **AddToCartBar** button disables and changes label to `UNAVAILABLE — OUT OF STOCK`.
   - Select an in-stock variant (*Steel Grey / M* at `$40.00`) — observe that price and SKU update consistently.
   - Tap **ADD TO BAG** — success banner confirms addition with a direct **View Bag →** shortcut.

### Minute 0:50 – 1:40 | Cart Calculations, Persistence & Mock Checkout
4. **Cart Screen (`src/screens/Cart/index.tsx`)**:
   - Navigate to Cart via the header **BAG** button or the Add to Cart confirmation.
   - Displays line item card with thumbnail, title, selected variant, unit price, and line subtotal.
5. **Quantity & Total Calculations**:
   - Use the `+` stepper button to increment quantity to 2; subtotal updates instantly to `$80.00` using integer-cent arithmetic (no floating-point rounding errors).
   - Use `−` to decrement, or tap **Remove** to remove the item and view the **CartEmptyState** with its **Browse Collection** recovery CTA.
6. **Cart Persistence Across App Restarts**:
   - Add an item to the bag, force-close the application process, and reopen the app.
   - Reopening the bag shows that items, quantities, and totals were restored automatically from `AsyncStorage`.
7. **Checkout Flow**:
   - Tap **CHECKOUT** to open the `CheckoutModal`.
   - Displays the production Shopify checkout URL redirect path (`cartCreate` / `cartLinesAdd` → `@shopify/checkout-sheet-kit` / secure in-app browser).
   - Tap **COMPLETE MOCK ORDER** to clear the cart and return to browsing.

### Minute 1:40 – 2:25 | Multi-Store Configuration Switch (No Screen Edits)
8. **Switching Store Configurations**:
   - On the Home screen or Welcome screen, tap the **`Store A ⇄`** switcher pill in `AppHeader` to switch to **Store B (`MAISON ROSE`)**.
9. **Instant Re-branding Without Modifying Screen Code**:
   - All screens immediately re-theme from black/white sportswear to pink/white boutique fashion (`primaryColor: #D81B60`, `backgroundColor: #FFF9FB`).
   - The product catalog switches from gym apparel to curated women's fashion (*Satin Bias Midi Dress*, *Cropped Bouclé Cardigan*, *Tailored Linen Blazer*, *Pleated Leather Mini Tote*).
   - Feature flags swap: Reviews feature is disabled; the **Loyalty Club** feature is enabled, displaying points-earning banners on Home (`★ MAISON ROSE LOYALTY CLUB ENABLED`), PDP, and Cart (`10 points per $1 spent`).
   - Cart storage is completely isolated per store — Store B maintains its own persistent bag independent of Store A.

### Minute 2:25 – 3:00 | Mocked Third-Party Integration Fallback (Product Reviews)
10. **Third-Party Integration**:
    - Switch back to Store A (`APEX ATHLETICS`) and open *Apex Seamless Compression Tee*.
    - Scroll down to the **ReviewsSection** component (`src/components/ReviewsSection`).
11. **Success State**:
    - Displays rating score (`5.0 ★`), verified count, and customer review cards with star ratings and comments.
12. **Unavailable Fallback State**:
    - Tap the **`State: Success`** toggle pill in the reviews header to switch to **`State: Unavailable`**.
    - Demonstrates the graceful fallback message: *"Customer reviews are temporarily unavailable. Product sizing, availability, and checkout remain unaffected."*
    - Note that product variant selection, pricing, and Add to Cart continue working normally without being blocked by the review service outage.

---

## 2. Platforms Actually Tested

| Platform / Tool | Status | Details & Run Instructions |
|---|---|---|
| **TypeScript Typecheck** | **Verified (0 errors)** | Tested via `npx tsc --noEmit`. Strict types across all screens, services, theme, and config. |
| **ESLint** | **Verified (0 errors, 0 warnings)** | Tested via `npm run lint`. Complies with React Native and React Hooks lint rules. |
| **Jest Automated Test Suite** | **Verified (8/8 passing)** | Tested via `npm test -- --watchAll=false`. Covers app rendering, multi-store config separation, out-of-stock guard, cent arithmetic, AsyncStorage cart persistence, error/retry states, reviews fallback, and Storefront GraphQL endpoint execution. |
| **Metro Android Production Bundle** | **Verified (Success)** | Tested via `npx react-native bundle --platform android --dev false`. Validates that the full JavaScript bundle compiles without packaging errors. |
| **Android Native Build (`gradlew`)** | **Available for Local Run** | To run locally on an Android emulator or device:<br>`npm start`<br>`npm run android` |
| **iOS Native Simulator** | **Available for Local Run** | CocoaPods is not installed on this machine environment. To run locally on macOS with Xcode and CocoaPods:<br>`bundle install && bundle exec pod install --project-directory=ios`<br>`npm run ios` |

---

## 3. AI Tools Used

- **Antigravity (with Gemini 3.8 Flash)**: Used for codebase inspection of AuraCampus conventions, TypeScript component architecture, Storefront GraphQL dynamic operations, modularizing styles/components, unit test creation, and architectural documentation.

---

## 4. One Issue Corrected During Development

- **React Native 0.88 Edge-to-Edge StatusBar Typing & AsyncStorage v3 Jest Mocking**:
  1. In React Native 0.88, the `StatusBar` component removed the `backgroundColor` prop in its TypeScript definitions because Android now defaults to modern edge-to-edge transparent status bars. The app was adjusted to use `<StatusBar barStyle="dark-content" />`, resolving the TypeScript build error.
  2. `@react-native-async-storage/async-storage` v3.1.1 migrated its built-in Jest mock export to ES Module syntax (`@react-native-async-storage/async-storage/jest`), which threw a `SyntaxError: Unexpected token 'export'` under Jest's default CommonJS transform. Rather than modifying project-level Jest transform configurations, a clean manual mock was implemented at `__mocks__/@react-native-async-storage/async-storage.ts`, allowing all automated tests to execute and pass out-of-the-box.

---

## 5. Time Spent & Unfinished Items

- **Total Time Spent**: Approximately **1.5 hours** (well within the 5-hour limit).
- **Completed Deliverables**:
  - Task 1 Architecture & Integration Plan with 10-category third-party compatibility table.
  - Task 2 React Native Prototype with all 4 screens (Welcome, Home, Product Details, Cart).
  - Multi-store configuration engine (Store A sportswear vs. Store B boutique fashion) switchable without editing screen components.
  - Cart persistence across app restarts via `AsyncStorage`.
  - Out-of-stock variant validation preventing invalid adds to cart.
  - Mocked Reviews third-party integration demonstrating both Success and Unavailable fallback states.
  - Dynamic `.env` configuration and Shopify Storefront GraphQL query layer.
  - Full Jest automated test suite and clean code modularization (`index.tsx` + `styles.ts` per component).
- **Unfinished / Out-of-Scope Items** (intentionally deferred per assignment guidelines):
  - Live Shopify credit card payment processing (mocked checkout modal displays production redirect URL flow per instructions).
  - Physical 3-minute video recording (complete script provided above for live demo or video walkthrough).
