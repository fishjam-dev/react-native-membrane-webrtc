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
  useScreencast,
  ScreencastQuality,
} from '@jellyfish-dev/react-native-membrane-webrtc';
import { useNotifications } from '@model/NotificationsContext';
import React, { useState, useCallback, useEffect } from 'react';

type VideoroomState = 'BeforeMeeting' | 'InMeeting' | 'AfterMeeting';

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
      isScreencastOn: boolean;
      toggleScreencastAndUpdateMetadata: () => void;
      currentCamera: CaptureDevice | null;
      setCurrentCamera: (camera: CaptureDevice | null) => void;
      connectAndJoinRoom: () => Promise<void>;
      disconnect: () => Promise<void>;
      videoroomState: VideoroomState;
      goToMainScreen: () => void;
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
  const { isScreencastOn, toggleScreencast: membraneToggleScreencast } =
    useScreencast();

  const {
    connect,
    joinRoom,
    error,
    disconnect: membraneDisconnect,
  } = useMembraneServer();
  useAudioSettings();

  const { updateVideoTrackMetadata } = useVideoTrackMetadata();
  const { updateAudioTrackMetadata } = useAudioTrackMetadata();

  const [videoroomState, setVideoroomState] =
    useState<VideoroomState>('BeforeMeeting');

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
    setVideoroomState('InMeeting');
  }, [roomName, username, isCameraOn, isMicrophoneOn, currentCamera]);

  const disconnect = useCallback(async () => {
    await membraneDisconnect();
    setVideoroomState('AfterMeeting');
  }, []);

  const goToMainScreen = useCallback(() => {
    setRoomName('');
    setUsername('');
    setVideoroomState('BeforeMeeting');
  }, []);

  const { showNotification } = useNotifications();

  useEffect(() => {
    if (error) {
      showNotification('Error connecting to server', 'error');
    }
  }, [error]);

  const toggleCamera = useCallback(() => {
    if (videoroomState === 'InMeeting') {
      membraneToggleCamera();
      updateVideoTrackMetadata({ active: !isCameraOn, type: 'camera' });
    }
    setIsCameraOn(!isCameraOn);
  }, [isCameraOn, videoroomState]);

  const toggleMicrophone = useCallback(() => {
    if (videoroomState === 'InMeeting') {
      membraneToggleMicrophone();
      updateAudioTrackMetadata({ active: !isMicrophoneOn, type: 'audio' });
    }
    setIsMicrophoneOn(!isMicrophoneOn);
  }, [isMicrophoneOn, videoroomState]);

  const toggleScreencastAndUpdateMetadata = useCallback(() => {
    membraneToggleScreencast({
      screencastMetadata: {
        displayName: 'presenting',
        type: 'screensharing',
        active: 'true',
      },
      quality: ScreencastQuality.HD15,
    });
  }, [isScreencastOn, videoroomState]);

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
    isScreencastOn,
    toggleScreencastAndUpdateMetadata,
    currentCamera,
    setCurrentCamera,
    disconnect,
    videoroomState,
    goToMainScreen,
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
