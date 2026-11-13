import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useStore } from '../../context/StoreContext';
import PrimaryText from '../PrimaryText';
import { styles } from './styles';

interface FilterEmptyStateProps {
  onReset: () => void;
}

// Visual fallback shown when no products match the active filter criteria
export const FilterEmptyState: FC<FilterEmptyStateProps> = ({ onReset }) => {
  const { storeConfig } = useStore();
  const { theme } = storeConfig;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconBadge,
          { backgroundColor: theme.accentSoftColor },
        ]}>
        <PrimaryText style={styles.iconText}>🔍</PrimaryText>
      </View>

      <PrimaryText style={styles.title}>No Products Found</PrimaryText>
      <PrimaryText muted style={styles.subtitle}>
        We couldn&apos;t find any items matching your filter settings. Try adjusting your filters.
      </PrimaryText>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onReset}
        style={[
          styles.resetBtn,
          { backgroundColor: theme.primaryColor },
        ]}>
        <PrimaryText
          style={[
            styles.resetBtnText,
            { color: theme.onPrimaryColor },
          ]}>
          RESET ALL FILTERS
        </PrimaryText>
      </TouchableOpacity>
    </View>
  );
};

export default FilterEmptyState;

