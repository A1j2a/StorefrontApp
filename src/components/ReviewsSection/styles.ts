import { StyleSheet } from 'react-native';
import { perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    marginTop: perfectSize(20),
    borderRadius: perfectSize(12),
    borderWidth: 1,
    padding: perfectSize(16),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: perfectSize(8),
    marginBottom: perfectSize(12),
  },
  headerLeft: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: perfectSize(13),
    fontWeight: '800',
    letterSpacing: 0.7,
  },
  providerLabel: {
    fontSize: perfectSize(11),
    marginTop: 2,
  },
  togglePill: {
    borderWidth: 1,
    borderRadius: perfectSize(14),
    paddingHorizontal: perfectSize(10),
    paddingVertical: perfectSize(5),
  },
  toggleText: {
    fontSize: perfectSize(11),
    fontWeight: '700',
  },
  loadingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: perfectSize(12),
    gap: perfectSize(8),
  },
  loadingText: {
    fontSize: perfectSize(13),
  },
  fallbackBox: {
    borderWidth: 1,
    borderColor: '#FCD34D',
    borderRadius: perfectSize(8),
    padding: perfectSize(12),
  },
  fallbackTitle: {
    fontSize: perfectSize(13),
    fontWeight: '800',
    marginBottom: perfectSize(4),
  },
  fallbackBody: {
    fontSize: perfectSize(12),
    lineHeight: perfectSize(18),
    color: '#78350F',
  },
  retryLink: {
    marginTop: perfectSize(8),
    alignSelf: 'flex-start',
  },
  retryLinkText: {
    fontSize: perfectSize(12),
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: perfectSize(8),
    marginBottom: perfectSize(8),
  },
  ratingBig: {
    fontSize: perfectSize(20),
    fontWeight: '800',
  },
  countText: {
    fontSize: perfectSize(12),
  },
  reviewItem: {
    borderTopWidth: 1,
    paddingTop: perfectSize(12),
    marginTop: perfectSize(10),
  },
  reviewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: perfectSize(4),
  },
  reviewStars: {
    fontSize: perfectSize(13),
    fontWeight: '700',
  },
  reviewMeta: {
    fontSize: perfectSize(11),
  },
  reviewTitle: {
    fontSize: perfectSize(13),
    fontWeight: '700',
    marginBottom: perfectSize(3),
  },
  reviewComment: {
    fontSize: perfectSize(12),
    lineHeight: perfectSize(18),
  },
});

