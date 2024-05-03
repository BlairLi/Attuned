import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PersonalTab from "../Components/PersonalTab";
import QuestionnaireTab from "../Components/QuestionnaireTab";

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = (navigation) => {
  return (
      <Tab.Navigator backBehavior="firstRoute">
        <Tab.Screen name="Personal" component={PersonalTab} />
        <Tab.Screen name="Questionnaire" component={QuestionnaireTab} />
      </Tab.Navigator>
  );
};

export default ProfileScreen;
