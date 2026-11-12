import React, { FC } from 'react';
import { View } from 'react-native';
import { useStore } from '../../context/StoreContext';
import PrimaryButton from '../PrimaryButton';
import PrimaryText from '../PrimaryText';
import { styles } from './styles';

interface CartEmptyStateProps {
  onBrowseProducts: () => void;
}

const CartEmptyState: FC<CartEmptyStateProps> = ({ onBrowseProducts }) => {
  const { storeConfig } = useStore();
  const { theme } = storeConfig;

  return (
    <View style={styles.emptyState}>
      <View
        style={[styles.emptyIconBox, { backgroundColor: theme.surfaceColor }]}>
        <PrimaryText style={[styles.emptyIcon, { color: theme.primaryColor }]}>
          0
        </PrimaryText>
      </View>
      <PrimaryText style={styles.emptyTitle}>Your bag is empty</PrimaryText>
      <PrimaryText muted style={styles.emptySubtitle}>
        Add products from {storeConfig.storeName} to see them here. Your bag is
        saved automatically across restarts.
      </PrimaryText>
      <PrimaryButton
        label="BROWSE COLLECTION"
        onPress={onBrowseProducts}
        style={styles.browseBtn}
      />
    </View>
  );
};

export default CartEmptyState;

