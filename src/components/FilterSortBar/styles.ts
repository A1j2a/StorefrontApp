import { StyleSheet } from 'react-native';
import { perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: perfectSize(10),
    marginBottom: perfectSize(4),
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: perfectSize(6),
  },
  countText: {
    fontSize: perfectSize(12),
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  resetButton: {
    paddingHorizontal: perfectSize(6),
    paddingVertical: perfectSize(2),
  },
  resetText: {
    fontSize: perfectSize(11),
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: perfectSize(8),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: perfectSize(10),
    paddingVertical: perfectSize(6),
    borderRadius: perfectSize(8),
    borderWidth: 1,
    gap: perfectSize(4),
  },
  actionText: {
    fontSize: perfectSize(11),
    fontWeight: '700',
  },
  badge: {
    minWidth: perfectSize(16),
    height: perfectSize(16),
    borderRadius: perfectSize(8),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: perfectSize(4),
  },
  badgeText: {
    fontSize: perfectSize(9),
    fontWeight: '900',
  },
});
