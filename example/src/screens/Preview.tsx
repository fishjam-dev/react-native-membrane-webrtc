import { BrandColors } from '@colors';
import { BackgroundWrapper } from '@components/BackgroundWrapper';
import { Typo } from '@components/Typo';
import { InCallButton } from '@components/buttons/InCallButton';
import { StandardButton } from '@components/buttons/StandardButton';
import { SERVER_URL } from '@env';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import { RootStack } from '@model/NavigationTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useCallback, useLayoutEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { useVideoroomState } from 'src/VideoroomContext';

type Props = NativeStackScreenProps<RootStack, 'Preview'>;

export const Preview = ({ navigation, route }: Props) => {
  const { roomName, setRoomName, username, setUsername } = useVideoroomState();
  const { isCameraOn } = Membrane.useCameraState();
  const { isMicrophoneOn } = Membrane.useMicrophoneState();
  //   const { updateVideoTrackMetadata } = Membrane.useVideoTrackMetadata();
  //   const { updateAudioTrackMetadata } = Membrane.useAudioTrackMetadata();
  const { prevScreen } = route.params;
  const headerTitle =
    prevScreen === 'CreateRoom' ? 'New meeting' : 'Join meeting';
  const titleLabel =
    prevScreen === 'CreateRoom'
      ? 'Create a new room to start the meeting'
      : 'Join an existing meeting';
  const isSimulcastOn = true;

  const { connect: mbConnect, joinRoom, error } = Membrane.useMembraneServer();

  const params = {
    token: 'NOW_YOU_CAN_SEND_PARAMS',
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      Alert.alert('Error when connecting to server:', error);
    }
  }, [error]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: headerTitle,
    });
  }, [navigation]);

  const toggleMicrophoneAndUpdateMetadata = () => {
    // toggleMicrophone();
    // updateAudioTrackMetadata({
    //   active: !isMicrophoneOn,
    //   type: 'audio',
    // });
  };

  const toggleCameraAndUpdateMetadata = () => {
    // toggleCamera();
    // updateVideoTrackMetadata({
    //   active: !isCameraOn,
    //   type: 'camera',
    // });
  };

  const requestPermissions = useCallback(async () => {
    if (Platform.OS === 'ios') return;
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const connect = useCallback(async () => {
    const validRoomName = roomName.trimEnd();
    const validUserName = username.trimEnd();

    setRoomName(validRoomName);
    setUsername(validUserName);

    await requestPermissions();
    try {
      await mbConnect(SERVER_URL, validRoomName, {
        userMetadata: { displayName: validUserName },
        connectionParams: params,
        socketChannelParams: {
          isSimulcastOn,
        },
        simulcastConfig: {
          enabled: isSimulcastOn,
          activeEncodings: ['l', 'm', 'h'],
        },
        quality: Membrane.VideoQuality.HD_169,
        maxBandwidth: { l: 150, m: 500, h: 1500 },
        videoTrackMetadata: { active: true, type: 'camera' },
        audioTrackMetadata: { active: true, type: 'audio' },
        isSpeakerphoneOn: false,
      });
      await joinRoom();
      navigation.navigate('Room');
    } catch (err) {
      console.warn(err);
    }
  }, [
    requestPermissions,
    mbConnect,
    joinRoom,
    roomName,
    isSimulcastOn,
    username,
    SERVER_URL,
  ]);

  return (
    <BackgroundWrapper hasHeader>
      <View style={styles.content}>
        <View style={styles.header}>
          <Typo variant="h4">Videoconferencing for everyone</Typo>
        </View>
        <View style={styles.titleLabel}>
          <Typo variant="chat-regular">{titleLabel}</Typo>
        </View>

        <View style={styles.cameraPreview}>
          <View style={styles.iconsRow}>
            {!isCameraOn ? (
              <InCallButton
                iconName="Cam-disabled"
                onPress={toggleCameraAndUpdateMetadata}
              />
            ) : (
              <InCallButton
                iconName="Cam"
                onPress={toggleCameraAndUpdateMetadata}
              />
            )}
            <View style={styles.microphoneButton}>
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
            </View>
            <InCallButton iconName="Settings" onPress={() => {}} />
          </View>
          <Membrane.VideoPreviewView style={styles.membraneVideoPreview} />
        </View>

        <View style={styles.roomNameLabel}>
          <Typo variant="h5">You are joining: {roomName.trimEnd()}</Typo>
        </View>

        <View style={styles.joinButton}>
          <StandardButton onPress={connect}>Join the room</StandardButton>
        </View>

        <View style={styles.stepLabel}>
          <Typo variant="label">Step 2/2</Typo>
        </View>
      </View>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  header: {
    alignSelf: 'center',
  },
  titleLabel: {
    marginTop: 8,
    alignSelf: 'center',
  },
  cameraPreview: {
    width: 236,
    height: 320,
    alignSelf: 'center',
    marginTop: 24,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BrandColors.darkBlue60,
    overflow: 'hidden',
  },
  membraneVideoPreview: {
    width: 236,
    height: 320,
  },
  roomNameLabel: {
    marginTop: 32,
    alignSelf: 'center',
  },
  joinButton: {
    marginTop: 32,
    width: '100%',
  },
  stepLabel: {
    marginTop: 16,
    alignSelf: 'center',
  },
  iconsRow: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    justifyContent: 'center',
    zIndex: 3,
  },
  microphoneButton: {
    paddingRight: 16,
    paddingLeft: 16,
  },
});
