import { BrandColors, AdditionalColors } from '@colors';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { RoomParticipant } from './RoomParticipant';
import { StopScreencastingWithFocus } from './StopScrencastingWithFocus';

export type ParticipantVideoTrack = {
  participant: Membrane.Participant;
  trackId: string;
};

type FocusedParticipantProp = {
  focusedParticipant: ParticipantVideoTrack;
  onPress: (string) => void;
};

export const FocusedParticipant = ({
  focusedParticipant,
  onPress,
}: FocusedParticipantProp) => {
  const focusedTrack = focusedParticipant.participant.tracks.find(
    (t) => t.id === focusedParticipant.trackId
  );
  return (
    <View style={styles.focusedParticipantContainer}>
      <View style={styles.focusedParticipant}>
        {focusedParticipant.participant.type ===
          Membrane.ParticipantType.Local &&
        focusedTrack?.metadata.type === 'screensharing' ? (
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
    </View>
  );
};

const styles = StyleSheet.create({
  focusedParticipantContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  focusedParticipant: {
    aspectRatio: 1 / 1.3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BrandColors.darkBlue60,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: AdditionalColors.grey140,
  },
});
