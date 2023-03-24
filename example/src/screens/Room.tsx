import { BrandColors, TextColors } from '@colors';
import { Icon } from '@components/Icon';
import { Typo } from '@components/Typo';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import { RootStack } from '@model/NavigationTypes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

import { Settings } from '../Settings';
import { CallControls } from '../components/CallControls';

type Props = NativeStackScreenProps<RootStack, 'Room'>;

export const Room = ({ navigation }: Props) => {
  const participants = Membrane.useRoomParticipants();
  const tracks = participants
    .map((p) => p.tracks.filter((t) => t.type === 'Video'))
    .flat();

  const [focusedTrackId, setFocusedTrackId] = useState<string | null>(null);
  const focusedTrack = tracks.find((t) => t.id === focusedTrackId);
  const focusedParticipant = participants.find(
    (p) => p.tracks.find((t) => t.id === focusedTrackId) != null
  );

  const { disconnect: mbDisconnect } = Membrane.useMembraneServer();

  const [areSettingsOpen, setAreSettingsOpen] = useState<boolean>(false);

  const isFocusedParticipantSpeaking =
    focusedParticipant?.tracks.find((t) => t.type === 'Audio')?.vadStatus ===
    Membrane.VadStatus.Speech;

  const disconnect = useCallback(() => {
    mbDisconnect();
    navigation.goBack();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Typo variant="h4">Videoroom Makeover</Typo>
        </View>
        <View style={styles.headerIcon}>
          <Icon name="Cam-switch" size={24} color={BrandColors.darkBlue100} />
        </View>
      </View>

      <View style={styles.flex}>
        {!!focusedTrack && !!focusedParticipant && (
          <View
            style={[
              styles.focusedParticipantContainer,
              isFocusedParticipantSpeaking ? styles.vadSpeech : {},
            ]}
          >
            <Membrane.VideoRendererView
              trackId={focusedTrack.id}
              style={styles.focusedParticipant}
              videoLayout={Membrane.VideoLayout.FIT}
            />
            <Text style={styles.displayName}>
              {focusedParticipant.metadata.displayName}
            </Text>
            {!!areSettingsOpen && (
              <View style={styles.settingsWrapper}>
                <Settings
                  participant={focusedParticipant}
                  track={focusedTrack}
                />
              </View>
            )}
            <View style={styles.disabledIconsContainer}>
              {!focusedParticipant.tracks.find((t) => t.type === 'Audio')
                ?.metadata.active && <Icon name="Microphone-off" size={24} />}
              {!focusedTrack.metadata.active && (
                <Icon name="Cam-disabled" size={24} />
              )}
            </View>
            <Pressable
              style={styles.settingsButton}
              onPress={() => setAreSettingsOpen((o) => !o)}
            >
              <Icon name="Settings" size={48} />
            </Pressable>
          </View>
        )}
        <View style={styles.otherParticipantsContainer}>
          {participants
            .map((p) =>
              p.tracks
                // .filter((t) => t.id !== focusedTrack?.id)
                .filter((t) => t.type === 'Video')
                .map((t) => (
                  <Pressable
                    onPress={() => setFocusedTrackId(t.id)}
                    key={t.id}
                    style={[styles.participant]}
                  >
                    <Membrane.VideoRendererView
                      trackId={t.id}
                      style={styles.flex}
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
    width: '100%',
    flexDirection: 'column',
    flexWrap: 'wrap',
    // height: 100,
    marginTop: 16,
  },
  participant: {
    minWidth: 156,
    minHeight: 156,
    aspectRatio: 1,
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BrandColors.darkBlue60,
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
    borderWidth: 6,
    borderColor: '#001A72',
  },
});
