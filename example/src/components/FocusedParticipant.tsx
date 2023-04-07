import { BrandColors, AdditionalColors } from '@colors';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Participant } from './NotFocusedParticipants';
import { RoomParticipant } from './RoomParticipant';
import { StopScreencastingWithFocus } from './StopScrencastingWithFocus';

type FocusedParticipantProp = {
  focusedParticipant: Participant;
  onPress: (string) => void;
};

export const FocusedParticipant = ({
  focusedParticipant,
  onPress,
}: FocusedParticipantProp) => {
  const focusedTrack = focusedParticipant.participant.tracks.find(
    (t) => t.id === focusedParticipant.trackId
  );

  const isLocalScreenshareTrack =
    focusedParticipant.participant.type === Membrane.ParticipantType.Local &&
    focusedTrack?.metadata.type === 'screensharing';

  return (
    <View style={styles.focusedParticipantContainer}>
      {isLocalScreenshareTrack ? (
        <StopScreencastingWithFocus />
      ) : (
        <RoomParticipant
          participant={focusedParticipant.participant}
          trackId={focusedParticipant.trackId}
          onPinButtonPressed={onPress}
          focused
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  focusedParticipantContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BrandColors.darkBlue60,
    overflow: 'hidden',
    backgroundColor: AdditionalColors.grey140,
  },
});
