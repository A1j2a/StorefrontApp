import React, { FC } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useStore } from '../../context/StoreContext';
import PrimaryText from '../PrimaryText';
import { styles } from './styles';

interface CategoryFilterBarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

// Horizontal category chips list for one-tap product filtering
export const CategoryFilterBar: FC<CategoryFilterBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const { storeConfig } = useStore();
  const { theme } = storeConfig;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.scrollContent}>
      {categories.map(category => {
        const isSelected =
          category.toLowerCase() === selectedCategory.toLowerCase();

        return (
          <TouchableOpacity
            key={category}
            activeOpacity={0.8}
            onPress={() => onSelectCategory(category)}
            style={[
              styles.chip,
              {
                backgroundColor: isSelected
                  ? theme.primaryColor
                  : theme.surfaceColor,
                borderColor: isSelected
                  ? theme.primaryColor
                  : theme.borderColor,
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
              {category.toUpperCase()}
            </PrimaryText>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default CategoryFilterBar;
