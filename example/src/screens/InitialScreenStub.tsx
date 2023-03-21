import { Typo } from '@components/Typo';
import { StandardButton } from '@components/buttons/StandardButton';
import React from 'react';
import { View } from 'react-native';

export const InitialScreenStub = ({ navigation }) => {
  return (
    <View>
      <Typo variant="h3">TBD initial screen</Typo>
      <StandardButton
        onPress={() => {
          navigation.push('CreateRoom');
        }}
      >
        Create room
      </StandardButton>
    </View>
  );
};
