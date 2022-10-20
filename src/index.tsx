import { useCallback, useEffect, useState, useRef } from 'react';
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
  Remote = 'Remote',
  Local = 'Local',
  LocalScreencasting = 'LocalScreencasting',
}

export type Metadata = { [key: string]: any };
export type SocketConnectionParams = { [key: string]: any };

export type Participant = {
  id: string;
  type: ParticipantType;
  metadata: Metadata;
  videoTrackMetadata: Metadata;
  audioTrackMetadata: Metadata;
};

export enum VideoLayout {
  FILL = 'FILL',
  FIT = 'FIT',
}

export enum VideoQuality {
  QVGA_169 = 'QVGA169',
  VGA_169 = 'VGA169',
  QHD_169 = 'QHD169',
  HD_169 = 'HD169',
  FHD_169 = 'FHD169',
  QVGA_43 = 'QVGA43',
  VGA_43 = 'VGA43',
  QHD_43 = 'QHD43',
  HD_43 = 'HD43',
  FHD_43 = 'FHD43',
}

export enum ScreencastQuality {
  VGA = 'VGA',
  HD5 = 'HD5',
  HD15 = 'HD15',
  FHD15 = 'FHD15',
  FHD30 = 'FHD30',
}

export type TrackEncoding = 'l' | 'm' | 'h';

export type SimulcastConfig = {
  enabled: boolean;
  activeEncodings: TrackEncoding[];
};

export type BandwidthLimit = number;

export type SimulcastBandwidthLimit = Map<TrackEncoding, BandwidthLimit>;

export type TrackBandwidthLimit = BandwidthLimit | SimulcastBandwidthLimit;

export type ConnectionOptions = Partial<{
  quality: VideoQuality;
  flipVideo: boolean;
  userMetadata: Metadata;
  videoTrackMetadata: Metadata;
  audioTrackMetadata: Metadata;
  simulcastConfig: SimulcastConfig;
  maxBandwidth: TrackBandwidthLimit;
  connectionParams: SocketConnectionParams;
}>;

export type ScreencastOptions = Partial<{
  quality: ScreencastQuality;
  screencastMetadata: Metadata;
  simulcastConfig: SimulcastConfig;
  maxBandwidth: TrackBandwidthLimit;
}>;

const defaultSimulcastConfig = () => ({
  enabled: false,
  activeEncodings: [],
});

let videoSimulcastConfig: SimulcastConfig = defaultSimulcastConfig();
let screencastSimulcastConfig: SimulcastConfig = defaultSimulcastConfig();

export function useMembraneServer() {
  const [error, setError] = useState<string | null>(null);
  // prevent user from calling connect methods multiple times
  const lock = useRef(false);

  useEffect(() => {
    const eventListener = eventEmitter.addListener('MembraneError', setError);
    return () => eventListener.remove();
  }, []);

  const withLock =
    (f: any) =>
    async (...args: any) => {
      if (lock.current) return Promise.resolve();
      lock.current = true;
      await f(...args);
      lock.current = false;
    };

  const connect = useCallback(
    withLock(
      (
        url: string,
        roomName: string,
        connectionOptions: ConnectionOptions = {}
      ): Promise<void> => {
        setError(null);
        videoSimulcastConfig =
          connectionOptions.simulcastConfig || defaultSimulcastConfig();
        return Membrane.connect(url, roomName, connectionOptions);
      }
    ),
    []
  );

  const joinRoom = useCallback(
    withLock((): Promise<void> => {
      setError(null);
      return Membrane.join();
    }),
    []
  );

  const disconnect = useCallback(
    withLock((): Promise<void> => {
      setError(null);
      return Membrane.disconnect();
    }),
    []
  );
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
    Membrane.getParticipants().then(
      ({ participants }: { participants: Participant[] }) => {
        setParticipants(participants);
      }
    );
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
  const [simulcastConfig, setSimulcastConfig] = useState<SimulcastConfig>(
    screencastSimulcastConfig
  );

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const eventListener = eventEmitter.addListener(
        'IsScreencastOn',
        (event) => setIsScreencastOn(event)
      );
      return () => eventListener.remove();
    }
    return () => {};
  }, []);

  const toggleScreencast = useCallback(
    async (screencastOptions: ScreencastOptions = {}) => {
      const state = await Membrane.toggleScreencast(screencastOptions);
      if (Platform.OS === 'android') {
        setIsScreencastOn(state);
      }
      screencastSimulcastConfig =
        screencastOptions.simulcastConfig || defaultSimulcastConfig();
      setSimulcastConfig(screencastSimulcastConfig);
    },
    []
  );

  const updateScreencastTrackMetadata = useCallback(
    async (metadata: Metadata) => {
      await Membrane.updateScreencastTrackMetadata(metadata);
    },
    []
  );

  const toggleScreencastTrackEncoding = useCallback(
    async (encoding: TrackEncoding) => {
      screencastSimulcastConfig = await Membrane.toggleScreencastTrackEncoding(
        encoding
      );
      setSimulcastConfig(screencastSimulcastConfig);
    },
    []
  );

  const setScreencastTrackEncodingBandwidth = useCallback(
    async (encoding: TrackEncoding, bandwidth: BandwidthLimit) => {
      await Membrane.setScreencastTrackEncodingBandwidth(encoding, bandwidth);
    },
    []
  );

  const setScreencastTrackBandwidth = useCallback(
    async (bandwidth: BandwidthLimit) => {
      await Membrane.setScreencastTrackBandwidth(bandwidth);
    },
    []
  );

  return {
    isScreencastOn,
    toggleScreencast,
    updateScreencastTrackMetadata,
    toggleScreencastTrackEncoding,
    simulcastConfig,
    setScreencastTrackEncodingBandwidth,
    setScreencastTrackBandwidth,
  };
}

export function usePeerMetadata() {
  const updatePeerMetadata = useCallback(async (metadata: Metadata) => {
    await Membrane.updatePeerMetadata(metadata);
  }, []);
  return { updatePeerMetadata };
}

export function useVideoTrackMetadata() {
  const updateVideoTrackMetadata = useCallback(async (metadata: Metadata) => {
    await Membrane.updateVideoTrackMetadata(metadata);
  }, []);
  return { updateVideoTrackMetadata };
}

export function useAudioTrackMetadata() {
  const updateAudioTrackMetadata = useCallback(async (metadata: Metadata) => {
    await Membrane.updateAudioTrackMetadata(metadata);
  }, []);
  return { updateAudioTrackMetadata };
}

export function useAudioSettings() {
  const [isSpeakerphoneOn, setIsSpeakerphoneOn] = useState<boolean>(true);

  const toggleSpeakerphone = useCallback(async () => {
    if (Platform.OS !== 'android') {
      console.warn(
        'react-native-membrane: toggleSpeakerphone is available only on Android'
      );
      return;
    }
    await Membrane.toggleSpeakerphone();
    setIsSpeakerphoneOn((isSpeakerphoneOn) => !isSpeakerphoneOn);
  }, []);
  return { toggleSpeakerphone, isSpeakerphoneOn };
}

export function useSimulcast() {
  const [simulcastConfig, setSimulcastConfig] =
    useState<SimulcastConfig>(videoSimulcastConfig);

  const setTargetTrackEncoding = useCallback(
    async (peerId: string, encoding: TrackEncoding) => {
      await Membrane.setTargetTrackEncoding(peerId, encoding);
    },
    []
  );

  const toggleVideoTrackEncoding = useCallback(
    async (encoding: TrackEncoding) => {
      videoSimulcastConfig = await Membrane.toggleVideoTrackEncoding(encoding);
      setSimulcastConfig(videoSimulcastConfig);
    },
    []
  );

  const setVideoTrackEncodingBandwidth = useCallback(
    async (encoding: TrackEncoding, bandwidth: BandwidthLimit) => {
      await Membrane.setVideoTrackEndodingEncodingBandwidth(
        encoding,
        bandwidth
      );
    },
    []
  );

  return {
    simulcastConfig,
    setTargetTrackEncoding,
    toggleVideoTrackEncoding,
    setVideoTrackEncodingBandwidth,
  };
}

export function useBandwidthLimit() {
  const setVideoTrackBandwidth = useCallback(
    async (bandwidth: BandwidthLimit) => {
      await Membrane.setVideoTrackBandwidth(bandwidth);
    },
    []
  );

  return { setVideoTrackBandwidth };
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
