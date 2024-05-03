import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VoiceTrackScreen from "../Screen/VoiceTrackScreen";
import LessonScreen from "../Screen/LessonScreen";
import RecordingScreen from "../Screen/RecordingScreen";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import SettingScreen from "../Screen/SettingScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Lessons" component={LessonScreen} 
      options={{
        tabBarLabel: 'Lessons',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="play-lesson" size={size} color={color} />
        ),
      }}/>
      <Tab.Screen name="VoiceTracker" component={VoiceTrackScreen} 
      options={{
        tabBarLabel: 'VoiceTracker',
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="sound" size={size} color={color} />
        ),
      }}/>
      <Tab.Screen name="Recordings" component={RecordingScreen} 
      options={{
        tabBarLabel: 'Recordings',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="mic" size={size} color={color} />
        ),
      }}/>
      <Tab.Screen name="Settings" component={SettingScreen} 
      options={{
        tabBarLabel: 'Settings',
        tabBarIcon: ({ color, size }) => (
          <Feather name="settings" size={size} color={color} />
        ),
      }}/>
      {/* <Tab.Screen name="Profile" component={ProfileScreen} 
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Feather name="user" size={size} color={color} />
        ),
      }}/> */}
    </Tab.Navigator>
  );
}
