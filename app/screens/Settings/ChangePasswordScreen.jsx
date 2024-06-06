import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { Colors } from "@/constants/Colors";
const ChangePasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn, setActive } = useSignIn();

  const handleSendCode = async () => {
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please provide a valid email address");
      Alert.alert("Error", "Please provide a valid email address");
      return;
    } else {
      setLoading(true);
      setError("");
      try {
        await signIn.create({
          strategy: "reset_password_email_code",
          identifier: email,
        });
        setSuccessfulCreation(true);
      } catch (err) {
        setError(err.errors[0]?.longMessage || "Failed to send reset code");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResetPassword = async () => {
    if (!password || !code) {
      setError("Please provide a valid code and password");
      Alert.alert("Error", "Please provide a valid code and password");
      return;
    } else {
      setLoading(true);
      setError("");
      try {
        const result = await signIn.attemptFirstFactor({
          strategy: "reset_password_email_code",
          code,
          password,
        });
        if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          Alert.alert(
            "Password Reset",
            "Your password has been reset successfully!",
            [{ text: "OK", onPress: () => navigation.navigate("SignIn") }]
          );
        } else {
          setError("Password reset failed. Please try again.");
        }
      } catch (err) {
        setError(err.errors[0]?.longMessage || "Failed to reset password");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      {!successfulCreation ? (
        <View style={styles.inputContainer}>
          <Text style={styles.subTitle}>Please provide your email address</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g john@doe.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleSendCode}>
              <Text style={styles.buttonText}>Send reset code</Text>
            </TouchableOpacity>
          )}
          {error ? <Text style={styles.newHereText}>{error}</Text> : null}
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <Text style={styles.subTitle}>Enter your new password</Text>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Text style={styles.subTitle}>
            Enter the password reset code that was sent to your email
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Reset Code"
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
          />
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={handleResetPassword}
            >
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
          )}
          {error ? <Text style={styles.newHereText}>{error}</Text> : null}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    padding: 20,
    backgroundColor: "white",
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
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 15,
    fontFamily: "outfit",
  },
  title: {
    fontFamily: "Outfit-Bold",
    fontSize: 30,
    textAlign: "center",
    color: Colors.pink,
  },
  subTitle: {
    fontFamily: "Outfit-Light",
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
    color: Colors.pink,
  },
  button: {
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontFamily: "outfit-semibold",
    fontSize: 20,
    color: Colors.pink,
  },
});

export default ChangePasswordScreen;
