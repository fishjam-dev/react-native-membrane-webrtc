import 'react-native-gesture-handler';
import {
  NotoSans_400Regular,
  NotoSans_500Medium,
  NotoSans_600SemiBold,
} from '@expo-google-fonts/noto-sans';
import { RootStack } from '@model/NavigationTypes';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateRoom } from '@screens/CreateRoom';
import { InitialScreen } from '@screens/InitialScreen';
import { JoinRoomStub } from '@screens/JoinRoomStub';
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
      // TODO(@skyman503): When JoinRoom screen is finished, use it here.
      CreateRoom: {
        path: 'room/:roomName',
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
            name="InitialScreen"
            component={InitialScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateRoom"
            component={CreateRoom}
            options={{ title: 'New meeting' }}
          />
          <Stack.Screen name="Room" component={Room} />
          <Stack.Screen name="JoinRoom" component={JoinRoomStub} />
        </Stack.Navigator>
      </NavigationContainer>
    </VideoroomContextProvider>
  );
}
