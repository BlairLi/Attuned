import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect } from "react";
import LoginScreen from "./App/Screen/LoginScreen";
import TabNavigation from "./App/Navigations/TabNavigation";
import ProfileScreen from "./App/Screen/ProfileScreen";
import OpeningScreen from "./App/Screen/OpeningScreen";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

const AppContent = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const [accessGranted, setAccessGranted] = useState(false);

  // load Attuned splash screen for 7 seconds
  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, process.env.SPLASH_TIMEOUT));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  // TODCOMMENT: ONLY for dev purpose START
  if (!accessGranted) {
    return <OpeningScreen onAccessGranted={() => setAccessGranted(true)} />;
  }

  return (
    <View style={styles.container}>
      {isSignedIn ? (
        <NavigationContainer>
          {/* <TabNavigation /> */}
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={TabNavigation} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <LoginScreen />
      )}
    </View>
  );
  // TODELETE: Only for dev purpose END

  // TODELETE: Only for dev purpose START
  // return (
  //   <View style={styles.container}>
  //       <NavigationContainer>
  //         <Stack.Navigator screenOptions={{ headerShown: false }}>
  //           <Stack.Screen name="Home" component={TabNavigation} />
  //           <Stack.Screen name="Profile" component={ProfileScreen} />
  //         </Stack.Navigator>
  //       </NavigationContainer>
  //   </View>
  // )
  // TODELETE: Only for dev purpose END
};

export default function App() {
  const [fontsLoaded] = useFonts({
    "outfit": require("./assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("./assets/fonts/Outfit-Bold.ttf"),
    "outfit-light": require("./assets/fonts/Outfit-Light.ttf"),
    "outfit-semibold": require("./assets/fonts/Outfit-SemiBold.ttf"),
  });
  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <AppContent />
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
  },
});
