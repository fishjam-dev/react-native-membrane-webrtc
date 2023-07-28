import { BrandColors } from '@colors';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import { getShortUsername } from '@utils';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Typo } from './Typo';
import {
  ParticipantMetadataType,
  TrackMetadataType,
} from '../types/MetadataTypes';

type OtherParticipantsProp = {
  p1?: Membrane.Endpoint<ParticipantMetadataType, TrackMetadataType>;
  p2?: Membrane.Endpoint<ParticipantMetadataType, TrackMetadataType>;
  numOfOtherParticipants: number;
};

export const OtherParticipants = ({
  p1,
  p2,
  numOfOtherParticipants,
}: OtherParticipantsProp) => {
  const checkIfBothExist = () => {
    return p1 && p2;
  };

  return (
    <View style={styles.container}>
      {checkIfBothExist() ? (
        <View style={styles.moreThanOne}>
          <View style={[styles.leftCircle, styles.circle]}>
            <Typo variant="h5" color={BrandColors.darkBlue80}>
              {getShortUsername(p1?.metadata.displayName)}
            </Typo>
          </View>
          <View style={styles.rightCircleOutline}>
            <View style={[styles.rightCircle, styles.circle]}>
              <Typo variant="h5" color={BrandColors.darkBlue80}>
                {getShortUsername(p2?.metadata.displayName)}
              </Typo>
            </View>
          </View>
        </View>
      ) : (
        <View style={[styles.oneContent, styles.circle]}>
          <Typo variant="h5" color={BrandColors.darkBlue80}>
            {getShortUsername(p1?.metadata.displayName)}
          </Typo>
        </View>
      )}
      {numOfOtherParticipants > 2 ? (
        <View style={styles.textRow}>
          <Typo variant="label">
            + {numOfOtherParticipants - 2} other
            {numOfOtherParticipants - 2 > 1 ? 's' : null}
          </Typo>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BrandColors.darkBlue40,
  },
  moreThanOne: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  oneContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightCircleOutline: {
    borderRadius: 5000,
    borderColor: BrandColors.darkBlue40,
    borderWidth: 5,
    marginLeft: -30,
  },
  rightCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BrandColors.darkBlue40,
  },
  circle: {
    borderRadius: 5000,
    borderColor: BrandColors.darkBlue60,
    borderWidth: 1,
    width: 70,
    height: 70,
  },
  textRow: {
    marginTop: 8,
  },
});
