import { StyleSheet } from 'react-native';
import { perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  unavailableNotice: {
    borderRadius: perfectSize(8),
    padding: perfectSize(10),
    marginBottom: perfectSize(12),
  },
  unavailableNoticeText: {
    fontSize: perfectSize(12),
    fontWeight: '600',
  },
  stockWarningNotice: {
    borderRadius: perfectSize(8),
    padding: perfectSize(10),
    marginBottom: perfectSize(12),
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FCD34D',
  },
  stockWarningText: {
    fontSize: perfectSize(12),
    fontWeight: '700',
    color: '#92400E',
  },
  addBtn: {
    marginTop: perfectSize(4),
  },
  addedBar: {
    marginTop: perfectSize(12),
    borderWidth: 1,
    borderRadius: perfectSize(10),
    padding: perfectSize(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addedText: {
    fontSize: perfectSize(12),
    fontWeight: '600',
    flex: 1,
  },
  viewBagText: {
    fontSize: perfectSize(12),
    fontWeight: '800',
    marginLeft: perfectSize(8),
  },
});

