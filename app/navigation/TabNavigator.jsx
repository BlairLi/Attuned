import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Text } from "react-native";
import LessonNavigator from "./LessonNavigator";
import SetttingNavigator from "./SettingNavigator";
import RecordingNavigator from "./RecordingNavigator";
import VoiceTrackerNavigator from "./VoiceTrackerNavigator";
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
          fontFamily: "outfit-bold",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "outfit-semibold",
        },
      }}
    >
      <Tab.Screen
        name="screens/Lessons/LessonsScreen"
        // name="Lessons"
        component={LessonNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <MaterialIcons
              name="play-lesson"
              size={size}
              color={focused ? Colors.primary : "gray"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? Colors.primary : "gray",
                fontFamily: focused ? "outfit-semibold" : "outfit",
              }}
            >
              Lessons
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="screens/VoiceTracker/VoiceTrackerScreen"
        component={VoiceTrackerNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <AntDesign
              name="sound"
              size={size}
              color={focused ? Colors.secondary : "gray"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? Colors.secondary : "gray",
                fontFamily: focused ? "outfit-semibold" : "outfit",
              }}
            >
              Voice Tracker
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="screens/Recordings/RecordingsScreen"
        component={RecordingNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <MaterialIcons
              name="library-music"
              size={size}
              color={focused ? Colors.secondaryLight : "gray"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? Colors.secondaryLight : "gray",
                fontFamily: focused ? "outfit-semibold" : "outfit",
              }}
            >
              Recordings
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="screens/Settings/SettingsScreen"
        component={SetttingNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Feather
              name="settings"
              size={size}
              color={focused ? Colors.yellow : "gray"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? Colors.yellow : "gray",
                fontFamily: focused ? "outfit-semibold" : "outfit",
              }}
            >
              Settings
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
