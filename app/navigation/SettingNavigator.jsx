import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationsScreen from "../screens/Settings/NotificationsScreen";
import DisclaimerScreen from "../screens/Settings/DisclaimerScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import ReminderScreen from "../screens/Settings/ReminderScreen";
import ChangePasswordScreen from "../screens/Settings/ChangePasswordScreen";
import ProfileScreen from "../screens/Settings/ProfileScreen";
import ContactUsScreen from "../screens/Settings/ContactUsScreen";
import QuestionnaireScreen from "../screens/Settings/QuestionnaireScreen";
import SignOutScreen from "../screens/Settings/SignOutScreen";
import { SafeAreaView } from "react-native";

export default function SettingNavigation() {
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
        initialRouteName="Settings"
      >
        <Stack.Screen name="screens/Settings/SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="screens/Settings/DisclaimerScreen" component={DisclaimerScreen} />
        <Stack.Screen name="screens/Settings/NotificationsScreen" component={NotificationsScreen} />
        <Stack.Screen name="screens/Settings/ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="screens/Settings/ReminderScreen" component={ReminderScreen} />
        <Stack.Screen name="screens/Settings/ChangePasswordScreen" component={ChangePasswordScreen} />
        <Stack.Screen name="screens/Settings/ContactUsScreen" component={ContactUsScreen} />
        <Stack.Screen name="screens/Settings/QuestionnaireScreen" component={QuestionnaireScreen} />
        <Stack.Screen name="screens/Settings/SignOutScreen" component={SignOutScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}
