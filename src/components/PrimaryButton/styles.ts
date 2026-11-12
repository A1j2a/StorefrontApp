import { StyleSheet } from 'react-native';
import { perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    height: perfectSize(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: perfectSize(10),
    paddingHorizontal: perfectSize(20),
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
  },
  label: {
    fontSize: perfectSize(14),
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  disabled: {
    opacity: 0.45,
  },
  hiddenLabel: {
    opacity: 0,
  },
  spinner: {
    position: 'absolute',
  },
});

