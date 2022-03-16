import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import * as Membrane from 'react-native-membrane';
import {
  CameraIcon,
  CameraDisabledIcon,
  MicrophoneDisabledIcon,
  MicrophoneIcon,
  PhoneDownIcon,
  FlipCameraIcon,
  ScreencastIcon,
  ScreencastDisabledIcon,
} from './icons';

const iconSize = 32;

export const Controls = ({ disconnect }: { disconnect: () => void }) => {
  const { isCameraOn, toggleCamera } = Membrane.useCameraState();
  const { isMicrophoneOn, toggleMicrophone } = Membrane.useMicrophoneState();
  const { isScreencastOn, toggleScreencast } = Membrane.useScreencast();

  return (
    <View style={styles.iconsContainer}>
      <Pressable onPress={toggleMicrophone}>
        {!isMicrophoneOn ? (
          <MicrophoneDisabledIcon width={iconSize} height={iconSize} />
        ) : (
          <MicrophoneIcon width={iconSize} height={iconSize} />
        )}
      </Pressable>
      <Pressable onPress={toggleCamera}>
        {!isCameraOn ? (
          <CameraDisabledIcon width={iconSize} height={iconSize} />
        ) : (
          <CameraIcon width={iconSize} height={iconSize} />
        )}
      </Pressable>
      <Pressable onPress={disconnect}>
        <PhoneDownIcon width={iconSize} height={iconSize} />
      </Pressable>
      <Pressable onPress={Membrane.flipCamera}>
        <FlipCameraIcon width={iconSize} height={iconSize} />
      </Pressable>
      <Pressable onPress={() => toggleScreencast({ screencastMetadata: { displayName: "presenting" } })}>
        {isScreencastOn ? (
          <ScreencastIcon width={iconSize} height={iconSize} />
        ) : (
          <ScreencastDisabledIcon width={iconSize} height={iconSize} />
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
