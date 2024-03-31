import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

// Importing screens from the tabs folder
import TabOneScreen from './(tabs)/index';
import TabTwoScreen from './(tabs)/two';
import TabThreeScreen from './(tabs)/upload';

const Tab = createBottomTabNavigator();

// Helper component for rendering tab icons
function TabBarIcon({ name, color }) {
  return <FontAwesome name={name} size={28} color={color} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'question'; // default icon
          if (route.name === 'Home') {
            iconName = 'home'; // choose an appropriate icon
          } else if (route.name === 'Profile') {
            iconName = 'user'; // choose an appropriate icon
          } else if (route.name === 'Upload') {
            iconName = 'upload'; // choose an appropriate icon
          }
          // Use the TabBarIcon component for rendering icons
          return <TabBarIcon name={iconName} color={color} />;
        },
        tabBarActiveTintColor: 'gray',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        component={TabOneScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Upload"
        component={TabThreeScreen}
        options={{ title: 'Upload' }}
      />
      <Tab.Screen
        name="Profile"
        component={TabTwoScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}