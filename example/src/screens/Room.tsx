import { BrandColors } from '@colors';
import { BackgroundAnimation } from '@components/BackgroundAnimation';
import { Icon } from '@components/Icon';
import { RoomParticipant } from '@components/RoomParticipant';
import { Typo } from '@components/Typo';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import { RootStack } from '@model/NavigationTypes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
<<<<<<< HEAD
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View, Pressable, Dimensions } from 'react-native';
import { useVideoroomState } from 'src/VideoroomContext';
=======
import { findIndex } from 'lodash';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Pressable, Dimensions } from 'react-native';
>>>>>>> f985a87 (FIx layout)

import { CallControls } from '../components/CallControls';

const HEADER_AND_FOOTER_SIZE = 126;
const PADDING_BETWEEN_PARTICIPANTS = 16;
const MAX_NUM_OF_USERS_ON_THE_SCREEN = 8;
const FLEX_BRAKPOINT = 3;

type Props = NativeStackScreenProps<RootStack, 'Room'>;

export const Room = ({ navigation }: Props) => {
  const { width, height } = Dimensions.get('window');
<<<<<<< HEAD
  const { roomName } = useVideoroomState();
  const participants = Membrane.useRoomParticipants();
  console.log(participants);

  const videoViewWidth = (width - 3 * PADDING_BETWEEN_PARTICIPANTS) / 2;
  const smallScreenVideoWidth =
    (height -
      HEADER_AND_FOOTER_SIZE -
      PADDING_BETWEEN_PARTICIPANTS * (participants.length / 2 + 2)) /
    Math.ceil(participants.length / 2);
=======
  const videoViewWidth = (width - 32 - 16) / 2;

  const participants = Membrane.useRoomParticipants();
  const [currentCamera, setCurrentCamera] =
    useState<Membrane.CaptureDevice | null>(null);
  const availableCameras = useRef<Membrane.CaptureDevice[]>([]);
>>>>>>> f985a87 (FIx layout)

  const { disconnect: mbDisconnect } = Membrane.useMembraneServer();

  useEffect(() => {
<<<<<<< HEAD
    const handleBeforeRemoveEvent = (e) => {
      e.preventDefault();
      // Check whether beforeRemove event was triggered by disconenct button.
      if (e.data.action.source) {
        navigation.dispatch(e.data.action);
      }
    };

    navigation.addListener('beforeRemove', handleBeforeRemoveEvent);

    return () =>
      navigation.removeListener('beforeRemove', handleBeforeRemoveEvent);
  }, [navigation]);
=======
    Membrane.getCaptureDevices().then((devices) => {
      availableCameras.current = devices;
      setCurrentCamera(devices.find((device) => device.isFrontFacing) || null);
    });
  }, []);
>>>>>>> f985a87 (FIx layout)

  const disconnect = useCallback(() => {
    mbDisconnect();
    navigation.goBack();
  }, []);

  const switchCamera = useCallback(() => {
    Membrane.flipCamera();
  }, []);

  const getWidthWhenManyParticipants = () => {
    return Math.min(videoViewWidth, smallScreenVideoWidth);
  };

  const getStylesForParticipants = (participants: Membrane.Participant[]) => {
    return [
      styles.participant,
      participants.length > FLEX_BRAKPOINT
        ? {
            width: getWidthWhenManyParticipants(),
          }
        : {
            flex: 1,
            maxHeight: width - 2 * PADDING_BETWEEN_PARTICIPANTS,
            maxWidth: width - 2 * PADDING_BETWEEN_PARTICIPANTS,
          },
    ];
  };

  return (
    <BackgroundAnimation>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTitle}>
            <Typo variant="h4">{roomName}</Typo>
          </View>
          <View style={styles.headerIcon}>
            <Pressable onPress={switchCamera}>
              <Icon
                name="Cam-switch"
                size={24}
                color={BrandColors.darkBlue100}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.flex}>
          <View style={styles.participantsContainer}>
            <View
              style={[
                styles.inner,
                participants.length > FLEX_BRAKPOINT
                  ? styles.row
                  : styles.column,
              ]}
            >
              {participants
                .slice(
                  0,
                  participants.length > MAX_NUM_OF_USERS_ON_THE_SCREEN
                    ? MAX_NUM_OF_USERS_ON_THE_SCREEN - 1
                    : MAX_NUM_OF_USERS_ON_THE_SCREEN
                )
                .map((p) => (
                  <RoomParticipant
                    key={p.id}
                    participant={p}
                    pStyle={getStylesForParticipants(participants)}
                  />
                ))}

              {participants.length > MAX_NUM_OF_USERS_ON_THE_SCREEN && (
                <View style={getStylesForParticipants(participants)}>
                  <Typo variant="label">Others</Typo>
                </View>
              )}
            </View>
          </View>
        </View>
        <CallControls disconnect={disconnect} />
      </View>
    </BackgroundAnimation>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: BrandColors.seaBlue20,
  },
  header: {
    flexDirection: 'row',
    marginTop: 60,
    width: '100%',
  },
  headerTitle: {
    marginLeft: 16,
  },
  headerIcon: {
    justifyContent: 'center',
    marginRight: 15,
    marginLeft: 'auto',
  },
  flex: {
    flex: 1,
  },
  participantsContainer: {
    flex: 1,
<<<<<<< HEAD
=======
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#001A72',
    margin: 20,
  },
  focusedParticipant: {
    flex: 1,
  },
  otherParticipantsContainer: {
    flex: 1,
>>>>>>> f985a87 (FIx layout)
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  inner: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  participant: {
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BrandColors.darkBlue60,
    overflow: 'hidden',
    marginBottom: 8,
    marginLeft: 4,
    marginRight: 4,
<<<<<<< HEAD
=======
  },
  displayNameContainer: {
    backgroundColor: BrandColors.darkBlue80,
    borderRadius: 60,
    position: 'absolute',
    left: 16,
    bottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayName: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    paddingBottom: 5,
  },
  settingsButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  settingsWrapper: {
    position: 'absolute',
    right: 4,
    bottom: 48,
  },
  disabledIconsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  vadSpeech: {
    borderWidth: 5,
    borderColor: BrandColors.green60,
>>>>>>> f985a87 (FIx layout)
  },
});
