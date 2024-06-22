import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/constants/Colors";
import RecordingCard from "@/components/Lessons/RecordingCard";
export default function HomeworkScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Record your pre-Attuned voice</Text>
      <ScrollView contentContainerStyle={styles.textContainer}>
        <Text style={styles.text}>1) State your name and the date.</Text>
        <Text style={styles.text}>2) Recite the following passage:</Text>
        <Text style={styles.passage}>
          When the sunlight strikes raindrops in the air, they act as a prism
          and form a rainbow. The rainbow is a division of white light into many
          beautiful colors. These take the shape of a long round arch, with its
          path high above, and its two ends apparently beyond the horizon. There
          is, according to legend, a boiling pot of gold at one end. People
          look, but no one ever finds it. When a man looks for something beyond
          his reach, his friends say he is looking for the pot of gold at the
          end of the rainbow.
        </Text>
        <Text style={styles.text}>
          3) Walk us through your morning routine.
        </Text>

        <View style={styles.buttonContainer}>
          <RecordingCard />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Mark as completed</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 10,
    color: "#333",
    textAlign: "center",
    fontFamily: "outfit-bold",
  },
  textContainer: {
    paddingVertical: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "left",
    lineHeight: 24,
    fontFamily: "outfit-semibold",
  },
  passage: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
    textAlign: "left",
    lineHeight: 24,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#ffa500",
    fontFamily: "outfit-regular",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
