import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LessonsScreen from "../screens/Lessons/LessonsScreen";
import NotificationsScreen from "../screens/Settings/NotificationsScreen";
import ProfileScreen from "../screens/Settings/ProfileScreen";
import QuestionnaireScreen from "../screens/Settings/QuestionnaireScreen";

// Lessons Screens Below
// Intro Lesson and Homework
import LessonDetailScreen from "../screens/Lessons/LessonDetailScreen";
import HomeworkScreen from "../screens/Lessons/HomeworkScreen";
// Basic Lesson and Homework
import BasicScreen from "../screens/Lessons/Basic/BasicScreen";
import BasicHomework from "../screens/Lessons/Basic/BasicHomework";
import BasicThankyouScreen from "../screens/Lessons/Basic/BasicThankyouScreen";
// Pitch Lesson and Homework
import PitchScreen from "../screens/Lessons/Pitch/PitchScreen";
import PitchHomework from "../screens/Lessons/Pitch/PitchHomework";
import PitchThankyouScreen from "../screens/Lessons/Pitch/PitchThankyouScreen";
// Intonation Lesson and Homework
import IntonationScreen from "../screens/Lessons/Intonation/IntonationScreen";
import IntonationHomework from "../screens/Lessons/Intonation/IntonationHomework";
import IntonationThankyouScreen from "../screens/Lessons/Intonation/IntonationThankyouScreen";
// Resonance Lesson and Homework
import ResonanceScreen from "../screens/Lessons/Resonance/ResonanceScreen";
import ResonanceThankyouScreen from "../screens/Lessons/Resonance/ResonanceThankyouScreen";
import ResonanceHomework from "../screens/Lessons/Resonance/ResonanceHomework";
// Put Basic Lesson and Homework
import PutBasicScreen from "../screens/Lessons/PutBasic/PutBasicScreen";
import PutBasicHomework from "../screens/Lessons/PutBasic/PutBasicHomework";
import PutBasicThankyouScreen from "../screens/Lessons/PutBasic/PutBasicThankyouScreen";
// Advanced Pitch Lesson
import AdvancedPitchScreen from "../screens/Lessons/AdvancedPitch/AdvancedPitchScreen";
import AdvancedPitchHomework from "../screens/Lessons/AdvancedPitch/AdvancedPitchHomework";
import AdvancedPitchThankyouScreen from "../screens/Lessons/AdvancedPitch/AdvancedPitchThankyouScreen";
// Volume Lesson and Homework
import VolumeScreen from "../screens/Lessons/Volume/VolumeScreen";
import VolumeHomework from "../screens/Lessons/Volume/VolumeHomework";
import VolumeThankyouScreen from "../screens/Lessons/Volume/VolumeThankyouScreen";
// Articulation Lesson and Homework
import ArticulationScreen from "../screens/Lessons/Articulation/ArticulationScreen";
import ArticulationHomework from "../screens/Lessons/Articulation/ArticulationHomework";
import ArticulationThankyouScreen from "../screens/Lessons/Articulation/ArticulationThankyouScreen";
// Syntax Lesson
import Syntax from "../screens/Lessons/Syntax/SyntaxScreen";
import SyntaxThankyouScreen from "../screens/Lessons/Syntax/SyntaxThankyouScreen";
// Put Everything Lesson
import PutEverythingScreen from "../screens/Lessons/PutEverything/PutEverythingScreen";
import PutEverythingHomework from "../screens/Lessons/PutEverything/PutEverythingHomework";
import PutEverythingThankyouScreen from "../screens/Lessons/PutEverything/PutEverythingThankyouScreen";

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
      <Stack.Screen
        name="IntonationThankyou"
        component={IntonationThankyouScreen}
      />

      <Stack.Screen name="Resonance" component={ResonanceScreen} />
      <Stack.Screen name="ResonanceHomework" component={ResonanceHomework} />
      <Stack.Screen
        name="ResonanceThankyou"
        component={ResonanceThankyouScreen}
      />

      <Stack.Screen name="PutBasic" component={PutBasicScreen} />
      <Stack.Screen name="PutBasicHomework" component={PutBasicHomework} />
      <Stack.Screen
        name="PutBasicThankyou"
        component={PutBasicThankyouScreen}
      />

      <Stack.Screen name="AdvancedPitch" component={AdvancedPitchScreen} />
      <Stack.Screen
        name="AdvancedPitchHomework"
        component={AdvancedPitchHomework}
      />
      <Stack.Screen
        name="AdvancedPitchThankyou"
        component={AdvancedPitchThankyouScreen}
      />

      <Stack.Screen name="Volume" component={VolumeScreen} />
      <Stack.Screen name="VolumeHomework" component={VolumeHomework} />
      <Stack.Screen name="VolumeThankyou" component={VolumeThankyouScreen} />

      <Stack.Screen name="Articulation" component={ArticulationScreen} />
      <Stack.Screen name="ArticulationHomework" component={ArticulationHomework} />
      <Stack.Screen
        name="ArticulationThankyou"
        component={ArticulationThankyouScreen}
      />

      <Stack.Screen name="Syntax" component={Syntax} />
      <Stack.Screen name="SyntaxThankyou" component={SyntaxThankyouScreen} />

      <Stack.Screen name="PutEverything" component={PutEverythingScreen} />
      <Stack.Screen
        name="PutEverythingHomework"
        component={PutEverythingHomework}
      />
      <Stack.Screen
        name="PutEverythingThankyou"
        component={PutEverythingThankyouScreen} 
      />

      <Stack.Screen name="Homework" component={HomeworkScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Questionnarie" component={QuestionnaireScreen} />
    </Stack.Navigator>
  );
}
