import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import * as React from "react";
import image from "./../../assets/images/Splash.jpg";
import Colors from "./Utils/Colors";
import google from "./../../assets/images/google.png";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "./../../hooks/useWarmUpBrowser";
WebBrowser.maybeCompleteAuthSession();


export default function LoginScreen() {
  useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
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
    <ImageBackground
      source={image}
      style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <View style={{ display: "flex", alignItems: "center" }}>
        <View
          style={{
            height: 400,
            width: "100%",
            marginTop: 100,
            padding: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 40,
              color: "white",
              textAlign: "center",
            }}
          >
            Attuned
          </Text>
          <Text
            style={{
              fontFamily: "outfit-light",
              fontSize: 20,
              color: "white",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Find your voice here
          </Text>
          <TouchableOpacity
            onPress={onPress}
            style={{
              backgroundColor: "white",
              alignSelf: "center",
              borderRadius: 99,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              justifyContent: "center",
              padding: 10,
              marginTop: 30,
            }}
          >
            <Image
              source={google}
              style={{
                width: 50,
                height: 50,
                objectFit: "contain",
              }}
            />
            <Text
              style={{
                fontFamily: "outfit-semibold",
                fontSize: 20,
                color: Colors.PRIMARY_LIGHT,
                textAlign: "center",
              }}
            >
              Sign in with Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
