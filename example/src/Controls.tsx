import { InCallButton } from '@components/buttons/InCallButton';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import React from 'react';
import { StyleSheet, View } from 'react-native';

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

  const toggleScreencastAndUpdateMetadata = () => {
    toggleScreencast({
      screencastMetadata: {
        displayName: 'presenting',
        type: 'screensharing',
        active: 'true',
      },
      quality: Membrane.ScreencastQuality.FHD30,
    });
  };

  return (
    <View style={styles.iconsContainer}>
      {!isMicrophoneOn ? (
        <InCallButton
          iconName="Microphone-off"
          onPress={toggleMicrophoneAndUpdateMetadata}
        />
      ) : (
        <InCallButton
          iconName="Microphone"
          onPress={toggleMicrophoneAndUpdateMetadata}
        />
      )}
      {!isCameraOn ? (
        <InCallButton
          iconName="Cam-disabled"
          onPress={toggleCameraAndUpdateMetadata}
        />
      ) : (
        <InCallButton iconName="Cam" onPress={toggleCameraAndUpdateMetadata} />
      )}
      <InCallButton type="disconnect" iconName="Hangup" onPress={disconnect} />

      {isScreencastOn ? (
        <InCallButton
          iconName="Screenshare"
          onPress={toggleScreencastAndUpdateMetadata}
        />
      ) : (
        <InCallButton
          iconName="Screen-off"
          onPress={toggleScreencastAndUpdateMetadata}
        />
      )}
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
