import { StyleSheet } from 'react-native';
import { perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: perfectSize(8),
  },
  initials: {
    fontSize: perfectSize(22),
    fontWeight: '800',
    letterSpacing: 1,
  },
  caption: {
    fontSize: perfectSize(10),
    marginTop: perfectSize(4),
    fontWeight: '600',
  },
});

