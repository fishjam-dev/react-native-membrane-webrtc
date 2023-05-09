import { AdditionalColors, BrandColors } from '@colors';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ReactNativeModal } from 'react-native-modal';

import { Stats } from './Stats';
import { InCallButton } from './buttons/InCallButton';

type StatsModalProps = {
  visible: boolean;
  onClose: () => void;
};

export const StatsModal = ({ visible, onClose }: StatsModalProps) => {
  const [statsIntervalID, setStatsIntervalID] = useState<number>(0);
  const { statistics, getStatistics } = Membrane.useRTCStatistics();
  const [labels, setLabels] = useState<string[]>([]);

  const getListOfPlotNames = useCallback(() => {
    if (statistics.length > 0) {
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
            clearInterval(statsIntervalID);
            setLabels([]);
            onClose();
          }}
          iconName="Close"
        />
        <ScrollView style={styles.content}>
          {labels.length > 0 ? (
            <>
              {labels.sort().map((name, id) => {
                return (
                  <View key={id}>
                    <Stats stats={statistics} label={name} />
                  </View>
                );
              })}
            </>
          ) : (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color={BrandColors.darkBlue100} />
            </View>
          )}
        </ScrollView>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  container: {
    felx: 1,
    width: '100%',
    height: '90%',
  },
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F5FCFF',
  },
  loading: {
    flex: 1,
  },
});
