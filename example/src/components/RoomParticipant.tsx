import { BrandColors, AdditionalColors, TextColors } from '@colors';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import React, { useRef, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withSequence,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';

import { Icon } from './Icon';
import { NoCameraView } from './NoCameraView';
import { Typo } from './Typo';
import { PinButton } from './buttons/PinButton';

type RoomParticipantProps = {
  participant: Membrane.Participant;
  onPinButtonPressed?: (string) => void;
  focused?: boolean;
  pinButtonHiddden?: boolean;
  tileSmall?: boolean;
};

export const RoomParticipant = ({
  participant: { metadata, tracks, type, id },
  onPinButtonPressed = (string) => {},
  focused = false,
  pinButtonHiddden = false,
  tileSmall = false,
}: RoomParticipantProps) => {
  const [showPinButton, setShowPinButton] = useState(false);
  const isPinButtonShown = useRef(false);
  // const videoTrack = tracks.find((t) => t.type === 'Video');
  const videoTrack = tracks[0];
  const videoTrackType = videoTrack?.metadata.type;
  const audioTrack = tracks.find((t) => t.type === 'Audio');
  const buttonOpacity = useSharedValue(0);

  const participantHasVideo = () => {
    if (videoTrack) {
      return videoTrack.metadata.active;
    }
    return false;
  };

  const getTextForPinButton = () => {
    return focused ? 'Unpin user' : tileSmall ? 'Pin' : 'Pin user';
  };

  const onPinButton = () => {
    if (focused) {
      onPinButtonPressed(null);
      return;
    }
    onPinButtonPressed(id);
  };

  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
    };
  });

  const setIsPinButtonShown = (val: boolean) => {
    isPinButtonShown.current = val;
  };

  const triggerShowingPinButton = async () => {
    if (pinButtonHiddden || isPinButtonShown.current) {
      return;
    }

    isPinButtonShown.current = true;
    setShowPinButton(true);

    buttonOpacity.value = withSequence(
      withTiming(1, { duration: 300 }),
      withDelay(
        1700,
        withTiming(0, { duration: 300 }, () => {
          runOnJS(setShowPinButton)(false);
          runOnJS(setIsPinButtonShown)(false);
        })
      )
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={triggerShowingPinButton} style={{ flex: 1 }}>
        {participantHasVideo() ? (
          <Membrane.VideoRendererView
            trackId={videoTrack!.id}
            style={
              videoTrackType === 'camera'
                ? styles.videoTrack
                : styles.videoTrackScreencast
            }
            videoLayout={
              videoTrackType === 'camera'
                ? Membrane.VideoLayout.FILL
                : Membrane.VideoLayout.FIT
            }
          />
        ) : (
          <View style={styles.videoTrack}>
            <NoCameraView
              username={metadata.displayName}
              isSmallTile={tileSmall}
            />
          </View>
        )}
        <View style={styles.displayNameContainer}>
          <View
            style={[
              styles.displayName,
              type === 'Local' ? styles.localUser : styles.remoteUser,
            ]}
          >
            <Typo variant="label" color={TextColors.white} numberOfLines={1}>
              {type === 'Local' ? 'You' : metadata.displayName}
            </Typo>
          </View>
        </View>

        {focused ? (
          <View style={styles.displayPinContainer}>
            <Icon name="Pin" size={20} color={BrandColors.darkBlue100} />
          </View>
        ) : null}

        {!audioTrack?.metadata.active && (
          <View style={styles.mutedIcon}>
            <Icon
              name="Microphone-off"
              size={16}
              color={BrandColors.darkBlue100}
            />
          </View>
        )}
      </Pressable>
      {showPinButton ? (
        <Animated.View style={[styles.pinButton, opacityStyle]}>
          <View style={styles.pinButtonWrapper}>
            <PinButton onPress={onPinButton}>{getTextForPinButton()}</PinButton>
          </View>
        </Animated.View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  displayNameContainer: {
    borderRadius: 60,
    position: 'absolute',
    left: 16,
    bottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
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
    marginRight: 16,
  },
  videoTrack: {
    flex: 1,
    aspectRatio: 1,
    alignSelf: 'center',
  },
  videoTrackScreencast: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: AdditionalColors.grey140,
  },
  mutedIcon: {
    position: 'absolute',
    left: 16,
    top: 16,
    backgroundColor: AdditionalColors.white,
    borderRadius: 50,
    padding: 6,
  },
  pinButtonWrapper: {
    borderRadius: 100,
    overflow: 'hidden',
  },
  pinButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayPinContainer: {
    borderRadius: 60,
    position: 'absolute',
    top: 16,
    right: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AdditionalColors.white,
    padding: 4,
  },
});
