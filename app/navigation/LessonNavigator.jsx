import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LessonsScreen from "../screens/Lessons/LessonsScreen";
import LessonDetailScreen from "../screens/Lessons/LessonDetailScreen";
import HomeworkScreen from "../screens/Lessons/HomeworkScreen";
import HomeworkDetailScreen from "../screens/Lessons/HomeworkDetailScreen";
import NotificationsScreen from "../screens/Settings/NotificationsScreen";
import ProfileScreen from "../screens/Settings/ProfileScreen";
export default function LessonNavigator() {
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
      initialRouteName="Lessons"
    >
      <Stack.Screen name="Lessons" component={LessonsScreen} />
      <Stack.Screen name="LessonDetail" component={LessonDetailScreen} />
      <Stack.Screen name="Homework" component={HomeworkScreen} />
      <Stack.Screen name="HomeworkDetail" component={HomeworkDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}
