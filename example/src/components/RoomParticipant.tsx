import { BrandColors, AdditionalColors, TextColors } from '@colors';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import { delay } from '@utils';
import React, { useRef, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Icon } from './Icon';
import { NoCameraView } from './NoCameraView';
import { Typo } from './Typo';
import { PinButton } from './buttons/PinButton';

type RoomParticipantProps = {
  participant: Membrane.Participant;
  onPinButtonPressed?: (string) => void;
  focused?: boolean;
  pinButtonHiddden?: boolean;
  titleSmall?: boolean;
};

export const RoomParticipant = ({
  participant: { metadata, tracks, type, id },
  onPinButtonPressed = (string) => {},
  focused = false,
  pinButtonHiddden = false,
  titleSmall = false,
}: RoomParticipantProps) => {
  const [showPinButton, setShowPinButton] = useState(false);
  const isPinButtonShown = useRef(false);
  const videoTrack = tracks.find((t) => t.type === 'Video');
  const audioTrack = tracks.find((t) => t.type === 'Audio');

  const participantHasVideo = () => {
    if (videoTrack) {
      return videoTrack.metadata.active;
    }
    return false;
  };

  const getTextForPinButton = () => {
    return focused ? 'Unpin user' : titleSmall ? 'Pin' : 'Pin user';
  };

  const onPinButton = () => {
    if (focused) {
      onPinButtonPressed(null);
      return;
    }
    onPinButtonPressed(id);
  };

  const triggerShowingPinButton = async () => {
    if (pinButtonHiddden || isPinButtonShown.current) {
      return;
    }

    isPinButtonShown.current = true;
    setShowPinButton(true);
    await delay(2000);
    setShowPinButton(false);
    isPinButtonShown.current = false;
  };

  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={triggerShowingPinButton} style={{ flex: 1 }}>
        {participantHasVideo() ? (
          <Membrane.VideoRendererView
            trackId={videoTrack!.id}
            style={styles.videoTrack}
          />
        ) : (
          <View style={styles.videoTrack}>
            <NoCameraView
              username={metadata.displayName}
              isSmallTile={titleSmall}
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
        <Animated.View style={styles.pinButton} entering={FadeIn}>
          <PinButton onPress={onPinButton}>{getTextForPinButton()} </PinButton>
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
  mutedIcon: {
    position: 'absolute',
    left: 16,
    top: 16,
    backgroundColor: AdditionalColors.white,
    borderRadius: 50,
    padding: 6,
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
