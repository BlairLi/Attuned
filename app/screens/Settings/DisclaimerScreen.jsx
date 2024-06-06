import React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  View,
} from "react-native";
const image = require("../../../assets/images/Splash.jpg");

const DisclaimerScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={image}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Disclaimer</Text>
          <Text style={styles.text}>
            This application is to be used as a tool for voice training for
            transgender individuals. It is not intended to replace evaluation
            and treatment by a physician or speech and language pathologist
            (voice therapist).
          </Text>
          <Text style={styles.text}>
            If you experience symptoms such as hoarseness, pain, frequent loss
            of the voice, etc., please be evaluated by a physician and/or
            speech-language pathologist.
          </Text>
          <Text style={styles.text}>
            To find a physician or speech-language pathologist near you who
            treats transgender patients, please visit the institute.
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>I acknowledge and agree</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  scrollContainer: {
    padding: 20,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    padding: 20,
    fontFamily: "outfit-bold",
  },
  text: {
    fontFamily: "outfit",
    fontSize: 22,
    marginBottom: 10,
    lineHeight: 24,
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },
  buttonText: {
    fontFamily: "outfit",
    fontSize: 18,
    textAlign: "center",
  },
});

export default DisclaimerScreen;
