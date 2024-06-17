import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const HomeworkThankyouScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Thank You</Text>
        <Text style={styles.message}>
            You are done with homework, please continue with next lesson.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Intonation")}>
          <View style={styles.card}>
            <Icon name="book-outline" size={30} color="grey" />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Intonation</Text>
              <Text style={styles.cardTime}>Time: 04:00 min</Text>
            </View>
            <TouchableOpacity>
              <Icon name="play-circle" size={30} color="orange" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "outfit-bold",
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    fontFamily: "outfit-light",
  },
  card: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: 10,
    padding: 20,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 1,
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

export default HomeworkThankyouScreen;
