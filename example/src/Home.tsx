import { Typo } from '@components/Typo';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import React, { useCallback, useContext, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Switch,
  Alert,
} from 'react-native';

import { VideoroomContext } from './VideoroomContext';

export const Home = ({ navigation }) => {
  const videoroomContext = useContext(VideoroomContext);
  const [connected, setConnected] = videoroomContext!.connectedState;
  const [roomName, setRoomName] = videoroomContext!.roomNameState;
  const [serverUrl, setServerUrl] = videoroomContext!.serverUrlState;
  const [displayName, setDisplayName] = videoroomContext!.displayNameState;
  const [isSimulcastOn, setIsSimulcastOn] =
    videoroomContext!.isSimulcastOnState;

  const {
    connect: mbConnect,
    // disconnect: mbDisconnect,
    joinRoom,
    error,
  } = Membrane.useMembraneServer();

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
    } catch (err) {
      console.warn(err);
    }
    setConnected(true);
    console.log(connected);
    navigation.navigate('Room');
  }, [
    requestPermissions,
    mbConnect,
    joinRoom,
    roomName,
    isSimulcastOn,
    displayName,
    serverUrl,
  ]);

  // const disconnect = useCallback(() => {
  //   setConnected(false);
  //   mbDisconnect();
  // }, [mbDisconnect]);

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
        <Text style={styles.button}>Connect!</Text>
      </Pressable>
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
