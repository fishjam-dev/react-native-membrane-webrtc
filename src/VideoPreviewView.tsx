import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';
import { View } from 'react-native';

import { VideoPreviewViewProps } from './MembraneWebRTC.types';
import { isJest } from './utils';

const NativeView: React.ComponentType<VideoPreviewViewProps> = isJest()
  ? () => <View />
  : requireNativeViewManager('VideoPreviewViewModule');

export default function VideoPreviewView(props: VideoPreviewViewProps) {
  return <NativeView {...props} />;
}
