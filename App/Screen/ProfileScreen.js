import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PersonalTab from "../Components/PersonalTab";
import QuestionnaireTab from "../Components/QuestionnaireTab";
const Tab = createMaterialTopTabNavigator();

const ProfileScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Personal" component={PersonalTab} />
      <Tab.Screen name="Questionnaire" component={QuestionnaireTab} />
    </Tab.Navigator>
  );
};

export default ProfileScreen;
