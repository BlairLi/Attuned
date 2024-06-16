import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecordingsScreen from "../screens/Recordings/RecordingsScreen";
import RecordingDetailScreen from "../screens/Recordings/RecordingDetailScreen";
import { SafeAreaView } from "react-native";

export default function RecordingNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={{flex:1}}>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
            padding: 20,
            fontFamily: "outfit-bold",
          },
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        initialRouteName="Recordings"
      >
        {/* <Stack.Screen name="screens/Recordings/RecordingsScreen" component={RecordingsScreen} /> */}
        <Stack.Screen name="Recordings" component={RecordingsScreen} />
        <Stack.Screen name="RecordingDetail" component={RecordingDetailScreen} />
      </Stack.Navigator>
    </SafeAreaView>
      
  );
}
