import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { db } from "../../../configs/FirebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactUsScreen({ navigation}) {
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
        Alert.alert("Thank you!", "Your message has been successfully sent, our team will get back to you soon.");
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
        />

        <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
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
});
