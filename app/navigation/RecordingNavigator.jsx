import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecordingsScreen from "../screens/Recordings/RecordingsScreen";
import RecordingDetailScreen from "../screens/Recordings/RecordingDetailScreen";
import { SelectedRecordingProvider } from "../../contexts/SelectedRecordingContext";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RecordingNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <SelectedRecordingProvider>
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
        initialRouteName="Recordings"
      >
        {/* <Stack.Screen name="screens/Recordings/RecordingsScreen" component={RecordingsScreen} /> */}
        <Stack.Screen name="Recordings" component={RecordingsScreen} />
        <Stack.Screen
          name="Recording Details"
          component={RecordingDetailScreen}
        />
      </Stack.Navigator>
    </SelectedRecordingProvider>
  );
}
