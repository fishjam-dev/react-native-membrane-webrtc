import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import * as Membrane from 'react-native-membrane';
import { Controls } from './Controls';

export const Room = ({ disconnect }: { disconnect: () => void }) => {
  const participants = Membrane.useRoomParticipants();

  const [focusedParticipantId, setFocusedParticipantId] = useState<
    string | null
  >(null);
  const focusedParticipant = participants.find(
    (p) => p.id === focusedParticipantId
  );

  useEffect(() => {
    if (!focusedParticipant && participants[0]) {
      setFocusedParticipantId(participants[0].id);
    }
  }, [participants, focusedParticipant]);

  return (
    <View style={styles.flex}>
      <View style={styles.flex}>
        {!!focusedParticipant && (
          <View style={styles.focusedParticipantContainer}>
            <Membrane.VideoRendererView
              participantId={focusedParticipant.id}
              style={styles.focusedParticipant}
              videoLayout={Membrane.VideoLayout.FIT}
            />
            <Text style={styles.displayName}>
              {focusedParticipant.displayName}
            </Text>
          </View>
        )}
        <View style={styles.otherParticipantsContainer}>
          {participants
            .filter((p) => p.id !== focusedParticipant?.id)
            .map((p) => (
              <Pressable
                onPress={() => setFocusedParticipantId(p.id)}
                key={p.id}
                style={styles.participant}
              >
                <Membrane.VideoRendererView
                  participantId={p.id}
                  style={styles.flex}
                />
                <Text style={styles.displayName}>{p.displayName}</Text>
              </Pressable>
            ))}
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
    overflow: 'hidden',
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
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#001A72',
  },
  displayName: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
});
