import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Linking,
} from "react-native";
export default function ContactUsScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // contact by sending email
  const handleEmailPress = async () => {
    const url = "mailto:hq48@cornell.edu";
    const supported = await Linking.canOpenURL(url);
    // only send if mail client is supported
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        "Error",
        "Unable to open email client. Please try install an email client."
      );
    }
  };

  // contact by sending form
  const handleFormSubmit = () => {
    if (name && email && message) {
      Alert.alert("Thank you!", "Your message has been sent.");
      // Clear the form
      setName("");
      setEmail("");
      setMessage("");
    } else {
      Alert.alert("All fields are required", "Please fill in all fields.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Have Questions?</Text>
      <Text style={styles.subTitle}>We want to hear your voice</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleEmailPress}>
        <Text style={styles.emailLink}>Or send an email to us </Text>
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
    padding: 20,
    backgroundColor: "white",
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
