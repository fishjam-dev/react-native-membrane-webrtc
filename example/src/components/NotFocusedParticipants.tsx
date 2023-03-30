import { BrandColors } from '@colors';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import { isEmpty } from 'lodash';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { RoomParticipant } from './RoomParticipant';

type NotFocusedParticipantsProp = { participants: Membrane.Participant[] };

export const NotFocusedParticipants = ({
  participants,
}: NotFocusedParticipantsProp) => {
  console.log(participants.length);
  if (isEmpty(participants)) {
    return null;
  }

  return (
    <View style={styles.container}>
      {participants.length === 1 ? (
        <View style={styles.otherParticipantContaner}>
          <View style={styles.otherParticipant}>
            <RoomParticipant participant={participants[0]} pinButtonHiddden />
          </View>
        </View>
      ) : (
        <View style={styles.otherParticipantContaner}>
          <RoomParticipant participant={participants[0]} pinButtonHiddden />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherParticipantContaner: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: BrandColors.darkBlue60,
    overflow: 'hidden',
    height: '100%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherParticipant: {
    backgroundColor: 'green',
  },
});
