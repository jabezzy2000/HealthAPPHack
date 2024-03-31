import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';

import { useColorScheme } from '@/components/useColorScheme';

// Import your Signup Page and Authenticated Layout components
import AuthScreen from './AuthScreen'; // Import your AuthScreen component
import TabLayout from './TabLayout';


const Stack = createStackNavigator(); // Initialize Stack navigator

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [authenticated, setAuthenticated] = useState(false);

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
  <Stack.Navigator initialRouteName="AuthScreen">
    <Stack.Screen name="TabLayout" component={TabLayout} options={{ headerShown: false }} />
    <Stack.Screen name="AuthScreen" component={AuthScreen} options={{ headerShown: false }} />
    <Stack.Screen name="modal" options={{ presentation: 'modal' }}>
      {() => (
        <View>
          <Text>This is the modal screen</Text>
        </View>
      )}
    </Stack.Screen>
  </Stack.Navigator>
</ThemeProvider>
  );
}
