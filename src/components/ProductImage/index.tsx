import React, { FC, useState } from 'react';
import { Image, ImageStyle, StyleProp, View, ViewStyle } from 'react-native';
import { useStore } from '../../context/StoreContext';
import PrimaryText from '../PrimaryText';
import { styles } from './styles';

interface ProductImageProps {
  uri: string;
  label: string;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const ProductImage: FC<ProductImageProps> = ({
  uri,
  label,
  style,
  containerStyle,
}) => {
  const { storeConfig } = useStore();
  const [hasError, setHasError] = useState(false);

  const initials = label
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();

  if (hasError || !uri) {
    return (
      <View
        style={[
          styles.fallback,
          { backgroundColor: storeConfig.theme.surfaceColor },
          containerStyle,
        ]}>
        <PrimaryText
          style={[styles.initials, { color: storeConfig.theme.primaryColor }]}>
          {initials}
        </PrimaryText>
        <PrimaryText muted style={styles.caption} numberOfLines={1}>
          {storeConfig.logoText}
        </PrimaryText>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: storeConfig.theme.surfaceColor },
        containerStyle,
      ]}>
      <Image
        source={{ uri }}
        style={[styles.image, style]}
        resizeMode="cover"
        onError={() => setHasError(true)}
      />
    </View>
  );
};

export default ProductImage;

