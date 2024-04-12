import React, { useCallback } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground } from "react-native";
import image from "./../../assets/images/Splash.jpg";
import google from "./../../assets/images/google.png";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "./../../hooks/useWarmUpBrowser";
import styles from "../../css/LoginScreenStyles";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <ImageBackground source={image} style={styles.backgroundImage}>
      <View style={styles.centeredView}>
        <View style={styles.contentView}>
          <Text style={styles.title}>Attuned</Text>
          <Text style={styles.subtitle}>Find your voice here</Text>
          <TouchableOpacity onPress={onPress} style={styles.googleSignInButton}>
            <Image source={google} style={styles.googleIcon} />
            <Text style={styles.googleSignInText}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
