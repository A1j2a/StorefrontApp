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
  addedFeedback: boolean;
  onAddToCart: () => void;
  onOpenCart: () => void;
}

const AddToCartBar: FC<AddToCartBarProps> = ({
  selectedVariant,
  addedFeedback,
  onAddToCart,
  onOpenCart,
}) => {
  const { storeConfig } = useStore();
  const { theme } = storeConfig;
  const isAvailable = Boolean(selectedVariant?.availableForSale);

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

      <PrimaryButton
        label={isAvailable ? 'ADD TO BAG' : 'UNAVAILABLE — OUT OF STOCK'}
        disabled={!isAvailable}
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

