import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

import { Icon } from './fonts/Icon';
import { FlipCameraIcon } from './icons';

const iconSize = 32;

export const Controls = ({ disconnect }: { disconnect: () => void }) => {
  const { isCameraOn, toggleCamera } = Membrane.useCameraState();
  const { isMicrophoneOn, toggleMicrophone } = Membrane.useMicrophoneState();
  const { isScreencastOn, toggleScreencast } = Membrane.useScreencast();
  const { updateVideoTrackMetadata } = Membrane.useVideoTrackMetadata();
  const { updateAudioTrackMetadata } = Membrane.useAudioTrackMetadata();

  const toggleMicrophoneAndUpdateMetadata = () => {
    toggleMicrophone();
    updateAudioTrackMetadata({
      active: !isMicrophoneOn,
      type: 'audio',
    });
  };

  const toggleCameraAndUpdateMetadata = () => {
    toggleCamera();
    updateVideoTrackMetadata({
      active: !isCameraOn,
      type: 'camera',
    });
  };

  return (
    <View style={styles.iconsContainer}>
      <Pressable onPress={toggleMicrophoneAndUpdateMetadata}>
        {!isMicrophoneOn ? (
          <Icon name="Microphone-off" size={iconSize} />
        ) : (
          <Icon name="Microphone" size={iconSize} />
        )}
      </Pressable>
      <Pressable onPress={toggleCameraAndUpdateMetadata}>
        {!isCameraOn ? (
          <Icon name="Cam-disabled" size={iconSize} />
        ) : (
          <Icon name="Cam" size={iconSize} />
        )}
      </Pressable>
      <Pressable onPress={disconnect}>
        <Icon name="Hangup" size={iconSize} />
      </Pressable>
      <Pressable onPress={Membrane.flipCamera}>
        <FlipCameraIcon width={iconSize} height={iconSize} />
      </Pressable>
      <Pressable
        onPress={() =>
          toggleScreencast({
            screencastMetadata: {
              displayName: 'presenting',
              type: 'screensharing',
              active: 'true',
            },
            quality: Membrane.ScreencastQuality.FHD30,
          })
        }
      >
        {isScreencastOn ? (
          <Icon name="Screenshare" size={iconSize} />
        ) : (
          <Icon name="Screen-off" size={iconSize} />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  iconsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 24,
  },
});
