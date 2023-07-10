import { takeRight } from 'lodash';
import { Channel, Socket, MessageRef } from 'phoenix';
import { useCallback, useEffect, useState, useRef } from 'react';
import {
  NativeModules,
  Platform,
  requireNativeComponent,
  UIManager,
  ViewStyle,
  NativeEventEmitter,
} from 'react-native';

import { NativeMembraneMock } from './__mocks__/native';

function isJest() {
  // @ts-ignore
  return process.env.NODE_ENV === 'test';
}

const LINKING_ERROR =
  `The package 'react-native-membrane' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const Membrane = NativeModules.Membrane
  ? NativeModules.Membrane
  : isJest()
  ? NativeMembraneMock
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );
const eventEmitter = new NativeEventEmitter(Membrane);

export enum TrackType {
  Audio = 'Audio',
  Video = 'Video',
}
/**
 * Type describing Voice Activity Detection statuses.
 *
 * SPEECH - voice activity has been detected
 * SILENCE - lack of voice activity has been detected
 */
export enum VadStatus {
  Silence = 'silence',
  Speech = 'speech',
}

/**
 * Type describing possible reasons of currently selected encoding.
 *
 * - OTHER - the exact reason couldn't be determined
 * - ENCODING_INACTIVE - previously selected encoding became inactive
 * - LOW_BANDWIDTH - there is no longer enough bandwidth to maintain previously selected encoding
 */
export enum EncodingReason {
  Other = 'other',
  EncodingInactive = 'encodingInactive',
  LowBandwidth = 'lowBandwidth',
}

export type Track = {
  id: string;
  type: TrackType;
  metadata: Metadata;
  vadStatus: VadStatus;
  // Encoding that is currently received. Only present for remote tracks.
  encoding: TrackEncoding | null;
  // The reason of currently selected encoding. Only present for remote tracks.
  encodingReason: EncodingReason | null;
};

export type Metadata = { [key: string]: any };
export type SocketConnectionParams = { [key: string]: any };
export type SocketChannelParams = { [key: string]: any };

export type Endpoint = {
  /**
   *  id used to identify an endpoint
   */
  id: string;
  /**
   * used to indicate endpoint type.
   */
  type: string;
  /**
   * whether the endpoint is local or remote
   */
  isLocal: boolean;
  /**
   * a map `string -> any` containing endpoint metadata from the server
   */
  metadata: Metadata;
  /**
   * a list of endpoints's video and audio tracks
   */
  tracks: Track[];
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

export enum AudioOutputDeviceType {
  Bluetooth = 'bluetooth',
  Headset = 'headset',
  Speaker = 'speaker',
  Earpiece = 'earpiece',
}

export enum AudioSessionMode {
  VoiceChat = 'voiceChat',
  VideoChat = 'videoChat',
}

export type AudioOutputDevice = {
  type: AudioOutputDeviceType;
  name: string;
};

/**
 * A type describing simulcast configuration.
 *
 * At the moment, simulcast track is initialized in three versions - low, medium and high.
 * High resolution is the original track resolution, while medium and low resolutions are
 * the original track resolution scaled down by 2 and 4 respectively.
 */
export type SimulcastConfig = {
  /**
   * whether to simulcast track or not. By default simulcast is disabled.
   */
  enabled: boolean;
  /**
   *  list of active encodings. Encoding can be one of `"h"` (original encoding), `"m"` (scaled down x2), `"l"` (scaled down x4).
   */
  activeEncodings: TrackEncoding[];
};

/**
 * Type describing maximal bandwidth that can be used, in kbps. 0 is interpreted as unlimited bandwidth.
 */
export type BandwidthLimit = number;

/**
 * Type describing bandwidth limit for simulcast track. It is a mapping `encoding -> BandwidthLimit`. If encoding isn't present in this mapping,
 * it will be assumed that this particular encoding shouldn't have any bandwidth limit.
 */
export type SimulcastBandwidthLimit = Record<TrackEncoding, BandwidthLimit>;

/**
 * A type describing bandwidth limitation of a track, including simulcast and non-simulcast tracks. Can be `BandwidthLimit` or `SimulcastBandwidthLimit`.
 */
export type TrackBandwidthLimit = BandwidthLimit | SimulcastBandwidthLimit;

export type ConnectionOptions = {
  /**
   * a map `string -> any` containing user metadata to be sent to the server. Use it to send for example user display name or other options.
   */
  endpointMetadata: Metadata;

  /**
   *  a map `string -> any` containing connection params passed to the socket.
   */
  connectionParams: SocketConnectionParams;
  /**
   * a map `string -> any` containing params passed to the socket channel.
   */
  socketChannelParams: SocketChannelParams;
};

export type CameraConfig = {
  /**
   * resolution + aspect ratio of local video track, one of: `QVGA_169`, `VGA_169`, `QHD_169`, `HD_169`,
   * `FHD_169`, `QVGA_43`, `VGA_43`, `QHD_43`, `HD_43`, `FHD_43`. Note that quality might be worse than
   * specified due to device capabilities, internet connection etc.
   * @default `VGA_169`
   */
  quality: VideoQuality;
  /**
   * whether to flip the dimensions of the video, that is whether to film in vertical orientation.
   * @default `true`
   */
  flipVideo: boolean;
  /**
   * a map `string -> any` containing video track metadata to be sent to the server.
   */
  videoTrackMetadata: Metadata;
  /**
   *  SimulcastConfig of a video track. By default simulcast is disabled.
   */
  simulcastConfig: SimulcastConfig;
  /**
   *  bandwidth limit of a video track. By default there is no bandwidth limit.
   */
  maxBandwidth: TrackBandwidthLimit;
  /**
   * whether the camera track is initially enabled, you can toggle it on/off later with toggleCamera method
   * @default `true`
   */
  cameraEnabled: boolean;
  /**
   * id of the camera to start capture with. Get available cameras with `getCaptureDevices()`.
   * You can switch the cameras later with `flipCamera`/`switchCamera` functions.
   * @default the first front camera
   */
  captureDeviceId: string;
};

export type MicrophoneConfig = {
  /**
   * a map `string -> any` containing audio track metadata to be sent to the server.
   */
  audioTrackMetadata: Metadata;
  /**
   * whether the microphone is initially enabled, you can toggle it on/off later with toggleMicrophone method
   * @default `true`
   */
  microphoneEnabled: boolean;
};

export type ScreencastOptions = {
  /**
   * Resolution + fps of screencast track, one of: `VGA`, `HD5`, `HD15`, `FHD15`, `FHD30`.
   * Note that quality might be worse than specified due to device capabilities, internet
   * connection etc.
   * @default `HD15``
   */
  quality: ScreencastQuality;
  /**
   * a map `string -> any` containing screencast track metadata to be sent to the server
   */
  screencastMetadata: Metadata;
  /**
   * SimulcastConfig of a screencast track. By default simulcast is disabled.
   */
  simulcastConfig: SimulcastConfig;
  /**
   *  bandwidth limit of a screencast track. By default there is no bandwidth limit.
   */
  maxBandwidth: TrackBandwidthLimit;
};

export type CaptureDevice = {
  id: string;
  name: string;
  isFrontFacing: boolean;
  isBackFacing: boolean;
};

export enum LoggingSeverity {
  Verbose = 'verbose',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
  None = 'none',
}

/**
 * A record of the total time, in seconds,
 * that this stream has spent in each quality limitation state.
 * none: The resolution and/or framerate is not limited.
 * bandwidth: The resolution and/or framerate is primarily limited due to
 * congestion cues during bandwidth estimation.
 * Typical, congestion control algorithms use inter-arrival time,
 * round-trip time, packet or other congestion cues to perform bandwidth estimation.
 * cpu: The resolution and/or framerate is primarily limited due to CPU load.
 * other: The resolution and/or framerate is primarily limited
 * for a reason other than the above.
 */
export type QualityLimitationDurations = {
  bandwidth: number;
  cpu: number;
  none: number;
  other: number;
};

export type RTCOutboundStats = {
  'kind': string;
  'rid': string;
  'bytesSent': number;
  'targetBitrate': number;
  'packetsSent': number;
  'framesEncoded': number;
  'framesPerSecond': number;
  'frameWidth': number;
  'frameHeight': number;
  'qualityLimitationDurations': QualityLimitationDurations;
  'bytesSent/s': number;
  'packetsSent/s': number;
  'framesEncoded/s': number;
};

export type RTCInboundStats = {
  'kind': number;
  'jitter': number;
  'packetsLost': number;
  'packetsReceived': number;
  'bytesReceived': number;
  'framesReceived': number;
  'frameWidth': number;
  'frameHeight': number;
  'framesPerSecond': number;
  'framesDropped': number;
  'packetsLost/s': number;
  'packetsReceived/s': number;
  'bytesReceived/s': number;
  'framesReceived/s': number;
  'framesDropped/s': number;
};

export type RTCTrackStats = RTCOutboundStats | RTCInboundStats;

type RTCStats = { [key: string]: RTCTrackStats };

const defaultSimulcastConfig = () => ({
  enabled: false,
  activeEncodings: [],
});

let videoSimulcastConfig: SimulcastConfig = defaultSimulcastConfig();
let screencastSimulcastConfig: SimulcastConfig = defaultSimulcastConfig();

/**
 * The hook used to manage a connection with membrane server.
 * @returns An object with functions to manage membrane server connection and `error` if connection failed.
 */
export function useWebRTC() {
  const [error, setError] = useState<string | null>(null);
  // prevent user from calling connect methods multiple times
  const lock = useRef(false);
  const socket = useRef<Socket | null>(null);
  const webrtcChannel = useRef<Channel | null>(null);
  const onSocketError = useRef<MessageRef | null>(null);
  const onSocketClose = useRef<MessageRef | null>(null);

  useEffect(() => {
    const eventListener = eventEmitter.addListener(
      'SendMediaEvent',
      sendMediaEvent
    );
    return () => eventListener.remove();
  }, []);

  const sendMediaEvent = (mediaEvent: string) => {
    if (webrtcChannel.current) {
      webrtcChannel.current.push('mediaEvent', { data: mediaEvent });
    }
  };

  const withLock =
    (f: any) =>
    async (...args: any) => {
      if (lock.current) return Promise.resolve();
      lock.current = true;
      try {
        await f(...args);
      } catch (e) {
        throw e;
      } finally {
        lock.current = false;
      }
    };

  /**
   * Connects to a server.
   * @returns A promise that resolves on success or rejects in case of an error.
   */
  const connect: (
    /**
     * server url
     */
    url: string,
    roomName: string,
    connectionOptions?: Partial<ConnectionOptions>
  ) => Promise<void> = useCallback(
    withLock(
      async (
        url: string,
        roomName: string,
        connectionOptions: Partial<ConnectionOptions> = {}
      ) => {
        setError(null);
        const _socket = new Socket(url, {
          params: connectionOptions.connectionParams,
        });
        _socket.connect();

        onSocketClose.current = _socket.onClose(cleanUp);
        onSocketError.current = _socket.onError(() => {
          setError(`Socket error occured.`);
          cleanUp();
        });

        const _webrtcChannel = _socket.channel(
          `room:${roomName}`,
          connectionOptions.socketChannelParams
        );

        _webrtcChannel.on('mediaEvent', (event) => {
          Membrane.receiveMediaEvent(event.data);
        });

        _webrtcChannel.on('error', (error) => {
          console.error(error);
          setError(
            `Received error report from the server: ${error.message ?? ''}`
          );
          cleanUp();
        });

        _webrtcChannel.onError((reason) => {
          console.error(reason);
          setError(`Webrtc channel error occurred: ${reason}.`);
          cleanUp();
        });

        socket.current = _socket;
        webrtcChannel.current = _webrtcChannel;

        await Membrane.create(url);

        await new Promise<void>((resolve, reject) => {
          _webrtcChannel
            .join()
            .receive('ok', () => {
              resolve();
            })
            .receive('error', (_response) => {
              console.error(_response);
              reject(_response);
            });
        });

        await Membrane.connect(connectionOptions.endpointMetadata || {});
      }
    ),
    []
  );

  /**
   * Call this to gracefully disconnect from the server. After that you can connect again.
   * @returns A promise that resolves on success or rejects in case of an error.
   */
  const disconnect: () => Promise<void> = useCallback(
    withLock((): Promise<void> => {
      setError(null);
      return cleanUp();
    }),
    []
  );

  const cleanUp = (): Promise<void> => {
    webrtcChannel.current?.leave();
    const refs: MessageRef[] = [];
    if (onSocketClose.current) refs.push(onSocketClose.current);
    if (onSocketError.current) refs.push(onSocketError.current);
    socket.current?.off(refs);
    return Membrane.disconnect();
  };

  return {
    connect,
    disconnect,
    error,
  };
}

/**
 * This hook provides live updates of room endpoints.
 * @returns An array of room endpoints.
 */
export function useEndpoints() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);

  useEffect(() => {
    const eventListener = eventEmitter.addListener(
      'EndpointsUpdate',
      ({ endpoints }) => {
        setEndpoints(endpoints);
      }
    );
    Membrane.getEndpoints().then(({ endpoints }: { endpoints: Endpoint[] }) => {
      setEndpoints(endpoints);
    });
    return () => eventListener.remove();
  }, []);

  return endpoints;
}

/**
 * This hook can toggle camera on/off and provides current camera state.
 */
export function useCamera() {
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
  const [simulcastConfig, setSimulcastConfig] =
    useState<SimulcastConfig>(videoSimulcastConfig);

  useEffect(() => {
    const eventListener = eventEmitter.addListener(
      'SimulcastConfigUpdate',
      (event) => {
        setSimulcastConfig(event);
      }
    );
    return () => eventListener.remove();
  }, []);

  useEffect(() => {
    const eventListener = eventEmitter.addListener('IsCameraOn', (event) =>
      setIsCameraOn(event)
    );
    Membrane.isCameraOn().then(setIsCameraOn);
    return () => eventListener.remove();
  }, []);

  /**
   * sets track encoding that server should send to the client library.
   * The encoding will be sent whenever it is available. If choosen encoding is
   * temporarily unavailable, some other encoding will be sent until choosen encoding
   *  becomes active again.
   *
   * @param trackId id of a track which encoding you want to select
   * @param encoding encoding to select
   */
  const setTargetTrackEncoding = useCallback(
    async (trackId: string, encoding: TrackEncoding) => {
      await Membrane.setTargetTrackEncoding(trackId, encoding);
    },
    []
  );

  /**
   * toggles encoding of a video track on/off
   * @param encoding encoding to toggle
   */
  const toggleVideoTrackEncoding = useCallback(
    async (encoding: TrackEncoding) => {
      videoSimulcastConfig = await Membrane.toggleVideoTrackEncoding(encoding);
      setSimulcastConfig(videoSimulcastConfig);
    },
    []
  );

  /**
   * updates maximum bandwidth for the given simulcast encoding of the video track
   * @param encoding  encoding to update
   * @param bandwidth BandwidthLimit to set
   */
  const setVideoTrackEncodingBandwidth = useCallback(
    async (encoding: TrackEncoding, bandwidth: BandwidthLimit) => {
      await Membrane.setVideoTrackEndodingEncodingBandwidth(
        encoding,
        bandwidth
      );
    },
    []
  );

  /**
   * Function to toggle camera on/off
   */
  const toggleCamera = useCallback(async () => {
    const state = await Membrane.toggleCamera();
    setIsCameraOn(state);
  }, []);

  /**
   * Starts local camera capture.
   * @param config configuration of the camera capture
   * @returns A promise that resolves when camera is started.
   */
  const startCamera = useCallback(
    async (config: Partial<CameraConfig> = {}) => {
      videoSimulcastConfig = config.simulcastConfig || defaultSimulcastConfig();
      await Membrane.startCamera(config);
    },
    []
  );

  /**
   * Function that toggles between front and back camera. By default the front camera is used.
   * @returns A promise that resolves when camera is toggled.
   */
  const flipCamera = useCallback(async () => {
    return Membrane.flipCamera();
  }, []);

  /**
   * Function that switches to the specified camera. By default the front camera is used.
   * @returns A promise that resolves when camera is switched.
   */
  const switchCamera = useCallback(async (captureDeviceId: string) => {
    return Membrane.switchCamera(captureDeviceId);
  }, []);

  /** Function that queries available cameras.
   * @returns A promise that resolves to the list of available cameras.
   */
  const getCaptureDevices = useCallback(async () => {
    return Membrane.getCaptureDevices() as Promise<CaptureDevice[]>;
  }, []);

  return {
    isCameraOn,
    simulcastConfig,
    toggleCamera,
    startCamera,
    flipCamera,
    switchCamera,
    getCaptureDevices,
    setTargetTrackEncoding,
    toggleVideoTrackEncoding,
    setVideoTrackEncodingBandwidth,
  };
}

/**
 * This hook can toggle microphone on/off and provides current microphone state.
 */
export function useMicrophone() {
  const [isMicrophoneOn, setIsMicrophoneOn] = useState<boolean>(false);

  useEffect(() => {
    const eventListener = eventEmitter.addListener('IsMicrophoneOn', (event) =>
      setIsMicrophoneOn(event)
    );
    Membrane.isMicrophoneOn().then(setIsMicrophoneOn);
    return () => eventListener.remove();
  }, []);

  /**
   * Function to toggle microphone on/off
   */
  const toggleMicrophone = useCallback(async () => {
    const state = await Membrane.toggleMicrophone();
    setIsMicrophoneOn(state);
  }, []);

  /**
   * Starts local microphone capturing.
   * @param config configuration of the microphone capture
   * @returns A promise that resolves when microphone capturing is started.
   */
  const startMicrophone = useCallback(
    async (config: Partial<MicrophoneConfig> = {}) => {
      await Membrane.startMicrophone(config);
    },
    []
  );

  return { isMicrophoneOn, toggleMicrophone, startMicrophone };
}

/**
 * This hook can toggle screen sharing on/off and provides current screencast state.
 * @returns An object with functions to manage screencast.
 */
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

  /**
   * Toggles the screencast on/off
   */
  const toggleScreencast = useCallback(
    async (screencastOptions: Partial<ScreencastOptions> = {}) => {
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

  /**
   * a function that updates screencast track metadata on the server
   * @param metadata a map `string -> any` containing screencast track metadata to be sent to the server
   */
  const updateScreencastTrackMetadata = useCallback(
    async (metadata: Metadata) => {
      await Membrane.updateScreencastTrackMetadata(metadata);
    },
    []
  );

  /**
   * Toggles simulcast encoding of a screencast track on/off
   * @param encoding encoding to toggle
   */
  const toggleScreencastTrackEncoding = useCallback(
    async (encoding: TrackEncoding) => {
      screencastSimulcastConfig = await Membrane.toggleScreencastTrackEncoding(
        encoding
      );
      setSimulcastConfig(screencastSimulcastConfig);
    },
    []
  );

  /**
   * updates maximum bandwidth for the given simulcast encoding of the screencast track
   * @param encoding encoding to update
   * @param bandwidth BandwidthLimit to set
   */
  const setScreencastTrackEncodingBandwidth = useCallback(
    async (encoding: TrackEncoding, bandwidth: BandwidthLimit) => {
      await Membrane.setScreencastTrackEncodingBandwidth(encoding, bandwidth);
    },
    []
  );

  /**
   * updates maximum bandwidth for the screencast track. This value directly translates
   * to quality of the stream and the amount of RTP packets being sent. In case simulcast
   * is enabled bandwidth is split between all of the variant streams proportionally to
   * their resolution
   * @param bandwidth BandwidthLimit to set
   */
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

/**
 * a function that updates endpoints's metadata on the server
 * @param metadata a map `string -> any` containing user's track metadata to be sent to the server
 */
export async function updateEndpointMetadata(metadata: Metadata) {
  await Membrane.updateEndpointMetadata(metadata);
}

/**
 * a function that updates video metadata on the server.
 * @param metadata a map string -> any containing video track metadata to be sent to the server
 */
export async function updateVideoTrackMetadata(metadata: Metadata) {
  await Membrane.updateVideoTrackMetadata(metadata);
}
/**
 * a function that updates audio metadata on the server
 * @param metadata a map `string -> any` containing audio track metadata to be sent to the server
 */
export async function updateAudioTrackMetadata(metadata: Metadata) {
  await Membrane.updateAudioTrackMetadata(metadata);
}
/**
 * This hook manages audio settings.
 */
export function useAudioSettings() {
  const [selectedAudioOutputDevice, setSelectedAudioOutputDevice] =
    useState<AudioOutputDevice | null>(null);
  const [availableDevices, setAvailableDevices] = useState<AudioOutputDevice[]>(
    []
  );

  const onAudioDevice = useCallback((event) => {
    setSelectedAudioOutputDevice(event.selectedDevice);
    setAvailableDevices(event.availableDevices);
  }, []);

  useEffect(() => {
    const eventListener = eventEmitter.addListener(
      'AudioDeviceUpdate',
      onAudioDevice
    );
    Membrane.startAudioSwitcher();
    return () => {
      eventListener.remove();
      if (Platform.OS === 'android') {
        Membrane.stopAudioSwitcher();
      }
    };
  }, []);

  /**
   * [Android only] selects output audio device.
   * For detecting and selecting bluettoth devices make sure you have the BLUETOOTH_CONNECT permission.
   */
  const selectOutputAudioDevice = useCallback(
    async (device: AudioOutputDeviceType) => {
      if (Platform.OS === 'ios') {
        throw Error(
          'selectOutputAudioDevice function is supported only on Android. ' +
            'To select an output audio device on iOS use selectAudioSessionMode or showAudioRoutePicker functions'
        );
      }
      await Membrane.setOutputAudioDevice(device);
    },
    []
  );

  /**
   * [iOS only] selects audio session mode. For more information refer to Apple's documentation:
   *  https://developer.apple.com/documentation/avfaudio/avaudiosession/mode/
   *
   */
  const selectAudioSessionMode = useCallback(
    async (audioSessionMode: AudioSessionMode) => {
      if (Platform.OS === 'android') {
        throw Error('selectAudioSessionMode function is supported only on iOS');
      }
      await Membrane.selectAudioSessionMode(audioSessionMode);
    },
    []
  );

  /**
   * [iOS only] Shows a picker modal that allows user to select output audio device. For more
   * information refer to Apple's documentation: https://developer.apple.com/documentation/avkit/avroutepickerview
   */
  const showAudioRoutePicker = useCallback(async () => {
    if (Platform.OS === 'android') {
      throw Error(
        'showAudioRoutePicker function is supported only on iOS. ' +
          'To select an output audio device on Android use selectOutputAudioDevice function'
      );
    }
    await Membrane.showAudioRoutePicker();
  }, []);

  return {
    /**
     * currently selected output audio device
     */
    selectedAudioOutputDevice,
    /**
     * [Android only] available audio output devices to be set
     */
    availableDevices,
    selectOutputAudioDevice,
    selectAudioSessionMode,
    showAudioRoutePicker,
  };
}

/**
 * updates maximum bandwidth for the video track. This value directly translates
 * to quality of the stream and the amount of RTP packets being sent. In case simulcast
 * is enabled bandwidth is split between all of the variant streams proportionally to
 * their resolution.
 * @param BandwidthLimit to set
 */
export async function setVideoTrackBandwidth(bandwidth: BandwidthLimit) {
  await Membrane.setVideoTrackBandwidth(bandwidth);
}

/**
 * Function that changes level of debugging logs in WebRTC.
 * @param severity to use when displaying logs
 * @returns a promise that is resolved when debug severity is changed
 */
export function changeWebRTCLoggingSeverity(
  severity: LoggingSeverity
): Promise<void> {
  return Membrane.changeWebRTCLoggingSeverity(severity);
}

/**
 * This hook provides current bandwidth estimation
 * estimation - client's available incoming bitrate estimated
 * by the server. It's measured in bits per second.
 */
export function useBandwidthEstimation() {
  const [estimation, setEstimation] = useState<number | null>(null);

  useEffect(() => {
    const eventListener = eventEmitter.addListener(
      'BandwidthEstimation',
      (estimation) => setEstimation(estimation)
    );
    return () => eventListener.remove();
  }, []);

  return { estimation };
}

/**
 * This hook provides access to current rtc statistics data.
 */
export function useRTCStatistics(refreshInterval: number) {
  const MAX_SIZE = 120;
  const [statistics, setStatistics] = useState<RTCStats[]>([]);

  useEffect(() => {
    const intervalId = setInterval(getStatistics, refreshInterval);
    return () => {
      clearInterval(intervalId);
      setStatistics([]);
    };
  }, []);

  // Gets stats from the native libraries.
  const getStatistics = useCallback(async () => {
    const stats = await Membrane.getStatistics();
    setStatistics((prev) => {
      const newStats = [...prev, processIncomingStats(prev, stats)];
      takeRight(newStats, MAX_SIZE);
      return newStats;
    });
  }, []);

  // Calculates diff between pervious and current stats,
  // providing end users with a per second metric.
  const processIncomingStats = useCallback(
    (statistics: RTCStats[], stats: RTCStats) => {
      Object.keys(stats).forEach((obj) => {
        if (obj.includes('Inbound')) {
          const rtcStats = stats[obj] as RTCInboundStats;

          if (
            statistics.length > 0 &&
            Object.keys(statistics[statistics.length - 1]).includes(obj)
          ) {
            const prevRtcStats = statistics[statistics.length - 1][
              obj
            ] as RTCInboundStats;

            rtcStats['packetsLost/s'] =
              rtcStats['packetsLost'] - prevRtcStats['packetsLost'];
            rtcStats['packetsReceived/s'] =
              rtcStats['packetsReceived'] - prevRtcStats['packetsReceived'];
            rtcStats['bytesReceived/s'] =
              rtcStats['bytesReceived'] - prevRtcStats['bytesReceived'];
            rtcStats['framesReceived/s'] =
              rtcStats['framesReceived'] - prevRtcStats['framesReceived'];
            rtcStats['framesDropped/s'] =
              rtcStats['framesDropped'] - prevRtcStats['framesDropped'];
          } else {
            rtcStats['packetsLost/s'] = 0;
            rtcStats['packetsReceived/s'] = 0;
            rtcStats['bytesReceived/s'] = 0;
            rtcStats['framesReceived/s'] = 0;
            rtcStats['framesDropped/s'] = 0;
          }
          return stats;
        }
        // Outbound
        const rtcStats = stats[obj] as RTCOutboundStats;

        if (
          statistics.length > 0 &&
          Object.keys(statistics[statistics.length - 1]).includes(obj)
        ) {
          const prevRtcStats = statistics[statistics.length - 1][
            obj
          ] as RTCOutboundStats;

          rtcStats['bytesSent/s'] =
            rtcStats['bytesSent'] - prevRtcStats['bytesSent'];
          rtcStats['packetsSent/s'] =
            rtcStats['packetsSent'] - prevRtcStats['packetsSent'];
          rtcStats['framesEncoded/s'] =
            rtcStats['framesEncoded'] - prevRtcStats['framesEncoded'];
        } else {
          rtcStats['bytesSent/s'] = 0;
          rtcStats['packetsSent/s'] = 0;
          rtcStats['framesEncoded/s'] = 0;
        }
        return stats;
      });
      return stats;
    },
    []
  );

  return { statistics };
}

export type VideoRendererProps = {
  /**
   * id of the video track which you want to render.
   */
  trackId: string;
  /**
   * `FILL` or `FIT` - it works just like RN Image component. `FILL` fills the whole view
   * with video and it may cut some parts of the video. `FIT` scales the video so the whole
   * video is visible, but it may leave some empty space in the view.
   * @default `FILL`
   */
  videoLayout?: VideoLayout;
  /**
   * whether to mirror video
   * @default false
   */
  mirrorVideo?: boolean;
  style?: ViewStyle;
};

const VideoRendererViewComponentName = 'VideoRendererView';

/**
 * A component used for rendering the endpoint's video and audio. You can add some basic View styling.
 */
export const VideoRendererView =
  UIManager.getViewManagerConfig(VideoRendererViewComponentName) != null
    ? requireNativeComponent<VideoRendererProps>(VideoRendererViewComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

const VideoPreviewViewName = 'VideoPreviewView';

export type VideoPreviewViewProps = {
  /**
   * `FILL` or `FIT` - it works just like RN Image component. `FILL` fills the whole view
   * with video and it may cut some parts of the video. `FIT` scales the video so the whole
   * video is visible, but it may leave some empty space in the view.
   * @default `FILL`
   */
  videoLayout?: VideoLayout;
  /**
   * whether to mirror video
   * @default false
   */
  mirrorVideo?: boolean;
  style?: ViewStyle;
  /**
   * Id of the camera used for preview. Get available cameras with `getCaptureDevices()` function.
   * @default the first front camera
   */
  captureDeviceId?: string;
};

/**
 * A component used for preview of the user's video.
 */
export const VideoPreviewView =
  UIManager.getViewManagerConfig(VideoPreviewViewName) != null
    ? requireNativeComponent<VideoPreviewViewProps>(VideoPreviewViewName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
