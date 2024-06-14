import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecordingsScreen from "../screens/Recordings/RecordingsScreen";
import RecordingDetailScreen from "../screens/Recordings/RecordingDetailScreen";
export default function RecordingNavigator() {
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
      initialRouteName="Recordings"
    >
      <Stack.Screen name="screens/Recordings/RecordingsScreen" component={RecordingsScreen} />
      <Stack.Screen name="screens/Recordings/RecordingDetailScreen" component={RecordingDetailScreen} />
    </Stack.Navigator>
  );
}
