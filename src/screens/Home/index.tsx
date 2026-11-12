import React, { FC } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import {
  AppHeader,
  ErrorRetryView,
  LoyaltyBanner,
  PrimaryLoader,
  PrimaryText,
  ProductCard,
} from '../../components';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { styles } from './styles';

interface HomeScreenProps {
  onSelectProduct: (product: Product) => void;
  onOpenCart: () => void;
}

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
          data={products}
          keyExtractor={item => item.id}
          numColumns={2}
          ListHeaderComponent={renderHeader}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.gridItem}>
              <ProductCard product={item} onPress={onSelectProduct} />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default HomeScreen;
