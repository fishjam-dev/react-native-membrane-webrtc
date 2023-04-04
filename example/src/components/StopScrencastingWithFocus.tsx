import { BrandColors, TextColors } from '@colors';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Typo } from './Typo';
import { StandardButton } from './buttons/StandardButton';

export const StopScreencastingWithFocus = () => {
  const { toggleScreencast } = Membrane.useScreencast();

  const toggleScreencastAndUpdateMetadata = () => {
    toggleScreencast({
      screencastMetadata: {
        displayName: 'presenting',
        type: 'screensharing',
        active: 'true',
      },
      quality: Membrane.ScreencastQuality.FHD30,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Typo variant="h5" color={TextColors.white} style={styles.text}>
            You are sharing your screen with everyone.
          </Typo>
        </View>
        <View style={styles.buttonWrapper}>
          <StandardButton
            type="secondary"
            onPress={toggleScreencastAndUpdateMetadata}
          >
            Stop sharing
          </StandardButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.darkBlue100,
    alignItems: 'center',
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginHorizontal: 43.5,
  },
  text: {
    textAlign: 'center',
  },
  buttonWrapper: {
    marginTop: 24,
  },
});
