import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";

export default function HomeworkScreen({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("HomeworkDetail")}>
      <View style={styles.card}>
        <Icon name="book-outline" size={30} color="grey" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Voice Assessment</Text>
          <Text style={styles.cardTime}>Time: 01:00 min</Text>
        </View>
        <TouchableOpacity>
          <Icon name="play-circle" size={30} color="orange" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  carouselContainer: {
    height: 200,
    width: "100%",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  playButton: {
    zIndex: 1,
  },
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
