import React, { FC, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { formatPrice } from '../../common';
import {
  AddToCartBar,
  AppHeader,
  LoyaltyBanner,
  PrimaryText,
  ProductImage,
  ReviewsSection,
  VariantSelector,
} from '../../components';
import { useStore } from '../../context/StoreContext';
import { perfectSize } from '../../theme';
import { Product, ProductVariant } from '../../types';
import { styles } from './styles';

interface ProductDetailsScreenProps {
  product: Product;
  onBack: () => void;
  onOpenCart: () => void;
}

const ProductDetailsScreen: FC<ProductDetailsScreenProps> = ({
  product,
  onBack,
  onOpenCart,
}) => {
  const insets = useSafeAreaInsets();
  const { storeConfig, cartItems, addToCart } = useStore();
  const { theme, currencySymbol, features } = storeConfig;

  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    () =>
      (product.variants.find(v => v.availableForSale) ?? product.variants[0])
        ?.id ?? '',
  );
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    const initial =
      product.variants.find(v => v.availableForSale) ?? product.variants[0];
    setSelectedVariantId(initial?.id ?? '');
    setAddedFeedback(false);
  }, [product]);

  const selectedVariant =
    product.variants.find(v => v.id === selectedVariantId) ??
    product.variants[0];

  const currentCartItem = cartItems.find(
    i => i.variantId === selectedVariant?.id,
  );
  const currentCartQuantity = currentCartItem?.quantity ?? 0;

  const maxStock =
    typeof selectedVariant?.quantityAvailable === 'number'
      ? selectedVariant.quantityAvailable
      : selectedVariant?.availableForSale
        ? 10
        : 0;

  const isAvailable = Boolean(selectedVariant?.availableForSale) && maxStock > 0;

  const handleSelectVariant = (variant: ProductVariant) => {
    setSelectedVariantId(variant.id);
    setAddedFeedback(false);
  };

  const handleAddToCart = () => {
    if (!selectedVariant || !isAvailable) {
      return;
    }
    addToCart(product, selectedVariant);
    setAddedFeedback(true);
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.backgroundColor }]}>
      <AppHeader
        title="PRODUCT DETAILS"
        showBack
        onBackPress={onBack}
        onCartPress={onOpenCart}
        showStoreSwitcher={false}
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, perfectSize(24)) },
        ]}
        showsVerticalScrollIndicator={false}>
        <ProductImage
          uri={product.imageUrl}
          label={product.title}
          containerStyle={styles.heroImage}
        />

        <View style={styles.content}>
          <View style={styles.metaRow}>
            <PrimaryText muted style={styles.category}>
              {product.category.toUpperCase()}
            </PrimaryText>
            <View
              style={[
                styles.stockPill,
                !isAvailable
                  ? styles.stockPillDanger
                  : maxStock <= 3
                    ? styles.stockPillWarning
                    : styles.stockPillSuccess,
              ]}>
              <PrimaryText
                style={[
                  styles.stockPillText,
                  !isAvailable
                    ? styles.stockTextDanger
                    : maxStock <= 3
                      ? styles.stockTextWarning
                      : styles.stockTextSuccess,
                ]}>
                {!isAvailable
                  ? 'Out of Stock (0)'
                  : maxStock <= 3
                    ? `Only ${maxStock} left!`
                    : `In Stock (${maxStock} available)`}
              </PrimaryText>
            </View>
          </View>

          <PrimaryText style={styles.title}>{product.title}</PrimaryText>

          <View style={styles.priceRow}>
            <PrimaryText style={[styles.price, { color: theme.primaryColor }]}>
              {selectedVariant
                ? formatPrice(selectedVariant.price, currencySymbol)
                : '--'}
            </PrimaryText>
            {selectedVariant && (
              <PrimaryText muted style={styles.skuText}>
                SKU: {selectedVariant.sku}
              </PrimaryText>
            )}
          </View>

          <PrimaryText muted style={styles.description}>
            {product.description}
          </PrimaryText>

          <VariantSelector
            variants={product.variants}
            selectedVariantId={selectedVariant?.id ?? ''}
            onSelectVariant={handleSelectVariant}
          />

          <AddToCartBar
            selectedVariant={selectedVariant}
            cartQuantity={currentCartQuantity}
            addedFeedback={addedFeedback}
            onAddToCart={handleAddToCart}
            onOpenCart={onOpenCart}
          />

          {features.loyalty && selectedVariant && (
            <LoyaltyBanner
              title="★ LOYALTY REWARD"
              subtitle={`You will earn ${Math.round(
                selectedVariant.price * (features.loyaltyPointsPerDollar ?? 10),
              )} ${storeConfig.logoText} points on this item.`}
              style={styles.loyaltyCard}
            />
          )}

          {features.reviews && <ReviewsSection productId={product.id} />}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetailsScreen;
