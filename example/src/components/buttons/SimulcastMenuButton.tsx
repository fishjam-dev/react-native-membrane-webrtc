import { AdditionalColors } from '@colors';
import { Typo } from '@components/Typo';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';

type SimulcastMenuButtonProps = {
  label: 'h' | 'm' | 'l';
  enabled?: boolean;
};

export const SimulcastMenuButton = ({
  label,
  enabled = true,
}: SimulcastMenuButtonProps) => {
  const { toggleVideoTrackEncoding } = Membrane.useCamera();
  return (
    <View>
      <Pressable
        style={[enabled ? styles.enabled : styles.disabled, styles.common]}
        onPress={() => toggleVideoTrackEncoding(label)}
      >
        <Typo variant="caption">{label}</Typo>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  enabled: {
    backgroundColor: AdditionalColors.red60,
  },
  disabled: {
    backgroundColor: AdditionalColors.grey80,
  },
  common: {
    borderColor: AdditionalColors.grey140,
    borderRadius: 50,
    padding: 5,
    margin: 5,
  },
});
