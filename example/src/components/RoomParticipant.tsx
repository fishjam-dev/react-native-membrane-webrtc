import { BrandColors, AdditionalColors, TextColors } from '@colors';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Icon } from './Icon';
import { NoCameraView } from './NoCameraView';
import { Typo } from './Typo';
import { PinButton } from './buttons/PinButton';

type RoomParticipantProps = {
  participant: Membrane.Participant;
};

export const RoomParticipant = ({
  participant: { metadata, tracks, type },
}: RoomParticipantProps) => {
  const videoTrack = tracks.find((t) => t.type === 'Video');
  const audioTrack = tracks.find((t) => t.type === 'Audio');

  const participantHasVideo = () => {
    if (videoTrack) {
      return videoTrack.metadata.active;
    }
    return false;
  };

  return (
    <View>
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
      <View style={styles.pinButton}>
        <PinButton onPress={() => {}}>Pin user</PinButton>
      </View>
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
  pinButton: {
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // top: 0,
    // bottom: 0,
    // margin: 'auto',
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
});
