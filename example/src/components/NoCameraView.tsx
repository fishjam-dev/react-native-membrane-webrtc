import { BrandColors } from '@colors';
import { getShortUsername } from '@utils';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Typo } from './Typo';

type NoCameraViewProps = {
  username: string;
};

export const NoCameraView = ({ username }: NoCameraViewProps) => {
  return (
    <View style={styles.noCameraBackground}>
      <View style={styles.noCameraContent}>
        <Typo variant="h5" color={BrandColors.darkBlue80}>
          {getShortUsername(username)}
        </Typo>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noCameraBackground: {
    backgroundColor: BrandColors.seaBlue20,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noCameraContent: {
    borderRadius: 5000,
    borderColor: BrandColors.darkBlue60,
    borderWidth: 1,
    width: 132,
    height: 132,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
