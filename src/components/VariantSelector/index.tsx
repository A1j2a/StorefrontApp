import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { formatPrice } from '../../common';
import { useStore } from '../../context/StoreContext';
import { colors } from '../../theme';
import { ProductVariant } from '../../types';
import PrimaryText from '../PrimaryText';
import { styles } from './styles';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string;
  onSelectVariant: (variant: ProductVariant) => void;
}

const VariantSelector: FC<VariantSelectorProps> = ({
  variants,
  selectedVariantId,
  onSelectVariant,
}) => {
  const { storeConfig } = useStore();
  const { theme, currencySymbol } = storeConfig;

  return (
    <View style={styles.section}>
      <PrimaryText style={styles.sectionLabel}>
        SELECT VARIANT (COLOR / SIZE)
      </PrimaryText>
      <View style={styles.grid}>
        {variants.map(variant => {
          const isSelected = variant.id === selectedVariantId;
          const available = variant.availableForSale;

          return (
            <TouchableOpacity
              key={variant.id}
              activeOpacity={0.8}
              onPress={() => onSelectVariant(variant)}
              style={[
                styles.chip,
                {
                  backgroundColor: isSelected
                    ? theme.primaryColor
                    : available
                      ? theme.cardColor
                      : theme.surfaceColor,
                  borderColor: isSelected
                    ? theme.primaryColor
                    : theme.borderColor,
                },
                !available && styles.dashedChip,
                !available && !isSelected && styles.unavailableChip,
              ]}>
              <PrimaryText
                style={[
                  styles.variantTitle,
                  {
                    color: isSelected ? theme.onPrimaryColor : theme.textColor,
                  },
                  !available && styles.strikeText,
                ]}>
                {variant.title}
              </PrimaryText>
              <PrimaryText
                style={[
                  styles.variantSub,
                  {
                    color: isSelected
                      ? theme.onPrimaryColor
                      : available
                        ? theme.mutedTextColor
                        : colors.danger,
                  },
                ]}>
                {available
                  ? `${formatPrice(variant.price, currencySymbol)}${
                      variant.quantityAvailable > 0 && variant.quantityAvailable <= 3
                        ? ` • ${variant.quantityAvailable} left`
                        : ''
                    }`
                  : 'Out of Stock (0)'}
              </PrimaryText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default VariantSelector;

