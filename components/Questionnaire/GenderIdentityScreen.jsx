import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState , useEffect} from "react";
import { Colors } from "@/constants/Colors";

export default function GenderIdentityScreen({
  goToNext,
  updateAnswer,
  currentAnswer,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    if (currentAnswer) {
      console.log(`Setting current answer: ${currentAnswer}`); // Add this line
      setSelectedOption(currentAnswer);
    }
  }, [currentAnswer]);

  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  const handleSave = () => {
    if (selectedOption) {
      console.log(`Saving answer: ${selectedOption}`); // Add this line
      updateAnswer(selectedOption);
      console.log(`Going to next screen`); // Add this line
      goToNext();
    } else {
      alert("Please select an option.");
    }
  };

  const options = [
    "Trans Male",
    "Trans Female",
    "Non-Binary",
    "Gender Non-Conforming",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        To best serve you, tell us which gender identity best describes you:
      </Text>
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
  selectedButton: {
    backgroundColor: Colors.orange,
  },
  buttonText: {
    fontFamily: "outfit",
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
  selectedButtonText: {
    color: "white",
  },
  bottomButtonContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    width: "100%",
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: Colors.orange,
    width: "100%",
    padding: 15,
    borderRadius: 10,
  },
  saveButtonText: {
    fontFamily: "outfit-semibold",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
