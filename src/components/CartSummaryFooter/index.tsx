import React, { FC } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { formatPrice } from '../../common';
import { useStore } from '../../context/StoreContext';
import { perfectSize } from '../../theme';
import PrimaryButton from '../PrimaryButton';
import PrimaryText from '../PrimaryText';
import { styles } from './styles';

interface CartSummaryFooterProps {
  onCheckoutPress: () => void;
}

const CartSummaryFooter: FC<CartSummaryFooterProps> = ({ onCheckoutPress }) => {
  const insets = useSafeAreaInsets();
  const { storeConfig, cartItemCount, cartSubtotal } = useStore();
  const { theme, currencySymbol, features } = storeConfig;

  return (
    <View
      style={[
        styles.footer,
        {
          backgroundColor: theme.cardColor,
          borderTopColor: theme.borderColor,
          paddingBottom: Math.max(insets.bottom, perfectSize(16)),
        },
      ]}>
      {features.loyalty && (
        <View
          style={[
            styles.loyaltyNote,
            { backgroundColor: theme.accentSoftColor },
          ]}>
          <PrimaryText
            style={[styles.loyaltyNoteText, { color: theme.primaryColor }]}>
            ★ Order earns{' '}
            {Math.round(cartSubtotal * (features.loyaltyPointsPerDollar ?? 10))}{' '}
            loyalty points
          </PrimaryText>
        </View>
      )}

      <View style={styles.summaryRow}>
        <PrimaryText muted style={styles.summaryLabel}>
          Items ({cartItemCount})
        </PrimaryText>
        <PrimaryText style={styles.summaryValue}>
          {formatPrice(cartSubtotal, currencySymbol)}
        </PrimaryText>
      </View>

      <View style={styles.summaryRow}>
        <PrimaryText style={styles.totalLabel}>SUBTOTAL</PrimaryText>
        <PrimaryText style={[styles.totalValue, { color: theme.primaryColor }]}>
          {formatPrice(cartSubtotal, currencySymbol)}
        </PrimaryText>
      </View>

      <PrimaryButton
        label="CHECKOUT"
        onPress={onCheckoutPress}
        style={styles.checkoutBtn}
      />
    </View>
  );
};

export default CartSummaryFooter;

