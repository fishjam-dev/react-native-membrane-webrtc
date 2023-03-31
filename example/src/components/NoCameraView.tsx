import { BrandColors } from '@colors';
import { getShortUsername } from '@utils';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Typo } from './Typo';

type NoCameraViewProps = {
  username: string;
  isSmallTile?: boolean;
};

export const NoCameraView = ({
  username,
  isSmallTile = false,
}: NoCameraViewProps) => {
  return (
    <View style={styles.noCameraBackground}>
      <View
        style={[
          styles.noCameraContent,
          isSmallTile ? styles.smallContent : styles.bigContent,
        ]}
      >
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigContent: {
    width: 132,
    height: 132,
  },
  smallContent: {
    width: 75,
    height: 75,
  },
});
