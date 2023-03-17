import {
  NotoSans_400Regular,
  NotoSans_500Medium,
  NotoSans_600SemiBold,
} from '@expo-google-fonts/noto-sans';
import { RootStack } from '@model/NavigationTypes';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateRoom } from '@screens/CreateRoom';
// import { Home } from '@screens/Home';
import { InitialScreenStub } from '@screens/InitialScreenStub';
import { Room } from '@screens/Room';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

import { VideoroomContextProvider } from './VideoroomContext';

SplashScreen.preventAutoHideAsync();

const linking = {
  prefixes: ['https://videoroom.membrane.work'],
  config: {
    screens: {
      Home: {
        path: 'room/:roomName',
        parse: {
          roomName: decodeURI,
        },
      },
    },
  },
};

const Stack = createNativeStackNavigator<RootStack>();

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

  return (
    <VideoroomContextProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          initialRouteName="InitialScreen"
          screenOptions={{
            headerBackTitle: 'Back',
          }}
        >
          <Stack.Screen
            name="New meeting"
            component={CreateRoom}
            options={{ headerBackTitle: 'Back' }}
          />
          <Stack.Screen
            name="Room"
            component={Room}
            options={{ headerBackTitle: 'Back' }}
          />
          <Stack.Screen
            name="InitialScreen"
            component={InitialScreenStub}
            options={{ headerBackTitle: 'Back' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </VideoroomContextProvider>
  );
}
