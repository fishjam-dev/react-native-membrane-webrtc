import { NativeModulesProxy, EventEmitter } from 'expo-modules-core';

import MembraneWebRTCModule from '../MembraneWebRTCModule';

export const ReceivableEvents = {
  IsCameraOn: 'IsCameraOn',
  IsMicrophoneOn: 'IsMicrophoneOn',
  IsScreencastOn: 'IsScreencastOn',
  SimulcastConfigUpdate: 'SimulcastConfigUpdate',
  EndpointsUpdate: 'EndpointsUpdate',
  AudioDeviceUpdate: 'AudioDeviceUpdate',
  SendMediaEvent: 'SendMediaEvent',
  BandwidthEstimation: 'BandwidthEstimation',
} as const;

export const eventEmitter = new EventEmitter(
  MembraneWebRTCModule ?? NativeModulesProxy.MembraneWebRTC
);
