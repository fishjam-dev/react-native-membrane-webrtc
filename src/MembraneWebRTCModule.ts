import { requireNativeModule } from 'expo-modules-core';

import { NativeMembraneMock } from './__mocks__/native';
import { isJest } from './utils';

export default isJest()
  ? NativeMembraneMock
  : requireNativeModule('MembraneWebRTC');
