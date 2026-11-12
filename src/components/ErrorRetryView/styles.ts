import { StyleSheet } from 'react-native';
import { perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: perfectSize(28),
  },
  iconBox: {
    width: perfectSize(48),
    height: perfectSize(48),
    borderRadius: perfectSize(24),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: perfectSize(14),
  },
  iconText: {
    fontSize: perfectSize(22),
    fontWeight: '900',
  },
  heading: {
    fontSize: perfectSize(17),
    fontWeight: '800',
    marginBottom: perfectSize(6),
  },
  message: {
    fontSize: perfectSize(13),
    textAlign: 'center',
    lineHeight: perfectSize(19),
    marginBottom: perfectSize(18),
  },
  retryBtn: {
    minWidth: perfectSize(140),
  },
});

