import { StyleSheet } from 'react-native';
import { perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    paddingHorizontal: perfectSize(18),
    paddingTop: perfectSize(14),
  },
  loyaltyNote: {
    borderRadius: perfectSize(8),
    paddingHorizontal: perfectSize(10),
    paddingVertical: perfectSize(7),
    marginBottom: perfectSize(10),
  },
  loyaltyNoteText: {
    fontSize: perfectSize(12),
    fontWeight: '700',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: perfectSize(6),
  },
  summaryLabel: {
    fontSize: perfectSize(13),
  },
  summaryValue: {
    fontSize: perfectSize(13),
    fontWeight: '600',
  },
  totalLabel: {
    fontSize: perfectSize(15),
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  totalValue: {
    fontSize: perfectSize(20),
    fontWeight: '900',
  },
  checkoutBtn: {
    marginTop: perfectSize(10),
  },
});

