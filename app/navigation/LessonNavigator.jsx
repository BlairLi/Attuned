import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LessonsScreen from "../screens/Lessons/LessonsScreen";
import LessonDetailScreen from "../screens/Lessons/LessonDetailScreen";
import BasicScreen from "../screens/Lessons/BasicScreen";
import PitchScreen from "../screens/Lessons/PitchScreen";
import HomeworkScreen from "../screens/Lessons/HomeworkScreen";
import HomeworkDetailScreen from "../screens/Lessons/HomeworkDetailScreen";
import NotificationsScreen from "../screens/Settings/NotificationsScreen";
import ProfileScreen from "../screens/Settings/ProfileScreen";
import QuestionnaireScreen from "../screens/Settings/QuestionnaireScreen";
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
          headerBackButtonMenuEnabled: true,
          headerBackTitleVisible: false,
        }}
        initialRouteName="Lessons"
      >
        {/* <Stack.Screen name="screens/Lessons/LessonsScreen" component={LessonsScreen} /> */}
        <Stack.Screen name="Lessons" component={LessonsScreen} />
        <Stack.Screen name="Introduction" component={LessonDetailScreen} />
        <Stack.Screen name="Basics" component={BasicScreen} />
        <Stack.Screen name="Pitch" component={PitchScreen} />
        <Stack.Screen name="Homework" component={HomeworkScreen} />
        <Stack.Screen name="HomeworkDetail" component={HomeworkDetailScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Questionnarie" component={QuestionnaireScreen} />
      </Stack.Navigator>
    
  );
}
