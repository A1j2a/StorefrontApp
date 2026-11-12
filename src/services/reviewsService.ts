import {
  DEFAULT_MOCK_REVIEWS,
  MOCK_REVIEWS_BY_PRODUCT,
} from '../data/mockCatalog';
import { ReviewsResponse } from '../types';

export interface FetchReviewsOptions {
  simulateUnavailable?: boolean;
  delayMs?: number;
}

const wait = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(() => resolve(), ms));

/**
 * Mocked Third-Party Product Reviews Adapter (e.g. Judge.me / Yotpo).
 * Demonstrates both Success and Unavailable fallback states cleanly
 * without blocking Product Details or Cart functionality.
 */
export const reviewsService = {
  async fetchProductReviews(
    productId: string,
    options: FetchReviewsOptions = {},
  ): Promise<ReviewsResponse> {
    const { simulateUnavailable = false, delayMs = 200 } = options;

    if (delayMs > 0) {
      await wait(delayMs);
    }

    if (simulateUnavailable) {
      return {
        status: 'unavailable',
        averageRating: 0,
        totalCount: 0,
        reviews: [],
        fallbackMessage:
          'Customer reviews are temporarily unavailable. Product sizing, availability, and checkout remain unaffected.',
      };
    }

    const reviews =
      MOCK_REVIEWS_BY_PRODUCT[productId] ?? DEFAULT_MOCK_REVIEWS;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const averageRating =
      reviews.length > 0 ? Number((sum / reviews.length).toFixed(1)) : 0;

    return {
      status: 'success',
      averageRating,
      totalCount: reviews.length,
      reviews,
    };
  },
};

