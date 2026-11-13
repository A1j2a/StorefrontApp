import { StyleSheet } from 'react-native';
import { colors, perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: perfectSize(24),
  },
  videoContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#09090B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButton: {
    position: 'absolute',
    top: perfectSize(50),
    right: perfectSize(20),
    paddingHorizontal: perfectSize(14),
    paddingVertical: perfectSize(6),
    borderRadius: perfectSize(16),
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    zIndex: 10,
  },
  skipText: {
    color: colors.white,
    fontSize: perfectSize(12),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  iconWrapper: {
    width: perfectSize(110),
    height: perfectSize(110),
    borderRadius: perfectSize(26),
    overflow: 'hidden',
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: perfectSize(20),
  },
  appIcon: {
    width: '100%',
    height: '100%',
  },
  storeTitle: {
    color: colors.white,
    fontSize: perfectSize(24),
    fontWeight: '900',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: perfectSize(6),
  },
  storeSub: {
    color: '#A1A1AA',
    fontSize: perfectSize(12),
    fontWeight: '600',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: perfectSize(32),
  },
  progressTrack: {
    width: perfectSize(180),
    height: perfectSize(4),
    borderRadius: perfectSize(2),
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
    marginBottom: perfectSize(12),
  },
  progressFill: {
    height: '100%',
    borderRadius: perfectSize(2),
  },
  progressFillDefault: {
    backgroundColor: colors.white,
  },
  loadingLabel: {
    color: '#71717A',
    fontSize: perfectSize(10),
    fontWeight: '700',
    letterSpacing: 1.2,
  },
});
