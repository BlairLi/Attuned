import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import image from "../../../assets/images/Splash.jpg";
import google from "../../../assets/images/google.png";
import { useSignIn } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../../hooks/useWarmUpBrowser";
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  // Google OAuth flow
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
      console.error("Google OAuth error", err);
    }
  }, []);

  // Password Sign in flow
  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ImageBackground source={image} style={styles.imageBackground}>
      <View style={styles.container}>
        <Text style={styles.title}>Attuned</Text>
        <Text style={styles.subTitle}>Find your voice here</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            placeholderTextColor="gray"
            autoCorrect={false}
            autoCapitalize="none"
            value={emailAddress}
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="gray"
            secureTextEntry={true}
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableOpacity style={styles.button} onPress={onSignInPress}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.buttonText}>Sign Up Here</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.newHereButton}
            onPress={() => navigation.navigate("Forget Password")}
          >
            <Text style={styles.newHereText}>Forget Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.socialLogin} onPress={onPress}>
          <Image source={google} style={styles.socialLoginIcon} />
          <Text style={styles.socialLoginText}>Login in with Google</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // safeArea: {
  //   flex: 1,
  // },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: '100%',
    height: '100%',
  },
  container: {
    display: "flex",
    alignItems: "center",
    height: 400,
    width: "100%",
    padding: 20,
  },
  inputContainer: {
    margin: 10,
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 15,
    color: "white",
    fontFamily: "outfit-light",
  },
  title: {
    fontFamily: "Outfit-Bold",
    fontSize: 40,
    color: "white",
    textAlign: "center",
  },
  subTitle: {
    fontFamily: "Outfit-Light",
    fontSize: 20,
    color: "white",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  socialLogin: {
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 99,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
    padding: 10,
    marginTop: 10,
  },
  socialLoginIcon: {
    width: 50,
    height: 50,
    objectFit: "contain",
  },
  socialLoginText: {
    fontFamily: "outfit-semibold",
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "outfit-semibold",
    fontSize: 20,
  },
  newHereButton: {
    alignSelf: "center",
  },
  newHereText: {
    fontFamily: "Outfit-Bold",
    color: "white",
    fontSize: 16,
  },
});
