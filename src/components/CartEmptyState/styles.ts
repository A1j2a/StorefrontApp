import { StyleSheet } from 'react-native';
import { perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: perfectSize(28),
  },
  emptyIconBox: {
    width: perfectSize(64),
    height: perfectSize(64),
    borderRadius: perfectSize(32),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: perfectSize(14),
  },
  emptyIcon: {
    fontSize: perfectSize(24),
    fontWeight: '900',
  },
  emptyTitle: {
    fontSize: perfectSize(18),
    fontWeight: '800',
    marginBottom: perfectSize(6),
  },
  emptySubtitle: {
    fontSize: perfectSize(13),
    textAlign: 'center',
    lineHeight: perfectSize(19),
    marginBottom: perfectSize(20),
  },
  browseBtn: {
    minWidth: perfectSize(200),
  },
});

