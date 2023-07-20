let numCalled = 0;

export const NativeMembraneMock = {
  addListener: () => {},
  removeListeners: () => {},
  create: () => {},
  getStatistics: () => {
    numCalled += 1;
    return {
      RTCOutboundTest_1: {
        kind: 'test_out',
        rid: 'h',
        bytesSent: 1 + numCalled * 10,
        targetBitrate: 2 + numCalled * 10,
        packetsSent: 3 + numCalled * 10,
        framesEncoded: 4 + numCalled * 10,
        framesPerSecond: 5 + numCalled * 10,
        frameWidth: 6 + numCalled * 10,
        frameHeight: 7 + numCalled * 10,
        qualityLimitationDurations: {
          cpu: 8 + numCalled * 10,
          bandwidth: 9 + numCalled * 10,
          none: 10 + numCalled * 10,
          other: 11 + numCalled * 10,
        },
      },
      RTCInboundTest_1: {
        kind: 'test_in',
        jitter: 1 + numCalled * 10,
        packetsLost: 2 + numCalled * 10,
        packetsReceived: 3 + numCalled * 10,
        bytesReceived: 4 + numCalled * 10,
        framesReceived: 5 + numCalled * 10,
        frameWidth: 6 + numCalled * 10,
        frameHeight: 7 + numCalled * 10,
        framesPerSecond: 8 + numCalled * 10,
        framesDropped: 9 + numCalled * 10,
      },
    };
  },
};
