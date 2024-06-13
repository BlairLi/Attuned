import { useFonts } from "expo-font";
import React from "react";
import { StyleSheet } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import AuthNavigator from "./navigation/AuthNavigator";
import * as SecureStore from "expo-secure-store";
import TabNavigator from "./navigation/TabNavigator";
import { RecordingsProvider } from "./screens/Recordings/RecordingsContext";
const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
export default function Index() {

    // load Attuned splash screen for 7 seconds
    // useEffect(() => {
    //   async function prepare() {
    //     try {
    //       await new Promise(resolve => setTimeout(resolve, process.env.SPLASH_TIMEOUT));
    //     } catch (e) {
    //       console.warn(e);
    //     } finally {
    //       await SplashScreen.hideAsync();
    //     }
    //   }
    //   prepare();
    // }, []);

  useFonts({
    outfit: require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
    "outfit-light": require("./../assets/fonts/Outfit-Light.ttf"),
    "outfit-semibold": require("./../assets/fonts/Outfit-SemiBold.ttf"),
  });

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <SignedIn style={styles.container}>
        <RecordingsProvider>
          <TabNavigator />
        </RecordingsProvider>
      </SignedIn>
      <SignedOut style={styles.container}>
        <AuthNavigator />
      </SignedOut>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
