import React from "react";
import { Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "@/constants/Colors";
const NotificationItem = ({ notification, toggleExpand, deleteItem }) => {
  const handleDelete = () => {
    Alert.alert(
      "Delete Notification",
      "Are you sure you want to delete this notification?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteItem(notification.id),
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      onPress={() => toggleExpand(notification.id)}
      style={styles.itemContainer}
      activeOpacity={1}
    >
      <Text style={styles.title}>{notification.title}</Text>
      {notification.expanded && (
        <Text style={styles.detail}>{notification.detail}</Text>
      )}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Icon name="delete" size={30} color="#DD2C00" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    position: "relative",
  },
  deleteButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});

export default NotificationItem;
