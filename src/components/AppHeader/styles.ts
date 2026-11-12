import { StyleSheet } from 'react-native';
import { perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    paddingHorizontal: perfectSize(16),
    paddingBottom: perfectSize(12),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: perfectSize(8),
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: perfectSize(10),
  },
  backBtn: {
    width: perfectSize(36),
    height: perfectSize(36),
    borderRadius: perfectSize(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: perfectSize(18),
    fontWeight: '700',
  },
  brandMark: {
    width: perfectSize(34),
    height: perfectSize(34),
    borderRadius: perfectSize(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandMarkText: {
    fontSize: perfectSize(12),
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    fontSize: perfectSize(15),
    fontWeight: '800',
    letterSpacing: 0.7,
  },
  subtitle: {
    fontSize: perfectSize(10),
    fontWeight: '600',
    letterSpacing: 0.8,
    marginTop: 1,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: perfectSize(8),
  },
  switchPill: {
    borderWidth: 1,
    borderRadius: perfectSize(16),
    paddingHorizontal: perfectSize(10),
    paddingVertical: perfectSize(6),
  },
  switchText: {
    fontSize: perfectSize(11),
    fontWeight: '700',
  },
  cartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: perfectSize(18),
    paddingLeft: perfectSize(10),
    paddingRight: perfectSize(6),
    paddingVertical: perfectSize(5),
    gap: perfectSize(6),
  },
  cartLabel: {
    fontSize: perfectSize(11),
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  badge: {
    minWidth: perfectSize(20),
    height: perfectSize(20),
    borderRadius: perfectSize(10),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: perfectSize(5),
  },
  badgeText: {
    fontSize: perfectSize(11),
    fontWeight: '800',
  },
});

