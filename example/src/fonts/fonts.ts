import { StyleSheet } from 'react-native';

const Headlines = StyleSheet.create({
  h1: {
    fontFamily: 'Inter',
    fontSize: 68,
    lineHeight: 76,
    letterSpacing: 0.5,
  },
  h2: {
    fontFamily: 'Inter',
    fontSize: 48,
    lineHeight: 54,
    letterSpacing: 1,
  },
  h3: {
    fontFamily: 'Inter',
    fontSize: 36,
    lineHeight: 48,
    letterSpacing: 1,
  },
  h4: {
    fontFamily: 'Inter',
    fontSize: 24,
    lineHeight: 36,
    letterSpacing: 1.5,
  },
  h5: {
    fontFamily: 'Inter',
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 1.5,
  },
});

const HeadlinesSmall = StyleSheet.create({
  h1: {
    fontFamily: 'Inter',
    fontSize: 42,
    lineHeight: 48,
    letterSpacing: 0.5,
  },
  h2: {
    fontFamily: 'Inter',
    fontSize: 36,
    lineHeight: 42,
    letterSpacing: 1,
  },
  h3: {
    fontFamily: 'Inter',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 1,
  },
  h4: {
    fontFamily: 'Inter',
    fontSize: 20,
    lineHeight: 32,
    letterSpacing: 1.5,
  },
  h5: {
    fontFamily: 'Inter',
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 1.5,
  },
});

const TextStyles = StyleSheet.create({
  bodyBig: {
    fontFamily: 'Inter',
    fontSize: 20,
    lineHeight: 36,
  },
  bodySmall: {
    fontFamily: 'Inter',
    fontSize: 16,
    lineHeight: 28,
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 16,
  },
  caption: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  button: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
    letterSpacing: 1,
  },
});

const TextStylesSmall = StyleSheet.create({
  bodyBig: {
    fontFamily: 'Inter',
    fontSize: 18,
    lineHeight: 32,
  },
  bodySmall: {
    fontFamily: 'Inter',
    fontSize: 16,
    lineHeight: 28,
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 16,
  },
  caption: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  button: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
    letterSpacing: 3,
  },
});

const TextStylesCustom = StyleSheet.create({
  videoLabel: {
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 18,
  },
  chatRegular: {
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 21,
  },
  chatSemibold: {
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
  },
  chatTitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 3,
    fontWeight: 'bold',
  },
});

export default {
  Headlines,
  HeadlinesSmall,
  TextStyles,
  TextStylesSmall,
  TextStylesCustom,
};
