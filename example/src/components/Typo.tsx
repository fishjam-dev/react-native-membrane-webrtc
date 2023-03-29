import { TextColors } from '@colors';
import React, { ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  TextStyle,
  TextProps,
} from 'react-native';

const SMALL_WINDOW_BREAKPOINT = 640;

const Headlines = StyleSheet.create({
  h1: {
    fontFamily: 'NotoSans_500Medium',
    fontSize: 68,
    lineHeight: 76,
  },
  h2: {
    fontFamily: 'NotoSans_500Medium',
    fontSize: 48,
    lineHeight: 54,
  },
  h3: {
    fontFamily: 'NotoSans_500Medium',
    fontSize: 36,
    lineHeight: 48,
  },
  h4: {
    fontFamily: 'NotoSans_500Medium',
    fontSize: 24,
    lineHeight: 36,
  },
  h5: {
    fontFamily: 'NotoSans_500Medium',
    fontSize: 18,
    lineHeight: 28,
  },
});

const HeadlinesSmall = StyleSheet.create({
  h1: {
    fontFamily: 'NotoSans_500Medium',
    fontSize: 42,
    lineHeight: 48,
  },
  h2: {
    fontFamily: 'NotoSans_500Medium',
    fontSize: 36,
    lineHeight: 42,
  },
  h3: {
    fontFamily: 'NotoSans_500Medium',
    fontSize: 24,
    lineHeight: 32,
  },
  h4: {
    fontFamily: 'NotoSans_500Medium',
    fontSize: 20,
    lineHeight: 32,
  },
  h5: {
    fontFamily: 'NotoSans_500Medium',
    fontSize: 18,
    lineHeight: 28,
  },
});

const TextStyles = StyleSheet.create({
  bodyBig: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 20,
    lineHeight: 36,
  },
  bodySmall: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 16,
    lineHeight: 28,
  },
  label: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 12,
    lineHeight: 16,
  },
  caption: {
    fontFamily: 'NotoSans_600SemiBold',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  button: {
    fontFamily: 'NotoSans_600SemiBold',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
});

const TextStylesSmall = StyleSheet.create({
  bodyBig: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 18,
    lineHeight: 32,
  },
  bodySmall: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 16,
    lineHeight: 28,
  },
  label: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 12,
    lineHeight: 16,
  },
  caption: {
    fontFamily: 'NotoSans_600SemiBold',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  button: {
    fontFamily: 'NotoSans_600SemiBold',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
});

const TextStylesCustom = StyleSheet.create({
  videoLabel: {
    fontFamily: 'NotoSans_500Medium',
    fontSize: 14,
    lineHeight: 18,
  },
  chatRegular: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 14,
    lineHeight: 21,
  },
  chatSemibold: {
    fontFamily: 'NotoSans_600SemiBold',
    fontSize: 14,
    lineHeight: 21,
  },
  chatTitle: {
    fontFamily: 'NotoSans_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
  },
});

export const TextInputTextStyle = StyleSheet.create({
  body: {
    fontFamily: TextStylesSmall.bodySmall.fontFamily,
    fontSize: TextStylesSmall.bodySmall.fontSize,
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
  color?: string;
  children: ReactNode;
} & TextProps;

export const Typo = ({
  variant = 'body-big',
  color = TextColors.darkText,
  children,
  style,
  ...textProps
}: TypoProps) => {
  const windowWidth = Dimensions.get('window').width;

  const GetStyleForVariant = (variant: string, textColor: string) => {
    const HeadlineStylesDynamic =
      windowWidth > SMALL_WINDOW_BREAKPOINT ? Headlines : HeadlinesSmall;
    const TextStylesDynamic =
      windowWidth > SMALL_WINDOW_BREAKPOINT ? TextStyles : TextStylesSmall;

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

    return [{ color: textColor as TextStyle }, variantMap[variant]];
  };

  return (
    <Text style={[...GetStyleForVariant(variant, color), style]} {...textProps}>
      {children}
    </Text>
  );
};
