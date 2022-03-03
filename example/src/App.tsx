import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  TouchableOpacity
} from 'react-native';

import * as Membrane from 'react-native-membrane';
import { Room } from './Room';

export default function App() {
  const [connected, setConnected] = useState<Boolean>(false);
  const connectRoom = () => {
    Membrane.connect(
      'http://192.168.0.213:4000/socket',
      'room',
      'Android user'
    );
    setConnected(true);
  };

  const requestPermissions = async () => {
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
  };

  if (connected) {
    return <Room disconnect={() => setConnected(false)} />;
  }

  return (
    <View style={styles.container}>
      <Button onPress={connectRoom} title="Connect!" />
      <Button onPress={requestPermissions} title="Request permissions" />
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
