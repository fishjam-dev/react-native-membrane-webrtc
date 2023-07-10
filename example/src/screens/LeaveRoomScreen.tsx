import { BackgroundAnimation } from '@components/BackgroundAnimation';
import { Typo } from '@components/Typo';
import { StandardButton } from '@components/buttons/StandardButton';
import { RootStack } from '@model/NavigationTypes';
import { useNotifications } from '@model/NotificationsContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Sentry from '@sentry/react-native';
import React, { useCallback } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useVideoroomState } from '@model/VideoroomContext';

type Props = NativeStackScreenProps<RootStack, 'LeaveRoom'>;

export const LeaveRoomScreen = ({ navigation }: Props) => {
  const { connectAndJoinRoom, goToMainScreen } = useVideoroomState();
  const { showNotification } = useNotifications();

  const rejoinMeeting = useCallback(async () => {
    try {
      await connectAndJoinRoom();
      navigation.goBack();
    } catch (err) {
      showNotification('Error connecting to server', 'error');
      Sentry.captureException(err);
    }
  }, [connectAndJoinRoom]);

  const onMainScreenPress = useCallback(() => {
    navigation.navigate('InitialScreen');
    goToMainScreen();
  }, []);

  return (
    <BackgroundAnimation>
      <View style={styles.content}>
        <Image
          style={styles.logo}
          source={require('@assets/images/Logo.png')}
        />
        <Typo variant="h3" style={styles.title}>
          You’ve left the meeting.
        </Typo>
        <Typo variant="body-small" style={styles.subtitle}>
          What would you like to do next?
        </Typo>

        <View style={styles.mainButton}>
          <StandardButton onPress={onMainScreenPress}>Main page</StandardButton>
        </View>
        <View style={styles.rejoinButton}>
          <StandardButton type="secondary" onPress={rejoinMeeting}>
            Rejoin the meeting
          </StandardButton>
        </View>
      </View>
    </BackgroundAnimation>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 56,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
  },
  mainButton: {
    marginTop: 56,
  },
  rejoinButton: {
    marginTop: 24,
  },
  logo: {
    width: 223,
    height: 49,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
