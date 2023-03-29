import { BrandColors, TextColors } from '@colors';
import { BackgroundAnimation } from '@components/BackgroundAnimation';
import { NoCameraView } from '@components/NoCameraView';
import { Typo } from '@components/Typo';
import { InCallButton } from '@components/buttons/InCallButton';
import { StandardButton } from '@components/buttons/StandardButton';
import { SERVER_URL } from '@env';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import { RootStack } from '@model/NavigationTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { findIndex } from 'lodash';
import React, {
  useEffect,
  useCallback,
  useLayoutEffect,
  useState,
  useRef,
} from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useVideoroomState } from 'src/VideoroomContext';

type Props = NativeStackScreenProps<RootStack, 'Preview'>;

export const Preview = ({ navigation, route }: Props) => {
  const { roomName, setRoomName, username, setUsername } = useVideoroomState();
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
  const isSimulcastOn = true;

  const { title } = route.params;

  const { connect: mbConnect, joinRoom, error } = Membrane.useMembraneServer();
  Membrane.useAudioSettings();

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
      title,
    });
  }, [navigation]);

  const getTitleLabel = () => {
    switch (title) {
      case 'New meeting':
        return 'Create a new room to start the meeting';
      case 'Join meeting':
        return 'Join an existing meeting';
    }
  };

  const [currentCamera, setCurrentCamera] =
    useState<Membrane.CaptureDevice | null>(null);
  const availableCameras = useRef<Membrane.CaptureDevice[]>([]);

  useEffect(() => {
    Membrane.getCaptureDevices().then((devices) => {
      availableCameras.current = devices;
      setCurrentCamera(devices.find((device) => device.isFrontFacing) || null);
    });
  }, []);

  const connect = useCallback(async () => {
    const validRoomName = roomName.trimEnd();
    const validUserName = username.trimEnd();

    setRoomName(validRoomName);
    setUsername(validUserName);

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
        videoTrackEnabled: isCameraOn,
        audioTrackEnabled: isMicrophoneOn,
        captureDeviceId: currentCamera?.id,
      });
      await joinRoom();
      navigation.navigate('Room');
    } catch (err) {
      console.warn(err);
    }
  }, [
    mbConnect,
    joinRoom,
    roomName,
    isSimulcastOn,
    username,
    SERVER_URL,
    isCameraOn,
    isMicrophoneOn,
    currentCamera,
  ]);

  const switchCamera = useCallback(() => {
    const cameras = availableCameras.current;
    setCurrentCamera(
      (currentCamera) =>
        cameras[(findIndex(cameras, currentCamera) + 1) % cameras.length]
    );
  }, []);

  return (
    <BackgroundAnimation>
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Typo variant="h4">Videoconferencing for everyone</Typo>
          </View>
          <View style={styles.titleLabel}>
            <Typo variant="chat-regular" color={TextColors.description}>
              {getTitleLabel()}
            </Typo>
          </View>

          <View style={styles.cameraPreview}>
            {isCameraOn ? (
              <Membrane.VideoPreviewView
                style={styles.membraneVideoPreview}
                mirrorVideo
                captureDeviceId={currentCamera?.id}
              />
            ) : (
              <NoCameraView username={username} />
            )}

            <View style={styles.iconsRow}>
              <InCallButton
                iconName={isCameraOn ? 'Cam' : 'Cam-disabled'}
                onPress={() => {
                  setIsCameraOn(!isCameraOn);
                }}
              />

              <View style={styles.microphoneButton}>
                <InCallButton
                  iconName={isMicrophoneOn ? 'Microphone' : 'Microphone-off'}
                  onPress={() => {
                    setIsMicrophoneOn(!isMicrophoneOn);
                  }}
                />
              </View>
              <InCallButton iconName="Cam-switch" onPress={switchCamera} />
            </View>
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
      </SafeAreaView>
    </BackgroundAnimation>
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
  },
  microphoneButton: {
    paddingRight: 16,
    paddingLeft: 16,
  },
});
