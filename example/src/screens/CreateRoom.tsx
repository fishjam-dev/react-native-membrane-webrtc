import { BackgroundWrapper } from '@components/BackgroundWrapper';
import { Modal } from '@components/Modal';
import { TextInput } from '@components/TextInput';
import { Typo } from '@components/Typo';
import { StandardButton } from '@components/buttons/StandardButton';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import { useVideoroomState } from 'src/VideoroomContext';

function isEmpty(value) {
  return value == null || value.trim().length === 0;
}

export const CreateRoom = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { roomName, setRoomName } = useVideoroomState();

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!roomName && !username) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure to discard them and leave the screen?',
          [
            { text: "Don't leave", style: 'cancel', onPress: () => {} },
            {
              text: 'Discard',
              style: 'destructive',
              onPress: () => console.log('xD'),
            },
          ]
        );

        // SHOW MODAL
        //setIsModalVisible(true);
      }),
    [navigation, roomName, username]
  );

  const ShouldEnableCreateRoomButton = () => {
    console.log(!isEmpty(username) && !isEmpty(roomName));
    return !isEmpty(username) && !isEmpty(roomName);
  };

  const TrimTrailingSpacesForTextInputs = () => {
    setRoomName(roomName.trimEnd());
    setUsername(username.trimEnd());
  };

  return (
    <BackgroundWrapper>
      <Modal
        headline="Discard changes"
        body="you sure???"
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />

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
      <KeyboardAvoidingView style={{ width: '100%' }}>
        <View style={styles.roomInput}>
          <TextInput
            placeholder="Room name"
            value={roomName}
            onChangeText={(val) => {
              setRoomName(val);
            }}
          />
        </View>
        <View style={styles.usernameInputLabel}>
          <Typo variant="body-small">Your name</Typo>
        </View>
        <View style={styles.usernameInput}>
          <TextInput
            placeholder="Your name"
            value={username}
            onChangeText={(val) => {
              setUsername(val);
            }}
          />
        </View>
        <View style={styles.createRoomButton}>
          <StandardButton
            onPress={() => {
              TrimTrailingSpacesForTextInputs();
            }}
            isEnabled={ShouldEnableCreateRoomButton()}
          >
            Create a room
          </StandardButton>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.stepLabel}>
        <Typo variant="label">Step 1/2</Typo>
      </View>
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
});
