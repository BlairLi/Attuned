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
export default function SettingNavigation() {
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
      initialRouteName="Settings"
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Disclaimer" component={DisclaimerScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Reminder" component={ReminderScreen} />
      <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
      <Stack.Screen name="Contact Us" component={ContactUsScreen} />
      <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
      <Stack.Screen name="Sign Out" component={SignOutScreen} />
    </Stack.Navigator>
  );
}
