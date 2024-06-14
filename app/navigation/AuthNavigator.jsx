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
      initialRouteName="screens/Auth/LoginScreen"
      // initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}
      <Stack.Screen name="screens/Auth/LoginScreen" component={LoginScreen} />
      <Stack.Screen name="screens/Auth/SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="screens/Settings/DisclaimerScreen" component={DisclaimerScreen} />
      <Stack.Screen name="screens/Auth/ForgetPasswordScreen" component={ForgetPasswordScreen} />
      <Stack.Screen name="screens/Settings/QuestionnaireScreen" component={QuestionnaireScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
