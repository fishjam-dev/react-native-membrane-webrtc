import { requireNativeModule } from 'expo-modules-core';
import { NativeModule } from 'react-native';

import { MembraneWebRTC } from './MembraneWebRTC.types';
import { NativeMembraneMock } from './__mocks__/native';
import { isJest } from './utils';

const nativeModule = isJest()
  ? NativeMembraneMock
  : requireNativeModule('MembraneWebRTC');

export default nativeModule as MembraneWebRTC & NativeModule;
