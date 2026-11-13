import {
  PriceFilter,
  Product,
  ProductFilterState,
  SortOption,
} from '../types';

// Default initial state for filtering and sorting
export const DEFAULT_FILTER_STATE: ProductFilterState = {
  category: 'All',
  inStockOnly: false,
  priceRange: 'all',
  sortBy: 'featured',
};

// Available sort options with user-facing labels
export const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-low-high', label: 'Price: Low to High' },
  { id: 'price-high-low', label: 'Price: High to Low' },
  { id: 'name-asc', label: 'Name: A to Z' },
  { id: 'name-desc', label: 'Name: Z to A' },
];

// Available price filter options with user-facing labels
export const PRICE_FILTERS: { id: PriceFilter; label: string }[] = [
  { id: 'all', label: 'All Prices' },
  { id: 'under-50', label: 'Under $50' },
  { id: '50-100', label: '$50 - $100' },
  { id: 'over-100', label: 'Over $100' },
];

// Extract distinct categories from the product list
export const extractCategories = (products: Product[]): string[] => {
  const set = new Set<string>();
  products.forEach(p => {
    if (p.category) {
      set.add(p.category);
    }
  });
  return ['All', ...Array.from(set)];
};

// Count number of active non-default filters
export const countActiveFilters = (state: ProductFilterState): number => {
  let count = 0;
  if (state.category !== 'All') {
    count += 1;
  }
  if (state.inStockOnly) {
    count += 1;
  }
  if (state.priceRange !== 'all') {
    count += 1;
  }
  if (state.sortBy !== 'featured') {
    count += 1;
  }
  return count;
};

// Filter and sort products based on the current filter criteria
export const filterAndSortProducts = (
  products: Product[],
  state: ProductFilterState,
): Product[] => {
  let list = [...products];

  // 1. Filter by category
  if (state.category && state.category !== 'All') {
    const target = state.category.toLowerCase();
    list = list.filter(p => p.category.toLowerCase() === target);
  }

  // 2. Filter by stock availability
  if (state.inStockOnly) {
    list = list.filter(p =>
      p.variants.some(v => v.availableForSale && v.quantityAvailable > 0),
    );
  }

  // 3. Filter by price range
  if (state.priceRange !== 'all') {
    list = list.filter(p => {
      const minPrice = Math.min(...p.variants.map(v => v.price));
      if (state.priceRange === 'under-50') {
        return minPrice < 50;
      }
      if (state.priceRange === '50-100') {
        return minPrice >= 50 && minPrice <= 100;
      }
      if (state.priceRange === 'over-100') {
        return minPrice > 100;
      }
      return true;
    });
  }

  // 4. Sort results
  list.sort((a, b) => {
    const priceA = Math.min(...a.variants.map(v => v.price));
    const priceB = Math.min(...b.variants.map(v => v.price));

    switch (state.sortBy) {
      case 'price-low-high':
        return priceA - priceB;
      case 'price-high-low':
        return priceB - priceA;
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'name-desc':
        return b.title.localeCompare(a.title);
      case 'featured':
      default:
        return 0;
    }
  });

  return list;
};

