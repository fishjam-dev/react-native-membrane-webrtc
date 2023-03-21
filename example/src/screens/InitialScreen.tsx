import { BrandColors } from '@colors';
import { BackgroundWrapper } from '@components/BackgroundWrapper';
import { Logo } from '@components/Icon';
import { Typo } from '@components/Typo';
import { CardButton } from '@components/buttons/CardButton';
import React from 'react';
import { View, StyleSheet } from 'react-native';

export const InitialScreen = ({ navigation }) => {
  return (
    <BackgroundWrapper>
      <View style={styles.content}>
        <View style={styles.header}>
          <Logo
            name="Horizontal-outline-dark"
            size={49}
            color={BrandColors.darkBlue100}
          />
          <View style={styles.subtitle}>
            <Typo variant="h5">Videoconferencing for everyone</Typo>
          </View>
        </View>

        <View style={styles.createButton}>
          <CardButton
            iconName="edit"
            onPress={() => {
              navigation.push('CreateRoom');
            }}
          >
            Create new meeting
          </CardButton>
        </View>

        <View style={styles.joinButton}>
          <CardButton
            iconName="Users"
            onPress={() => {
              navigation.push('JoinRoom');
            }}
          >
            Join existing meeting
          </CardButton>
        </View>
      </View>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignSelf: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  header: {
    marginTop: 160,
    alignItems: 'center',
  },
  subtitle: {
    marginTop: 8,
  },
  createButton: {
    marginTop: 64,
  },
  joinButton: {
    marginTop: 16,
  },
});