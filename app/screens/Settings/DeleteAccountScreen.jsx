import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
export default function DeleteAccountScreen({ navigation }) {
  const { user, signOut } = useClerk();
  const handleDeleteAccount = async () => {
    try {
      // Confirm with the user before proceeding
      Alert.alert(
        "Delete Account",
        "Are you sure you want to delete your account? This action is irreversible.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              // Call Clerk's delete account API
              await user.delete();

              // Optionally sign the user out after account deletion
              await signOut();

              // Redirect to the login or home screen
              Alert.alert(
                "Account Deleted",
                "Your account has been successfully deleted."
              );
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error deleting account:", error);
      Alert.alert(
        "Error",
        "An error occurred while deleting your account. Please try again later."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Are you sure about deleting your account?
      </Text>
      <Text style={styles.subTitle}>
        Once your account is deleted, all your data will be lost.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Cancel</Text>
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
    textAlign: "center",
    fontFamily: "Outfit-Bold",
    color: "red",
  },
  subTitle: {
    fontFamily: "Outfit-Light",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 30,
    color: "red",
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
    backgroundColor: "white",
    borderColor: "gray",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    borderRadius: 15,
    width: "100%",
    borderWidth: 2,
    borderColor: "red",
  },
  buttonText: {
    fontFamily: "Outfit-Bold",
    fontSize: 20,
    color: "red",
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
