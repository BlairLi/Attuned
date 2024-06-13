import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
export default function WorkVoiceScreen({ goToNext, goToPrevious }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  const handleSave = () => {
    if (selectedOption) {
      console.log("Selected option:", selectedOption);
      goToNext();
    } else {
      alert("Please select an option.");
    }
  };

  const options = ["Constantly", "Often", "Sometimes", "Rarely", "Variable"];
  return (
    <View style={styles.container}>
      <Text style={styles.header}>At work, I use my voice:</Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.button,
            selectedOption === option && styles.selectedButton,
          ]}
          onPress={() => handleOptionPress(option)}
        >
          <Text
            style={[
              styles.buttonText,
              selectedOption === option && styles.selectedButtonText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
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
  selectedButton: {
    backgroundColor: Colors.orange,
  },
  selectedButtonText: {
    color: "white",
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
