import React, { FC, useMemo, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import {
  countActiveFilters,
  DEFAULT_FILTER_STATE,
  extractCategories,
  filterAndSortProducts,
} from '../../common';
import {
  AppHeader,
  CategoryFilterBar,
  ErrorRetryView,
  FilterEmptyState,
  FilterSortBar,
  FilterSortModal,
  LoyaltyBanner,
  PrimaryLoader,
  PrimaryText,
  ProductCard,
} from '../../components';
import { useStore } from '../../context/StoreContext';
import { Product, ProductFilterState } from '../../types';
import { styles } from './styles';

interface HomeScreenProps {
  onSelectProduct: (product: Product) => void;
  onOpenCart: () => void;
}

// Home collection screen with dynamic category filtering, sorting and responsive product grid
const HomeScreen: FC<HomeScreenProps> = ({ onSelectProduct, onOpenCart }) => {
  const {
    storeConfig,
    isLiveMode,
    products,
    isLoadingProducts,
    productsError,
    reloadProducts,
  } = useStore();
  const { theme, features } = storeConfig;

  // Local filter and sort criteria state
  const [filterState, setFilterState] =
    useState<ProductFilterState>(DEFAULT_FILTER_STATE);

  // Filter and sort bottom-sheet modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Dynamically extract distinct categories from current catalog
  const categories = useMemo(() => extractCategories(products), [products]);

  // Compute filtered and sorted product list
  const displayedProducts = useMemo(
    () => filterAndSortProducts(products, filterState),
    [products, filterState],
  );

  // Count active non-default filters for badge indicators
  const activeFilterCount = useMemo(
    () => countActiveFilters(filterState),
    [filterState],
  );

  // Handle category chip selection
  const handleSelectCategory = (category: string) => {
    setFilterState(prev => ({ ...prev, category }));
  };

  // Reset all filters back to default
  const handleResetFilters = () => {
    setFilterState(DEFAULT_FILTER_STATE);
  };

  // Apply new filter and sort criteria from modal
  const handleApplyFilters = (nextState: ProductFilterState) => {
    setFilterState(nextState);
  };

  const renderHeader = () => (
    <View style={styles.listHeader}>
      <View style={[styles.banner, { backgroundColor: theme.primaryColor }]}>
        <PrimaryText
          style={[styles.bannerBadge, { color: theme.onPrimaryColor }]}>
          {storeConfig.heroBadge}
        </PrimaryText>
        <PrimaryText
          style={[styles.bannerTitle, { color: theme.onPrimaryColor }]}>
          {storeConfig.welcomeTitle}
        </PrimaryText>
        <PrimaryText
          style={[styles.bannerTagline, { color: theme.onPrimaryColor }]}>
          {storeConfig.tagline}
        </PrimaryText>
      </View>

      {features.loyalty && (
        <LoyaltyBanner
          title={`★ ${storeConfig.logoText} LOYALTY CLUB ENABLED`}
          subtitle={`Earn ${features.loyaltyPointsPerDollar ?? 10} points for every $1 spent on this store.`}
        />
      )}

      {/* Collection title bar with error retry test action */}
      <View style={styles.sectionBar}>
        <View>
          <PrimaryText style={styles.sectionHeading}>COLLECTION</PrimaryText>
          <PrimaryText muted style={styles.sectionSub}>
            {products.length} products •{' '}
            {isLiveMode ? 'Live Shopify Storefront API' : 'Labelled sample catalog'}
          </PrimaryText>
        </View>

        <TouchableOpacity
          onPress={() => reloadProducts(true)}
          style={[
            styles.errorTestBtn,
            {
              borderColor: theme.borderColor,
              backgroundColor: theme.surfaceColor,
            },
          ]}>
          <PrimaryText muted style={styles.errorTestText}>
            Test Error
          </PrimaryText>
        </TouchableOpacity>
      </View>

      {/* Dynamic horizontal category filter chips */}
      <View style={styles.filterSection}>
        <CategoryFilterBar
          categories={categories}
          selectedCategory={filterState.category}
          onSelectCategory={handleSelectCategory}
        />

        {/* Filter and sort action bar */}
        <FilterSortBar
          totalResults={displayedProducts.length}
          filterState={filterState}
          activeFilterCount={activeFilterCount}
          onOpenSort={() => setIsModalVisible(true)}
          onOpenFilter={() => setIsModalVisible(true)}
          onResetFilters={handleResetFilters}
        />
      </View>
    </View>
  );

  return (
    <View style={[styles.root, { backgroundColor: theme.backgroundColor }]}>
      <AppHeader onCartPress={onOpenCart} />

      {isLoadingProducts ? (
        <PrimaryLoader message={`Loading ${storeConfig.storeName} catalog...`} />
      ) : productsError ? (
        <ErrorRetryView
          message={productsError}
          onRetry={() => reloadProducts(false)}
        />
      ) : (
        <FlatList
          data={displayedProducts}
          keyExtractor={item => item.id}
          numColumns={2}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={
            <FilterEmptyState onReset={handleResetFilters} />
          }
          columnWrapperStyle={
            displayedProducts.length > 0 ? styles.columnWrapper : undefined
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.gridItem}>
              <ProductCard product={item} onPress={onSelectProduct} />
            </View>
          )}
        />
      )}

      {/* Filter and Sort bottom sheet modal */}
      <FilterSortModal
        visible={isModalVisible}
        initialState={filterState}
        onClose={() => setIsModalVisible(false)}
        onApply={handleApplyFilters}
      />
    </View>
  );
};

export default HomeScreen;
