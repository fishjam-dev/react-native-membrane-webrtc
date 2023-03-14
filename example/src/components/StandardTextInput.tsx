import { AdditionalColors, BrandColors, TextColors } from '@colors';
import { TextInputTextStyle } from '@components/Typo';
import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

const StandardTextInputStyles = StyleSheet.create({
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

type StandardTextInputProps = {
  placeholder?: string;
  value?: string;
  editable?: boolean;
  onChangeText?: OnChangeTextType;
};

export const StandardTextInput = ({
  placeholder = '',
  value = undefined,
  editable = true,
  onChangeText = () => {},
}: StandardTextInputProps) => {
  const [focusStyle, setFocusStyle] = useState(
    StandardTextInputStyles.offFocus
  );
  const placeholderTextColor = AdditionalColors.grey80;
  const fontStyle = TextInputTextStyle.body;

  const onFocus = () => {
    setFocusStyle(StandardTextInputStyles.onFocus);
  };

  const offFocus = () => {
    setFocusStyle(StandardTextInputStyles.offFocus);
  };

  const GetStyleForTextInput = () => {
    if (editable) {
      return [
        StandardTextInputStyles.main,
        StandardTextInputStyles.active,
        focusStyle,
        fontStyle,
      ];
    }

    return [
      StandardTextInputStyles.main,
      StandardTextInputStyles.notActive,
      fontStyle,
    ];
  };

  return (
    <TextInput
      style={GetStyleForTextInput()}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      value={value}
      onFocus={onFocus}
      onBlur={offFocus}
      editable={editable}
      onChangeText={onChangeText}
    />
  );
};
