import { Typo } from '@components/Typo';
import { CardButton } from '@components/buttons/CardButton';
import { useCardAnimation } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet, Image, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');

export const InitialScreen = ({ navigation }) => {
  const { next } = useCardAnimation();

  return (
    <Animated.View
      style={{
        flex: 1,
        transform: [
          {
            translateX: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -width],
                })
              : 0,
          },
        ],
      }}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/Logo.png')}
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
    </Animated.View>
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
  logo: {
    width: 223,
    height: 49,
    resizeMode: 'contain',
  },
});
