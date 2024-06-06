import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
export default function PronounSelectionScreen({ goToNext, goToPrevious }) {
  const [customPronoun, setCustomPronoun] = useState("");
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

  const options = [
    "She / Her / Hers",
    "He / Him / His",
    "They / Them / Theirs",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select the pronouns that you prefer:</Text>
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
      <Text style={styles.header}>OR</Text>
      <TextInput
        style={styles.input}
        placeholder="Type in option as:"
        value={customPronoun}
        onChangeText={setCustomPronoun}
      />
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
    backgroundColor: "white",
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
    backgroundColor: Colors.primaryLight,
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
    backgroundColor: Colors.primaryLight,
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
  input: {
    fontFamily: "outfit",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#d3d3d3",
  },
  successMessage: {
    fontFamily: "outfit-semibold",
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
});
