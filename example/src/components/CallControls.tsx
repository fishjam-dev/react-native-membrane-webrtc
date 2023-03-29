import { InCallButton } from '@components/buttons/InCallButton';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export const CallControls = ({ disconnect }: { disconnect: () => void }) => {
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
      <View style={styles.iconInRow}>
        <InCallButton
          iconName={!isCameraOn ? 'Cam-disabled' : 'Cam'}
          onPress={toggleCameraAndUpdateMetadata}
        />
      </View>
      <View style={styles.iconInRow}>
        <InCallButton
          iconName={!isMicrophoneOn ? 'Microphone-off' : 'Microphone'}
          onPress={toggleMicrophoneAndUpdateMetadata}
        />
      </View>
      <View style={styles.iconInRow}>
        <InCallButton
          iconName={!isScreencastOn ? 'Screenshare' : 'Screen-off'}
          onPress={toggleScreencastAndUpdateMetadata}
        />
      </View>
      <InCallButton type="disconnect" iconName="Hangup" onPress={disconnect} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 34,
  },
  iconInRow: {
    marginRight: 16,
  },
});
