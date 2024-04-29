import { Metadata } from '../MembraneWebRTC.types';
import MembraneWebRTCModule from '../MembraneWebRTCModule';

/**
/**
 * a function that updates endpoints's metadata on the server
 * @param metadata a map `string -> any` containing user's track metadata to be sent to the server
 */
export async function updateEndpointMetadata<
  EndpointMetadataType extends Metadata,
>(metadata: EndpointMetadataType) {
  await MembraneWebRTCModule.updateEndpointMetadata(metadata);
}

/**
 * a function that updates video metadata on the server.
 * @param metadata a map string -> any containing video track metadata to be sent to the server
 */
export async function updateVideoTrackMetadata<
  VideoTrackMetadataType extends Metadata,
>(metadata: VideoTrackMetadataType) {
  await MembraneWebRTCModule.updateVideoTrackMetadata(metadata);
}
/**
 * a function that updates audio metadata on the server
 * @param metadata a map `string -> any` containing audio track metadata to be sent to the server
 */
export async function updateAudioTrackMetadata<
  AudioTrackMetadataType extends Metadata,
>(metadata: AudioTrackMetadataType) {
  await MembraneWebRTCModule.updateAudioTrackMetadata(metadata);
}
