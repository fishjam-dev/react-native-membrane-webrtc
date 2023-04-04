import { BrandColors } from '@colors';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import { isEmpty } from 'lodash';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { OtherParticipants } from './OtherParticipants';
import { RoomParticipant } from './RoomParticipant';

type NotFocusedParticipant = {
  participant: Membrane.Participant;
  trackIdx: number;
};

type NotFocusedParticipantsProp = { participants: NotFocusedParticipant[] };

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
          <RoomParticipant
            participant={participants[0].participant}
            trackIdx={participants[0].trackIdx}
            pinButtonHiddden
            tileSmall
          />
        </View>
      ) : (
        <View
          style={[
            styles.otherParticipantsContainer,
            styles.otherParticipantContainer,
          ]}
        >
          <View style={styles.participant}>
            <RoomParticipant
              participant={participants[0].participant}
              trackIdx={participants[0].trackIdx}
              pinButtonHiddden
              tileSmall
            />
          </View>
          <View style={styles.middleLine} />
          <View style={styles.participant}>
            {participants.length === 2 ? (
              <RoomParticipant
                participant={participants[1].participant}
                trackIdx={participants[1].trackIdx}
                pinButtonHiddden
                tileSmall
              />
            ) : (
              <OtherParticipants
                p1={participants[1].participant}
                p2={participants[2].participant}
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
    flex: 1,
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
