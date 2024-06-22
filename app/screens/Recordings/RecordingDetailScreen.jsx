import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SelectedRecordingContext } from "./SelectedRecordingContext";
import { Colors } from "@/constants/Colors";

const RecordingDetailScreen = ({ navigation }) => {
  const { selectedRecording } = useContext(SelectedRecordingContext);

  if (!selectedRecording) {
    return (
      <View style={styles.container}>
        <Text style={styles.noRecordingText}>No recording selected</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedRecording.title}</Text>
      <Text style={styles.detail}>Time: {selectedRecording.time}</Text>
      <Text style={styles.detail}>
        Min Frequency: {selectedRecording.min_frequency}
      </Text>
      <Text style={styles.detail}>
        Max Frequency: {selectedRecording.max_frequency}
      </Text>
      <Text style={styles.detail}>Duration: {selectedRecording.duration}</Text>
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => selectedRecording.sound.replayAsync()}
      >
        <Text style={styles.buttonText}>Play Recording</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.stopButton}>
        <Text style={styles.buttonText}>Stop Recording</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  noRecordingText: {
    fontSize: 18,
    color: "grey",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 16,
    textAlign: "center",
  },
  detail: {
    fontSize: 18,
    color: Colors.secondary,
    marginBottom: 8,
  },
  playButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  stopButton: {
    backgroundColor: Colors.red,
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
  backButton: {
    backgroundColor: Colors.secondaryLight,
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RecordingDetailScreen;
