import { AdditionalColors } from '@colors';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
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

  const getListOfPlotNames = useCallback(
    (stats: any) => {
      if (statistics.length > 2) {
        setLabels(Object.keys(statistics[statistics.length - 1]));
      }
    },
    [statistics]
  );

  const statsCallback = () => {
    getStatistics();
    console.log(statistics);
  };

  useEffect(() => {
    if (visible) {
      const intervalID = window.setInterval(statsCallback, 5000);
      setStatsIntervalID(intervalID);
    }
  }, [visible]);

  useEffect(() => {
    getListOfPlotNames(statistics);
  }, [statistics]);

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
        <View style={styles.content}>
          {labels.map((data, id) => {
            return (
              <View key={id}>
                <Typo variant="h5">{data}</Typo>
              </View>
            );
          })}
          {/* <LineChart
            style={styles.chart}
            data={{
              dataSets: [
                { label: 'demo', values: [{ y: 1 }, { y: 2 }, { y: 1 }] },
              ],
            }}
          /> */}
        </View>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  container: {
    felx: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
  content: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
});
