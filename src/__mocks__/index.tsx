import React from 'react';
import { View } from 'react-native';

const {
  ParticipantType,
  TrackType,
  VadStatus,
  EncodingReason,
  VideoLayout,
  VideoQuality,
  ScreencastQuality,
  AudioOutputDeviceType,
  AudioSessionMode,
  CaptureDevice,
} = jest.requireActual('../index');

export {
  ParticipantType,
  TrackType,
  VadStatus,
  EncodingReason,
  VideoLayout,
  VideoQuality,
  ScreencastQuality,
  AudioOutputDeviceType,
  AudioSessionMode,
};

const NOOP = () => {
  // noop
};

const emptyPromise = async (): Promise<void> => {
  return new Promise<void>((resolve) => {
    resolve();
  });
};

export const useMembraneServer = () => {
  return {
    connect: emptyPromise,
    disconnect: emptyPromise,
    joinRoom: emptyPromise,
    error: null,
  };
};
export const useRoomParticipants = () => [];
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
export const usePeerMetadata = () => {
  return {
    updatePeerMetadata: NOOP,
  };
};
export const useVideoTrackMetadata = () => {
  return {
    updateVideoTrackMetadata: NOOP,
  };
};
export const useAudioTrackMetadata = () => {
  return {
    updateAudioTrackMetadata: NOOP,
  };
};
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
export const changeWebRTCLoggingSeverity = NOOP;

export const VideoRendererView = () => {
  return <View />;
};
export const VideoPreviewView = () => {
  return <View />;
};
