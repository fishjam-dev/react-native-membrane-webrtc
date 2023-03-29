import { BrandColors, AdditionalColors, TextColors } from '@colors';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Icon } from './Icon';
import { NoCameraView } from './NoCameraView';
import { Typo } from './Typo';

type RoomParticipantProps = {
  tracks: Membrane.Track[];
  metadata: Membrane.Metadata;
  type: Membrane.ParticipantType;
};

export const RoomParticipant = ({
  tracks,
  metadata,
  type,
}: RoomParticipantProps) => {
  const videoTrack = tracks.find((t) => t.type === 'Video');
  const audioTrack = tracks.find((t) => t.type === 'Audio');

  const participantHasVideo = () => {
    if (videoTrack !== undefined) {
      return videoTrack.metadata.active;
    }
    return false;
  };

  return (
    <View>
      {participantHasVideo() ? (
        <Membrane.VideoRendererView
          trackId={videoTrack!.id}
          style={styles.videoTrack}
        />
      ) : (
        <View style={styles.videoTrack}>
          <NoCameraView username={metadata.displayName} />
        </View>
      )}
      <View style={styles.displayNameContainer}>
        <View
          style={[
            styles.displayName,
            type === 'Local' ? styles.localUser : styles.remoteUser,
          ]}
        >
          <Typo variant="label" color={TextColors.white}>
            {type === 'Local' ? 'You' : metadata.displayName}
          </Typo>
        </View>
      </View>

      {!audioTrack?.metadata.active && (
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
