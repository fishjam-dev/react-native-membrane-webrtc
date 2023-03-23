import { TextColors } from '@colors';
import { BackgroundAnimation } from '@components/BackgroundAnimation';
import { Modal } from '@components/Modal';
import { TextInput } from '@components/TextInput';
import { Typo } from '@components/Typo';
import { StandardButton } from '@components/buttons/StandardButton';
import { RootStack } from '@model/NavigationTypes';
import { useHeaderHeight } from '@react-navigation/elements';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCardAnimation } from '@react-navigation/stack';
import {
  checkIfUrl,
  extractRoomNameFromUrl,
  shouldEnableRoomButton,
} from '@utils';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import { useVideoroomState } from 'src/VideoroomContext';

type Props = NativeStackScreenProps<RootStack, 'JoinRoom'>;
type GoBackAction = Readonly<{
  type: string;
  payload?: object | undefined;
  source?: string | undefined;
  target?: string | undefined;
}>;

export const JoinRoom = ({ navigation, route }: Props) => {
  const height = useHeaderHeight();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalAction = useRef<GoBackAction>();
  const { roomName, setRoomName, username, setUsername } = useVideoroomState();
  const [isRoomNameInputEditable, setIsRoomNameInputEditable] = useState(true);
  const { next, current } = useCardAnimation();

  useEffect(() => {
    if (route.params?.roomName) {
      setRoomName(route.params?.roomName);
      setIsRoomNameInputEditable(false);
    }
  }, []);

  useEffect(() => {
    const handleBeforeRemoveEvent = (e) => {
      if (!roomName && !username) {
        // If we don't have unsaved changes, then we don't need to do anything
        return;
      }
      e.preventDefault();
      modalAction.current = e.data.action;
      setIsModalVisible(true);
    };

    navigation.addListener('beforeRemove', handleBeforeRemoveEvent);

    return () =>
      navigation.removeListener('beforeRemove', handleBeforeRemoveEvent);
  }, [navigation, roomName, username]);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        //@ts-ignore
        opacity: next
          ? 0
          : current.progress.interpolate({
              inputRange: [0, 0.99, 1],
              outputRange: [0, 0, 1],
            }),
      },
    });
  }, []);

  const openPreview = () => {
    if (checkIfUrl(roomName)) {
      setRoomName(decodeURI(extractRoomNameFromUrl(roomName)));
    }
    navigation.push('Preview', { title: 'Join meeting' });
  };

  const requestPermissionsAndOpenPreview = useCallback(async () => {
    if (Platform.OS === 'ios') {
      openPreview();
      return;
    }
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
      openPreview();
    } catch (err) {
      console.warn(err);
    }
  }, []);

  return (
    <BackgroundAnimation>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            flex: 1,
          }}
          enabled
          keyboardVerticalOffset={height}
        >
          <Modal
            headline="Cancel joining meeting"
            body="Are you sure you don't want to cancel joining to this meeting?"
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
          >
            <StandardButton
              type="danger"
              onPress={() => {
                setIsModalVisible(false);
                setRoomName('');
                setUsername('');
                navigation.dispatch(modalAction.current!);
              }}
            >
              Yes, don't join meeting
            </StandardButton>
          </Modal>
          <View style={styles.inner}>
            <View>
              <Typo variant="h4">Videoconferencing for everyone</Typo>
            </View>

            <View style={styles.smallTitle}>
              <Typo variant="chat-regular" color={TextColors.description}>
                Join an existing meeting
              </Typo>
            </View>
            <View style={styles.roomInputLabel}>
              <Typo variant="body-small">Room name</Typo>
            </View>

            <View style={styles.roomInput}>
              <TextInput
                placeholder="Room name"
                value={roomName}
                onChangeText={setRoomName}
                editable={isRoomNameInputEditable}
                sublabel="Provide name or link to the room"
              />
            </View>

            <View style={styles.usernameInputLabel}>
              <Typo variant="body-small">Your name</Typo>
            </View>
            <View style={styles.usernameInput}>
              <TextInput
                placeholder="Your name"
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <View style={styles.joinRoomButton}>
              <StandardButton
                onPress={requestPermissionsAndOpenPreview}
                isEnabled={shouldEnableRoomButton(username, roomName)}
              >
                Next
              </StandardButton>
            </View>

            <View style={styles.stepLabel}>
              <Typo variant="label">Step 1/2</Typo>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </BackgroundAnimation>
  );
};

const styles = StyleSheet.create({
  smallTitle: {
    marginTop: 8,
  },
  roomInputLabel: {
    marginTop: 43,
    alignSelf: 'flex-start',
  },
  roomInput: {
    marginTop: 3,
    width: '100%',
  },
  usernameInputLabel: {
    marginTop: 24,
    alignSelf: 'flex-start',
  },
  usernameInput: {
    marginTop: 3,
    width: '100%',
  },
  joinRoomButton: {
    marginTop: 32,
    width: '100%',
  },
  stepLabel: {
    marginTop: 16,
  },
  inner: {
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    justifyContent: 'center',
  },
});
