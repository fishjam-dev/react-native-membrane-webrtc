import { BrandColors, AdditionalColors, TextColors } from '@colors';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import { getShortUsername } from '@utils';
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

import { Icon } from './Icon';
import { NoCameraView } from './NoCameraView';
import { Typo } from './Typo';

type RoomParticipantProps = {
  participant: Membrane.Participant;
  pStyle: ViewStyle[];
};

export const RoomParticipant = ({
  participant,
  pStyle,
}: RoomParticipantProps) => {
  return (
    <View style={pStyle}>
      {!participant.tracks.filter((t) => t.type === 'Video').length ||
      !participant.tracks.find((t) => t.type === 'Video')!.metadata.active ? (
        <View style={styles.videoTrack}>
          <NoCameraView
            username={getShortUsername(participant.metadata.displayName)}
          />
        </View>
      ) : (
        <Membrane.VideoRendererView
          trackId={participant.tracks.find((t) => t.type === 'Video')!.id}
          style={styles.videoTrack}
        />
      )}
      <View style={styles.displayNameContainer}>
        <View
          style={[
            styles.displayName,
            participant.type === 'Local' ? styles.localUser : styles.remoteUser,
          ]}
        >
          <Typo variant="label" color={TextColors.white}>
            {participant.type === 'Local'
              ? 'You'
              : participant.metadata.displayName}
          </Typo>
        </View>
      </View>

      {!participant.tracks.find((t) => t.type === 'Audio')?.metadata.active && (
        <View style={styles.mutedIcon}>
          <Icon
            name="Microphone-off"
            size={16}
            color={BrandColors.darkBlue100}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  displayNameContainer: {
    borderRadius: 60,
    position: 'absolute',
    left: 16,
    bottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteUser: {
    backgroundColor: BrandColors.darkBlue80,
  },
  localUser: {
    backgroundColor: BrandColors.pink100,
  },
  displayName: {
    borderRadius: 60,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    paddingBottom: 6,
  },
  videoTrack: { width: '100%', aspectRatio: 1 },
  mutedIcon: {
    position: 'absolute',
    left: 16,
    top: 16,
    backgroundColor: AdditionalColors.white,
    borderRadius: 50,
    padding: 6,
  },
});
