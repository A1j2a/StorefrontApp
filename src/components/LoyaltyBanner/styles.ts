import { StyleSheet } from 'react-native';
import { perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: perfectSize(10),
    padding: perfectSize(12),
    marginBottom: perfectSize(14),
  },
  title: {
    fontSize: perfectSize(12),
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  subtitle: {
    fontSize: perfectSize(12),
    marginTop: perfectSize(3),
    lineHeight: perfectSize(18),
  },
});

