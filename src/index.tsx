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
): Promise<number> {
  return Membrane.connect(url, roomName, displayName);
}

export function useParticipants() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  useEffect(() => {
    const listener = (event) => {
      console.log('EVENT!', event);
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
