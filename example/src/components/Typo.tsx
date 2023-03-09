import React, { ReactNode } from 'react';
import { StyleSheet, Text, useWindowDimensions } from 'react-native';

const SMALL_WINDOW_BREAKPOINT = 640;

const Headlines = StyleSheet.create({
  h1: {
    fontFamily: 'Inter-Medium',
    fontSize: 68,
    lineHeight: 76,
    letterSpacing: 0.5,
  },
  h2: {
    fontFamily: 'Inter-Medium',
    fontSize: 48,
    lineHeight: 54,
    letterSpacing: 1,
  },
  h3: {
    fontFamily: 'Inter-Medium',
    fontSize: 36,
    lineHeight: 48,
    letterSpacing: 1,
  },
  h4: {
    fontFamily: 'Inter-Medium',
    fontSize: 24,
    lineHeight: 36,
    letterSpacing: 1.5,
  },
  h5: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 1.5,
  },
});

const HeadlinesSmall = StyleSheet.create({
  h1: {
    fontFamily: 'Inter-Medium',
    fontSize: 42,
    lineHeight: 48,
    letterSpacing: 0.5,
  },
  h2: {
    fontFamily: 'Inter-Medium',
    fontSize: 36,
    lineHeight: 42,
    letterSpacing: 1,
  },
  h3: {
    fontFamily: 'Inter-Medium',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 1,
  },
  h4: {
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    lineHeight: 32,
    letterSpacing: 1.5,
  },
  h5: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 1.5,
  },
});

const TextStyles = StyleSheet.create({
  bodyBig: {
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    lineHeight: 36,
  },
  bodySmall: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 28,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    lineHeight: 16,
  },
  caption: {
    fontFamily: 'Inter-Medium',
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
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    lineHeight: 32,
  },
  bodySmall: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 28,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    lineHeight: 16,
  },
  caption: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  button: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
    letterSpacing: 3,
  },
});

const TextStylesCustom = StyleSheet.create({
  videoLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 18,
  },
  chatRegular: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 21,
  },
  chatSemibold: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
  },
  chatTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 3,
    fontWeight: 'bold',
  },
});

type VariantName =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'body-big'
  | 'body-small'
  | 'label'
  | 'caption'
  | 'button'
  | 'video-label'
  | 'chat-regular'
  | 'chat-semibold'
  | 'chat-title';

type TypoProps = {
  variant: VariantName;
  children: ReactNode;
};

export const Typo = (props: TypoProps) => {
  const { width } = useWindowDimensions();

  const GetStyleForVariant = (variant: string) => {
    const HeadlineStylesDynamic =
      width > SMALL_WINDOW_BREAKPOINT ? Headlines : HeadlinesSmall;
    const TextStylesDynamic =
      width > SMALL_WINDOW_BREAKPOINT ? TextStyles : TextStylesSmall;

    const variantMap = {
      'h1': HeadlineStylesDynamic.h1,
      'h2': HeadlineStylesDynamic.h2,
      'h3': HeadlineStylesDynamic.h3,
      'h4': HeadlineStylesDynamic.h4,
      'h5': HeadlineStylesDynamic.h5,
      'body-big': TextStylesDynamic.bodyBig,
      'body-small': TextStylesDynamic.bodySmall,
      'label': TextStylesDynamic.label,
      'caption': TextStylesDynamic.caption,
      'button': TextStylesDynamic.button,
      'video-label': TextStylesCustom.videoLabel,
      'chat-regular': TextStylesCustom.chatRegular,
      'chat-semibold': TextStylesCustom.chatSemibold,
      'chat-title': TextStylesCustom.chatTitle,
    };

    return variantMap[variant];
  };

  return (
    <Text style={GetStyleForVariant(props.variant)}>{props.children}</Text>
  );
};
