import { StyleSheet } from 'react-native';
import { colors, perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  videoPlayer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#000000',
  },
  skipButton: {
    position: 'absolute',
    top: perfectSize(50),
    right: perfectSize(20),
    paddingHorizontal: perfectSize(14),
    paddingVertical: perfectSize(6),
    borderRadius: perfectSize(16),
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    zIndex: 10,
  },
  skipText: {
    color: colors.white,
    fontSize: perfectSize(12),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
