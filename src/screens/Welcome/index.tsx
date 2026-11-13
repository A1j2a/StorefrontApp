import React, { FC } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppIcon } from '../../assets';
import { PrimaryButton, PrimaryText } from '../../components';
import { STORE_LIST } from '../../config/stores';
import { useStore } from '../../context/StoreContext';
import { perfectSize } from '../../theme';
import { styles } from './styles';

interface WelcomeScreenProps {
  onContinue: () => void;
}

const WelcomeScreen: FC<WelcomeScreenProps> = ({ onContinue }) => {
  const insets = useSafeAreaInsets();
  const { storeId, storeConfig, switchStore } = useStore();
  const { theme } = storeConfig;

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: theme.backgroundColor,
          paddingTop: Math.max(insets.top, perfectSize(20)),
          paddingBottom: Math.max(insets.bottom, perfectSize(20)),
        },
      ]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <View
            style={[styles.heroPill, { backgroundColor: theme.badgeBgColor }]}>
            <PrimaryText
              style={[styles.heroPillText, { color: theme.badgeTextColor }]}>
              {storeConfig.heroBadge}
            </PrimaryText>
          </View>

          <TouchableOpacity
            onPress={onContinue}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <PrimaryText muted style={styles.skipText}>
              Skip
            </PrimaryText>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.brandHeroCard,
            { backgroundColor: theme.primaryColor },
          ]}>
          <View
            style={[styles.logoContainer, { borderColor: theme.onPrimaryColor }]}>
            <Image
              source={AppIcon}
              style={styles.heroLogo}
              resizeMode="cover"
              accessibilityLabel="Brand Icon"
            />
          </View>

          <PrimaryText
            style={[styles.storeName, { color: theme.onPrimaryColor }]}>
            {storeConfig.storeName}
          </PrimaryText>
          <PrimaryText
            style={[styles.storeSub, { color: theme.onPrimaryColor }]}>
            {storeConfig.logoSubtext}
          </PrimaryText>
        </View>

        <View style={styles.copySection}>
          <PrimaryText style={styles.welcomeTitle}>
            {storeConfig.welcomeTitle}
          </PrimaryText>
          <PrimaryText muted style={styles.welcomeMessage}>
            {storeConfig.welcomeMessage}
          </PrimaryText>
        </View>

        <View
          style={[
            styles.switcherCard,
            {
              backgroundColor: theme.surfaceColor,
              borderColor: theme.borderColor,
            },
          ]}>
          <PrimaryText muted style={styles.switcherLabel}>
            MULTI-STORE CONFIGURATION DEMO
          </PrimaryText>
          <View style={styles.switcherRow}>
            {STORE_LIST.map(store => {
              const active = store.storeId === storeId;
              return (
                <TouchableOpacity
                  key={store.storeId}
                  onPress={() => switchStore(store.storeId)}
                  style={[
                    styles.storeOption,
                    {
                      backgroundColor: active
                        ? theme.primaryColor
                        : theme.cardColor,
                      borderColor: active
                        ? theme.primaryColor
                        : theme.borderColor,
                    },
                  ]}>
                  <PrimaryText
                    style={[
                      styles.storeOptionTitle,
                      {
                        color: active ? theme.onPrimaryColor : theme.textColor,
                      },
                    ]}>
                    {store.storeName}
                  </PrimaryText>
                  <PrimaryText
                    style={[
                      styles.storeOptionMeta,
                      {
                        color: active
                          ? theme.onPrimaryColor
                          : theme.mutedTextColor,
                      },
                    ]}>
                    {store.features.reviews
                      ? 'Black/White • Reviews'
                      : 'Pink/White • Loyalty'}
                  </PrimaryText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton label="GET STARTED" onPress={onContinue} />
      </View>
    </View>
  );
};

export default WelcomeScreen;
