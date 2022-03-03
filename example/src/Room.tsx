import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Membrane from 'react-native-membrane';
import { CameraIcon, CameraDisabledIcon, MicrophoneDisabledIcon, MicrophoneIcon, PhoneDownIcon, SwitchCameraIcon, ScreenShareIcon } from './icons';

const iconSize = 32;

export const Room = ({ disconnect }: { disconnect: () => void }) => {
  const [isCameraDisabled, setIsCameraDisabled] = useState<Boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<Boolean>(false);

  const participants = Membrane.useParticipants();

  const [firstParticipantId, setFirstParticipantId] = useState<string | null>(null)
  const firstParticipant = participants.find(p => p.id === firstParticipantId);

  useEffect(() => {
    if (!firstParticipant && participants[0]) {
      setFirstParticipantId(participants[0].id)
    }
  }, [participants, firstParticipantId]);

  return (
    <View style={styles.container}>
      <View style={styles.participantsContainer}>
        {!!firstParticipant && (
          <View style={styles.firstParticipant}>
            <Membrane.VideoRendererView
              participantId={firstParticipant.id}
              style={styles.firstParticipant}
            />
            <Text style={styles.displayName}>{firstParticipant.displayName}</Text>
          </View>
        )}
        <View style={styles.otherParticipantsContainer}>
          {participants.filter(p => p.id !== firstParticipant?.id).map((p) => (
            <TouchableOpacity onPress={() => setFirstParticipantId(p.id)} key={p.id} style={styles.participant}>
              <Membrane.VideoRendererView
                participantId={p.id}
                style={styles.participant}

              />
              <Text style={styles.displayName}>{p.displayName}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => setIsAudioMuted(!isAudioMuted)}>
          {isAudioMuted ? <MicrophoneDisabledIcon width={iconSize} height={iconSize} /> :
            <MicrophoneIcon width={iconSize} height={iconSize} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsCameraDisabled(!isCameraDisabled)}>
          {isCameraDisabled ? <CameraDisabledIcon width={iconSize} height={iconSize} /> :
            <CameraIcon width={iconSize} height={iconSize} />
          }
        </TouchableOpacity>
        <TouchableOpacity onPress={disconnect}>
          <PhoneDownIcon width={iconSize} height={iconSize} />
        </TouchableOpacity>
        <SwitchCameraIcon width={iconSize} height={iconSize} />
        <ScreenShareIcon width={iconSize} height={iconSize} />
      </View>
    </View>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 24,
  },
  participantsContainer: {
    flex: 1,
    alignItems: 'center',
  },
  firstParticipant: {
    flex: 1,
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: "#001A72",
  },
  otherParticipantsContainer: {
    flexDirection: 'row',
    height: 100,
    width: 300,
    paddingVertical: 20,
  },
  participant: {
    height: 100,
    width: 100,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: "#001A72",
  },
  displayName: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    bottom: 0,
  }
});
