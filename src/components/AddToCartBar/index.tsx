import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useStore } from '../../context/StoreContext';
import { colors } from '../../theme';
import { ProductVariant } from '../../types';
import PrimaryButton from '../PrimaryButton';
import PrimaryText from '../PrimaryText';
import { styles } from './styles';

interface AddToCartBarProps {
  selectedVariant?: ProductVariant;
  cartQuantity?: number;
  addedFeedback: boolean;
  onAddToCart: () => void;
  onOpenCart: () => void;
}

const AddToCartBar: FC<AddToCartBarProps> = ({
  selectedVariant,
  cartQuantity = 0,
  addedFeedback,
  onAddToCart,
  onOpenCart,
}) => {
  const { storeConfig } = useStore();
  const { theme } = storeConfig;

  const maxStock =
    typeof selectedVariant?.quantityAvailable === 'number'
      ? selectedVariant.quantityAvailable
      : selectedVariant?.availableForSale
        ? 10
        : 0;

  const isAvailable = Boolean(selectedVariant?.availableForSale) && maxStock > 0;
  const isMaxReached = isAvailable && cartQuantity >= maxStock;
  const isButtonDisabled = !isAvailable || isMaxReached;

  const buttonLabel = !isAvailable
    ? 'UNAVAILABLE — OUT OF STOCK'
    : isMaxReached
      ? `MAX QUANTITY IN BAG (${cartQuantity})`
      : 'ADD TO BAG';

  return (
    <View>
      {!isAvailable && (
        <View
          style={[
            styles.unavailableNotice,
            { backgroundColor: colors.dangerBg },
          ]}>
          <PrimaryText
            style={[styles.unavailableNoticeText, { color: colors.danger }]}>
            This variant is currently out of stock and cannot be added to your
            bag.
          </PrimaryText>
        </View>
      )}

      {isMaxReached && (
        <View style={styles.stockWarningNotice}>
          <PrimaryText style={styles.stockWarningText}>
            You already have all {maxStock} available item(s) in your bag.
          </PrimaryText>
        </View>
      )}

      <PrimaryButton
        label={buttonLabel}
        disabled={isButtonDisabled}
        onPress={onAddToCart}
        style={styles.addBtn}
      />

      {addedFeedback && selectedVariant && (
        <View
          style={[
            styles.addedBar,
            {
              backgroundColor: theme.accentSoftColor,
              borderColor: theme.borderColor,
            },
          ]}>
          <PrimaryText style={styles.addedText}>
            Added {selectedVariant.title} to your bag.
          </PrimaryText>
          <TouchableOpacity onPress={onOpenCart}>
            <PrimaryText
              style={[styles.viewBagText, { color: theme.primaryColor }]}>
              View Bag →
            </PrimaryText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AddToCartBar;

