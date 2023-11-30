import { requireNativeModule } from 'expo-modules-core';

import { MembraneWebRTC } from './MembraneWebRTC.types';
import { NativeMembraneMock } from './__mocks__/native';
import { isJest } from './utils';

const nativeModule = isJest()
  ? NativeMembraneMock
  : requireNativeModule('MembraneWebRTC');

export default nativeModule as MembraneWebRTC;
