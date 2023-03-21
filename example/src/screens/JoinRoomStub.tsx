import { Typo } from '@components/Typo';
import { StandardButton } from '@components/buttons/StandardButton';
import { RootStack } from '@model/NavigationTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';

type Props = NativeStackScreenProps<RootStack, 'JoinRoom'>;

export const JoinRoomStub = ({ navigation, route }: Props) => {
  return (
    <View>
      <Typo variant="h3">TBD join screen</Typo>
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
