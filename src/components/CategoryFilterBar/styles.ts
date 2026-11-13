import { StyleSheet } from 'react-native';
import { perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: perfectSize(8),
  },
  scrollContent: {
    gap: perfectSize(8),
    paddingRight: perfectSize(8),
  },
  chip: {
    paddingHorizontal: perfectSize(14),
    paddingVertical: perfectSize(8),
    borderRadius: perfectSize(20),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontSize: perfectSize(12),
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});
