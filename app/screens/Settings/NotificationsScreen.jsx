import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
  Alert,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "@/constants/Colors";
// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New Feature",
      detail: "Check out the new feature now available on your app.",
      expanded: false,
    },
    {
      id: "2",
      title: "System Update",
      detail: "Your system will update tonight at 12:00 AM.",
      expanded: false,
    },
    {
      id: "3",
      title: "Account Alert",
      detail: "Unusual activity detected in your account.",
      expanded: false,
    },
  ]);

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        expanded:
          notification.id === id
            ? !notification.expanded
            : notification.expanded,
      }))
    );
  };

  const deleteItem = (id, rowMap) => {
    if (rowMap[id]) {
      rowMap[id].closeRow();
    }
    const newData = [...notifications].filter((item) => item.id !== id);
    setNotifications(newData);
  };

  const renderItem = (data) => (
    <TouchableOpacity
      onPress={() => toggleExpand(data.item.id)}
      style={styles.itemContainer}
      activeOpacity={1}
    >
      <Text style={styles.title}>{data.item.title}</Text>
      {data.item.expanded && (
        <Text style={styles.detail}>{data.item.detail}</Text>
      )}
    </TouchableOpacity>
  );

  const renderHiddenItem = (data, rowMap) => {
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
            onPress: () => deleteItem(data.item.id, rowMap),
          },
        ]
      );
    };
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity style={styles.backRightBtn} onPress={handleDelete}>
          <Text>
            <Icon name="delete" size={30} color="#DD2C00" />
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <SwipeListView
        data={notifications}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        disableRightSwipe
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    height: "100%",
  },
  dot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
  },
  itemContainer: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontFamily: "outfit-semibold",
    fontSize: 18,
    color: "white",
  },
  detail: {
    fontFamily: "outfit",
    fontSize: 16,
    marginTop: 5,
    color: "white",
  },
  rowBack: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    right: 0,
  },
});

export default NotificationsScreen;
