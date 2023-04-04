import 'react-native-gesture-handler';
import { BackgroundWrapper } from '@components/BackgroundWrapper';
import {
  NotoSans_400Regular,
  NotoSans_500Medium,
  NotoSans_600SemiBold,
} from '@expo-google-fonts/noto-sans';
import { NotificationsContextProvider } from '@model/NotificationsContext';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Navigation } from './Navigation';
import { VideoroomContextProvider } from './VideoroomContext';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_500Medium,
    NotoSans_600SemiBold,
    IcoMoon: require('@assets/fonts/icomoon/icomoon.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <BackgroundWrapper>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <SafeAreaProvider>
        <NotificationsContextProvider>
          <VideoroomContextProvider>
            <Navigation />
          </VideoroomContextProvider>
        </NotificationsContextProvider>
      </SafeAreaProvider>
    </BackgroundWrapper>
  );
}
