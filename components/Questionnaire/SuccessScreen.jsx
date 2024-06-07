import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Colors } from "@/constants/Colors";
export default function SuccessScreen({ goToPrevious, goBack }) {
  return (
    <View style={styles.container}>
      <Text style={styles.successMessage}>
        Your profile has been successfully updated!
      </Text>
      <Icon name="thumbs-up" size={100} color={Colors.orange} />
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={goToPrevious}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={goBack}>
          <Text style={styles.saveButtonText}>OK</Text>
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
  successMessage: {
    fontFamily: "outfit-semibold",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 50,
  },
});
