import { useCardAnimation } from '@react-navigation/stack';
import React, { ReactNode } from 'react';
import { Animated, Dimensions } from 'react-native';

type BackgroundAnimationType = {
  children: ReactNode;
};

const { width } = Dimensions.get('window');

export const BackgroundAnimation = ({ children }: BackgroundAnimationType) => {
  const { next, current } = useCardAnimation();

  return (
    <Animated.View
      style={{
        flex: 1,
        transform: [
          {
            translateX: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -width],
                  extrapolate: 'clamp',
                })
              : current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [width, 0],
                  extrapolate: 'clamp',
                }),
          },
        ],
      }}
    >
      {children}
    </Animated.View>
  );
};
