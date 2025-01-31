import React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  View,
  Linking,
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
            Attuned is an app for gender-affirming voice and speech training. It
            should not replace evaluation and treatment by a doctor or
            speech-language pathologist (SLP)/speech therapist.
          </Text>
          <Text style={styles.text}>
            If you experience symptoms such as hoarseness, pain, frequent loss
            of the voice, etc., we encourage you to visit a doctor or SLP.
          </Text>
          <Text style={styles.text}>
            Here are some resources that can help you find one in your area:
            <Text
              style={{ color: "blue" }}
              onPress={() =>
                Linking.openURL(
                  "https://vocalcongruence.github.io/provider-map/"
                )
              }
            >
              Provider Map from the Vocal Congruence Project
            </Text>
          </Text>
          <Text style={styles.text}>
            Your email address is used solely for account creation and
            authentication purposes. It will not be shared with third parties or
            used for any other purpose without your consent.
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
