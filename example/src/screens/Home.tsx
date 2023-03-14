import { StandardTextInput } from '@components/StandardTextInput';
import { Typo } from '@components/Typo';
import { StandardButton } from '@components/buttons/StandardButton';
import { SERVER_URL } from '@env';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Switch,
  Alert,
} from 'react-native';

import { useVideoroomState } from '../VideoroomContext';

export const Home = ({ navigation }) => {
  const { roomName, setRoomName } = useVideoroomState();

  const [serverUrl, setServerUrl] = useState<string>(SERVER_URL);
  const [displayName, setDisplayName] = useState<string>(
    `mobile ${Platform.OS}`
  );
  const [isSimulcastOn, setIsSimulcastOn] = useState<boolean>(true);

  const { connect: mbConnect, joinRoom, error } = Membrane.useMembraneServer();

  const params = {
    token: 'NOW_YOU_CAN_SEND_PARAMS',
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      Alert.alert('Error when connecting to server:', error);
    }
  }, [error]);

  const requestPermissions = useCallback(async () => {
    if (Platform.OS === 'ios') return;
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const connect = useCallback(async () => {
    await requestPermissions();
    try {
      await mbConnect(serverUrl, roomName, {
        userMetadata: { displayName },
        connectionParams: params,
        socketChannelParams: {
          isSimulcastOn,
        },
        simulcastConfig: {
          enabled: isSimulcastOn,
          activeEncodings: ['l', 'm', 'h'],
        },
        quality: Membrane.VideoQuality.HD_169,
        maxBandwidth: { l: 150, m: 500, h: 1500 },
        videoTrackMetadata: { active: true, type: 'camera' },
        audioTrackMetadata: { active: true, type: 'audio' },
        isSpeakerphoneOn: false,
      });
      await joinRoom();
      navigation.navigate('Room');
    } catch (err) {
      console.warn(err);
    }
  }, [
    requestPermissions,
    mbConnect,
    joinRoom,
    roomName,
    isSimulcastOn,
    displayName,
    serverUrl,
  ]);

  return (
    <View style={styles.container}>
      <Typo variant="h3">Room name:</Typo>
      <StandardTextInput
        placeholder="Room name"
        onChangeText={(val) => {
          setRoomName(val);
        }}
      />
      <Text>Display name:</Text>
      <StandardTextInput value={displayName} onChangeText={setDisplayName} />
      <Text>Server URL:</Text>
      <StandardTextInput value={serverUrl} onChangeText={setServerUrl} />
      <View style={styles.row}>
        <Text>Simulcast:</Text>
        <Switch
          onValueChange={(v) => setIsSimulcastOn(v)}
          value={isSimulcastOn}
        />
      </View>
      <StandardButton type="primary" onPress={connect}>
        Connect!
      </StandardButton>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 50,
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#001A72',
    borderRadius: 4,
    marginBottom: 20,
    fontSize: 20,
    padding: 10,
  },
  button: {
    borderWidth: 2,
    borderColor: '#001A72',
    borderRadius: 4,
    marginVertical: 20,
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#b5d2ff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
