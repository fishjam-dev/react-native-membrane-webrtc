import { useCallback, useEffect, useState } from 'react';

import {
  IsMicrophoneOnEvent,
  Metadata,
  MicrophoneConfig,
} from '../MembraneWebRTC.types';
import MembraneWebRTCModule from '../MembraneWebRTCModule';
import { ReceivableEvents, eventEmitter } from '../common/eventEmitter';

/**
 * This hook can toggle microphone on/off and provides current microphone state.
 */
export function useMicrophone() {
  const [isMicrophoneOn, setIsMicrophoneOn] = useState<boolean>(
    MembraneWebRTCModule.isMicrophoneOn
  );

  useEffect(() => {
    const eventListener = eventEmitter.addListener<IsMicrophoneOnEvent>(
      ReceivableEvents.IsMicrophoneOn,
      (event) => setIsMicrophoneOn(event.IsMicrophoneOn)
    );
    setIsMicrophoneOn(MembraneWebRTCModule.isMicrophoneOn);
    return () => eventListener.remove();
  }, []);

  /**
   * Function to toggle microphone on/off
   */
  const toggleMicrophone = useCallback(async () => {
    const state = await MembraneWebRTCModule.toggleMicrophone();
    setIsMicrophoneOn(state);
  }, []);

  /**
   * Starts local microphone capturing.
   * @param config configuration of the microphone capture
   * @returns A promise that resolves when microphone capturing is started.
   */
  const startMicrophone = useCallback(
    async <MicrophoneConfigMetadataType extends Metadata>(
      config: Partial<MicrophoneConfig<MicrophoneConfigMetadataType>> = {}
    ) => {
      await MembraneWebRTCModule.startMicrophone(config);
    },
    []
  );

  return { isMicrophoneOn, toggleMicrophone, startMicrophone };
}
