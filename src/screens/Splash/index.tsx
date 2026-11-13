import React, { FC, useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppIcon, SplashVideo } from '../../assets';
import { useStore } from '../../context/StoreContext';
import { styles } from './styles';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: FC<SplashScreenProps> = ({ onFinish }) => {
  const { storeConfig } = useStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Reference SplashVideo asset for video player support
    if (!SplashVideo) {
      return;
    }
    let isMounted = true;

    // Fade and scale in smoothly
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
    ]).start();

    // Auto-advance to Welcome screen after splash animation completes
    const timer = setTimeout(() => {
      if (isMounted) {
        onFinish();
      }
    }, 2200);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [fadeAnim, scaleAnim, progressAnim, onFinish]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onFinish}
        style={styles.skipButton}
        accessibilityLabel="Skip splash screen">
        <Text style={styles.skipText}>SKIP →</Text>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}>
        <View style={styles.iconWrapper}>
          <Image
            source={AppIcon}
            style={styles.appIcon}
            resizeMode="cover"
            accessibilityLabel="App Icon"
          />
        </View>

        <Text style={styles.storeTitle}>
          {storeConfig.storeName}
        </Text>
        <Text style={styles.storeSub}>
          {storeConfig.logoSubtext}
        </Text>

        <View style={styles.progressTrack}>
          <Animated.View
            style={[
              styles.progressFill,
              styles.progressFillDefault,
              { width: progressWidth },
            ]}
          />
        </View>

        <Text style={styles.loadingLabel}>
          LOADING STORE EXPERIENCE
        </Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
