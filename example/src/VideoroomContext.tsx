import { SERVER_URL } from '@env';
import {
  useMembraneServer,
  useAudioSettings,
  VideoQuality,
  CaptureDevice,
} from '@jellyfish-dev/react-native-membrane-webrtc';
import React, { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';

const VideoroomContext = React.createContext<
  | {
      roomName: string;
      setRoomName: (roomName: string) => void;
      username: string;
      setUsername: (username: string) => void;
      isCameraOn: boolean;
      setIsCameraOn: (isOn: boolean) => void;
      isMicrophoneOn: boolean;
      setIsMicrophoneOn: (isOn: boolean) => void;
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

  const { connect, joinRoom, error } = useMembraneServer();
  useAudioSettings();

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
      videoTrackMetadata: { active: true, type: 'camera' },
      audioTrackMetadata: { active: true, type: 'audio' },
      videoTrackEnabled: isCameraOn,
      audioTrackEnabled: isMicrophoneOn,
      captureDeviceId: currentCamera?.id,
    });
    await joinRoom();
  }, [roomName, username, isCameraOn, isMicrophoneOn, currentCamera]);

  useEffect(() => {
    if (error) {
      console.log(error);
      Alert.alert('Error when connecting to server:', error);
    }
  }, [error]);

  const value = {
    roomName,
    setRoomName,
    username,
    setUsername,
    connectAndJoinRoom,
    isCameraOn,
    setIsCameraOn,
    isMicrophoneOn,
    setIsMicrophoneOn,
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
