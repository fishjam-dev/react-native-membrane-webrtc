import { useEffect, useState } from 'react';
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

export type Participant = {
  id: string;
  displayName: string;
};

export function connect(
  url: string,
  roomName: string,
  displayName: string
): Promise<void> {
  return Membrane.connect(url, roomName, displayName);
}

export function disconnect(): Promise<void> {
  return Membrane.disconnect();
}

export function useParticipants() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  useEffect(() => {
    const listener = (event) => {
      setParticipants(event.participants);
    };
    const eventListener = eventEmitter.addListener(
      'ParticipantsUpdate',
      listener
    );
    return () => eventListener.remove();
  }, []);

  return participants;
}

export function useCameraState() {
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);

  useEffect(() => {
    const eventListener = eventEmitter.addListener(
      'IsCameraOn',
      (event) => setIsCameraOn(event)
    );
    Membrane.isCameraOn().then(setIsCameraOn);
    return eventListener.remove;
  }, []);

  const toggleCamera = async () => {
    const state = await Membrane.toggleCamera();
    setIsCameraOn(state);
  }

  return [isCameraOn, toggleCamera];
}

export function useMicrophoneState() {
  const [isMicrophoneOn, setIsMicrophoneOn] = useState<boolean>(false);

  useEffect(() => {
    const eventListener = eventEmitter.addListener(
      'IsMicrophoneOn',
      (event) => setIsMicrophoneOn(event)
    );
    Membrane.isMicrophoneOn().then(setIsMicrophoneOn);
    return eventListener.remove;
  }, []);

  const toggleMicrophone = async () => {
    const state = await Membrane.toggleMicrophone();
    setIsMicrophoneOn(state);
  }

  return [isMicrophoneOn, toggleMicrophone];
}

export function flipCamera(): Promise<void> {
  return Membrane.flipCamera();
}

type VideoRendererProps = {
  participantId: string;
  style?: ViewStyle;
};

const ComponentName = 'VideoRendererView';

export const VideoRendererView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<VideoRendererProps>(ComponentName)
    : () => {
      throw new Error(LINKING_ERROR);
    };
