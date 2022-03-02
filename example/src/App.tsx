import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  TouchableOpacity
} from 'react-native';
import * as Membrane from 'react-native-membrane';

export default function App() {
  const connectRoom = () => {
    Membrane.connect(
      'http://192.168.0.213:4000/socket',
      'room',
      'Android user'
    );
  };

  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] ===
        PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const participants = Membrane.useParticipants();

  const [firstParticipant, setFirstParticipant] = React.useState<Membrane.Participant | null>(null)
  console.log("ASDF", firstParticipant);

  React.useEffect(() => {
    if (!firstParticipant) {
      setFirstParticipant(participants[1])
    }
  }, [participants, firstParticipant]);

  return (
    <View style={styles.container}>
      {!!firstParticipant && (
        <View style={styles.firstParticipant}>
          <Membrane.VideoRendererView
            participantId={firstParticipant.id}
            style={styles.firstParticipant}
          />
          <Text style={styles.displayName}>{firstParticipant.displayName}</Text>
        </View>
      )}
      <View style={styles.participantsContainer}>
        {participants.filter(p => p.id !== firstParticipant?.id).map((p) => (
          <TouchableOpacity onPress={() => setFirstParticipant(p)} key={p.id} style={styles.participant}>
            <Membrane.VideoRendererView
              participantId={p.id}
              style={styles.participant}

            />
            <Text style={styles.displayName}>{p.displayName}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button onPress={connectRoom} title="Connect!" />
      <Button onPress={requestPermissions} title="Request permissions" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstParticipant: {
    width: 300,
    height: 300,
    marginVertical: 20,
  },
  participantsContainer: {
    flexDirection: 'row',
    height: 100,
    width: 300,
  },
  participant: {
    height: 100,
    width: 100,
  },
  displayName: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    bottom: 0,
  }
});
