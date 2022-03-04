import React, { useCallback, useEffect, useState } from 'react';

import { StyleSheet, View, Button, PermissionsAndroid } from 'react-native';

import * as Membrane from 'react-native-membrane';
import { Room } from './Room';

export default function App() {
  const {
    connect: mbConnect,
    disconnect: mbDisconnect,
    joinRoom,
    error,
  } = Membrane.useMembraneServer();
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const requestPermissions = useCallback(async () => {
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
    await mbConnect('http://192.168.0.213:4000/socket', 'room', 'Android user');
    await joinRoom();
    setConnected(true);
  }, [requestPermissions, mbConnect, joinRoom]);

  const disconnect = useCallback(() => {
    setConnected(false);
    mbDisconnect();
  }, [mbDisconnect]);

  if (connected) {
    return <Room disconnect={disconnect} />;
  }

  return (
    <View style={styles.container}>
      <Button onPress={connect} title="Connect!" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
