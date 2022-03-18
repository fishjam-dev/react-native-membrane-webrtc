import { useCallback, useEffect, useState } from 'react';
import {
  NativeModules,
  Platform,
  requireNativeComponent,
  UIManager,
  ViewStyle,
  NativeEventEmitter,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-membrane' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const Membrane = NativeModules.Membrane
  ? NativeModules.Membrane
  : new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );
const eventEmitter = new NativeEventEmitter(Membrane);

export enum ParticipantType {
  Remote = "Remote",
  Local = "Local",
  LocalScreencasting = "LocalScreencasting"
}

export type Metadata = { [key: string]: string }

export type Participant = {
  id: string;
  displayName: string;
  type: ParticipantType;
  metadata: Metadata;
};

export enum VideoLayout {
  FILL = "FILL",
  FIT = "FIT"
};

export enum VideoQuality {
  QVGA_169 = "QVGA169",
  VGA_169 = "VGA169",
  QHD_169 = "QHD169",
  HD_169 = "HD169",
  FHD_169 = "FHD169",
  QVGA_43 = "QVGA43",
  VGA_43 = "VGA43",
  QHD_43 = "QHD43",
  HD_43 = "HD43",
  FHD_43 = "FHD43"
};

export enum ScreencastQuality {
  VGA = "VGA",
  HD5 = "HD5",
  HD15 = "HD15",
  FHD15 = "FHD15",
  FHD30 = "FHD30"
}

export type ConnectionOptions = Partial<{
  quality: VideoQuality,
  flipVideo: boolean,
  userMetadata: Metadata,
  videoTrackMetadata: Metadata,
  audioTrackMetadata: Metadata,
}>

export type ScreencastOptions = Partial<{
  quality: ScreencastQuality,
  screencastMetadata: Metadata,
}>

export function useMembraneServer() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const eventListener = eventEmitter.addListener('MembraneError', setError);
    return () => eventListener.remove();
  }, []);

  const connect = useCallback(
    async (
      url: string,
      roomName: string,
      connectionOptions: ConnectionOptions = {},
    ): Promise<void> => {
      setError(null);
      await Membrane.connect(url, roomName, connectionOptions);
    },
    []
  );

  const joinRoom = useCallback((): Promise<void> => {
    setError(null);
    return Membrane.join();
  }, []);

  const disconnect = useCallback((): Promise<void> => {
    setError(null);
    return Membrane.disconnect();
  }, []);
  return { connect, disconnect, joinRoom, error };
}

export function useRoomParticipants() {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const eventListener = eventEmitter.addListener(
      'ParticipantsUpdate',
      ({ participants }) => {
        setParticipants(participants);
      }
    );
    Membrane.getParticipants().then(({ participants }: { participants: Participant[] }) => {
      setParticipants(participants);
    });
    return () => eventListener.remove();
  }, []);

  return participants;
}

export function useCameraState() {
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);

  useEffect(() => {
    const eventListener = eventEmitter.addListener('IsCameraOn', (event) =>
      setIsCameraOn(event)
    );
    Membrane.isCameraOn().then(setIsCameraOn);
    return () => eventListener.remove();
  }, []);

  const toggleCamera = useCallback(async () => {
    const state = await Membrane.toggleCamera();
    setIsCameraOn(state);
  }, []);

  return { isCameraOn, toggleCamera };
}

export function useMicrophoneState() {
  const [isMicrophoneOn, setIsMicrophoneOn] = useState<boolean>(false);

  useEffect(() => {
    const eventListener = eventEmitter.addListener('IsMicrophoneOn', (event) =>
      setIsMicrophoneOn(event)
    );
    Membrane.isMicrophoneOn().then(setIsMicrophoneOn);
    return () => eventListener.remove();
  }, []);

  const toggleMicrophone = useCallback(async () => {
    const state = await Membrane.toggleMicrophone();
    setIsMicrophoneOn(state);
  }, []);

  return { isMicrophoneOn, toggleMicrophone };
}

export function flipCamera(): Promise<void> {
  return Membrane.flipCamera();
}

export function useScreencast() {
  const [isScreencastOn, setIsScreencastOn] = useState<boolean>(false);

  useEffect(() => {
    if (Platform.OS == 'ios') {
      const eventListener = eventEmitter.addListener('IsScreencastOn', (event) =>
        setIsScreencastOn(event)
      );
      return () => eventListener.remove();
    }
    return () => { }
  }, []);

  const toggleScreencast = useCallback(async (screencastOptions: ScreencastOptions = {}) => {
    const state = await Membrane.toggleScreencast(screencastOptions);
    if (Platform.OS == 'android') {
      setIsScreencastOn(state);
    }
  }, []);

  return { isScreencastOn, toggleScreencast };
}

type VideoRendererProps = {
  participantId: string;
  videoLayout?: VideoLayout;
  style?: ViewStyle;
};

const ComponentName = 'VideoRendererView';

export const VideoRendererView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<VideoRendererProps>(ComponentName)
    : () => {
      throw new Error(LINKING_ERROR);
    };
