import { AdditionalColors, BrandColors, TextColors } from '@colors';
import { Typo } from '@components/Typo';
import React, { ReactNode } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

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
  secondary: {
    backgroundColor: AdditionalColors.white,
  },
  disabled: {
    backgroundColor: AdditionalColors.grey60,
  },
});

type StandardButtonTypeName = 'primary' | 'danger' | 'secondary';

type StandardButtonProps = {
  type?: StandardButtonTypeName;
  isEnabled?: boolean;
  onPress: () => void;
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
      case 'secondary':
        return StandardButtonStyles.secondary;
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
      case 'secondary':
        return TextColors.darkText;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={!isEnabled ? 1 : 0.7}
      onPress={() => {
        if (isEnabled) onPress();
      }}
    >
      <View style={GetStylesForButtonType(type)}>
        <Typo
          variant="button"
          color={GetTextColorForButtonType(type, isEnabled)}
        >
          {children}
        </Typo>
      </View>
    </TouchableOpacity>
  );
};
