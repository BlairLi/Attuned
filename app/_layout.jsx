import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import AuthNavigator from "./navigation/AuthNavigator";
import * as SecureStore from "expo-secure-store";
import TabNavigator from "./navigation/TabNavigator";
import { RecordingsProvider } from "../contexts/RecordingsContext";
import { LessonsProvider } from "@/contexts/LessonsContext";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-light": require("../assets/fonts/Outfit-Light.ttf"),
    "outfit-semibold": require("../assets/fonts/Outfit-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <SignedIn>
        <RecordingsProvider>
          <LessonsProvider>
            <TabNavigator />
          </LessonsProvider>
        </RecordingsProvider>
      </SignedIn>
      <SignedOut>
        <AuthNavigator />
      </SignedOut>
    </ClerkProvider>
  );
}
