import 'react-native-gesture-handler';
import { BackgroundWrapper } from '@components/BackgroundWrapper';
import {
  NotoSans_400Regular,
  NotoSans_500Medium,
  NotoSans_600SemiBold,
} from '@expo-google-fonts/noto-sans';
import { NotificationsContextProvider } from '@model/NotificationsContext';
import * as Sentry from '@sentry/react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Navigation } from './Navigation';
import { VideoroomContextProvider } from './VideoroomContext';

SplashScreen.preventAutoHideAsync();

Sentry.init({
  dsn: 'https://9604f3f42d5e4745a7334e32ae0a6d50@o4504956005777408.ingest.sentry.io/4504956007677952',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  enabled: !__DEV__,
});

function App() {
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

export default Sentry.wrap(App);
