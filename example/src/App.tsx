import 'react-native-gesture-handler';
import { BackgroundWrapper } from '@components/BackgroundWrapper';
import { VIDEOROOM_URL } from '@env';
import {
  NotoSans_400Regular,
  NotoSans_500Medium,
  NotoSans_600SemiBold,
} from '@expo-google-fonts/noto-sans';
import { RootStack } from '@model/NavigationTypes';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateRoom } from '@screens/CreateRoom';
import { InitialScreen } from '@screens/InitialScreen';
import { JoinRoom } from '@screens/JoinRoom';
import { LeaveRoomScreen } from '@screens/LeaveRoomScreen';
import { Preview } from '@screens/Preview';
import { Room } from '@screens/Room';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { VideoroomContextProvider } from './VideoroomContext';

SplashScreen.preventAutoHideAsync();

const linking = {
  prefixes: [VIDEOROOM_URL],
  config: {
    screens: {
      JoinRoom: {
        path: ':roomName',
        parse: {
          roomName: decodeURI,
        },
      },
    },
  },
};

const Stack = createStackNavigator<RootStack>();

export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_500Medium,
    NotoSans_600SemiBold,
    IcoMoon: require('../assets/fonts/icomoon/icomoon.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };

  return (
    <BackgroundWrapper>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <VideoroomContextProvider>
        <NavigationContainer linking={linking} theme={navTheme}>
          <Stack.Navigator
            initialRouteName="InitialScreen"
            screenOptions={{
              headerBackTitle: 'Back',
              headerMode: 'float',
            }}
          >
            <Stack.Screen
              name="InitialScreen"
              component={InitialScreen}
              options={{
                headerStyle: { opacity: 0 },
                cardStyle: { backgroundColor: 'transparent' },
              }}
            />
            <Stack.Screen
              name="CreateRoom"
              component={CreateRoom}
              options={{
                title: 'New meeting',
                cardStyle: { backgroundColor: 'transparent' },
              }}
            />
            <Stack.Screen
              name="Room"
              component={Room}
              options={{
                headerShown: false,
                cardStyle: { backgroundColor: 'transparent' },
              }}
            />
            <Stack.Screen
              name="JoinRoom"
              component={JoinRoom}
              options={{
                title: 'Join meeting',
                cardStyle: { backgroundColor: 'transparent' },
              }}
            />
            <Stack.Screen
              name="Preview"
              component={Preview}
              options={{
                cardStyle: { backgroundColor: 'transparent' },
              }}
            />
            <Stack.Screen
              name="LeaveRoom"
              component={LeaveRoomScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </VideoroomContextProvider>
    </BackgroundWrapper>
  );
}
