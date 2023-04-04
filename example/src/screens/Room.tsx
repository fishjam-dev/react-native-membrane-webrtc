import { AdditionalColors, BrandColors } from '@colors';
import { BackgroundAnimation } from '@components/BackgroundAnimation';
import { Icon } from '@components/Icon';
import { NotFocusedParticipants } from '@components/NotFocusedParticipants';
import { OtherParticipants } from '@components/OtherParticipants';
import { RoomParticipant } from '@components/RoomParticipant';
import { StopScreencastingWithFocus } from '@components/StopScrencastingWithFocus';
import { Typo } from '@components/Typo';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, InteractionManager } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IdleTimerManager from 'react-native-idle-timer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useVideoroomState } from 'src/VideoroomContext';

import { CallControls } from '../components/CallControls';

const HEADER_AND_FOOTER_SIZE = 126;
const OFFSET_PER_ROW = 16;
const MAX_NUM_OF_USERS_ON_THE_SCREEN = 8;
const FLEX_BRAKPOINT = 3;

type focusedVideoTrack = {
  participantId: string;
  trackIdx: number;
};

export const Room = () => {
  const { width, height } = Dimensions.get('window');
  const { roomName } = useVideoroomState();

  const participants = Membrane.useRoomParticipants();
  const [focusedParticipantData, setFocusedParticipantData] =
    useState<focusedVideoTrack | null>(null);

  useEffect(() => {
    IdleTimerManager.setIdleTimerDisabled(true, 'room');

    return () => IdleTimerManager.setIdleTimerDisabled(false, 'room');
  }, []);

  const focusedParticipant = participants.find(
    (p) => p.id === focusedParticipantData?.participantId
  );
  const participantsWithTracks = participants
    .map((p) =>
      p.tracks.length > 1
        ? p.tracks
            .filter((t) => t.metadata.type !== 'audio')
            .map((_t, idx) => ({
              participant: p,
              idx,
            }))
        : { participant: p, idx: -1 }
    )
    .flat();

  const rowNum = Math.min(
    Math.ceil(participantsWithTracks.length / 2),
    MAX_NUM_OF_USERS_ON_THE_SCREEN / 2
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

  const videoViewWidth = (width - 3 * OFFSET_PER_ROW) / 2;
  const smallScreenVideoWidth =
    (height - HEADER_AND_FOOTER_SIZE - OFFSET_PER_ROW * (rowNum + 2)) / rowNum;

  const findScreensharingTrack = (track: Membrane.Track) => {
    return track.metadata.type === 'screensharing';
  };

  useEffect(() => {
    const screencast = participants
      .reverse()
      .find((p) => p.tracks.some((t) => findScreensharingTrack(t)));

    if (screencast) {
      setFocusedParticipantData({
        participantId: screencast.id,
        trackIdx: screencast.tracks.findIndex((t) => findScreensharingTrack(t)),
      });
    }
  }, [
    participants.filter((p) => p.tracks.some((t) => findScreensharingTrack(t)))
      .length,
  ]);

  const switchCamera = useCallback(() => {
    Membrane.flipCamera();
  }, []);

  const getWidthWhenManyParticipants = () => {
    return Math.min(videoViewWidth, smallScreenVideoWidth);
  };

  const getStylesForParticipants = () => {
    return [
      styles.participant,
      participantsWithTracks.length > FLEX_BRAKPOINT
        ? {
            width: getWidthWhenManyParticipants(),
          }
        : {
            flex: 1,
            maxHeight: width - 2 * OFFSET_PER_ROW,
            maxWidth: width - 2 * OFFSET_PER_ROW,
          },
    ];
  };

  return (
    <BackgroundAnimation>
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
          <View style={styles.header}>
            <View style={styles.headerTitle}>
              <Typo variant="h4">{roomName}</Typo>
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
            {shouldShowParticipants && (
              <>
                {focusedParticipant ? (
                  <View style={styles.focusedParticipantContainer}>
                    <View style={styles.focusedParticipant}>
                      {focusedParticipant.type ===
                        Membrane.ParticipantType.Local &&
                      focusedParticipant.tracks[
                        focusedParticipantData
                          ? focusedParticipantData?.trackIdx
                          : 0
                      ].metadata.type === 'screensharing' ? (
                        <StopScreencastingWithFocus />
                      ) : (
                        <RoomParticipant
                          participant={focusedParticipant}
                          trackIdx={focusedParticipantData?.trackIdx}
                          onPinButtonPressed={setFocusedParticipantData}
                          focused
                        />
                      )}
                    </View>
                  </View>
                ) : null}

                {focusedParticipant ? (
                  <View style={styles.otherParticipants}>
                    <NotFocusedParticipants
                      participants={participantsWithTracks
                        .filter(
                          (p) =>
                            (p.participant.id === focusedParticipant?.id &&
                              p.idx !== focusedParticipantData?.trackIdx) ||
                            p.participant.id !== focusedParticipant?.id
                        )
                        .map((p) => ({
                          participant: p.participant,
                          trackIdx: p.idx,
                        }))}
                    />
                  </View>
                ) : (
                  <View style={styles.participantsContainer}>
                    <View
                      style={[
                        styles.inner,
                        participantsWithTracks.length > FLEX_BRAKPOINT
                          ? styles.row
                          : styles.column,
                      ]}
                    >
                      {participantsWithTracks
                        .slice(
                          0,
                          participantsWithTracks.length >
                            MAX_NUM_OF_USERS_ON_THE_SCREEN
                            ? MAX_NUM_OF_USERS_ON_THE_SCREEN - 1
                            : MAX_NUM_OF_USERS_ON_THE_SCREEN
                        )
                        .map((p) => (
                          <View
                            key={p.participant.id + p.idx}
                            style={[
                              getStylesForParticipants(),
                              styles.shownParticipantBorder,
                            ]}
                          >
                            <RoomParticipant
                              participant={p.participant}
                              trackIdx={p.idx}
                              onPinButtonPressed={setFocusedParticipantData}
                              tileSmall={
                                participantsWithTracks.length > FLEX_BRAKPOINT
                              }
                            />
                          </View>
                        ))}

                      {participantsWithTracks.length >
                        MAX_NUM_OF_USERS_ON_THE_SCREEN && (
                        <View style={getStylesForParticipants()}>
                          <OtherParticipants
                            p1={participants[participants.length - 1]}
                            p2={participants[participants.length - 2]}
                            numOfOtherParticipants={
                              participantsWithTracks.length -
                              MAX_NUM_OF_USERS_ON_THE_SCREEN +
                              1
                            }
                          />
                        </View>
                      )}
                    </View>
                  </View>
                )}
              </>
            )}
          </View>

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
    overflow: 'hidden',
    marginBottom: 8,
    marginLeft: 4,
    marginRight: 4,
    backgroundColor: AdditionalColors.grey140,
  },
  shownParticipantBorder: {
    borderWidth: 1,
    borderColor: BrandColors.darkBlue60,
  },
  focusedParticipantContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  focusedParticipant: {
    aspectRatio: 1 / 1.3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BrandColors.darkBlue60,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: AdditionalColors.grey140,
  },
  otherParticipants: {
    marginTop: 16,
    marginBottom: 8,
    flex: 1,
  },
});
