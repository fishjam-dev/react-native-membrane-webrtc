import { BrandColors } from '@colors';
import React, { ReactNode } from 'react';
import { View, StyleSheet, Image } from 'react-native';

type BackgroundWrapperType = {
  children: ReactNode;
};

export const BackgroundWrapper = ({ children }: BackgroundWrapperType) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.leftImage}
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
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  leftImage: {
    width: 75,
    height: 282,
    alignSelf: 'flex-start',
    resizeMode: 'stretch',
    position: 'absolute',
    top: 24,
  },
  rightImage: {
    width: 120,
    height: 288,
    alignSelf: 'flex-end',
    resizeMode: 'stretch',
    position: 'absolute',
    bottom: 2,
  },
  content: {
    zIndex: 3,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    position: 'absolute',
    alignItems: 'center',
  },
});
