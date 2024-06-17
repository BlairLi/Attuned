import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import SymptomCheckbox from "./SymptomCheckbox";
export default function VoiceGoalsScreen({
  goToNext,
  goToPrevious,
  updateAnswer,
  currentAnswer,
}) {
  const [symptoms, setSymptoms] = useState({
    pitch: false,
    control: false,
    comfort: false,
    consistency: false,
    authentic: false,
  });
  useEffect(() => {
    if (currentAnswer) {
      setSymptoms(currentAnswer);
    }
  }, [currentAnswer]);

  // disable checkbox if max selections are already selected
  const maxSelection = 3;
  const selectedCount = Object.values(symptoms).filter(Boolean).length;

  const handleCheckboxChange = (name, value) => {
    if (symptoms[name] || selectedCount < maxSelection) {
      setSymptoms({ ...symptoms, [name]: value });
    }
  };

  const handleSave = () => {
    if (Object.values(symptoms).includes(true)) {
      updateAnswer(symptoms);
      goToNext();
    } else {
      alert("Please select an option.");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        What are your goals for modifying your voice?
      </Text>
      <Text style={styles.subheading}>
        You can select a maximum of {maxSelection}
      </Text>
      {Object.keys(symptoms).map((key) => (
        <SymptomCheckbox
          key={key}
          label={key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}
          value={symptoms[key]}
          onValueChange={(value) => handleCheckboxChange(key, value)}
          disabled={!symptoms[key] && selectedCount >= maxSelection}
        />
      ))}

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={goToPrevious}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  subheading: {
    fontSize: 15,
    color: "gray",
    fontFamily: "outfit",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginVertical: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: "outfit",
  },
  input: {
    fontFamily: "outfit",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#d3d3d3",
  },
  buttonContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
  },
  header: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "outfit-bold",
  },
  button: {
    backgroundColor: "#d3d3d3",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: "outfit",
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
  bottomButtonContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    width: "100%",
    justifyContent: "space-between",
  },
  backButton: {
    backgroundColor: "gray",
    width: "40%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  backButtonText: {
    fontFamily: "outfit-semibold",
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: Colors.orange,
    width: "40%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  saveButtonText: {
    fontFamily: "outfit-semibold",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
