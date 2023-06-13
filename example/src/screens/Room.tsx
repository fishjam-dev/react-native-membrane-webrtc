import { BrandColors } from '@colors';
import { BackgroundAnimation } from '@components/BackgroundAnimation';
import { DiscardModal } from '@components/DiscardModal';
import { FocusedParticipant } from '@components/FocusedParticipant';
import { Icon } from '@components/Icon';
import {
  NotFocusedParticipants,
  Participant,
} from '@components/NotFocusedParticipants';
import { Participants } from '@components/Participants';
import { Typo } from '@components/Typo';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import { RootStack } from '@model/NavigationTypes';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useKeepAwake } from 'expo-keep-awake';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, InteractionManager } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useVideoroomState } from 'src/VideoroomContext';

import { CallControls } from '../components/CallControls';

type Props = NativeStackScreenProps<RootStack, 'Room'>;

type ParticipantWithTrack = {
  participant: Membrane.Participant;
  trackId?: string;
};

export const Room = ({ navigation }: Props) => {
  useKeepAwake();

  const { isDevMode, roomName, disconnect } = useVideoroomState();
  const { selectedAudioOutputDevice } = Membrane.useAudioSettings();
  const participants = Membrane.useRoomParticipants();
  const [focusedParticipantData, setFocusedParticipantData] =
    useState<Participant | null>(null);
  const [participantsLastSpoken, setParticipantsLastSpoken] = useState({});

  const participantsOrder = (
    a: ParticipantWithTrack,
    b: ParticipantWithTrack
  ) => {
    // Check for local user, they should be always on the top.
    if (a.participant.type === 'Local') {
      return -1;
    } else if (b.participant.type === 'Local') {
      return 1;
    }

    if (
      participantsLastSpoken[b.participant.id] >
      participantsLastSpoken[a.participant.id]
    ) {
      return 1;
    } else if (
      participantsLastSpoken[a.participant.id] >
      participantsLastSpoken[b.participant.id]
    ) {
      return -1;
    }
    return 0;
  };

  const participantsWithTracks = participants
    .map((p) => {
      if (p.tracks.some((t) => t.type === Membrane.TrackType.Video)) {
        return p.tracks
          .filter((t) => t.metadata.type !== 'audio')
          .map((t) => ({
            participant: p,
            trackId: t.id,
          }));
      }
      return { participant: p };
    })
    .flat()
    .sort(participantsOrder);

  const [shouldShowParticipants, setShouldShowParticipants] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      InteractionManager.runAfterInteractions(() => {
        setShouldShowParticipants(true);
      });

      return () => setShouldShowParticipants(false);
    }, [])
  );

  const isScreensharingTrack = (track: Membrane.Track) => {
    return track.metadata.type === 'screensharing';
  };

  const getNumberOfCurrentlySpeakingParticipants = () => {
    return participants.filter(
      (p) => p.tracks.find((t) => t.type === 'Audio')?.vadStatus === 'speech'
    ).length;
  };

  const isTrackFocused = (p: Participant) => {
    return (
      p.participant.id === focusedParticipantData?.participant.id &&
      p.trackId === focusedParticipantData?.trackId
    );
  };

  useEffect(() => {
    const newPartsWithSpokenData = {};
    participants.forEach((p) => {
      const audioTrack = p.tracks.find((t) => t.type === 'Audio');
      const lastSpoken = audioTrack?.vadStatus === 'speech' ? Date.now() : 0;
      newPartsWithSpokenData[p.id] = participantsLastSpoken[p.id]
        ? lastSpoken > participantsLastSpoken[p.id]
          ? lastSpoken
          : participantsLastSpoken[p.id]
        : lastSpoken;
    });

    setParticipantsLastSpoken(newPartsWithSpokenData);
  }, [participants, getNumberOfCurrentlySpeakingParticipants()]);

  useEffect(() => {
    const curretStateOfFocusedParticipant = participants.find(
      (p) => p.id === focusedParticipantData?.participant.id
    );

    if (!curretStateOfFocusedParticipant) {
      setFocusedParticipantData(null);
      return;
    }

    if (
      focusedParticipantData?.participant !== curretStateOfFocusedParticipant
    ) {
      setFocusedParticipantData({
        participant: curretStateOfFocusedParticipant,
        trackId: focusedParticipantData?.trackId,
      });
    }
  }, [participants]);

  useEffect(() => {
    const screencast = participants
      .reverse()
      .find((p) => p.tracks.some((t) => isScreensharingTrack(t)));

    if (screencast) {
      setFocusedParticipantData({
        participant: screencast,
        trackId: screencast.tracks.find((t) => isScreensharingTrack(t))!.id,
      });
    } else {
      setFocusedParticipantData(null);
    }
  }, [
    participants.filter((p) => p.tracks.some((t) => isScreensharingTrack(t)))
      .length,
  ]);

  const switchCamera = useCallback(() => {
    Membrane.flipCamera();
  }, []);

  const handleBeforeRemoveEvent = (e, setIsModalVisible) => {
    e.preventDefault();
    // reset action comes from deeplink
    if (e.data.action.type === 'RESET') {
      setIsModalVisible(true);
    }
  };

  return (
    <BackgroundAnimation>
      <DiscardModal
        headline="Leave room"
        body="Are you sure you want to leave this room?"
        buttonText="Yes, leave room"
        handleBeforeRemoveEvent={handleBeforeRemoveEvent}
        onDiscard={disconnect}
      />
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
          <View style={styles.header}>
            <View style={styles.headerTitle}>
              <Typo variant="h4" numberOfLines={1}>
                {roomName}
              </Typo>
            </View>
            <View style={styles.headerIcon}>
              <TouchableOpacity onPress={switchCamera}>
                <Icon
                  name="Cam-switch"
                  size={24}
                  color={BrandColors.darkBlue100}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            {shouldShowParticipants &&
              (focusedParticipantData ? (
                <>
                  <FocusedParticipant
                    focusedParticipant={focusedParticipantData}
                    onPress={setFocusedParticipantData}
                  />
                  <View style={styles.otherParticipants}>
                    <NotFocusedParticipants
                      participants={participantsWithTracks.filter(
                        (p) => !isTrackFocused(p)
                      )}
                    />
                  </View>
                </>
              ) : (
                <Participants
                  participants={participantsWithTracks}
                  onPress={setFocusedParticipantData}
                />
              ))}
          </View>

          {isDevMode ? (
            <View style={styles.audioDeviceContainer}>
              <Typo variant="label">
                Currently using: {selectedAudioOutputDevice?.name} of type:
                {selectedAudioOutputDevice?.type}
              </Typo>
            </View>
          ) : null}
          <CallControls />
        </SafeAreaView>
      </View>
    </BackgroundAnimation>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.seaBlue20,
  },
  header: {
    flexDirection: 'row',
    marginTop: 60,
    width: '100%',
  },
  headerTitle: {
    marginLeft: 16,
    flex: 1,
  },
  headerIcon: {
    justifyContent: 'center',
    marginRight: 15,
    marginLeft: 'auto',
  },
  flex: {
    flex: 1,
  },
  otherParticipants: {
    marginTop: 16,
    marginBottom: 8,
  },
  audioDeviceContainer: {
    alignItems: 'center',
  },
});
