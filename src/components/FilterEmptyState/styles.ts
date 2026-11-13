import { StyleSheet } from 'react-native';
import { perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: perfectSize(48),
    paddingHorizontal: perfectSize(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBadge: {
    width: perfectSize(56),
    height: perfectSize(56),
    borderRadius: perfectSize(28),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: perfectSize(16),
  },
  iconText: {
    fontSize: perfectSize(24),
  },
  title: {
    fontSize: perfectSize(16),
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: perfectSize(6),
  },
  subtitle: {
    fontSize: perfectSize(13),
    textAlign: 'center',
    marginBottom: perfectSize(20),
    lineHeight: perfectSize(18),
  },
  resetBtn: {
    paddingHorizontal: perfectSize(20),
    paddingVertical: perfectSize(10),
    borderRadius: perfectSize(8),
  },
  resetBtnText: {
    fontSize: perfectSize(12),
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
