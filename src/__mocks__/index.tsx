const NOOP = () => {
  // noop
};

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

export const useMembraneServer = NOOP;
export const useRoomParticipants = NOOP;
export const useCameraState = NOOP;
export const useMicrophoneState = NOOP;
export const flipCamera = NOOP;
export const switchCamera = NOOP;
export const getCaptureDevices = NOOP;
export const useScreencast = NOOP;
export const usePeerMetadata = NOOP;
export const useVideoTrackMetadata = NOOP;
export const useAudioTrackMetadata = NOOP;
export const useAudioSettings = NOOP;
export const useSimulcast = NOOP;
export const useBandwidthLimit = NOOP;
export const useBandwidthEstimation = NOOP;
