import { StyleSheet } from 'react-native';
import { perfectSize } from '../../theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: perfectSize(20),
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: perfectSize(20),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: perfectSize(20),
  },
  heroPill: {
    paddingHorizontal: perfectSize(10),
    paddingVertical: perfectSize(5),
    borderRadius: perfectSize(6),
  },
  heroPillText: {
    fontSize: perfectSize(10),
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  skipText: {
    fontSize: perfectSize(14),
    fontWeight: '700',
  },
  brandHeroCard: {
    borderRadius: perfectSize(16),
    paddingVertical: perfectSize(44),
    paddingHorizontal: perfectSize(24),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: perfectSize(24),
  },
  logoContainer: {
    width: perfectSize(72),
    height: perfectSize(72),
    borderRadius: perfectSize(20),
    borderWidth: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: perfectSize(16),
  },
  heroLogo: {
    width: '100%',
    height: '100%',
  },
  storeName: {
    fontSize: perfectSize(24),
    fontWeight: '900',
    letterSpacing: 1.8,
    textAlign: 'center',
  },
  storeSub: {
    fontSize: perfectSize(11),
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: perfectSize(6),
    opacity: 0.85,
  },
  copySection: {
    marginBottom: perfectSize(24),
  },
  welcomeTitle: {
    fontSize: perfectSize(26),
    fontWeight: '900',
    letterSpacing: 0.6,
    marginBottom: perfectSize(10),
  },
  welcomeMessage: {
    fontSize: perfectSize(15),
    lineHeight: perfectSize(22),
  },
  switcherCard: {
    borderRadius: perfectSize(12),
    borderWidth: 1,
    padding: perfectSize(14),
  },
  switcherLabel: {
    fontSize: perfectSize(10),
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: perfectSize(10),
  },
  switcherRow: {
    flexDirection: 'row',
    gap: perfectSize(10),
  },
  storeOption: {
    flex: 1,
    borderWidth: 1,
    borderRadius: perfectSize(10),
    padding: perfectSize(12),
  },
  storeOptionTitle: {
    fontSize: perfectSize(12),
    fontWeight: '800',
  },
  storeOptionMeta: {
    fontSize: perfectSize(10),
    marginTop: perfectSize(4),
  },
  footer: {
    paddingTop: perfectSize(8),
  },
});

