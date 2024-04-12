import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import LoginScreen from "./App/Screen/LoginScreen";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./App/Navigations/TabNavigation";
import OpeningScreen from "./App/Screen/OpeningScreen";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const AppContent = () => {
  const { isSignedIn, isLoaded } = useAuth();

  // load Attuned splash screen for 7 seconds
  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 7000));
        // await performResourceLoading();
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!isLoaded) {
    return <OpeningScreen />;
  }

  return (
    <View style={styles.container}>
      {isSignedIn ? (
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      ) : (
        <LoginScreen />
      )}
    </View>
  );
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
