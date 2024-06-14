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
import { SafeAreaView } from "react-native";
export default function LessonNavigator() {
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
      initialRouteName="screens/Lessons/LessonsScreen_init"
    >
      <Stack.Screen name="screens/Lessons/LessonsScreen" component={LessonsScreen} />
      <Stack.Screen name="screens/Lessons/LessonDetailScreen" component={LessonDetailScreen} />
      <Stack.Screen name="screens/Lessons/BasicScreen" component={BasicScreen} />
      <Stack.Screen name="screens/Lessons/PitchScreen" component={PitchScreen} />
      <Stack.Screen name="screens/Lessons/HomeworkScreen" component={HomeworkScreen} />
      <Stack.Screen name="screens/Lessons/HomeworkDetailScreen" component={HomeworkDetailScreen} />
      <Stack.Screen name="screens/Settings/ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="screens/Settings/NotificationsScreen" component={NotificationsScreen} />
      <Stack.Screen name="screens/Settings/QuestionnaireScreen" component={QuestionnaireScreen} />
    </Stack.Navigator>
    </SafeAreaView>
  );
}
