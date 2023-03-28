import { BrandColors, TextColors } from '@colors';
import { Icon } from '@components/Icon';
import { Typo } from '@components/Typo';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import { RootStack } from '@model/NavigationTypes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { findIndex } from 'lodash';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Pressable, Dimensions } from 'react-native';

import { CallControls } from '../components/CallControls';

type Props = NativeStackScreenProps<RootStack, 'Room'>;

export const Room = ({ navigation }: Props) => {
  const { width, height } = Dimensions.get('window');
  const videoViewWidth = (width - 32 - 16) / 2;

  const participants = Membrane.useRoomParticipants();
  const [currentCamera, setCurrentCamera] =
    useState<Membrane.CaptureDevice | null>(null);
  const availableCameras = useRef<Membrane.CaptureDevice[]>([]);

  const { disconnect: mbDisconnect } = Membrane.useMembraneServer();

  useEffect(() => {
    Membrane.getCaptureDevices().then((devices) => {
      availableCameras.current = devices;
      setCurrentCamera(devices.find((device) => device.isFrontFacing) || null);
    });
  }, []);

  const disconnect = useCallback(() => {
    mbDisconnect();
    navigation.goBack();
  }, []);

  const switchCamera = useCallback(() => {
    const cameras = availableCameras.current;
    // setCurrentCamera(
    //   (currentCamera) =>
    //     cameras[(findIndex(cameras, currentCamera) + 1) % cameras.length]
    // );
    console.log(cameras, currentCamera);
    Membrane.switchCamera(
      cameras[(findIndex(cameras, currentCamera) + 1) % cameras.length].id
    );
  }, []);

  const newVideoWidth =
    (height - 126 - 8 * (participants.length / 2 + 2)) /
    Math.ceil(participants.length / 2);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Typo variant="h4">Videoroom Makeover</Typo>
        </View>
        <View style={styles.headerIcon}>
          <Pressable onPress={switchCamera}>
            <Icon name="Cam-switch" size={24} color={BrandColors.darkBlue100} />
          </Pressable>
        </View>
      </View>

      <View style={styles.flex}>
        <View style={styles.otherParticipantsContainer}>
          <View
            style={[
              styles.inner,
              participants.length > 3 ? styles.row : styles.column,
            ]}
          >
            {participants
              .map((p) =>
                p.tracks
                  .filter((t) => t.type === 'Video')
                  .map((t) => (
                    <Pressable
                      onPress={() => {}}
                      key={t.id}
                      style={[
                        styles.participant,
                        participants.length > 3
                          ? {
                              width: Math.min(videoViewWidth, newVideoWidth),
                            }
                          : {
                              flex: 1,
                              maxHeight: width - 32,
                              maxWidth: width - 32,
                            },
                      ]}
                    >
                      <Membrane.VideoRendererView
                        trackId={t.id}
                        style={{ width: '100%', aspectRatio: 1 }}
                      />
                      <View style={styles.displayNameContainer}>
                        <View style={styles.displayName}>
                          <Typo variant="label" color={TextColors.white}>
                            {p.metadata.displayName}
                          </Typo>
                        </View>
                      </View>

                      <View style={styles.disabledIconsContainer}>
                        {!p.tracks.find((t) => t.type === 'Audio')?.metadata
                          .active && <Icon name="Microphone-off" size={24} />}
                        {!t.metadata.active && (
                          <Icon name="Cam-disabled" size={24} />
                        )}
                      </View>
                    </Pressable>
                  ))
              )
              .flat()}
          </View>
        </View>
      </View>
      <CallControls disconnect={disconnect} />
    </View>
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
  focusedParticipantContainer: {
    flex: 1,
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
  },
});
