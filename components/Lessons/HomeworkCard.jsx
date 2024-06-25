import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const HomeworkCard = ({ title, onPress, time, icon, locked }) => (
  <TouchableOpacity onPress={onPress} disabled={locked}>
    <View style={styles.card}>
      <Icon name={icon} size={30} color={locked ? "grey" : "orange"} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardTime}>{time}</Text>
      </View>
      <TouchableOpacity disabled={locked}>
        <Icon name="play-circle" size={30} color="orange" />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  card: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: 10,
    padding: 20,
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "outfit-semibold",
  },
  cardTime: {
    fontSize: 16,
    color: "grey",
    fontFamily: "outfit-light",
  },
});

export default HomeworkCard;
