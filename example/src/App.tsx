import { SERVER_URL } from '@env';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
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
import { Typo, TypoTextVariants } from './fonts/Typo';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Room } from './Room';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const {
    connect: mbConnect,
    disconnect: mbDisconnect,
    joinRoom,
    error,
  } = Membrane.useMembraneServer();
  const [connected, setConnected] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>('room');
  const [serverUrl, setServerUrl] = useState<string>(SERVER_URL);
  const [displayName, setDisplayName] = useState<string>(
    `mobile ${Platform.OS}`
  );
  const [isSimulcastOn, setIsSimulcastOn] = useState<boolean>(true);

  const params = {
    token: 'NOW_YOU_CAN_SEND_PARAMS',
  };

  const [fontsLoaded] = useFonts({
    Inter: require('../assets/fonts/Inter-Medium.ttf'),
    IcoMoon: require('../assets/fonts/icomoon/icomoon.ttf'),
  });

  const Icon = createIconSetFromIcoMoon(
    require('../assets/fonts/icomoon/selection.json'),
    'IcoMoon',
    'icomoon.ttf'
  );

  useEffect(() => {
    console.log(fontsLoaded);
    if (fontsLoaded) {
      console.log(fontsLoaded);
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

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
    serverUrl,
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
      <Typo variant="h3">Room name:</Typo>
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
      <Text>Server URL:</Text>
      <TextInput
        value={serverUrl}
        onChangeText={setServerUrl}
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
        <Text style={styles.button}>
          Connect!
          <Icon name="Bulb" size={20} />
        </Text>
      </Pressable>
      <Typo variant="h1">GIGANT</Typo>
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
