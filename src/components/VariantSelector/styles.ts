import { StyleSheet } from 'react-native';
import { perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  section: {
    marginBottom: perfectSize(16),
  },
  sectionLabel: {
    fontSize: perfectSize(12),
    fontWeight: '800',
    letterSpacing: 0.7,
    marginBottom: perfectSize(10),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: perfectSize(8),
  },
  chip: {
    borderWidth: 1.2,
    borderRadius: perfectSize(10),
    paddingHorizontal: perfectSize(12),
    paddingVertical: perfectSize(10),
    minWidth: '47%',
  },
  unavailableChip: {
    opacity: 0.65,
  },
  dashedChip: {
    borderStyle: 'dashed',
  },
  variantTitle: {
    fontSize: perfectSize(13),
    fontWeight: '700',
  },
  strikeText: {
    textDecorationLine: 'line-through',
  },
  variantSub: {
    fontSize: perfectSize(11),
    marginTop: 2,
    fontWeight: '600',
  },
});

