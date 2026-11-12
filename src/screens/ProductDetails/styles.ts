import { StyleSheet } from 'react-native';
import { perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroImage: {
    width: '100%',
    height: perfectSize(320),
  },
  content: {
    padding: perfectSize(18),
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: perfectSize(8),
  },
  category: {
    fontSize: perfectSize(11),
    fontWeight: '700',
    letterSpacing: 1,
  },
  stockPill: {
    paddingHorizontal: perfectSize(10),
    paddingVertical: perfectSize(4),
    borderRadius: perfectSize(12),
  },
  stockPillText: {
    fontSize: perfectSize(11),
    fontWeight: '700',
  },
  title: {
    fontSize: perfectSize(22),
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: perfectSize(8),
    marginBottom: perfectSize(14),
  },
  price: {
    fontSize: perfectSize(22),
    fontWeight: '900',
  },
  skuText: {
    fontSize: perfectSize(11),
    fontWeight: '600',
  },
  description: {
    fontSize: perfectSize(14),
    lineHeight: perfectSize(21),
    marginBottom: perfectSize(20),
  },
  loyaltyCard: {
    marginTop: perfectSize(18),
    marginBottom: 0,
  },
});

