import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import React, { useCallback } from 'react';
import { View, StyleSheet, processColor } from 'react-native';
import { LineChart } from 'react-native-charts-wrapper';

import { Typo } from './Typo';

type StatsProp = {
  stats: any[];
  label: string;
};

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

const chartDescriptionConfig = {
  text: '',
  textSize: 0,
};

const yAxisConfig = {
  left: {
    enabled: false,
  },
};

export const Stats = ({ stats, label }: StatsProp) => {
  const getValues = useCallback(
    (label, chart) => {
      const timestampsWithLabel = stats.filter((obj) => {
        return Object.keys(obj).includes(label);
      });

      const values = timestampsWithLabel.map((obj) => {
        return { y: obj[label][chart] !== null ? obj[label][chart] : 0 };
      });

      return values;
    },
    [stats]
  );

  const getLimitationDurationsDataset = useCallback(
    (label, chart) => {
      const timestampsWithLabel = stats.filter((obj) => {
        return Object.keys(obj).includes(label);
      });

      const combinedValues = timestampsWithLabel.map((obj) => {
        return obj[label][chart] !== null ? obj[label][chart] : 0;
      });

      const res = [
        {
          label: 'bandwidth',
          values: [{ y: 0 }],
          config: {
            drawValues: false,
            drawCircles: false,
            color: processColor('blue'),
          },
        },
        {
          label: 'cpu',
          values: [{ y: 0 }],
          config: {
            drawValues: false,
            drawCircles: false,
            color: processColor('red'),
          },
        },
        {
          label: 'none',
          values: [{ y: 0 }],
          config: {
            drawValues: false,
            drawCircles: false,
            color: processColor('green'),
          },
        },
        {
          label: 'other',
          values: [{ y: 0 }],
          config: {
            drawValues: false,
            drawCircles: false,
            color: processColor('yellow'),
          },
        },
      ];
      combinedValues.forEach((obj) => {
        res[0].values.push({ y: obj['bandwidth'] });
        res[1].values.push({ y: obj['cpu'] });
        res[2].values.push({ y: obj['none'] });
        res[3].values.push({ y: obj['other'] });
      });

      return res;
    },
    [stats]
  );

  return (
    <View>
      <Collapse>
        <CollapseHeader>
          <Typo variant="h5">{label}</Typo>
        </CollapseHeader>
        <CollapseBody>
          <View style={styles.label}>
            <Typo variant="label">
              kind: {stats[stats.length - 1][label]['kind']}
            </Typo>
            <Typo variant="label">
              rid: {stats[stats.length - 1][label]['rid']}
            </Typo>
          </View>

          {Object.keys(stats[stats.length - 1][label]).map((obj, objId) => {
            if (notPlottableStats.includes(obj)) {
              return;
            }
            if (obj === 'qualityLimitationDurations') {
              return (
                <View key={objId}>
                  <LineChart
                    style={styles.chart}
                    data={{
                      dataSets: getLimitationDurationsDataset(label, obj),
                    }}
                    yAxis={yAxisConfig}
                    chartDescription={chartDescriptionConfig}
                  />
                </View>
              );
            }

            return (
              <View key={objId}>
                <View style={styles.label}>
                  <Typo variant="label">{obj}</Typo>
                </View>
                <LineChart
                  style={styles.chart}
                  data={{
                    dataSets: [
                      {
                        label: obj,
                        values: getValues(label, obj),
                        config: {
                          drawValues: false,
                          drawCircles: false,
                        },
                      },
                    ],
                  }}
                  yAxis={yAxisConfig}
                  xAxis={{
                    drawLabels: false,
                  }}
                  chartDescription={chartDescriptionConfig}
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
};

const styles = StyleSheet.create({
  chart: {
    height: 125,
    width: '100%',
    paddingHorizontal: 20,
  },
  label: {
    marginLeft: 20,
  },
});
