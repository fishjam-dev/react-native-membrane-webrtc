import { useEffect, useState } from 'react';

import {
  Endpoint,
  EndpointsUpdateEvent,
  Metadata,
} from '../MembraneWebRTC.types';
import MembraneWebRTCModule from '../MembraneWebRTCModule';
import { ReceivableEvents, eventEmitter } from '../common/eventEmitter';

/**
 * This hook provides live updates of room endpoints.
 * @returns An array of room endpoints.
 */
export function useEndpoints<
  EndpointMetadataType extends Metadata,
  VideoTrackMetadataType extends Metadata,
  AudioTrackMetadataType extends Metadata,
>() {
  const [endpoints, setEndpoints] = useState<
    Endpoint<
      EndpointMetadataType,
      VideoTrackMetadataType,
      AudioTrackMetadataType
    >[]
  >([]);

  useEffect(() => {
    const eventListener = eventEmitter.addListener<
      EndpointsUpdateEvent<
        EndpointMetadataType,
        VideoTrackMetadataType,
        AudioTrackMetadataType
      >
    >(ReceivableEvents.EndpointsUpdate, (event) => {
      setEndpoints(event.EndpointsUpdate);
    });
    MembraneWebRTCModule.getEndpoints<
      EndpointMetadataType,
      VideoTrackMetadataType,
      AudioTrackMetadataType
    >().then((endpoints) => {
      setEndpoints(endpoints);
    });
    return () => eventListener.remove();
  }, []);

  return endpoints;
}
