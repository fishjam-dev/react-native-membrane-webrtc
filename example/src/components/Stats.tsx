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
    (label: string, chart: string) => {
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

  const generateLimitationDurationInitData = useCallback(
    (name: string, color: string) => {
      return {
        label: name,
        values: [{ y: 0 }],
        config: {
          drawValues: false,
          drawCircles: false,
          color: processColor(color),
        },
      };
    },
    []
  );

  const getLimitationDurationsDataset = useCallback(
    (label: string, chart: string) => {
      const timestampsWithLabel = stats.filter((obj) => {
        return Object.keys(obj).includes(label);
      });

      const combinedValues = timestampsWithLabel.map((obj) => {
        return obj[label][chart] !== null ? obj[label][chart] : 0;
      });

      const res = [
        generateLimitationDurationInitData('bandwidth', 'blue'),
        generateLimitationDurationInitData('cpu', 'red'),
        generateLimitationDurationInitData('none', 'green'),
        generateLimitationDurationInitData('other', 'yellow'),
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

  const getLineChart = useCallback(
    (dataSet: object[], isMultiValue: boolean) => {
      return (
        <LineChart
          style={styles.chart}
          data={{ dataSet }}
          yAxis={yAxisConfig}
          xAxis={{
            drawLabels: false,
          }}
          chartDescription={chartDescriptionConfig}
          legend={{ enabled: isMultiValue, drawInside: isMultiValue }}
          marker={{ enabled: false }}
          logEnabled={false}
        />
      );
    },
    []
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

          {Object.keys(stats[stats.length - 1][label]).map(
            (statistic, statisticId) => {
              if (notPlottableStats.includes(statistic)) {
                return;
              }
              if (statistic === 'qualityLimitationDurations') {
                return (
                  <View key={statisticId}>
                    {getLineChart(
                      getLimitationDurationsDataset(label, statistic),
                      true
                    )}
                  </View>
                );
              }

              return (
                <View key={statisticId}>
                  <View style={styles.label}>
                    <Typo variant="label">{statistic}</Typo>
                  </View>
                  {getLineChart(
                    [
                      {
                        label: statistic,
                        values: getValues(label, statistic),
                        config: {
                          drawValues: false,
                          drawCircles: false,
                        },
                      },
                    ],
                    false
                  )}
                </View>
              );
            }
          )}
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
