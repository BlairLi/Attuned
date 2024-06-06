import React from "react";
import { Text, Switch, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const SettingItem = ({
  iconName,
  title,
  onPress,
  isSwitch,
  switchValue,
  color,
  toggleSwitch,
}) => {
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <Icon
        name={iconName}
        size={24}
        style={styles.settingIcon}
        color={color}
      />
      <Text style={styles.settingText}>{title}</Text>
      {isSwitch ? (
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={switchValue ? "#f5dd4b" : "#f4f3f4"}
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

const styles = StyleSheet.create({
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
});

export default SettingItem;
