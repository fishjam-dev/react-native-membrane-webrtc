import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';

import {
  BandwidthLimit,
  CameraConfig,
  CaptureDevice,
  IsCameraOnEvent,
  Metadata,
  SimulcastConfig,
  SimulcastConfigUpdateEvent,
  TrackEncoding,
} from '../MembraneWebRTC.types';
import MembraneWebRTCModule from '../MembraneWebRTCModule';
import { ReceivableEvents, eventEmitter } from '../common/eventEmitter';

const defaultSimulcastConfig = () => ({
  enabled: false,
  activeEncodings: [],
});

let videoSimulcastConfig: SimulcastConfig = defaultSimulcastConfig();

/**
 * This hook can toggle camera on/off and provides current camera state.
 */
export function useCamera() {
  const [isCameraOn, setIsCameraOn] = useState<boolean>(
    MembraneWebRTCModule.isCameraOn
  );

  const [simulcastConfig, setSimulcastConfig] =
    useState<SimulcastConfig>(videoSimulcastConfig);

  useEffect(() => {
    const eventListener = eventEmitter.addListener<SimulcastConfigUpdateEvent>(
      ReceivableEvents.SimulcastConfigUpdate,
      (event) => setSimulcastConfig(event)
    );
    return () => eventListener.remove();
  }, []);

  useEffect(() => {
    const eventListener = eventEmitter.addListener<IsCameraOnEvent>(
      ReceivableEvents.IsCameraOn,
      (event) => setIsCameraOn(event.IsCameraOn)
    );
    setIsCameraOn(MembraneWebRTCModule.isCameraOn);
    return () => eventListener.remove();
  }, []);

  /**
   * toggles encoding of a video track on/off
   * @param encoding encoding to toggle
   */
  const toggleVideoTrackEncoding = useCallback(
    async (encoding: TrackEncoding) => {
      videoSimulcastConfig =
        await MembraneWebRTCModule.toggleVideoTrackEncoding(encoding);
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
      await MembraneWebRTCModule.setVideoTrackEncodingBandwidth(
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
    const state = await MembraneWebRTCModule.toggleCamera();
    setIsCameraOn(state);
  }, []);

  /**
   * Starts local camera capture.
   * @param config configuration of the camera capture
   * @returns A promise that resolves when camera is started.
   */
  const startCamera = useCallback(
    async <CameraConfigMetadataType extends Metadata>(
      config: Partial<CameraConfig<CameraConfigMetadataType>> = {}
    ) => {
      videoSimulcastConfig = config.simulcastConfig || defaultSimulcastConfig();
      // expo-modules on Android don't support Either type, so we workaround it
      if (Platform.OS === 'android') {
        if (typeof config.maxBandwidth === 'object') {
          //@ts-ignore
          config.maxBandwidthMap = config.maxBandwidth;
        } else {
          //@ts-ignore
          config.maxBandwidthInt = config.maxBandwidth;
        }
        delete config.maxBandwidth;
      }
      await MembraneWebRTCModule.startCamera(config);
    },
    []
  );

  /**
   * Function that toggles between front and back camera. By default the front camera is used.
   * @returns A promise that resolves when camera is toggled.
   */
  const flipCamera = useCallback(async () => {
    return MembraneWebRTCModule.flipCamera();
  }, []);

  /**
   * Function that switches to the specified camera. By default the front camera is used.
   * @returns A promise that resolves when camera is switched.
   */
  const switchCamera = useCallback(async (captureDeviceId: string) => {
    return MembraneWebRTCModule.switchCamera(captureDeviceId);
  }, []);

  /** Function that queries available cameras.
   * @returns A promise that resolves to the list of available cameras.
   */
  const getCaptureDevices = useCallback(async () => {
    return MembraneWebRTCModule.getCaptureDevices() as Promise<CaptureDevice[]>;
  }, []);

  /**
   * updates maximum bandwidth for the video track. This value directly translates
   * to quality of the stream and the amount of RTP packets being sent. In case simulcast
   * is enabled bandwidth is split between all of the variant streams proportionally to
   * their resolution.
   * @param BandwidthLimit to set
   */
  const setVideoTrackBandwidth = async (bandwidth: BandwidthLimit) => {
    await MembraneWebRTCModule.setVideoTrackBandwidth(bandwidth);
  };

  return {
    isCameraOn,
    simulcastConfig,
    toggleCamera,
    startCamera,
    flipCamera,
    switchCamera,
    getCaptureDevices,
    toggleVideoTrackEncoding,
    setVideoTrackEncodingBandwidth,
    setVideoTrackBandwidth,
  };
}
