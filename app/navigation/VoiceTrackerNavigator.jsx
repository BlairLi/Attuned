import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VoiceTrackerScreen from "../screens/VoiceTracker/VoiceTrackerScreen";
import PitchTrackerScreen from "../screens/VoiceTracker/PitchTrackerScreen";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function VoiceTrackerNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
          padding: 20,
          fontFamily: "outfit-bold",
        },
        headerBackVisible: false,
        headerLeft: ({ canGoBack }) =>
          canGoBack ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
          ) : null,
      })}
      initialRouteName="VoiceTracker"
    >
      <Stack.Screen name="VoiceTracker" component={VoiceTrackerScreen} />
      <Stack.Screen name="Pitch Tracker" component={PitchTrackerScreen} />
    </Stack.Navigator>
  );
}
