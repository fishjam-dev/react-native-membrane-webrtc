import { BrandColors } from '@colors';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import { isEmpty } from 'lodash';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { OtherParticipants } from './OtherParticipants';
import { RoomParticipant } from './RoomParticipant';

type NotFocusedParticipantsProp = { participants: Membrane.Participant[] };

export const NotFocusedParticipants = ({
  participants,
}: NotFocusedParticipantsProp) => {
  if (isEmpty(participants)) {
    return null;
  }

  return (
    <View style={styles.container}>
      {participants.length === 1 ? (
        <View style={styles.otherParticipantContainer}>
          <RoomParticipant participant={participants[0]} pinButtonHiddden />
        </View>
      ) : (
        <View style={styles.otherParticipantsContainer}>
          <View style={styles.participant}>
            <RoomParticipant participant={participants[0]} pinButtonHiddden />
          </View>
          <View style={styles.middleLine} />
          <View style={styles.participant}>
            {participants.length === 2 ? (
              <RoomParticipant participant={participants[1]} pinButtonHiddden />
            ) : (
              <OtherParticipants
                p1={participants[1]}
                p2={participants[2]}
                numOfOtherParticipants={participants.length - 1}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherParticipantContainer: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: BrandColors.darkBlue60,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherParticipantsContainer: {
    flex: 1,
    aspectRatio: 2,
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: BrandColors.darkBlue60,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 32,
    marginRight: 32,
  },
  participant: {
    flex: 1,
    aspectRatio: 1,
    overflow: 'hidden',
  },
  middleLine: {
    height: '100%',
    width: 2,
    backgroundColor: BrandColors.darkBlue60,
  },
});
