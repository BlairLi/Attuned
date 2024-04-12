import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Choose the correct icon set

const SettingsScreen = ({ navigation }) => {
  const [isPushNotificationsEnabled, setIsPushNotificationsEnabled] =
    useState(false);

  const toggleSwitch = () =>
    setIsPushNotificationsEnabled((previousState) => !previousState);

  const SettingItem = ({ iconName, title, onPress, isSwitch, switchValue }) => {
    return (
      <TouchableOpacity style={styles.settingItem} onPress={onPress}>
        <Icon name={iconName} size={24} style={styles.settingIcon} />
        <Text style={styles.settingText}>{title}</Text>
        {isSwitch ? (
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isPushNotificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={switchValue}
          />
        ) : (
          <Icon
            name="chevron-forward-outline"
            size={24}
            style={styles.settingArrow}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <SettingItem
        iconName="notifications-outline"
        title="Notifications"
        onPress={() => {}}
      />
      <SettingItem
        iconName="alert-circle-outline"
        title="Push Notifications"
        onPress={() => {}}
        isSwitch
        switchValue={isPushNotificationsEnabled}
      />
      <SettingItem
        iconName="person-outline"
        title="Profile Settings"
        onPress={() => navigation.navigate('Profile')} 
      />
      <SettingItem
        iconName="alarm-outline"
        title="Reminder"
        onPress={() => {}}
      />
      <SettingItem
        iconName="document-outline"
        title="Disclaimer"
        onPress={() => {}}
      />
      <SettingItem
        iconName="hammer-outline"
        title="Password Change"
        onPress={() => {}}
      />
      <SettingItem iconName="log-out" title="Logout" onPress={() => {}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    padding: 20,
    fontFamily: "outfit-bold",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  settingIcon: {
    width: 32,
    marginRight: 10,
  },
  settingText: {
    flex: 1,
    fontSize: 18,
    fontFamily: "outfit",
  },
  settingArrow: {
    color: "#ccc",
  },
  // Additional styles if needed
});

export default SettingsScreen;
