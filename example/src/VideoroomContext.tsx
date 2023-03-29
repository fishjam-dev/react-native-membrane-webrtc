import { SERVER_URL } from '@env';
import {
  useMembraneServer,
  useAudioSettings,
  VideoQuality,
  CaptureDevice,
  useVideoTrackMetadata,
  useAudioTrackMetadata,
  useCameraState,
  useMicrophoneState,
} from '@jellyfish-dev/react-native-membrane-webrtc';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Alert } from 'react-native';

const VideoroomContext = React.createContext<
  | {
      roomName: string;
      setRoomName: (roomName: string) => void;
      username: string;
      setUsername: (username: string) => void;
      isCameraOn: boolean;
      toggleCamera: () => void;
      isMicrophoneOn: boolean;
      toggleMicrophone: () => void;
      currentCamera: CaptureDevice | null;
      setCurrentCamera: (camera: CaptureDevice | null) => void;
      connectAndJoinRoom: () => Promise<void>;
    }
  | undefined
>(undefined);

const VideoroomContextProvider = (props) => {
  const [roomName, setRoomName] = useState('');
  const [username, setUsername] = useState('');
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
  const [currentCamera, setCurrentCamera] = useState<CaptureDevice | null>(
    null
  );
  const { toggleCamera: membraneToggleCamera } = useCameraState();
  const { toggleMicrophone: membraneToggleMicrophone } = useMicrophoneState();

  const { connect, joinRoom, error } = useMembraneServer();
  useAudioSettings();

  const { updateVideoTrackMetadata } = useVideoTrackMetadata();
  const { updateAudioTrackMetadata } = useAudioTrackMetadata();

  const isConnected = useRef(false);

  const connectAndJoinRoom = useCallback(async () => {
    const trimmedRoomName = roomName.trimEnd();
    const trimmedUserName = username.trimEnd();

    setRoomName(trimmedRoomName);
    setUsername(trimmedUserName);

    await connect(SERVER_URL, trimmedRoomName, {
      userMetadata: { displayName: trimmedUserName },
      socketChannelParams: {
        isSimulcastOn: true,
      },
      simulcastConfig: {
        enabled: true,
        activeEncodings: ['l', 'm', 'h'],
      },
      quality: VideoQuality.HD_169,
      maxBandwidth: { l: 150, m: 500, h: 1500 },
      videoTrackMetadata: { active: isCameraOn, type: 'camera' },
      audioTrackMetadata: { active: isMicrophoneOn, type: 'audio' },
      videoTrackEnabled: isCameraOn,
      audioTrackEnabled: isMicrophoneOn,
      captureDeviceId: currentCamera?.id,
    });
    await joinRoom();
    isConnected.current = true;
  }, [roomName, username, isCameraOn, isMicrophoneOn, currentCamera]);

  useEffect(() => {
    if (error) {
      console.log(error);
      Alert.alert('Error when connecting to server:', error);
    }
  }, [error]);

  const toggleCamera = useCallback(() => {
    if (isConnected.current) {
      membraneToggleCamera();
      updateVideoTrackMetadata({ active: !isCameraOn, type: 'camera' });
    }
    setIsCameraOn(!isCameraOn);
  }, [isCameraOn]);

  const toggleMicrophone = useCallback(() => {
    if (isConnected.current) {
      membraneToggleMicrophone();
      updateAudioTrackMetadata({ active: !isMicrophoneOn, type: 'audio' });
    }
    setIsMicrophoneOn(!isMicrophoneOn);
  }, [isMicrophoneOn]);

  const value = {
    roomName,
    setRoomName,
    username,
    setUsername,
    connectAndJoinRoom,
    isCameraOn,
    toggleCamera,
    isMicrophoneOn,
    toggleMicrophone,
    currentCamera,
    setCurrentCamera,
  };

  return (
    <VideoroomContext.Provider value={value}>
      {props.children}
    </VideoroomContext.Provider>
  );
};

function useVideoroomState() {
  const context = React.useContext(VideoroomContext);
  if (context === undefined) {
    throw new Error('useRoomName must be used within a VideoroomContext');
  }
  return context;
}

export { VideoroomContextProvider, useVideoroomState };
