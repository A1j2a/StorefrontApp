import { StyleSheet } from 'react-native';
import { perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: perfectSize(24),
  },
  text: {
    marginTop: perfectSize(12),
    fontSize: perfectSize(14),
    fontWeight: '500',
  },
});

