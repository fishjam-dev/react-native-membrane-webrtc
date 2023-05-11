import { renderHook, act } from '@testing-library/react-hooks';

const membraneWebRTC = require('../index');

test('processing statistics', async () => {
  jest.useFakeTimers();

  const { result } = renderHook(() => membraneWebRTC.useRTCStatistics(1000));
  expect(result.current.statistics).toEqual([]);

  await act(async () => {
    jest.advanceTimersByTime(1001);
  });
  expect(result.current.statistics).toEqual([
    {
      RTCOutboundTest_1: {
        'kind': 'test_out',
        'rid': 'h',
        'bytesSent': 11,
        'targetBitrate': 12,
        'packetsSent': 13,
        'framesEncoded': 14,
        'framesPerSecond': 15,
        'frameWidth': 16,
        'frameHeight': 17,
        'qualityLimitationDurations': {
          cpu: 18,
          bandwidth: 19,
          none: 20,
          other: 21,
        },
        'bytesSent/s': 0,
        'packetsSent/s': 0,
        'framesEncoded/s': 0,
      },
      RTCInboundTest_1: {
        'kind': 'test_in',
        'jitter': 11,
        'packetsLost': 12,
        'packetsReceived': 13,
        'bytesReceived': 14,
        'framesReceived': 15,
        'frameWidth': 16,
        'frameHeight': 17,
        'framesPerSecond': 18,
        'framesDropped': 19,
        'packetsLost/s': 0,
        'packetsReceived/s': 0,
        'bytesReceived/s': 0,
        'framesReceived/s': 0,
        'framesDropped/s': 0,
      },
    },
  ]);

  await act(async () => {
    jest.advanceTimersByTime(1001);
  });
  expect(result.current.statistics).toEqual([
    {
      RTCOutboundTest_1: {
        'kind': 'test_out',
        'rid': 'h',
        'bytesSent': 11,
        'targetBitrate': 12,
        'packetsSent': 13,
        'framesEncoded': 14,
        'framesPerSecond': 15,
        'frameWidth': 16,
        'frameHeight': 17,
        'qualityLimitationDurations': {
          cpu: 18,
          bandwidth: 19,
          none: 20,
          other: 21,
        },
        'bytesSent/s': 0,
        'packetsSent/s': 0,
        'framesEncoded/s': 0,
      },
      RTCInboundTest_1: {
        'kind': 'test_in',
        'jitter': 11,
        'packetsLost': 12,
        'packetsReceived': 13,
        'bytesReceived': 14,
        'framesReceived': 15,
        'frameWidth': 16,
        'frameHeight': 17,
        'framesPerSecond': 18,
        'framesDropped': 19,
        'packetsLost/s': 0,
        'packetsReceived/s': 0,
        'bytesReceived/s': 0,
        'framesReceived/s': 0,
        'framesDropped/s': 0,
      },
    },
    {
      RTCOutboundTest_1: {
        'kind': 'test_out',
        'rid': 'h',
        'bytesSent': 21,
        'targetBitrate': 22,
        'packetsSent': 23,
        'framesEncoded': 24,
        'framesPerSecond': 25,
        'frameWidth': 26,
        'frameHeight': 27,
        'qualityLimitationDurations': {
          cpu: 28,
          bandwidth: 29,
          none: 30,
          other: 31,
        },
        'bytesSent/s': 10,
        'packetsSent/s': 10,
        'framesEncoded/s': 10,
      },
      RTCInboundTest_1: {
        'kind': 'test_in',
        'jitter': 21,
        'packetsLost': 22,
        'packetsReceived': 23,
        'bytesReceived': 24,
        'framesReceived': 25,
        'frameWidth': 26,
        'frameHeight': 27,
        'framesPerSecond': 28,
        'framesDropped': 29,
        'packetsLost/s': 10,
        'packetsReceived/s': 10,
        'bytesReceived/s': 10,
        'framesReceived/s': 10,
        'framesDropped/s': 10,
      },
    },
  ]);
});
