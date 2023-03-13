import { AdditionalColors, BrandColors, TextColors } from '@colors';
import { Typo } from '@components/Typo';
import React, { ReactNode } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  GestureResponderEvent,
} from 'react-native';

const StandardButtonStyles = StyleSheet.create({
  common: {
    width: '100%',
    height: 56,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: {
    backgroundColor: BrandColors.darkBlue100,
  },
  danger: {
    backgroundColor: AdditionalColors.red100,
  },
  info: {
    backgroundColor: AdditionalColors.white,
  },
  disabled: {
    backgroundColor: AdditionalColors.grey60,
  },
});

type StandardButtonTypeName = 'primary' | 'danger' | 'info';
type OnPressFunctionType = (event: GestureResponderEvent) => void;

type StandardButtonProps = {
  type?: StandardButtonTypeName;
  isEnabled?: boolean;
  onPress: OnPressFunctionType;
  children: ReactNode;
};

export const StandardButton = ({
  type = 'primary',
  isEnabled = true,
  onPress,
  children,
}: StandardButtonProps) => {
  const GetBackgroundColorStyle = (
    type: StandardButtonTypeName,
    isEnabled: boolean
  ) => {
    if (!isEnabled) {
      return StandardButtonStyles.disabled;
    }
    switch (type) {
      case 'primary':
        return StandardButtonStyles.primary;
      case 'danger':
        return StandardButtonStyles.danger;
      case 'info':
        return StandardButtonStyles.info;
    }
  };

  const GetStylesForButtonType = (type: StandardButtonTypeName) => {
    return [
      StandardButtonStyles.common,
      GetBackgroundColorStyle(type, isEnabled),
    ];
  };

  const GetTextColorForButtonType = (
    type: StandardButtonTypeName,
    isEnabled: boolean
  ) => {
    if (!isEnabled) {
      return TextColors.white;
    }
    switch (type) {
      case 'primary':
        return TextColors.white;
      case 'danger':
        return TextColors.white;
      case 'info':
        return TextColors.darkText;
    }
  };

  return (
    <Pressable onPress={onPress} disabled={!isEnabled}>
      <View style={GetStylesForButtonType(type)}>
        <Typo
          variant="button"
          color={GetTextColorForButtonType(type, isEnabled)}
        >
          {children}
        </Typo>
      </View>
    </Pressable>
  );
};
