import { renderHook, act } from '@testing-library/react-hooks';
import {
  VideoroomContextProvider,
  useVideoroomState,
} from '../src/VideoroomContext';
import {
  useMembraneServer,
  useAudioSettings,
  VideoQuality,
  CaptureDevice,
  useVideoTrackMetadata,
  useAudioTrackMetadata,
  useCameraState,
  useMicrophoneState,
  useScreencast,
  ScreencastQuality,
} from '../../src/index';
import { useNotifications } from '../src/model/NotificationsContext';
import * as Sentry from '@sentry/react-native';

jest.mock('../../src/index');
jest.mock('@sentry/react-native');
jest.mock('../src/model/NotificationsContext');

test('videorromContext roomName updated', () => {
  let { result } = renderHook(() => useVideoroomState(), {
    wrapper: VideoroomContextProvider,
  });
});
