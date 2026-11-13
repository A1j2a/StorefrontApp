import React, { FC, useEffect, useRef } from 'react';
import {
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { SplashVideo } from '../../assets';
import { styles } from './styles';

interface SplashScreenProps {
  onFinish: () => void;
}

// Check if RCTVideo native component is compiled in the currently running binary
const checkNativeVideoSupport = (): boolean => {
  try {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      const config = UIManager.getViewManagerConfig
        ? UIManager.getViewManagerConfig('RCTVideo')
        : (UIManager as unknown as Record<string, unknown>).RCTVideo;
      return Boolean(config);
    }
    return false;
  } catch {
    return false;
  }
};

// Fullscreen splash screen playing intro video without overlay icon
const SplashScreen: FC<SplashScreenProps> = ({ onFinish }) => {
  const isFinishedRef = useRef(false);
  const isNativeSupported = checkNativeVideoSupport();

  // Safely resolve Video component only when native binding exists
  let VideoComponent: React.ComponentType<Record<string, unknown>> | null = null;
  if (isNativeSupported) {
    try {
      // Dynamic require avoids module-level invariant crash if binary not yet rebuilt
      VideoComponent = require('react-native-video').default;
    } catch {
      VideoComponent = null;
    }
  }

  // Trigger completion once and avoid duplicate transitions
  const handleFinish = () => {
    if (!isFinishedRef.current) {
      isFinishedRef.current = true;
      onFinish();
    }
  };

  useEffect(() => {
    // If native video is not yet compiled, automatically advance after brief display
    const timeoutDuration = VideoComponent ? 5000 : 2000;
    const safetyTimer = setTimeout(() => {
      handleFinish();
    }, timeoutDuration);

    return () => {
      clearTimeout(safetyTimer);
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Fullscreen video playback if compiled, or fallback background */}
      {VideoComponent ? (
        <VideoComponent
          source={SplashVideo}
          style={styles.videoPlayer}
          resizeMode="cover"
          repeat={false}
          muted={true}
          playInBackground={false}
          playWhenInactive={false}
          ignoreSilentSwitch="ignore"
          onEnd={handleFinish}
          onError={handleFinish}
        />
      ) : (
        <View style={styles.videoPlayer} />
      )}

      {/* Skip button for instant transition */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleFinish}
        style={styles.skipButton}
        accessibilityLabel="Skip splash screen">
        <Text style={styles.skipText}>SKIP →</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;
