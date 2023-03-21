import { BrandColors } from '@colors';
import React, { ReactNode } from 'react';
import { View, StyleSheet, Image } from 'react-native';

type BackgroundWrapperType = {
  hasHeader?: boolean;
  children: ReactNode;
};

export const BackgroundWrapper = ({
  hasHeader = false,
  children,
}: BackgroundWrapperType) => {
  const getTopOffsetForLeftImage = () => {
    return { top: hasHeader ? 24 : 112 };
  };

  return (
    <View style={styles.container}>
      <Image
        style={[styles.leftImage, getTopOffsetForLeftImage()]}
        source={require('../../assets/images/Left.png')}
      />

      <Image
        style={styles.rightImage}
        source={require('../../assets/images/Right.png')}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.seaBlue40,
  },
  leftImage: {
    width: 75,
    height: 282,
    position: 'absolute',
    top: 24,
  },
  rightImage: {
    width: 120,
    height: 288,
    position: 'absolute',
    resizeMode: 'stretch',
    bottom: 2,
    right: 0,
  },
  content: {
    flex: 1,
  },
});
