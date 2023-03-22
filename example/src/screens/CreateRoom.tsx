import { BackgroundWrapper } from '@components/BackgroundWrapper';
import { Modal } from '@components/Modal';
import { TextInput } from '@components/TextInput';
import { Typo } from '@components/Typo';
import { StandardButton } from '@components/buttons/StandardButton';
import { RootStack } from '@model/NavigationTypes';
import { useHeaderHeight } from '@react-navigation/elements';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isEmpty } from 'lodash';
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useVideoroomState } from 'src/VideoroomContext';

type Props = NativeStackScreenProps<RootStack, 'CreateRoom'>;
type GoBackAction = Readonly<{
  type: string;
  payload?: object | undefined;
  source?: string | undefined;
  target?: string | undefined;
}>;

export const CreateRoom = ({ navigation, route }: Props) => {
  const height = useHeaderHeight();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalAction = useRef<GoBackAction>();
  const { roomName, setRoomName, username, setUsername } = useVideoroomState();

  useEffect(() => {
    if (route.params?.roomName) {
      setRoomName(route.params?.roomName);
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

  const shouldEnableCreateRoomButton = () => {
    return !isEmpty(username) && !isEmpty(roomName);
  };

  return (
    <BackgroundWrapper hasHeader>
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
            headline="Discard meeting"
            body="Are you sure you want to discard creation of this meeting?"
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
              Yes, discard meeting
            </StandardButton>
          </Modal>
          <View style={styles.inner}>
            <View>
              <Typo variant="h4">Videoconferencing for everyone</Typo>
            </View>

            <View style={styles.smallTitle}>
              <Typo variant="chat-regular">
                Create a new room to start the meeting
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
            <View style={styles.createRoomButton}>
              <StandardButton
                onPress={() => {
                  navigation.push('Preview', { prevScreen: 'CreateRoom' });
                }}
                isEnabled={shouldEnableCreateRoomButton()}
              >
                Create a room
              </StandardButton>
            </View>

            <View style={styles.stepLabel}>
              <Typo variant="label">Step 1/2</Typo>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </BackgroundWrapper>
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
    marginTop: 19,
    alignSelf: 'flex-start',
  },
  usernameInput: {
    marginTop: 3,
    width: '100%',
  },
  createRoomButton: {
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
