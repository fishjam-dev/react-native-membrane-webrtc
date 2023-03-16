import { BrandColors } from '@colors';
import { TextInput } from '@components/TextInput';
import { Typo } from '@components/Typo';
import { StandardButton } from '@components/buttons/StandardButton';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useVideoroomState } from 'src/VideoroomContext';

function isEmpty(value) {
  return value == null || value.trim().length === 0;
}

export const CreateRoom = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const { roomName, setRoomName } = useVideoroomState();

  const ShouldEnableCreateRoomButton = () => {
    console.log(!isEmpty(username) && !isEmpty(roomName));
    return !isEmpty(username) && !isEmpty(roomName);
  };

  return (
    <View style={styles.container}>
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
          onPress={() => {}}
          isEnabled={ShouldEnableCreateRoomButton()}
        >
          Create a room
        </StandardButton>
      </View>
      <View style={styles.stepLabel}>
        <Typo variant="label">Step 1/2</Typo>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.seaBlue40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
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
