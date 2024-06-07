import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
export default function GetStartedScreen({ goToNext }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Please answer the following questions to help us set up your app
      </Text>
      <Icon
        name="grin-wink"
        size={100}
        color={Colors.orange}
        style={{
          marginTop: 20,
        }}
      />
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={goToNext}>
          <Text style={styles.saveButtonText}>Get Started</Text>
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
    marginVertical: 40,
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
