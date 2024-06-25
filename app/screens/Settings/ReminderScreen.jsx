import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
const ReminderSettingsScreen = () => {
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const [reminderMessage, setReminderMessage] = useState("");

  const toggleSwitch = () =>
    setIsReminderEnabled((previousState) => !previousState);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Enable Reminders:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isReminderEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isReminderEnabled}
        />
      </View>
      {isReminderEnabled && (
        <View style={styles.inputContainer}>
          <Text style={styles.settingText}>Reminder Message:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setReminderMessage}
            value={reminderMessage}
            placeholder="Enter your reminder message"
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    height: "100%",
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 20,
  },
  settingText: {
    fontSize: 18,
    fontFamily: "outfit",
  },
  inputContainer: {
    padding: 20,
  },
  input: {
    fontFamily: "outfit",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 5,
  },
});

export default ReminderSettingsScreen;
