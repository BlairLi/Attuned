import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { db } from "../../../configs/FirebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactUsScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // contact by sending form
  const handleFormSubmit = async () => {
    if (name && email && message) {
      try {
        await addDoc(collection(db, "contact"), {
          name: name,
          email: email,
          message: message,
          timestamp: serverTimestamp(),
        });
        Alert.alert(
          "Thank you!",
          "Your message has been successfully sent, our team will get back to you soon."
        );
        // Clear the form
        setName("");
        setEmail("");
        setMessage("");
      } catch (error) {
        console.error("Error adding document: ", error);
        Alert.alert("Error", "An error occurred. Please try again later.");
      }
    } else {
      Alert.alert("All fields are required", "Please fill in all fields.");
    }
  };

  const handleKeyPress = ({ nativeEvent: { key } }) => {
    if (key === "Enter") {
      handleFormSubmit(); // Call the form submit function
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.title}>Have Questions?</Text>
        <Text style={styles.subTitle}>We want to hear your voice</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Message"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            autoCapitalize="none"
            onKeyPress={handleKeyPress}
          />
          <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
            <Text style={styles.buttonText}>Send Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Outfit-Bold",
  },
  subTitle: {
    fontFamily: "Outfit-Light",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 15,
    fontFamily: "Outfit",
    marginBottom: 15,
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
});
