import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@screens/Home';
import { Room } from '@screens/Room';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

import { VideoroomContextProvider } from './VideoroomContext';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'IcoMoon': require('../assets/fonts/icomoon/icomoon.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <VideoroomContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Room" component={Room} />
        </Stack.Navigator>
      </NavigationContainer>
    </VideoroomContextProvider>
  );
}
