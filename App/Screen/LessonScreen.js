import React from "react";
import Header from "../Components/Header";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const bannerImage = require("./../../assets/images/banner.png");

const LessonCard = ({ title, time, icon, locked }) => (
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
);

export default function LessonScreen() {
  return (
    <ScrollView style={styles.container}>
      <View>
        <View
          style={{
            backgroundColor: "white",
            height: 100,
            padding: 20,
          }}
        >
          <Header />
        </View>
      </View>
      <Image source={bannerImage} style={styles.bannerImage} />
      {/* List of lessons */}
      <LessonCard
        title="Introduction"
        time="Time: 04:00 min"
        icon="book-outline"
        locked={false}
      />
      <LessonCard
        title="Basics"
        time="Time: 04:00 min"
        icon="lock-outline"
        locked={true}
      />
      <LessonCard
        title="Pitch"
        time="Time: 04:00 min"
        icon="lock-outline"
        locked={true}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  bannerImage: {
    width: "95%",
    alignItems: "center",
    height: 150,
    margin: 10,
    padding: 20,
    borderRadius: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 10,
    padding: 20,
    borderRadius: 10,
    // Add shadow styles for elevation
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    // fontFamily: "outfit-semibold",
    // Add other styles
  },
  cardTime: {
    fontSize: 16,
    color: "grey",
    // fontFamily: "outfit-light",
    // Add other styles
  },
});
