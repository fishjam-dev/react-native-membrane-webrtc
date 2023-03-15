import { AdditionalColors, BrandColors, TextColors } from '@colors';
import { TextInputTextStyle } from '@components/Typo';
import React, { useState } from 'react';
import { StyleSheet, TextInput as RNTextInput } from 'react-native';

const TextInputStyles = StyleSheet.create({
  main: {
    width: '100%',
    height: 56,
    borderRadius: 40,
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: AdditionalColors.white,
    paddingLeft: 16,
  },
  active: {
    color: TextColors.darkText,
  },
  notActive: {
    color: AdditionalColors.grey80,
    borderColor: AdditionalColors.grey60,
  },
  offFocus: {
    borderColor: BrandColors.darkBlue100,
  },
  onFocus: {
    borderColor: BrandColors.seaBlue80,
  },
});

type OnChangeTextType = (text: string) => void;

type TextInputProps = {
  placeholder?: string;
  value?: string;
  editable?: boolean;
  onChangeText?: OnChangeTextType;
};

export const TextInput = ({
  placeholder = '',
  value,
  editable = true,
  onChangeText = () => {},
}: TextInputProps) => {
  const [focusStyle, setFocusStyle] = useState(TextInputStyles.offFocus);
  const placeholderTextColor = AdditionalColors.grey80;
  const fontStyle = TextInputTextStyle.body;

  const onFocus = () => {
    setFocusStyle(TextInputStyles.onFocus);
  };

  const offFocus = () => {
    setFocusStyle(TextInputStyles.offFocus);
  };

  const GetStyleForTextInput = () => {
    if (editable) {
      return [
        TextInputStyles.main,
        TextInputStyles.active,
        focusStyle,
        fontStyle,
      ];
    }

    return [TextInputStyles.main, TextInputStyles.notActive, fontStyle];
  };

  return (
    <RNTextInput
      style={GetStyleForTextInput()}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      value={value}
      onFocus={onFocus}
      onBlur={offFocus}
      editable={editable}
      onChangeText={onChangeText}
      // @ts-ignore
      colorCursor={TextColors.darkText}
      selectionColor={TextColors.additionalLightText}
    />
  );
};
