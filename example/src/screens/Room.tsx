import { BrandColors } from '@colors';
import { BackgroundAnimation } from '@components/BackgroundAnimation';
import { DiscardModal } from '@components/DiscardModal';
import { FocusedParticipant } from '@components/FocusedParticipant';
import { Icon } from '@components/Icon';
import {
  NotFocusedParticipants,
  Participant,
} from '@components/NotFocusedParticipants';
import {
  Participants,
  MAX_NUM_OF_USERS_ON_THE_SCREEN,
} from '@components/Participants';
import { Typo } from '@components/Typo';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import { RootStack } from '@model/NavigationTypes';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  checkIfArraysAreTheSame,
  getNumberOfCurrentlyVisiblePlaces,
} from '@utils';
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
  // This string array will containg strings in a form of participantId+trackId
  // to differentiate between camera and screenshare video tracks.
  const [participantsOrder, setParticipantsOrder] = useState<string[] | null>(
    null
  );

  const getFirstNotSpeakingVisiblePlace = (
    participants: ParticipantWithTrack[]
  ) => {
    const currentlyVisiblePlaces = getNumberOfCurrentlyVisiblePlaces(
      MAX_NUM_OF_USERS_ON_THE_SCREEN,
      participants.length
    );
    for (let i = 0; i < currentlyVisiblePlaces; i++) {
      const p = participants[i].participant;
      const audioTrack = p.tracks.find((t) => t.type === 'Audio');
      if (audioTrack?.vadStatus !== 'speech' && p.type !== 'Local') {
        return i;
      }
    }

    // In case that there are no free spots at the moment.
    return -1;
  };

  const saveCurrentOrder = (participants: ParticipantWithTrack[]) => {
    const newOrder = participants.map((p) => p.participant.id + p.trackId);

    if (checkIfArraysAreTheSame(participantsOrder, newOrder) === false) {
      setParticipantsOrder(newOrder);
    }
  };

  const orderAndSave = (participants: ParticipantWithTrack[]) => {
    const currentlyVisiblePlaces = getNumberOfCurrentlyVisiblePlaces(
      MAX_NUM_OF_USERS_ON_THE_SCREEN,
      participants.length
    );

    for (let i = currentlyVisiblePlaces; i < participants.length; i++) {
      const freeSpot = getFirstNotSpeakingVisiblePlace(participants);
      // If there are no more non speaking spots then don't move anyone.
      if (freeSpot === -1) {
        break;
      }

      const p = participants[i].participant;
      const audioTrack = p.tracks.find((t) => t.type === 'Audio');
      if (audioTrack?.vadStatus === 'speech') {
        // Swap speaking with non speaking participants.
        const tmp = participants[i];
        participants[i] = participants[freeSpot];
        participants[freeSpot] = tmp;
      }
    }

    saveCurrentOrder(participants);
    return participants;
  };

  const applyPrevOrder = (participants: ParticipantWithTrack[]) => {
    const properlyOrderedParticipants: ParticipantWithTrack[] = [];

    // Base case, nothing to apply order to.
    if (participantsOrder === null || participantsOrder.length === 1) {
      return participants;
    }

    participantsOrder.forEach((id) => {
      const participant = participants.find(
        (p) => p.participant.id + p.trackId === id
      );
      // This check is needed since if user will leave participantsOrder
      // won't know this until after this function is executed.
      // This makes sure no null/undefined object will make it to the displayed participants.
      if (participant) {
        properlyOrderedParticipants.push(participant);
      }
    });

    // Collects participants that are not part of the
    // prev order (meaning that they have just joined).
    const newParticipants = participants.filter(
      (p) =>
        participantsOrder.find((po) => po === p.participant.id + p.trackId) ===
        undefined
    );
    newParticipants.forEach((p) => {
      properlyOrderedParticipants.push(p);
    });

    return properlyOrderedParticipants;
  };

  const orderParticipantsAccordingToVadStatus = (
    participants: ParticipantWithTrack[]
  ) => {
    return orderAndSave(applyPrevOrder(participants));
  };

  const participantsWithTracks = orderParticipantsAccordingToVadStatus(
    participants
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
  );

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

  const isTrackFocused = (p: Participant) => {
    return (
      p.participant.id === focusedParticipantData?.participant.id &&
      p.trackId === focusedParticipantData?.trackId
    );
  };

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
