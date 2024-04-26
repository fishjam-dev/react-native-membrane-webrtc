import { takeRight } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import {
  RTCInboundStats,
  RTCOutboundStats,
  RTCStats,
} from '../MembraneWebRTC.types';
import MembraneWebRTCModule from '../MembraneWebRTCModule';

/**
 * This hook provides access to current rtc statistics data.
 */
export function useRTCStatistics(refreshInterval: number) {
  const MAX_SIZE = 120;
  const [statistics, setStatistics] = useState<RTCStats[]>([]);

  useEffect(() => {
    const intervalId = setInterval(getStatistics, refreshInterval);
    return () => {
      clearInterval(intervalId);
      setStatistics([]);
    };
  }, []);

  // Gets stats from the native libraries.
  const getStatistics = useCallback(async () => {
    const stats = await MembraneWebRTCModule.getStatistics();
    setStatistics((prev) => {
      const newStats = [...prev, processIncomingStats(prev, stats)];
      takeRight(newStats, MAX_SIZE);
      return newStats;
    });
  }, []);

  // Calculates diff between pervious and current stats,
  // providing end users with a per second metric.
  const processIncomingStats = useCallback(
    (statistics: RTCStats[], stats: RTCStats) => {
      Object.keys(stats).forEach((obj) => {
        if (obj.includes('Inbound')) {
          const rtcStats = stats[obj] as RTCInboundStats;

          if (
            statistics.length > 0 &&
            Object.keys(statistics[statistics.length - 1]).includes(obj)
          ) {
            const prevRtcStats = statistics[statistics.length - 1][
              obj
            ] as RTCInboundStats;

            rtcStats['packetsLost/s'] =
              rtcStats['packetsLost'] - prevRtcStats['packetsLost'];
            rtcStats['packetsReceived/s'] =
              rtcStats['packetsReceived'] - prevRtcStats['packetsReceived'];
            rtcStats['bytesReceived/s'] =
              rtcStats['bytesReceived'] - prevRtcStats['bytesReceived'];
            rtcStats['framesReceived/s'] =
              rtcStats['framesReceived'] - prevRtcStats['framesReceived'];
            rtcStats['framesDropped/s'] =
              rtcStats['framesDropped'] - prevRtcStats['framesDropped'];
          } else {
            rtcStats['packetsLost/s'] = 0;
            rtcStats['packetsReceived/s'] = 0;
            rtcStats['bytesReceived/s'] = 0;
            rtcStats['framesReceived/s'] = 0;
            rtcStats['framesDropped/s'] = 0;
          }
          return stats;
        }
        // Outbound
        const rtcStats = stats[obj] as RTCOutboundStats;

        if (
          statistics.length > 0 &&
          Object.keys(statistics[statistics.length - 1]).includes(obj)
        ) {
          const prevRtcStats = statistics[statistics.length - 1][
            obj
          ] as RTCOutboundStats;

          rtcStats['bytesSent/s'] =
            rtcStats['bytesSent'] - prevRtcStats['bytesSent'];
          rtcStats['packetsSent/s'] =
            rtcStats['packetsSent'] - prevRtcStats['packetsSent'];
          rtcStats['framesEncoded/s'] =
            rtcStats['framesEncoded'] - prevRtcStats['framesEncoded'];
        } else {
          rtcStats['bytesSent/s'] = 0;
          rtcStats['packetsSent/s'] = 0;
          rtcStats['framesEncoded/s'] = 0;
        }
        return stats;
      });
      return stats;
    },
    []
  );

  return { statistics };
}
