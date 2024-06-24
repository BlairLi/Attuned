import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import { Colors } from "@/constants/Colors";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
const ReminderScreen = () => {
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const [reminderMessage, setReminderMessage] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedReminderEnabled = await AsyncStorage.getItem(
          "reminderEnabled"
        );
        const savedReminderMessage = await AsyncStorage.getItem(
          "reminderMessage"
        );
        const savedDate = await AsyncStorage.getItem("reminderDate");
        if (savedReminderEnabled !== null) {
          setIsReminderEnabled(JSON.parse(savedReminderEnabled));
        }
        if (savedReminderMessage !== null) {
          setReminderMessage(savedReminderMessage);
        }
        if (savedDate !== null) {
          setDate(new Date(savedDate));
        }
      } catch (error) {
        console.error("Failed to load reminder settings", error);
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem(
          "reminderEnabled",
          JSON.stringify(isReminderEnabled)
        );
        await AsyncStorage.setItem("reminderMessage", reminderMessage);
        await AsyncStorage.setItem("reminderDate", date.toISOString());
      } catch (error) {
        console.error("Failed to save reminder settings", error);
      }
    };

    saveSettings();
  }, [isReminderEnabled, reminderMessage, date]);

  const toggleSwitch = () =>
    setIsReminderEnabled((previousState) => !previousState);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || date;
    setShowTimePicker(Platform.OS === "ios");
    setDate(currentTime);
  };

  const scheduleReminder = async () => {
    if (!reminderMessage) {
      Alert.alert("Reminder Message Required", "Please enter your reminder message.");
      return;
    }
    if (!isReminderEnabled) {
      Alert.alert("Reminder is disabled");
      return;
    }

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please enable notifications in your settings."
      );
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder",
        body: reminderMessage || "This is your scheduled reminder!",
      },
      trigger: {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        repeats: false,
      },
    });

    Alert.alert("Reminder Set", "Your reminder has been scheduled.");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Enable Reminder:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "gray" }}
          thumbColor={isReminderEnabled ? Colors.secondaryLight : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isReminderEnabled}
        />
      </View>
      {isReminderEnabled && (
        <>
          <View style={styles.inputMesgContainer}>
            <Text style={styles.inputLabel}>Reminder Message:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setReminderMessage}
              value={reminderMessage}
              placeholder="Enter your reminder message"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Select Date:</Text>
            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Select Time:</Text>
            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={date}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={scheduleReminder}
            style={styles.scheduleButton}
          >
            <Text style={styles.scheduleButtonText}>Schedule Reminder</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    minHeight: "100%",
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
    fontFamily: "outfit-bold",
  },
  inputMesgContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "outfit-semibold",
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
  pickerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  scheduleButton: {
    padding: 15,
    backgroundColor: Colors.secondaryLight,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  scheduleButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "outfit-bold",
  },
});

export default ReminderScreen;
