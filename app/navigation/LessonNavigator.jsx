import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LessonsScreen from "../screens/Lessons/LessonsScreen";
import LessonDetailScreen from "../screens/Lessons/LessonDetailScreen";

import BasicScreen from "../screens/Lessons/Basic/BasicScreen";
import BasicHomework from "../screens/Lessons/Basic/BasicHomework";
import BasicThankyouScreen from "../screens/Lessons/Basic/BasicThankyouScreen";

import PitchScreen from "../screens/Lessons/Pitch/PitchScreen";
import PitchHomework from "../screens/Lessons/Pitch/PitchHomework";
import PitchThankyouScreen from "../screens/Lessons/Pitch/PitchThankyouScreen";

import IntonationScreen from "../screens/Lessons/Intonation/IntonationScreen";
import IntonationHomework from "../screens/Lessons/Intonation/IntonationHomework";
import IntonationThankyouScreen from "../screens/Lessons/Intonation/IntonationThankyouScreen";

import ResonanceScreen from "../screens/Lessons/Resonance/ResonanceScreen";
import ResonanceThankyouScreen from "../screens/Lessons/Resonance/ResonanceThankyouScreen";
import ResonanceHomework from "../screens/Lessons/Resonance/ResonanceHomework";

import VolumeScreen from "../screens/Lessons/Volume/VolumeScreen";
import ArticulationScreen from "../screens/Lessons/Articulation/ArticulationScreen";
import PutBasicScreen from "../screens/Lessons/PutBasic/PutBasicScreen";
import AdvancedPitchScreen from "../screens/Lessons/AdvancedPitch/AdvancedPitchScreen";
import PutEverythingScreen from "../screens/Lessons/PutEverything/PutEverythingScreen";
import Syntax from "../screens/Lessons/Syntax/SyntaxScreen";
import HomeworkScreen from "../screens/Lessons/HomeworkScreen";
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
      <Stack.Screen name="BasicHomework" component={BasicHomework} />
      <Stack.Screen name="BasicThankyou" component={BasicThankyouScreen} />

      <Stack.Screen name="Pitch" component={PitchScreen} />
      <Stack.Screen name="PitchHomework" component={PitchHomework} />
      <Stack.Screen name="PitchThankyou" component={PitchThankyouScreen} />

      <Stack.Screen name="Intonation" component={IntonationScreen} />
      <Stack.Screen name="IntonationHomework" component={IntonationHomework} />
      <Stack.Screen name="IntonationThankyou" component={IntonationThankyouScreen} />
      
      <Stack.Screen name="Resonance" component={ResonanceScreen} />
      <Stack.Screen name="Volume" component={VolumeScreen} />
      <Stack.Screen name="Articulation" component={ArticulationScreen} />
      <Stack.Screen name="PutBasic" component={PutBasicScreen} />
      <Stack.Screen name="AdvancedPitch" component={AdvancedPitchScreen} />
      <Stack.Screen name="PutEverything" component={PutEverythingScreen} />
      <Stack.Screen name="Syntax" component={Syntax} />

      <Stack.Screen name="Homework" component={HomeworkScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Questionnarie" component={QuestionnaireScreen} />
    </Stack.Navigator>
  );
}
