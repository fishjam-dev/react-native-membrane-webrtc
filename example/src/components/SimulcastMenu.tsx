import { AdditionalColors } from '@colors';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Typo } from './Typo';
import { SimulcastMenuButton } from './buttons/SimulcastMenuButton';

type SimulcastMenuProps = {
  type: Membrane.ParticipantType;
  encoding?: Membrane.TrackEncoding | null;
};

export const SimulcastMenu = ({ type, encoding }: SimulcastMenuProps) => {
  const { simulcastConfig } = Membrane.useSimulcast();
  console.log(simulcastConfig);
  return (
    <View style={styles.encodingContainer}>
      {type === Membrane.ParticipantType.Local ? (
        <View style={styles.simulcastButtons}>
          <SimulcastMenuButton
            label="h"
            enabled={simulcastConfig.activeEncodings.includes('h')}
          />
          <SimulcastMenuButton
            label="m"
            enabled={simulcastConfig.activeEncodings.includes('m')}
          />
          <SimulcastMenuButton
            label="l"
            enabled={simulcastConfig.activeEncodings.includes('l')}
          />
        </View>
      ) : (
        <View>
          <Typo variant="h5">Receiving: {encoding?.toUpperCase()}</Typo>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  encodingContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: AdditionalColors.grey40,
    padding: 10,
    borderRadius: 10,
    opacity: 0.8,
  },
  simulcastButtons: {
    flexDirection: 'row',
  },
});
