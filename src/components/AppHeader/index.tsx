import React, { FC } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppIcon } from '../../assets';
import { useStore } from '../../context/StoreContext';
import { perfectSize } from '../../theme';
import PrimaryText from '../PrimaryText';
import { styles } from './styles';

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  showCart?: boolean;
  onCartPress?: () => void;
  showStoreSwitcher?: boolean;
}

const AppHeader: FC<AppHeaderProps> = ({
  title,
  showBack = false,
  onBackPress,
  showCart = true,
  onCartPress,
  showStoreSwitcher = true,
}) => {
  const insets = useSafeAreaInsets();
  const { storeId, storeConfig, cartItemCount, switchStore } = useStore();
  const { theme } = storeConfig;

  const nextStoreId = storeId === 'store-a' ? 'store-b' : 'store-a';

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingTop: Math.max(insets.top, perfectSize(12)),
          backgroundColor: theme.cardColor,
          borderBottomColor: theme.borderColor,
        },
      ]}>
      <View style={styles.row}>
        <View style={styles.leftGroup}>
          {showBack ? (
            <TouchableOpacity
              onPress={onBackPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={[styles.backBtn, { backgroundColor: theme.surfaceColor }]}
              accessibilityLabel="Go back">
              <PrimaryText style={styles.backArrow}>{'←'}</PrimaryText>
            </TouchableOpacity>
          ) : (
            <View
              style={[styles.brandMark, { backgroundColor: theme.primaryColor }]}>
              <Image
                source={AppIcon}
                style={styles.brandIcon}
                resizeMode="cover"
                accessibilityLabel="Store Logo"
              />
            </View>
          )}

          <View style={styles.titleBlock}>
            <PrimaryText style={styles.title} numberOfLines={1}>
              {title ?? storeConfig.storeName}
            </PrimaryText>
            {!title && (
              <PrimaryText muted style={styles.subtitle} numberOfLines={1}>
                {storeConfig.logoSubtext}
              </PrimaryText>
            )}
          </View>
        </View>

        <View style={styles.rightGroup}>
          {showStoreSwitcher && (
            <TouchableOpacity
              onPress={() => switchStore(nextStoreId)}
              style={[
                styles.switchPill,
                {
                  backgroundColor: theme.accentSoftColor,
                  borderColor: theme.borderColor,
                },
              ]}
              accessibilityLabel="Switch active store configuration">
              <PrimaryText
                style={[styles.switchText, { color: theme.primaryColor }]}>
                {storeId === 'store-a' ? 'Store A ⇄' : 'Store B ⇄'}
              </PrimaryText>
            </TouchableOpacity>
          )}

          {showCart && onCartPress && (
            <TouchableOpacity
              onPress={onCartPress}
              style={[
                styles.cartBtn,
                {
                  backgroundColor: theme.surfaceColor,
                  borderColor: theme.borderColor,
                },
              ]}
              accessibilityLabel="Open shopping cart">
              <PrimaryText style={styles.cartLabel}>BAG</PrimaryText>
              <View
                style={[styles.badge, { backgroundColor: theme.primaryColor }]}>
                <PrimaryText
                  style={[styles.badgeText, { color: theme.onPrimaryColor }]}>
                  {cartItemCount}
                </PrimaryText>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default AppHeader;

