import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { formatPrice } from '../../common';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import PrimaryText from '../PrimaryText';
import ProductImage from '../ProductImage';
import { styles } from './styles';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, onPress }) => {
  const { storeConfig } = useStore();
  const { theme, currencySymbol } = storeConfig;

  const firstAvailable = product.variants.find(v => v.availableForSale);
  const displayVariant = firstAvailable ?? product.variants[0];
  const hasAnyStock = Boolean(firstAvailable);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress(product)}
      style={[
        styles.card,
        {
          backgroundColor: theme.cardColor,
          borderColor: theme.borderColor,
        },
      ]}>
      <View style={styles.imageContainer}>
        <ProductImage
          uri={product.imageUrl}
          label={product.title}
          containerStyle={styles.image}
        />
        {product.badge && (
          <View style={[styles.badge, { backgroundColor: theme.badgeBgColor }]}>
            <PrimaryText
              style={[styles.badgeText, { color: theme.badgeTextColor }]}>
              {product.badge}
            </PrimaryText>
          </View>
        )}
      </View>

      <View style={styles.body}>
        <PrimaryText muted style={styles.category} numberOfLines={1}>
          {product.category.toUpperCase()}
        </PrimaryText>
        <PrimaryText style={styles.title} numberOfLines={2}>
          {product.title}
        </PrimaryText>

        <View style={styles.footerRow}>
          <PrimaryText style={[styles.price, { color: theme.primaryColor }]}>
            {displayVariant
              ? formatPrice(displayVariant.price, currencySymbol)
              : '--'}
          </PrimaryText>
          <PrimaryText muted style={styles.variantsCount}>
            {hasAnyStock ? `${product.variants.length} options` : 'Sold out'}
          </PrimaryText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

