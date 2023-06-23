import { AdditionalColors } from '@colors';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Typo } from './Typo';
import { SimulcastMenuButton } from './buttons/SimulcastMenuButton';

type SimulcastMenuProps = {
  isLocalParticipant: boolean;
  encoding?: Membrane.TrackEncoding | null;
};

export const SimulcastMenu = ({
  isLocalParticipant,
  encoding,
}: SimulcastMenuProps) => {
  const { simulcastConfig } = Membrane.useSimulcast();

  return (
    <View style={styles.encodingContainer}>
      {isLocalParticipant ? (
        <View style={styles.simulcastButtons}>
          <Typo variant="label">Encodings to send: </Typo>
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
    padding: 5,
    borderRadius: 10,
    opacity: 0.8,
  },
  simulcastButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
