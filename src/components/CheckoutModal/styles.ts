import { StyleSheet } from 'react-native';
import { colors, perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: colors.black50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: perfectSize(20),
  },
  modalCard: {
    width: '100%',
    borderRadius: perfectSize(14),
    borderWidth: 1,
    padding: perfectSize(20),
  },
  modalTitle: {
    fontSize: perfectSize(16),
    fontWeight: '900',
    letterSpacing: 0.7,
    marginBottom: perfectSize(6),
  },
  modalAmount: {
    fontSize: perfectSize(15),
    fontWeight: '700',
    marginBottom: perfectSize(12),
  },
  urlBox: {
    borderWidth: 1,
    borderRadius: perfectSize(8),
    padding: perfectSize(10),
    marginBottom: perfectSize(10),
  },
  urlLabel: {
    fontSize: perfectSize(10),
    fontWeight: '800',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  urlValue: {
    fontSize: perfectSize(11),
    fontWeight: '600',
  },
  modalExplain: {
    fontSize: perfectSize(12),
    lineHeight: perfectSize(18),
    marginBottom: perfectSize(16),
  },
  modalActions: {
    gap: perfectSize(8),
  },
  modalBtn: {
    width: '100%',
  },
});

