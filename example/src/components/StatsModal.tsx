import { AdditionalColors, BrandColors } from '@colors';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const { statistics } = Membrane.useRTCStatistics(1000);
  const stopCollectingStats = useRef<Function>(() => {});
  const [labels, setLabels] = useState<string[]>([]);

  const getListOfPlotNames = useCallback(() => {
    if (statistics.length > 0) {
      setLabels(Object.keys(statistics[statistics.length - 1]));
    }
  }, [statistics]);

  // useEffect(() => {
  //   if (visible) {

  //   }
  // }, [visible]);

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
            stopCollectingStats.current();
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
