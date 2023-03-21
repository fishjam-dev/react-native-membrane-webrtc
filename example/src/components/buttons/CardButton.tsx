import { BrandColors, TextColors } from '@colors';
import { Icon } from '@components/Icon';
import { Typo } from '@components/Typo';
import React, { ReactNode } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

const CardButtonStyles = StyleSheet.create({
  wrapper: {
    height: 179,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BrandColors.seaBlue40,
    width: 358,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BrandColors.darkBlue100,
  },
});

type CardButtonProps = {
  iconName: string;
  onPress: () => void;
  children: ReactNode;
};

export const CardButton = ({
  iconName,
  onPress,
  children,
}: CardButtonProps) => {
  return (
    <View style={CardButtonStyles.wrapper}>
      <Pressable onPress={onPress} style={CardButtonStyles.content}>
        <Icon name={iconName} size={32} color={TextColors.darkText} />
        <Typo variant="h4">{children}</Typo>
      </Pressable>
    </View>
  );
};
