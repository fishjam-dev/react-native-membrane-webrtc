import { InCallButton } from '@components/buttons/InCallButton';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import { RootStack } from '@model/NavigationTypes';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useVideoroomState } from 'src/VideoroomContext';

export const CallControls = () => {
  const { isScreencastOn, toggleScreencast } = Membrane.useScreencast();
  const {
    isCameraOn,
    toggleCamera,
    isMicrophoneOn,
    toggleMicrophone,
    disconnect,
  } = useVideoroomState();

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

  const navigation = useNavigation<StackNavigationProp<RootStack, 'Room'>>();

  const onDisconnectPress = useCallback(async () => {
    await disconnect();
    navigation.navigate('LeaveRoom');
  }, [disconnect]);

  return (
    <View style={styles.iconsContainer}>
      <View style={styles.iconInRow}>
        <InCallButton
          iconName={!isCameraOn ? 'Cam-disabled' : 'Cam'}
          onPress={toggleCamera}
        />
      </View>
      <View style={styles.iconInRow}>
        <InCallButton
          iconName={!isMicrophoneOn ? 'Microphone-off' : 'Microphone'}
          onPress={toggleMicrophone}
        />
      </View>
      <View style={styles.iconInRow}>
        <InCallButton
          iconName={!isScreencastOn ? 'Screenshare' : 'Screen-off'}
          onPress={toggleScreencastAndUpdateMetadata}
        />
      </View>
      <InCallButton
        type="disconnect"
        iconName="Hangup"
        onPress={onDisconnectPress}
      />
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
