import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

// import { MembraneWebRTCViewProps } from './MembraneWebRTC.types';
const NativeView: React.ComponentType<any> =
  requireNativeViewManager('VideoPreviewViewModule');

export default function VideoPreviewView(props: any) {
  return <NativeView {...props} />;
}
