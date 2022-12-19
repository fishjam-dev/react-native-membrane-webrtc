import { SERVER_URL } from '@env';
import * as Membrane from '@membraneframework/react-native-membrane-webrtc';
import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  SafeAreaView,
  Text,
  TextInput,
  Platform,
  Pressable,
  Switch,
  Alert,
} from 'react-native';

import { Room } from './Room';

export default function App() {
  const {
    connect: mbConnect,
    disconnect: mbDisconnect,
    joinRoom,
    error,
  } = Membrane.useMembraneServer();
  const [connected, setConnected] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>('room');
  const [displayName, setDisplayName] = useState<string>(
    `mobile ${Platform.OS}`
  );
  const [isSimulcastOn, setIsSimulcastOn] = useState<boolean>(false);

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
      await mbConnect(SERVER_URL, roomName, {
        userMetadata: { displayName },
        connectionParams: params,
        simulcastConfig: {
          enabled: isSimulcastOn,
          activeEncodings: ['l', 'm', 'h'],
        },
        quality: Membrane.VideoQuality.HD_169,
        videoTrackMetadata: { active: true, type: 'camera' },
        audioTrackMetadata: { active: true, type: 'audio' },
        isSpeakerphoneOn: false,
      });
      await joinRoom();
    } catch (err) {
      console.warn(err);
    }
    setConnected(true);
  }, [
    requestPermissions,
    mbConnect,
    joinRoom,
    roomName,
    isSimulcastOn,
    displayName,
  ]);

  const disconnect = useCallback(() => {
    setConnected(false);
    mbDisconnect();
  }, [mbDisconnect]);

  if (connected) {
    return (
      <SafeAreaView style={styles.flex}>
        <Room disconnect={disconnect} />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Room name:</Text>
      <TextInput
        value={roomName}
        onChangeText={setRoomName}
        style={styles.textInput}
      />
      <Text>Display name:</Text>
      <TextInput
        value={displayName}
        onChangeText={setDisplayName}
        style={styles.textInput}
      />
      <View style={styles.row}>
        <Text>Simulcast:</Text>
        <Switch
          onValueChange={(v) => setIsSimulcastOn(v)}
          value={isSimulcastOn}
        />
      </View>
      <Pressable onPress={connect}>
        <Text style={styles.button}>Connect!</Text>
      </Pressable>
    </View>
  );
}

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
