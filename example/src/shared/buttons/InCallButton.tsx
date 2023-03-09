import React, { ReactNode } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

import { AdditionalColors, BrandColors } from '../colors/colors';

const IconSize = 25;

const InCallButtonStyles = StyleSheet.create({
  common: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: {
    borderWidth: 1,
    borderColor: BrandColors.darkBlue80,
    borderStyle: 'solid',
    backgroundColor: AdditionalColors.white,
  },
  danger: {
    backgroundColor: AdditionalColors.red80,
  },
});

type ButtonTypeName = 'primary' | 'danger';

type InCallButtonProps = {
  type: ButtonTypeName;
  children: ReactNode;
};

export const InCallButton = (props: InCallButtonProps) => {
  const GetStylesForButtonType = (type: ButtonTypeName) => {
    return [
      InCallButtonStyles.common,
      type === 'primary'
        ? InCallButtonStyles.primary
        : InCallButtonStyles.danger,
    ];
  };

  const GetIconColorForButtonType = (type: ButtonTypeName) => {
    switch (type) {
      case 'primary':
        return BrandColors.darkBlue100;
      case 'danger':
        return AdditionalColors.white;
    }
  };

  return (
    <Pressable onPress={() => {}}>
      <View style={GetStylesForButtonType(props.type)}>
        {React.cloneElement(props.children as React.ReactElement<any>, {
          size: IconSize,
          color: GetIconColorForButtonType(props.type),
        })}
      </View>
    </Pressable>
  );
};
