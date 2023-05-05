import { AdditionalColors, BrandColors } from '@colors';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import { isEmpty } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, processColor } from 'react-native';
import { LineChart } from 'react-native-charts-wrapper';
import { ScrollView } from 'react-native-gesture-handler';
import { ReactNativeModal } from 'react-native-modal';

import { Typo } from './Typo';
import { InCallButton } from './buttons/InCallButton';

type StatsModalProps = {
  visible: boolean;
  close: () => void;
  stats: any;
  onClose: () => void;
};

export const StatsModal = ({
  visible,
  close,
  stats,
  onClose,
}: StatsModalProps) => {
  const [statsIntervalID, setStatsIntervalID] = useState<number>(0);
  const { statistics, getStatistics } = Membrane.useRTCStatistics();
  const [labels, setLabels] = useState<string[]>([]);

  const notPlottableStats = [
    'kind',
    'rid',
    'packetsLost',
    'packetsReceived',
    'bytesReceived',
    'framesReceived',
    'framesDropped',
    'bytesSent',
    'packetsSent',
    'framesEncoded',
  ];

  const getListOfPlotNames = useCallback(() => {
    if (statistics.length > 2) {
      setLabels(Object.keys(statistics[statistics.length - 1]));
    }
  }, [statistics]);

  const statsCallback = useCallback(() => {
    getStatistics();
  }, []);

  useEffect(() => {
    if (visible) {
      const intervalID = window.setInterval(statsCallback, 1000);
      setStatsIntervalID(intervalID);
    }
  }, [visible]);

  useEffect(() => {
    getListOfPlotNames();
  }, [statistics]);

  const getValues = useCallback(
    (label, chart) => {
      const filtered = statistics.filter((obj) => {
        const keys = Object.keys(obj);
        return keys.includes(label);
      });

      const b = filtered.map((obj) => {
        return { y: obj[label][chart] !== null ? obj[label][chart] : 0 };
      });

      return b;
    },
    [statistics]
  );

  const getLimitationDurationsDataset = useCallback(
    (label, chart) => {
      const filtered = statistics.filter((obj) => {
        const keys = Object.keys(obj);
        return keys.includes(label);
      });

      const b = filtered.map((obj) => {
        return obj[label][chart] !== null ? obj[label][chart] : 0;
      });

      const res = [
        {
          label: 'bandwidth',
          values: [],
          config: {
            drawValues: false,
            drawCircles: false,
            color: processColor('blue'),
          },
        },
        {
          label: 'cpu',
          values: [],
          config: {
            drawValues: false,
            drawCircles: false,
            color: processColor('red'),
          },
        },
        {
          label: 'none',
          values: [],
          config: {
            drawValues: false,
            drawCircles: false,
            color: processColor('green'),
          },
        },
        {
          label: 'other',
          values: [],
          config: {
            drawValues: false,
            drawCircles: false,
            color: processColor('yellow'),
          },
        },
      ];
      b.forEach((obj) => {
        res[0].values.push({ y: obj['bandwidth'] });
        res[1].values.push({ y: obj['cpu'] });
        res[2].values.push({ y: obj['none'] });
        res[3].values.push({ y: obj['other'] });
      });

      return res;
    },
    [statistics]
  );

  return (
    <ReactNativeModal
      isVisible={visible}
      backdropOpacity={0.4}
      backdropColor={AdditionalColors.black}
      backdropTransitionOutTiming={0}
    >
      <View style={styles.container}>
        <InCallButton
          onPress={() => {
            console.log('Closing');
            clearInterval(statsIntervalID);
            close();
          }}
          iconName="Close"
        />
        <ScrollView style={styles.content}>
          {labels.length > 0 ? (
            <>
              {labels.map((name, id) => {
                return (
                  <View key={id}>
                    <Collapse>
                      <CollapseHeader>
                        <Typo variant="h5">{name}</Typo>
                      </CollapseHeader>
                      <CollapseBody>
                        <View>
                          <Typo variant="label">
                            kind:{' '}
                            {statistics[statistics.length - 1][name]['kind']}
                          </Typo>
                          <Typo variant="label">
                            rid:{' '}
                            {statistics[statistics.length - 1][name]['rid']}
                          </Typo>
                        </View>

                        {Object.keys(
                          statistics[statistics.length - 1][name]
                        ).map((obj, objId) => {
                          if (notPlottableStats.includes(obj)) {
                            return;
                          }
                          if (obj === 'qualityLimitationDurations') {
                            return (
                              <View key={objId}>
                                <LineChart
                                  style={styles.chart}
                                  data={{
                                    dataSets: getLimitationDurationsDataset(
                                      name,
                                      obj
                                    ),
                                  }}
                                  yAxis={{
                                    left: {
                                      enabled: false,
                                    },
                                  }}
                                />
                              </View>
                            );
                          }

                          return (
                            <View key={objId}>
                              <Typo variant="label">{obj}</Typo>
                              <LineChart
                                style={styles.chart}
                                data={{
                                  dataSets: [
                                    {
                                      label: obj,
                                      values: getValues(name, obj),
                                      config: {
                                        drawValues: false,
                                        drawCircles: false,
                                      },
                                    },
                                  ],
                                }}
                                yAxis={{
                                  left: {
                                    enabled: false,
                                  },
                                  right: {
                                    enabled: true,
                                  },
                                }}
                                xAxis={{
                                  drawLabels: false,
                                }}
                                chartDescription={{
                                  text: '',
                                  textSize: 0,
                                }}
                                legend={{ enabled: false, drawInside: false }}
                                marker={{ enabled: false }}
                                logEnabled={false}
                              />
                            </View>
                          );
                        })}
                      </CollapseBody>
                    </Collapse>
                  </View>
                );
              })}
            </>
          ) : null}
        </ScrollView>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  container: {
    felx: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    height: 125,
    width: '100%',
    paddingHorizontal: 20,
  },
});
