import { StyleSheet } from 'react-native';
import { perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: perfectSize(16),
    paddingBottom: perfectSize(28),
  },
  listHeader: {
    paddingTop: perfectSize(16),
    marginBottom: perfectSize(12),
  },
  banner: {
    borderRadius: perfectSize(14),
    padding: perfectSize(18),
    marginBottom: perfectSize(14),
  },
  bannerBadge: {
    fontSize: perfectSize(10),
    fontWeight: '800',
    letterSpacing: 1,
    opacity: 0.85,
    marginBottom: perfectSize(6),
  },
  bannerTitle: {
    fontSize: perfectSize(20),
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  bannerTagline: {
    fontSize: perfectSize(13),
    marginTop: perfectSize(6),
    opacity: 0.9,
  },
  sectionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: perfectSize(4),
  },
  sectionHeading: {
    fontSize: perfectSize(15),
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  sectionSub: {
    fontSize: perfectSize(11),
    marginTop: 2,
  },
  filterSection: {
    marginTop: perfectSize(10),
    marginBottom: perfectSize(4),
  },
  errorTestBtn: {
    borderWidth: 1,
    borderRadius: perfectSize(8),
    paddingHorizontal: perfectSize(10),
    paddingVertical: perfectSize(6),
  },
  errorTestText: {
    fontSize: perfectSize(11),
    fontWeight: '700',
  },
  columnWrapper: {
    gap: perfectSize(12),
    marginBottom: perfectSize(12),
  },
  gridItem: {
    flex: 1,
  },
});

