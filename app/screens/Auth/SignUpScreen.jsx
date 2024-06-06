import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  StyleSheet,
} from "react-native";
import Checkbox from "expo-checkbox";
import image from "../../../assets/images/Splash.jpg";
export default function SignUpScreen({ navigation }) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    // Form validation
    // Check if fields are not empty
    if (!userName || !emailAddress || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    // Check if email is in correct format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    // Check if password is of a certain length
    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long.");
      return;
    }

    // Check if disclaimer is accepted
    if (!disclaimerAccepted) {
      Alert.alert("Error", "Please accept the disclaimer to continue.");
      return;
    }

    try {
      await signUp.create({
        userName,
        emailAddress,
        password,
      });

      // Send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert(
        "Error",
        "An error occurred while signing up. Please try again."
      );
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ImageBackground source={image} style={styles.imageBackground}>
      {!pendingVerification && (
        <View style={styles.container}>
          <Text style={styles.title}>Attuned</Text>
          <Text style={styles.subTitle}>Join us and find your voice</Text>
          <View style={styles.inputContainer}>
            <View>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                value={userName}
                placeholder="Username..."
                placeholderTextColor="gray"
                onChangeText={(username) => setUserName(username)}
              />
            </View>

            <View>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Email..."
                placeholderTextColor="gray"
                onChangeText={(email) => setEmailAddress(email)}
              />
            </View>

            <View>
              <TextInput
                style={styles.input}
                value={password}
                placeholder="Password..."
                placeholderTextColor="gray"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                value={disclaimerAccepted}
                onValueChange={setDisclaimerAccepted}
                color={disclaimerAccepted ? "#4630EB" : undefined}
                style={styles.checkbox}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate("Disclaimer")}
              >
                <Text style={styles.checkboxLabel}>
                  I accept the disclaimer
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.newHereButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.newHereText}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {pendingVerification && (
        <View style={styles.container}>
          <Text style={styles.title}>Verify your email here:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity onPress={onPressVerify} style={styles.button}>
            <Text style={styles.buttonText}>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
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
    fontFamily: "Outfit-Light",
    height: 50,
    paddingHorizontal: 20,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 15,
    color: "white",
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
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "outfit",
    fontSize: 18,
  },
  newHereButton: {
    alignSelf: "center",
  },
  newHereText: {
    fontFamily: "Outfit-Bold",
    color: "white",
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 14,
    fontFamily: "outfit-light",
    textDecorationLine: "underline",
  },
});
