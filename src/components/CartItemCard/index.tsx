import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  calculateSubtotalCents,
  centsToAmount,
  formatPrice,
} from '../../common';
import { useStore } from '../../context/StoreContext';
import { colors } from '../../theme';
import { CartItem } from '../../types';
import PrimaryText from '../PrimaryText';
import ProductImage from '../ProductImage';
import { styles } from './styles';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (variantId: string, nextQuantity: number) => void;
  onRemove: (variantId: string) => void;
}

const CartItemCard: FC<CartItemCardProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const { storeConfig } = useStore();
  const { theme, currencySymbol } = storeConfig;

  const lineTotal = centsToAmount(
    calculateSubtotalCents(item.price, item.quantity),
  );

  return (
    <View
      style={[
        styles.cartCard,
        {
          backgroundColor: theme.cardColor,
          borderColor: theme.borderColor,
        },
      ]}>
      <ProductImage
        uri={item.imageUrl}
        label={item.productTitle}
        containerStyle={styles.thumb}
      />

      <View style={styles.itemDetails}>
        <View style={styles.itemHeader}>
          <PrimaryText style={styles.itemTitle} numberOfLines={2}>
            {item.productTitle}
          </PrimaryText>
          <TouchableOpacity
            onPress={() => onRemove(item.variantId)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <PrimaryText style={[styles.removeText, { color: colors.danger }]}>
              Remove
            </PrimaryText>
          </TouchableOpacity>
        </View>

        <PrimaryText muted style={styles.variantName}>
          {item.variantTitle}
        </PrimaryText>

        <View style={styles.itemBottomRow}>
          <View
            style={[
              styles.stepper,
              {
                borderColor: theme.borderColor,
                backgroundColor: theme.surfaceColor,
              },
            ]}>
            <TouchableOpacity
              onPress={() => onUpdateQuantity(item.variantId, item.quantity - 1)}
              style={styles.stepBtn}
              accessibilityLabel="Decrease quantity">
              <PrimaryText style={styles.stepSymbol}>−</PrimaryText>
            </TouchableOpacity>

            <PrimaryText style={styles.qtyText}>{item.quantity}</PrimaryText>

            <TouchableOpacity
              onPress={() => onUpdateQuantity(item.variantId, item.quantity + 1)}
              style={styles.stepBtn}
              accessibilityLabel="Increase quantity">
              <PrimaryText style={styles.stepSymbol}>+</PrimaryText>
            </TouchableOpacity>
          </View>

          <View style={styles.priceBlock}>
            <PrimaryText style={styles.lineTotal}>
              {formatPrice(lineTotal, currencySymbol)}
            </PrimaryText>
            <PrimaryText muted style={styles.unitPrice}>
              {formatPrice(item.price, currencySymbol)} each
            </PrimaryText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItemCard;

