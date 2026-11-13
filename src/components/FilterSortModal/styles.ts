import { StyleSheet } from 'react-native';
import { colors, perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.black50,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: perfectSize(24),
    borderTopRightRadius: perfectSize(24),
    paddingTop: perfectSize(16),
    paddingHorizontal: perfectSize(20),
    maxHeight: '85%',
  },
  dragHandle: {
    width: perfectSize(40),
    height: perfectSize(4),
    borderRadius: perfectSize(2),
    backgroundColor: colors.grey300,
    alignSelf: 'center',
    marginBottom: perfectSize(12),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: perfectSize(14),
    borderBottomWidth: 1,
  },
  title: {
    fontSize: perfectSize(17),
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  closeBtn: {
    padding: perfectSize(6),
  },
  closeText: {
    fontSize: perfectSize(16),
    fontWeight: '800',
  },
  scrollBody: {
    paddingVertical: perfectSize(16),
  },
  sectionTitle: {
    fontSize: perfectSize(12),
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: perfectSize(10),
  },
  optionsList: {
    gap: perfectSize(8),
    marginBottom: perfectSize(20),
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: perfectSize(10),
    paddingHorizontal: perfectSize(12),
    borderRadius: perfectSize(10),
    borderWidth: 1,
  },
  radioLabel: {
    fontSize: perfectSize(13),
    fontWeight: '600',
  },
  radioIndicator: {
    width: perfectSize(18),
    height: perfectSize(18),
    borderRadius: perfectSize(9),
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioIndicatorInner: {
    width: perfectSize(8),
    height: perfectSize(8),
    borderRadius: perfectSize(4),
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: perfectSize(12),
    paddingHorizontal: perfectSize(14),
    borderRadius: perfectSize(10),
    borderWidth: 1,
    marginBottom: perfectSize(20),
  },
  toggleLabelContainer: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: perfectSize(13),
    fontWeight: '700',
  },
  toggleSubtitle: {
    fontSize: perfectSize(11),
    marginTop: 2,
  },
  switchBox: {
    width: perfectSize(42),
    height: perfectSize(24),
    borderRadius: perfectSize(12),
    padding: perfectSize(2),
    justifyContent: 'center',
  },
  switchThumb: {
    width: perfectSize(20),
    height: perfectSize(20),
    borderRadius: perfectSize(10),
    backgroundColor: colors.white,
  },
  switchThumbOn: {
    alignSelf: 'flex-end',
  },
  switchThumbOff: {
    alignSelf: 'flex-start',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: perfectSize(8),
    marginBottom: perfectSize(20),
  },
  chip: {
    paddingHorizontal: perfectSize(12),
    paddingVertical: perfectSize(8),
    borderRadius: perfectSize(16),
    borderWidth: 1,
  },
  chipText: {
    fontSize: perfectSize(12),
    fontWeight: '700',
  },
  footerActions: {
    flexDirection: 'row',
    gap: perfectSize(10),
    paddingTop: perfectSize(12),
    paddingBottom: perfectSize(28),
    borderTopWidth: 1,
  },
  resetFooterBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: perfectSize(12),
    borderRadius: perfectSize(10),
    borderWidth: 1,
  },
  resetFooterText: {
    fontSize: perfectSize(13),
    fontWeight: '800',
  },
  applyFooterBtn: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: perfectSize(12),
    borderRadius: perfectSize(10),
  },
  applyFooterText: {
    fontSize: perfectSize(13),
    fontWeight: '900',
    letterSpacing: 0.6,
  },
});

