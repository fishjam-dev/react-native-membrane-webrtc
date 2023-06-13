import React from 'react';
import { View } from 'react-native';

const {
  EndpointType,
  TrackType,
  VadStatus,
  EncodingReason,
  VideoLayout,
  VideoQuality,
  ScreencastQuality,
  AudioOutputDeviceType,
  AudioSessionMode,
  CaptureDevice,
  LoggingSeverity,
} = jest.requireActual('../index');

export {
  EndpointType,
  TrackType,
  VadStatus,
  EncodingReason,
  VideoLayout,
  VideoQuality,
  ScreencastQuality,
  AudioOutputDeviceType,
  AudioSessionMode,
  LoggingSeverity,
};

const NOOP = () => {
  // noop
};

const emptyPromise = async (): Promise<void> => {
  return new Promise<void>((resolve) => {
    resolve();
  });
};

export const useWebRTC = () => {
  return {
    connect: emptyPromise,
    disconnect: emptyPromise,
    error: null,
  };
};
export const useEndpoints = () => [];
export const useCameraState = () => {
  return {
    isCameraOn: false,
    toggleCamera: NOOP,
  };
};
export const useMicrophoneState = () => {
  return {
    isMicrophoneOn: false,
    toggleMicrophone: NOOP,
  };
};
export const flipCamera = emptyPromise;
export const switchCamera = emptyPromise;
export const getCaptureDevices = async (): Promise<typeof CaptureDevice[]> => {
  return new Promise((resolve) => {
    resolve([]);
  });
};
export const useScreencast = () => {
  return {
    isScreencastOn: false,
    toggleScreencast: NOOP,
    updateScreencastTrackMetadata: NOOP,
    toggleScreencastTrackEncoding: NOOP,
    simulcastConfig: NOOP,
    setScreencastTrackEncodingBandwidth: NOOP,
    setScreencastTrackBandwidth: NOOP,
  };
};
export const useEndpointMetadata = () => {
  return {
    updateEndpointMetadata: NOOP,
  };
};
export const updateVideoTrackMetadata = emptyPromise;
export const updateAudioTrackMetadata = emptyPromise;

export const useAudioSettings = () => {
  return {
    selectedAudioOutputDevice: null,
    availableDevices: [],
    selectOutputAudioDevice: NOOP,
    selectAudioSessionMode: NOOP,
    showAudioRoutePicker: NOOP,
  };
};
export const useSimulcast = () => {
  return {
    simulcastConfig: { enabled: false, activeEncodings: [] },
    setTargetTrackEncoding: NOOP,
    toggleVideoTrackEncoding: NOOP,
    setVideoTrackEncodingBandwidth: NOOP,
  };
};
export const useBandwidthLimit = () => {
  return { setVideoTrackBandwidth: NOOP };
};
export const useBandwidthEstimation = () => {
  return {
    estimation: null,
  };
};
export const changeWebRTCLoggingSeverity = emptyPromise;
export const useRTCStatistics = () => {
  return { statistics: [] };
};

export const VideoRendererView = () => {
  return <View />;
};
export const VideoPreviewView = () => {
  return <View />;
};
