import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

// import { MembraneWebRTCViewProps } from './MembraneWebRTC.types';
const NativeView: React.ComponentType<any> =
  requireNativeViewManager('VideoRendererViewModule');

export default function VideoRendererView(props: any) {
  return <NativeView {...props} />;
}
