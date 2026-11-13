import React, { FC, useEffect, useRef } from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Video from 'react-native-video';
import { SplashVideo } from '../../assets';
import { styles } from './styles';

interface SplashScreenProps {
  onFinish: () => void;
}

// Fullscreen splash screen playing intro video without overlay icon
const SplashScreen: FC<SplashScreenProps> = ({ onFinish }) => {
  const isFinishedRef = useRef(false);

  // Trigger completion once and avoid duplicate transitions
  const handleFinish = () => {
    if (!isFinishedRef.current) {
      isFinishedRef.current = true;
      onFinish();
    }
  };

  useEffect(() => {
    // Fallback safety timeout in case video stalls or fails to report end
    const safetyTimer = setTimeout(() => {
      handleFinish();
    }, 4500);

    return () => {
      clearTimeout(safetyTimer);
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Fullscreen splash video playback */}
      <Video
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
