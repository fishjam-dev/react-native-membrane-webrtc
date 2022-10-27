import {
  Participant,
  Track,
  useSimulcast,
  useBandwidthLimit,
  useScreencast,
  TrackEncoding,
} from '@membraneframework/react-native-membrane-webrtc';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Switch,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const allEncodings: TrackEncoding[] = ['h', 'm', 'l'];

export const Settings = ({
  participant: { type, id },
  track,
}: {
  participant: Participant;
  track: Track;
}) => {
  const {
    setTargetTrackEncoding,
    toggleVideoTrackEncoding,
    simulcastConfig: { activeEncodings },
  } = useSimulcast();
  const { setVideoTrackBandwidth } = useBandwidthLimit();
  const {
    simulcastConfig: { activeEncodings: screencastActiveEncodings },
    toggleScreencastTrackEncoding,
    setScreencastTrackBandwidth,
  } = useScreencast();

  const [bandwidthLimit, setBandwidthLimit] = useState<string>('0');

  if (type === 'Local') {
    return (
      <View style={styles.container}>
        <Text>Encodings to send:</Text>
        {allEncodings.map((e) => (
          <View style={styles.row} key={e}>
            <Text style={styles.label}>{e}:</Text>
            <Switch
              value={activeEncodings.includes(e)}
              onValueChange={() => toggleVideoTrackEncoding(e)}
            />
          </View>
        ))}
        <Text>Bandwidth limit:</Text>
        <View style={styles.row}>
          <TextInput
            value={bandwidthLimit}
            onChangeText={(v) => setBandwidthLimit(v)}
            style={styles.textInput}
          />
          <Text> kb/s </Text>
          <TouchableOpacity
            onPress={() => setVideoTrackBandwidth(parseInt(bandwidthLimit, 10))}
          >
            <Text style={styles.button}>ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  if (track.metadata.type === 'screencasting') {
    return (
      <View style={styles.container}>
        <Text>Encodings to send:</Text>
        {allEncodings.map((e) => (
          <View style={styles.row} key={e}>
            <Text style={styles.label}>{e}:</Text>
            <Switch
              value={screencastActiveEncodings.includes(e)}
              onValueChange={() => toggleScreencastTrackEncoding(e)}
            />
          </View>
        ))}
        <Text>Bandwidth limit:</Text>
        <View style={styles.row}>
          <TextInput
            value={bandwidthLimit}
            onChangeText={(v) => setBandwidthLimit(v)}
            style={styles.textInput}
          />
          <Text> kb/s </Text>
          <TouchableOpacity
            onPress={() =>
              setScreencastTrackBandwidth(parseInt(bandwidthLimit, 10))
            }
          >
            <Text style={styles.button}>ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>Encoding to receive:</Text>
      <View style={styles.row}>
        {allEncodings.map((e) => (
          <TouchableOpacity onPress={() => setTargetTrackEncoding(track.id, e)}>
            <Text style={styles.button}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#001A72',
    padding: 4,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    minWidth: 24,
  },
  button: {
    borderWidth: 2,
    borderColor: '#001A72',
    borderRadius: 4,
    marginVertical: 20,
    fontSize: 20,
    padding: 4,
    textAlign: 'center',
    backgroundColor: '#b5d2ff',
    minWidth: 36,
    marginRight: 4,
  },
  textInput: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#001A72',
    padding: 4,
  },
});
