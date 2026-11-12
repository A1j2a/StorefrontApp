import React, { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useStore } from '../../context/StoreContext';
import PrimaryText from '../PrimaryText';
import { styles } from './styles';

interface LoyaltyBannerProps {
  title: string;
  subtitle: string;
  style?: StyleProp<ViewStyle>;
}

const LoyaltyBanner: FC<LoyaltyBannerProps> = ({ title, subtitle, style }) => {
  const { storeConfig } = useStore();
  const { theme } = storeConfig;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.accentSoftColor,
          borderColor: theme.borderColor,
        },
        style,
      ]}>
      <PrimaryText style={[styles.title, { color: theme.primaryColor }]}>
        {title}
      </PrimaryText>
      <PrimaryText muted style={styles.subtitle}>
        {subtitle}
      </PrimaryText>
    </View>
  );
};

export default LoyaltyBanner;

