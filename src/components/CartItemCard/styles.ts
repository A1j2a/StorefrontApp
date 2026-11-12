import { StyleSheet } from 'react-native';
import { perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  cartCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: perfectSize(12),
    padding: perfectSize(12),
    gap: perfectSize(12),
  },
  thumb: {
    width: perfectSize(84),
    height: perfectSize(98),
    borderRadius: perfectSize(8),
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: perfectSize(8),
  },
  itemTitle: {
    flex: 1,
    fontSize: perfectSize(14),
    fontWeight: '700',
  },
  removeText: {
    fontSize: perfectSize(12),
    fontWeight: '700',
  },
  variantName: {
    fontSize: perfectSize(12),
    marginTop: perfectSize(2),
  },
  itemBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: perfectSize(10),
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: perfectSize(8),
  },
  stepBtn: {
    paddingHorizontal: perfectSize(11),
    paddingVertical: perfectSize(6),
  },
  stepSymbol: {
    fontSize: perfectSize(16),
    fontWeight: '800',
  },
  qtyText: {
    minWidth: perfectSize(24),
    textAlign: 'center',
    fontSize: perfectSize(13),
    fontWeight: '800',
  },
  priceBlock: {
    alignItems: 'flex-end',
  },
  lineTotal: {
    fontSize: perfectSize(15),
    fontWeight: '800',
  },
  unitPrice: {
    fontSize: perfectSize(11),
  },
});

