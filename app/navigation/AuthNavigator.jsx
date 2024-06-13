import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import DisclaimerScreen from "../screens/Settings/DisclaimerScreen";
import ForgetPasswordScreen from "../screens/Auth/ForgetPasswordScreen";
import QuestionnaireScreen from "../screens/Settings/QuestionnaireScreen";
const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="Disclaimer" component={DisclaimerScreen} />
      <Stack.Screen name="Forget Password" component={ForgetPasswordScreen} />
      <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
