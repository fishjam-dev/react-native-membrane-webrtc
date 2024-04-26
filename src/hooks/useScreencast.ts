import { useCallback, useEffect, useState } from 'react';

import {
  BandwidthLimit,
  IsScreencastOnEvent,
  Metadata,
  ScreencastOptions,
  SimulcastConfig,
  TrackEncoding,
} from '../MembraneWebRTC.types';
import MembraneWebRTCModule from '../MembraneWebRTCModule';
import { ReceivableEvents, eventEmitter } from '../common/eventEmitter';

const defaultSimulcastConfig = () => ({
  enabled: false,
  activeEncodings: [],
});

let screencastSimulcastConfig: SimulcastConfig = defaultSimulcastConfig();

/**
 * This hook can toggle screen sharing on/off and provides current screencast state.
 * @returns An object with functions to manage screencast.
 */
export function useScreencast() {
  const [isScreencastOn, setIsScreencastOn] = useState<boolean>(
    MembraneWebRTCModule.isScreencastOn
  );
  const [simulcastConfig, setSimulcastConfig] = useState<SimulcastConfig>(
    screencastSimulcastConfig
  );
  useEffect(() => {
    const eventListener = eventEmitter.addListener<IsScreencastOnEvent>(
      ReceivableEvents.IsScreencastOn,
      (event) => setIsScreencastOn(event.IsScreencastOn)
    );
    setIsScreencastOn(MembraneWebRTCModule.isScreencastOn);
    return () => eventListener.remove();
  }, []);

  /**
   * Toggles the screencast on/off
   */
  const toggleScreencast = useCallback(
    async <ScreencastOptionsMetadataType extends Metadata>(
      screencastOptions: Partial<
        ScreencastOptions<ScreencastOptionsMetadataType>
      > = {}
    ) => {
      await MembraneWebRTCModule.toggleScreencast(screencastOptions);
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
    async <ScreencastMetadataType extends Metadata>(
      metadata: ScreencastMetadataType
    ) => {
      await MembraneWebRTCModule.updateScreencastTrackMetadata(metadata);
    },
    []
  );

  /**
   * Toggles simulcast encoding of a screencast track on/off
   * @param encoding encoding to toggle
   */
  const toggleScreencastTrackEncoding = useCallback(
    async (encoding: TrackEncoding) => {
      screencastSimulcastConfig =
        await MembraneWebRTCModule.toggleScreencastTrackEncoding(encoding);
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
      await MembraneWebRTCModule.setScreencastTrackEncodingBandwidth(
        encoding,
        bandwidth
      );
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
      await MembraneWebRTCModule.setScreencastTrackBandwidth(bandwidth);
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
