import React, { useState } from "react";
import { Text, Alert, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useClerk } from "@clerk/clerk-expo";
import { Colors } from "@/constants/Colors";
import SettingItem from "../../../components/Settings/SettingItem";

const SettingsScreen = ({ navigation }) => {
  // push notifications
  const [isPushNotificationsEnabled, setIsPushNotificationsEnabled] =
    useState(false);

  const toggleSwitch = () =>
    setIsPushNotificationsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View>
        <SettingItem
          iconName="notifications"
          color={Colors.primary}
          title="Notifications"
          onPress={() => navigation.navigate("Notifications")}
        />
        <SettingItem
          iconName="alert-circle"
          color={Colors.primaryLight}
          title="Push Notifications"
          onPress={() => {}}
          isSwitch
          switchValue={isPushNotificationsEnabled}
          toggleSwitch={toggleSwitch}
        />
        <SettingItem
          iconName="person"
          color={Colors.secondary}
          title="Profile"
          onPress={() => navigation.navigate("Profile")}
        />
        <SettingItem
          iconName="alarm"
          color={Colors.secondaryLight}
          title="Reminders"
          onPress={() => navigation.navigate("Reminders")}
        />
        <SettingItem
          iconName="document"
          color={Colors.yellow}
          title="Disclaimer"
          onPress={() => navigation.navigate("Disclaimer")}
        />
        <SettingItem
          iconName="help-circle"
          color={Colors.orange}
          title="Questionnaire"
          onPress={() => navigation.navigate("Questionnaire")}
        />
        <SettingItem
          iconName="key"
          color={Colors.pink}
          title="Change Password"
          onPress={() => navigation.navigate("Change Password")}
        />
        <SettingItem
          iconName="log-out"
          color={Colors.red}
          title="SignOut"
          onPress={() => navigation.navigate("Sign Out")}
        />
      </View>
      <View style={styles.contactUsContainer}>
        <TouchableOpacity
          style={styles.contactUsButton}
          onPress={() => navigation.navigate("Contact Us")}
        >
          <Text style={styles.contactUsText}>Contact Us Here</Text>
          <Icon
            name="chevron-forward-outline"
            size={20}
            style={styles.settingArrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
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
  contactUsContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  contactUsButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactUsText: {
    fontFamily: "Outfit-Light",
    fontSize: 16,
  },
});

export default SettingsScreen;
