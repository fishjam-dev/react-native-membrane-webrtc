import { Icon } from '@components/Icon';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import { RootStack } from '@model/NavigationTypes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

import { Controls } from '../Controls';
import { Settings } from '../Settings';

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

  useEffect(() => {
    if (!focusedTrack && tracks[0]) {
      setFocusedTrackId(tracks[0].id);
    }
  }, [tracks, focusedTrack]);

  const [areSettingsOpen, setAreSettingsOpen] = useState<boolean>(false);

  const isFocusedParticipantSpeaking =
    focusedParticipant?.tracks.find((t) => t.type === 'Audio')?.vadStatus ===
    Membrane.VadStatus.Speech;

  const disconnect = useCallback(() => {
    mbDisconnect();
    navigation.goBack();
  }, []);

  return (
    <View style={styles.flex}>
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
                .filter((t) => t.id !== focusedTrack?.id)
                .filter((t) => t.type === 'Video')
                .map((t) => (
                  <Pressable
                    onPress={() => setFocusedTrackId(t.id)}
                    key={t.id}
                    style={[
                      styles.participant,
                      p.tracks.find((t) => t.type === 'Audio')?.vadStatus ===
                      Membrane.VadStatus.Speech
                        ? styles.vadSpeech
                        : {},
                    ]}
                  >
                    <Membrane.VideoRendererView
                      trackId={t.id}
                      style={styles.flex}
                    />
                    <Text style={styles.displayName}>
                      {p.metadata.displayName}
                    </Text>
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
      <Controls disconnect={disconnect} />
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: '100%',
    flexDirection: 'row',
    height: 100,
    margin: 20,
  },
  participant: {
    height: 100,
    width: 100,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#001A72',
  },
  displayName: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    bottom: 0,
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
