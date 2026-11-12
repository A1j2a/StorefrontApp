import { StyleSheet } from 'react-native';
import { perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: perfectSize(12),
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageContainer: {
    height: perfectSize(175),
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: perfectSize(8),
    left: perfectSize(8),
    paddingHorizontal: perfectSize(8),
    paddingVertical: perfectSize(4),
    borderRadius: perfectSize(4),
  },
  badgeText: {
    fontSize: perfectSize(9),
    fontWeight: '800',
    letterSpacing: 0.7,
  },
  body: {
    padding: perfectSize(12),
  },
  category: {
    fontSize: perfectSize(10),
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: perfectSize(14),
    fontWeight: '700',
    marginTop: perfectSize(4),
    minHeight: perfectSize(36),
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: perfectSize(8),
  },
  price: {
    fontSize: perfectSize(15),
    fontWeight: '800',
  },
  variantsCount: {
    fontSize: perfectSize(11),
    fontWeight: '500',
  },
});

