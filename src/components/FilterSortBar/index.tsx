import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SORT_OPTIONS } from '../../common';
import { useStore } from '../../context/StoreContext';
import { ProductFilterState } from '../../types';
import PrimaryText from '../PrimaryText';
import { styles } from './styles';

interface FilterSortBarProps {
  totalResults: number;
  filterState: ProductFilterState;
  activeFilterCount: number;
  onOpenSort: () => void;
  onOpenFilter: () => void;
  onResetFilters: () => void;
}

// Action bar offering sort trigger, filter trigger, and active filter counters
export const FilterSortBar: FC<FilterSortBarProps> = ({
  totalResults,
  filterState,
  activeFilterCount,
  onOpenSort,
  onOpenFilter,
  onResetFilters,
}) => {
  const { storeConfig } = useStore();
  const { theme } = storeConfig;

  const currentSortLabel =
    SORT_OPTIONS.find(opt => opt.id === filterState.sortBy)?.label ?? 'Sort';

  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <PrimaryText muted style={styles.countText}>
          {totalResults} {totalResults === 1 ? 'PRODUCT' : 'PRODUCTS'}
        </PrimaryText>
        {activeFilterCount > 0 && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onResetFilters}
            style={styles.resetButton}>
            <PrimaryText style={[styles.resetText, { color: theme.primaryColor }]}>
              Clear
            </PrimaryText>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onOpenSort}
          style={[
            styles.actionButton,
            {
              backgroundColor: theme.surfaceColor,
              borderColor: theme.borderColor,
            },
          ]}>
          <PrimaryText style={styles.actionText}>⇅ {currentSortLabel}</PrimaryText>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onOpenFilter}
          style={[
            styles.actionButton,
            {
              backgroundColor: activeFilterCount > 0
                ? theme.primaryColor
                : theme.surfaceColor,
              borderColor: activeFilterCount > 0
                ? theme.primaryColor
                : theme.borderColor,
            },
          ]}>
          <PrimaryText
            style={[
              styles.actionText,
              {
                color: activeFilterCount > 0
                  ? theme.onPrimaryColor
                  : theme.textColor,
              },
            ]}>
            ⚙ Filters
          </PrimaryText>
          {activeFilterCount > 0 && (
            <View
              style={[
                styles.badge,
                { backgroundColor: theme.onPrimaryColor },
              ]}>
              <PrimaryText
                style={[
                  styles.badgeText,
                  { color: theme.primaryColor },
                ]}>
                {activeFilterCount}
              </PrimaryText>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterSortBar;

