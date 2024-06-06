import React from "react";
import { Text, Alert, View, StyleSheet, TouchableOpacity } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import { Colors } from "@/constants/Colors";

export default function SignOutScreen() {
  const { signOut } = useClerk();
  const handleSignOut = () => {
    Alert.alert(
      "Sign Out", // Alert title
      "Are you sure you want to sign out?", // Alert message
      [
        {
          text: "Cancel",
          onPress: () => console.log("Signout Cancelled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await signOut();
              alert("You have been signed out successfully!");
            } catch (error) {
              console.error("Failed to sign out:", error);
              alert("Failed to sign out. Please try again.");
            }
          },
        },
      ]
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Do you want to Sign Out?</Text>
      <Text style={styles.subTitle}>
        Once signed out, your information might be lost, please make your
        desicion carefully.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    padding: 40,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Outfit-Bold",
    color: Colors.red,
  },
  subTitle: {
    fontFamily: "Outfit-Light",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 30,
    color: Colors.red,
  },
  inputContainer: {
    margin: 10,
    gap: 15,
    width: "100%",
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 15,
    color: "gray",
    fontFamily: "outfit",
  },
  textArea: {
    height: 100,
  },
  button: {
    backgroundColor: "lightgray",
    borderColor: "gray",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    borderRadius: 15,
    width: "100%",
  },
  buttonText: {
    fontFamily: "Outfit-Bold",
    fontSize: 20,
  },
  emailLink: {
    color: "blue",
    textAlign: "center",
    fontFamily: "Outfit",
    fontSize: 18,
    marginTop: 10,
    textDecorationLine: "underline",
  },
});
