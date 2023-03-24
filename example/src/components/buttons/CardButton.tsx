import { BrandColors, TextColors } from '@colors';
import { Icon } from '@components/Icon';
import { Typo } from '@components/Typo';
import { debounce } from 'lodash';
import React, { ReactNode, useCallback } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';

const CardButtonStyles = StyleSheet.create({
  wrapper: {
    height: 179,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 358,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BrandColors.darkBlue100,
  },
  animatedView: {
    height: 179,
    borderRadius: 16,
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
  const progress = useSharedValue(0);
  const debouncedOnPress = useCallback(
    debounce(onPress, 300, {
      leading: true,
      trailing: false,
    }),
    []
  );

  const backgroundColorStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [BrandColors.seaBlue40, BrandColors.seaBlue60]
      ),
    }),
    [progress]
  );

  return (
    <View style={CardButtonStyles.wrapper}>
      <Pressable
        onPressIn={() => {
          progress.value = withTiming(1);
        }}
        onPressOut={() => (progress.value = 0)}
        onPress={debouncedOnPress}
      >
        <Animated.View
          style={[CardButtonStyles.animatedView, backgroundColorStyle]}
        >
          <View style={CardButtonStyles.content}>
            <Icon name={iconName} size={32} color={TextColors.darkText} />
            <Typo variant="h4">{children}</Typo>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
};
