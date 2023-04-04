import { AdditionalColors, BrandColors } from '@colors';
import { Icon } from '@components/Icon';
import { Typo } from '@components/Typo';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated';

export type NotificationType = 'info' | 'error';

type NotificationProps = {
  text: string | null;
  type: NotificationType | null;
  resetNotification: () => void;
};

export const Notification = ({
  text,
  type,
  resetNotification,
}: NotificationProps) => {
  if (!text || !type) return null;

  const containerStyle =
    type === 'error' ? styles.errorContainer : styles.infoContainer;

  return (
    <Animated.View
      style={[styles.container, containerStyle]}
      entering={SlideInUp}
      exiting={SlideOutUp}
    >
      <Typo variant="label" color={BrandColors.darkBlue20} style={styles.text}>
        {text}
      </Typo>
      <Pressable onPress={resetNotification} hitSlop={20}>
        <Icon name="Close" size={16} color={AdditionalColors.white} />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorContainer: {
    backgroundColor: AdditionalColors.red80,
  },
  infoContainer: {
    backgroundColor: BrandColors.darkBlue100,
  },
  text: {
    marginRight: 8,
  },
});
