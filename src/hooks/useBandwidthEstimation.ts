import { useEffect, useState } from 'react';

import { BandwidthEstimationEvent } from '../MembraneWebRTC.types';
import { ReceivableEvents, eventEmitter } from '../common/eventEmitter';

/**
 * This hook provides current bandwidth estimation
 * estimation - client's available incoming bitrate estimated
 * by the server. It's measured in bits per second.
 */
export function useBandwidthEstimation() {
  const [estimation, setEstimation] = useState<number | null>(null);

  useEffect(() => {
    const eventListener = eventEmitter.addListener<BandwidthEstimationEvent>(
      ReceivableEvents.BandwidthEstimation,
      (event) => setEstimation(event.BandwidthEstimation)
    );
    return () => eventListener.remove();
  }, []);

  return { estimation };
}
