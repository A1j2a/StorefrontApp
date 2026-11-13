import React, { FC, useEffect, useState } from 'react';
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  DEFAULT_FILTER_STATE,
  PRICE_FILTERS,
  SORT_OPTIONS,
} from '../../common';
import { useStore } from '../../context/StoreContext';
import { colors } from '../../theme';
import { PriceFilter, ProductFilterState, SortOption } from '../../types';
import PrimaryText from '../PrimaryText';
import { styles } from './styles';

interface FilterSortModalProps {
  visible: boolean;
  initialState: ProductFilterState;
  activeTab?: 'sort' | 'filter';
  onClose: () => void;
  onApply: (state: ProductFilterState) => void;
}

// Interactive bottom sheet modal for configuring sorting and filter criteria
export const FilterSortModal: FC<FilterSortModalProps> = ({
  visible,
  initialState,
  onClose,
  onApply,
}) => {
  const { storeConfig } = useStore();
  const { theme } = storeConfig;

  const [draftState, setDraftState] = useState<ProductFilterState>(initialState);

  useEffect(() => {
    if (visible) {
      setDraftState(initialState);
    }
  }, [visible, initialState]);

  const handleSelectSort = (sortBy: SortOption) => {
    setDraftState(prev => ({ ...prev, sortBy }));
  };

  const handleToggleInStock = () => {
    setDraftState(prev => ({ ...prev, inStockOnly: !prev.inStockOnly }));
  };

  const handleSelectPrice = (priceRange: PriceFilter) => {
    setDraftState(prev => ({ ...prev, priceRange }));
  };

  const handleReset = () => {
    setDraftState({
      ...DEFAULT_FILTER_STATE,
      category: initialState.category,
    });
  };

  const handleApply = () => {
    onApply(draftState);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalContent,
                { backgroundColor: theme.surfaceColor },
              ]}>
              <View style={styles.dragHandle} />

              <View
                style={[
                  styles.headerRow,
                  { borderBottomColor: theme.borderColor },
                ]}>
                <PrimaryText style={styles.title}>FILTER & SORT</PrimaryText>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={onClose}
                  style={styles.closeBtn}>
                  <PrimaryText muted style={styles.closeText}>
                    ✕
                  </PrimaryText>
                </TouchableOpacity>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollBody}>
                {/* Sort By section */}
                <PrimaryText style={styles.sectionTitle}>SORT BY</PrimaryText>
                <View style={styles.optionsList}>
                  {SORT_OPTIONS.map(opt => {
                    const isSelected = draftState.sortBy === opt.id;
                    return (
                      <TouchableOpacity
                        key={opt.id}
                        activeOpacity={0.8}
                        onPress={() => handleSelectSort(opt.id)}
                        style={[
                          styles.radioRow,
                          {
                            borderColor: isSelected
                              ? theme.primaryColor
                              : theme.borderColor,
                            backgroundColor: isSelected
                              ? theme.accentSoftColor
                              : theme.surfaceColor,
                          },
                        ]}>
                        <PrimaryText
                          style={[
                            styles.radioLabel,
                            {
                              color: isSelected
                                ? theme.primaryColor
                                : theme.textColor,
                            },
                          ]}>
                          {opt.label}
                        </PrimaryText>

                        <View
                          style={[
                            styles.radioIndicator,
                            {
                              borderColor: isSelected
                                ? theme.primaryColor
                                : theme.borderColor,
                            },
                          ]}>
                          {isSelected && (
                            <View
                              style={[
                                styles.radioIndicatorInner,
                                { backgroundColor: theme.primaryColor },
                              ]}
                            />
                          )}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Stock availability section */}
                <PrimaryText style={styles.sectionTitle}>AVAILABILITY</PrimaryText>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleToggleInStock}
                  style={[
                    styles.toggleRow,
                    {
                      borderColor: draftState.inStockOnly
                        ? theme.primaryColor
                        : theme.borderColor,
                      backgroundColor: draftState.inStockOnly
                        ? theme.accentSoftColor
                        : theme.surfaceColor,
                    },
                  ]}>
                  <View style={styles.toggleLabelContainer}>
                    <PrimaryText style={styles.toggleTitle}>
                      In-Stock Items Only
                    </PrimaryText>
                    <PrimaryText muted style={styles.toggleSubtitle}>
                      Hide products that are completely out of stock
                    </PrimaryText>
                  </View>

                  <View
                    style={[
                      styles.switchBox,
                      {
                        backgroundColor: draftState.inStockOnly
                          ? theme.primaryColor
                          : colors.grey300,
                      },
                    ]}>
                    <View
                      style={[
                        styles.switchThumb,
                        draftState.inStockOnly
                          ? styles.switchThumbOn
                          : styles.switchThumbOff,
                      ]}
                    />
                  </View>
                </TouchableOpacity>

                {/* Price range section */}
                <PrimaryText style={styles.sectionTitle}>PRICE RANGE</PrimaryText>
                <View style={styles.chipsRow}>
                  {PRICE_FILTERS.map(filter => {
                    const isSelected = draftState.priceRange === filter.id;
                    return (
                      <TouchableOpacity
                        key={filter.id}
                        activeOpacity={0.8}
                        onPress={() => handleSelectPrice(filter.id)}
                        style={[
                          styles.chip,
                          {
                            borderColor: isSelected
                              ? theme.primaryColor
                              : theme.borderColor,
                            backgroundColor: isSelected
                              ? theme.primaryColor
                              : theme.surfaceColor,
                          },
                        ]}>
                        <PrimaryText
                          style={[
                            styles.chipText,
                            {
                              color: isSelected
                                ? theme.onPrimaryColor
                                : theme.textColor,
                            },
                          ]}>
                          {filter.label}
                        </PrimaryText>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>

              {/* Action buttons */}
              <View
                style={[
                  styles.footerActions,
                  { borderTopColor: theme.borderColor },
                ]}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleReset}
                  style={[
                    styles.resetFooterBtn,
                    {
                      borderColor: theme.borderColor,
                      backgroundColor: theme.surfaceColor,
                    },
                  ]}>
                  <PrimaryText style={styles.resetFooterText}>
                    Reset
                  </PrimaryText>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleApply}
                  style={[
                    styles.applyFooterBtn,
                    { backgroundColor: theme.primaryColor },
                  ]}>
                  <PrimaryText
                    style={[
                      styles.applyFooterText,
                      { color: theme.onPrimaryColor },
                    ]}>
                    Apply Filters
                  </PrimaryText>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FilterSortModal;
