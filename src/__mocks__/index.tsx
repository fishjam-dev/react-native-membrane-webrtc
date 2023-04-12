const NOOP = () => {
  // noop
};

export default {
  useMembraneServer: NOOP,
  useRoomParticipants: NOOP,
  useCameraState: NOOP,
  useMicrophoneState: NOOP,
  flipCamera: NOOP,
  switchCamera: NOOP,
  getCaptureDevices: NOOP,
  useScreencast: NOOP,
  usePeerMetadata: NOOP,
  useVideoTrackMetadata: NOOP,
  useAudioTrackMetadata: NOOP,
  useAudioSettings: NOOP,
  useSimulcast: NOOP,
  useBandwidthLimit: NOOP,
  useBandwidthEstimation: NOOP,
};
