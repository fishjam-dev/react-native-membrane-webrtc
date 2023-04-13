import { renderHook, act } from '@testing-library/react-hooks';

import {
  VideoroomContextProvider,
  useVideoroomState,
} from '../src/VideoroomContext';

const NOOP = () => {};

jest.mock('@sentry/react-native');
jest.mock('../src/model/NotificationsContext', () => {
  return {
    useNotifications: () => {
      return { showNotification: NOOP };
    },
  };
});
jest.mock('../../src/index');

const setExtra = jest.fn(NOOP);

const sentry = require('@sentry/react-native');
sentry.setExtra = setExtra;

const useCameraStateMock = jest.fn(NOOP);
const useMicrophoneStateMock = jest.fn(NOOP);
const useVideoTrackMetadataMock = jest.fn(NOOP);
const useAudioTrackMetadataMock = jest.fn(NOOP);
const connectCallback = jest.fn(NOOP);
const joinCallback = jest.fn(NOOP);
const disconnectCallback = jest.fn(NOOP);

const membraneWebRTC = require('../../src/index');
membraneWebRTC.useMembraneServer = () => {
  return {
    connect: async (): Promise<void> => {
      return new Promise<void>((resolve) => {
        connectCallback();
        resolve();
      });
    },
    disconnect: async (): Promise<void> => {
      return new Promise<void>((resolve) => {
        disconnectCallback();
        resolve();
      });
    },
    joinRoom: async (): Promise<void> => {
      return new Promise<void>((resolve) => {
        joinCallback();
        resolve();
      });
    },
    error: null,
  };
};
membraneWebRTC.useCameraState = () => {
  return { toggleCamera: useCameraStateMock };
};
membraneWebRTC.useMicrophoneState = () => {
  return { toggleMicrophone: useMicrophoneStateMock };
};
membraneWebRTC.useVideoTrackMetadata = () => {
  return { updateVideoTrackMetadata: useVideoTrackMetadataMock };
};
membraneWebRTC.useAudioTrackMetadata = () => {
  return { updateAudioTrackMetadata: useAudioTrackMetadataMock };
};

describe('Videoroom context', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Navigating back to main screen', async () => {
    const { result } = renderHook(() => useVideoroomState(), {
      wrapper: VideoroomContextProvider,
    });

    await act(async () => {
      result.current.setRoomName('testRoom');
      result.current.setUsername('testUser');
      await result.current.connectAndJoinRoom();
      result.current.goToMainScreen();
    });

    expect(result.current.roomName).toBe('');
    expect(result.current.username).toBe('');
    expect(result.current.videoroomState).toBe('BeforeMeeting');
  });

  test('Toggle camera', async () => {
    const { result } = renderHook(() => useVideoroomState(), {
      wrapper: VideoroomContextProvider,
    });

    act(() => {
      result.current.toggleCamera();
    });
    expect(result.current.isCameraOn).toBe(false);
    act(() => {
      result.current.toggleCamera();
    });
    expect(result.current.isCameraOn).toBe(true);

    await act(async () => {
      // Change videoroomState to InMeeting
      await result.current.connectAndJoinRoom();
      result.current.toggleCamera();
    });

    expect(useCameraStateMock).toBeCalledTimes(1);
    expect(useVideoTrackMetadataMock).toBeCalledTimes(1);
    expect(result.current.isCameraOn).toBe(false);
  });

  test('Toggle microphone', async () => {
    const { result } = renderHook(() => useVideoroomState(), {
      wrapper: VideoroomContextProvider,
    });

    act(() => {
      result.current.toggleMicrophone();
    });
    expect(result.current.isMicrophoneOn).toBe(false);
    act(() => {
      result.current.toggleMicrophone();
    });
    expect(result.current.isMicrophoneOn).toBe(true);

    await act(async () => {
      // Change videoroomState to InMeeting
      await result.current.connectAndJoinRoom();
      result.current.toggleMicrophone();
    });

    expect(useMicrophoneStateMock).toBeCalledTimes(1);
    expect(useAudioTrackMetadataMock).toBeCalledTimes(1);
    expect(result.current.isMicrophoneOn).toBe(false);
  });

  test('Connecting to room', async () => {
    const { result } = renderHook(() => useVideoroomState(), {
      wrapper: VideoroomContextProvider,
    });

    act(() => {
      result.current.setRoomName('test room     ');
      result.current.setUsername('test user   ');
    });
    await act(async () => {
      await result.current.connectAndJoinRoom();
    });

    expect(result.current.roomName).toBe('test room');
    expect(result.current.username).toBe('test user');
    expect(setExtra).toBeCalledTimes(2);
    expect(connectCallback).toBeCalledTimes(1);
    expect(joinCallback).toBeCalledTimes(1);
    expect(result.current.videoroomState).toBe('InMeeting');
  });

  test('Disconnect from room', async () => {
    const { result } = renderHook(() => useVideoroomState(), {
      wrapper: VideoroomContextProvider,
    });

    await act(async () => {
      await result.current.connectAndJoinRoom();
      await result.current.disconnect();
    });

    expect(disconnectCallback).toBeCalledTimes(1);
    expect(result.current.videoroomState).toBe('AfterMeeting');
  });

  test('Toggle screencast', async () => {
    let isScreencastOn = false;
    const useScreencastMock = jest.fn(() => {
      isScreencastOn = !isScreencastOn;
    });

    membraneWebRTC.useScreencast = () => {
      return { isScreencastOn: false, toggleScreencast: useScreencastMock };
    };

    const { result } = renderHook(() => useVideoroomState(), {
      wrapper: VideoroomContextProvider,
    });

    await act(async () => {
      result.current.toggleScreencastAndUpdateMetadata();
    });

    expect(useScreencastMock).toBeCalledTimes(1);
    expect(isScreencastOn).toBe(true);

    await act(async () => {
      result.current.toggleScreencastAndUpdateMetadata();
    });

    expect(useScreencastMock).toBeCalledTimes(2);
    expect(isScreencastOn).toBe(false);
  });
});
