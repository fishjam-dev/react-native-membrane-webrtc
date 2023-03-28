import { AdditionalColors, BrandColors, TextColors } from '@colors';
import { Icon } from '@components/Icon';
import { NoCameraView } from '@components/NoCameraView';
import { Typo } from '@components/Typo';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import { RootStack } from '@model/NavigationTypes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getShortUsername } from '@utils';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View, Pressable, Dimensions } from 'react-native';
import { useVideoroomState } from 'src/VideoroomContext';

import { CallControls } from '../components/CallControls';

type Props = NativeStackScreenProps<RootStack, 'Room'>;

export const Room = ({ navigation }: Props) => {
  const { width, height } = Dimensions.get('window');
  const { roomName } = useVideoroomState();
  const participants = Membrane.useRoomParticipants();

  const videoViewWidth = (width - 32 - 16) / 2;
  const smallScreenVideoWidth =
    (height - 126 - 16 * (participants.length / 2 + 2)) /
    Math.ceil(participants.length / 2);

  const { disconnect: mbDisconnect } = Membrane.useMembraneServer();

  useEffect(() => {
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
      participants.length > 3
        ? {
            width: getWidthWhenManyParticipants(),
          }
        : {
            flex: 1,
            maxHeight: width - 32,
            maxWidth: width - 32,
          },
    ];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Typo variant="h4">{roomName}</Typo>
        </View>
        <View style={styles.headerIcon}>
          <Pressable onPress={switchCamera}>
            <Icon name="Cam-switch" size={24} color={BrandColors.darkBlue100} />
          </Pressable>
        </View>
      </View>

      <View style={styles.flex}>
        <View style={styles.participantsContainer}>
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
                    <View
                      key={t.id}
                      style={getStylesForParticipants(participants)}
                    >
                      {!t.metadata.active ? (
                        <View style={styles.videoTrack}>
                          <NoCameraView
                            username={getShortUsername(p.metadata.displayName)}
                          />
                        </View>
                      ) : (
                        <Membrane.VideoRendererView
                          trackId={t.id}
                          style={styles.videoTrack}
                        />
                      )}
                      <View style={styles.displayNameContainer}>
                        <View
                          style={[
                            styles.displayName,
                            p.type === 'Local'
                              ? styles.localUser
                              : styles.remoteUser,
                          ]}
                        >
                          <Typo variant="label" color={TextColors.white}>
                            {p.type === 'Local'
                              ? 'You'
                              : p.metadata.displayName}
                          </Typo>
                        </View>
                      </View>

                      {!p.tracks.find((t) => t.type === 'Audio')?.metadata
                        .active && (
                        <View style={styles.mutedIcon}>
                          <Icon
                            name="Microphone-off"
                            size={16}
                            color={BrandColors.darkBlue100}
                          />
                        </View>
                      )}
                    </View>
                  ))
              )
              .flat()
              .slice(0, participants.length > 8 ? 7 : 8)}

            {participants.length > 8 && (
              <View style={getStylesForParticipants(participants)}>
                <Typo variant="label">Others</Typo>
              </View>
            )}
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
  participantsContainer: {
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
    borderRadius: 60,
    position: 'absolute',
    left: 16,
    bottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteUser: {
    backgroundColor: BrandColors.darkBlue80,
  },
  localUser: {
    backgroundColor: BrandColors.pink100,
  },
  displayName: {
    borderRadius: 60,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    paddingBottom: 6,
  },
  videoTrack: { width: '100%', aspectRatio: 1 },
  mutedIcon: {
    position: 'absolute',
    left: 16,
    top: 16,
    backgroundColor: AdditionalColors.white,
    borderRadius: 50,
    padding: 6,
  },
});
