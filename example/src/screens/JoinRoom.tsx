import { TextColors } from '@colors';
import { BackgroundAnimation } from '@components/BackgroundAnimation';
import { DiscardModal, GoBackEvent } from '@components/DiscardModal';
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
  isEmptyStringOrWhitespaces,
} from '@utils';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useVideoroomState } from '@model/VideoroomContext';
import { handlePermissions } from '@shared/handlePermissions';

type Props = NativeStackScreenProps<RootStack, 'JoinRoom'>;

export const JoinRoom = ({ navigation, route }: Props) => {
  const { width } = Dimensions.get('window');
  const height = useHeaderHeight();
  const {
    isDevMode,
    devServerUrl,
    setDevServerUrl,
    roomName,
    setRoomName,
    username,
    setUsername,
  } = useVideoroomState();
  const [isRoomNameInputEditable, setIsRoomNameInputEditable] = useState(true);
  const { next, current } = useCardAnimation();

  useEffect(() => {
    if (route.params?.roomName) {
      setRoomName(route.params?.roomName);
      setIsRoomNameInputEditable(false);
    }
  }, []);

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
      setRoomName(decodeURIComponent(extractRoomNameFromUrl(roomName)));
    }
    navigation.push('Preview', { title: 'Join meeting' });
  };

  const handleBeforeRemoveEvent = (
    e: GoBackEvent,
    setIsModalVisible: (value: boolean) => void
  ) => {
    if (!roomName && !username) {
      // If we don't have unsaved changes, then we don't need to do anything
      return;
    }
    e.preventDefault();
    setIsModalVisible(true);
  };

  return (
    <BackgroundAnimation>
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
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
            <DiscardModal
              headline="Cancel joining meeting"
              body="Are you sure you don’t want to join this meeting?"
              buttonText="Don’t join the meeting"
              handleBeforeRemoveEvent={handleBeforeRemoveEvent}
            />
            <View style={styles.inner}>
              <View>
                <Typo variant={width > 350 ? 'h4' : 'h5'}>
                  Videoconferencing for everyone
                </Typo>
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

              {isDevMode ? (
                <>
                  <View style={styles.usernameInputLabel}>
                    <Typo variant="body-small">Server url</Typo>
                  </View>
                  <View style={styles.usernameInput}>
                    <TextInput
                      placeholder="Server url"
                      value={devServerUrl}
                      onChangeText={setDevServerUrl}
                    />
                  </View>
                </>
              ) : null}

              <View style={styles.joinRoomButton}>
                <StandardButton
                  onPress={() => handlePermissions(openPreview)}
                  isEnabled={
                    !isEmptyStringOrWhitespaces(username) &&
                    !isEmptyStringOrWhitespaces(roomName)
                  }
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
      </SafeAreaView>
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
