import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';
import { View } from 'react-native';

import { VideoRendererProps } from './MembraneWebRTC.types';
import { isJest } from './utils';

const NativeView: React.ComponentType<VideoRendererProps> = isJest()
  ? () => <View />
  : requireNativeViewManager('VideoRendererViewModule');

export default React.forwardRef((props, ref) => (
  // @ts-ignore
  <NativeView {...props} ref={ref} />
));
