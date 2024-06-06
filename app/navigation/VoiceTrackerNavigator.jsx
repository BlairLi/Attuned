import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VoiceTrackerScreen from "../screens/VoiceTracker/VoiceTrackerScreen";

export default function VoiceTrackerNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
          padding: 20,
          fontFamily: "outfit-bold",
        },
        headerBackTitleVisible: false,
      }}
      initialRouteName="VoiceTracker"
    >
      <Stack.Screen name="Voice Tracker" component={VoiceTrackerScreen} />
    </Stack.Navigator>
  );
}
