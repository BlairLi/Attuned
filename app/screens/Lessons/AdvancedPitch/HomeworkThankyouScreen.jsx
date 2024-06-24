import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LessonsContext } from "@/contexts/LessonsContext";
import { Colors } from "@/constants/Colors";
const HomeworkThankyouScreen = ({ navigation }) => {
  const { setLessonCompleted, completedLessons } = useContext(LessonsContext);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  useEffect(() => {
    if (completedLessons.includes("AdvancedPitch")) {
      setIsCompleted(true);
    }
  }, [completedLessons]);

  const handleMarkAsCompleted = () => {
    setLessonCompleted("AdvancedPitch");
    setIsCompleted(true);
    setIsLocked(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Congratulations!</Text>
        <Text style={styles.message}>
          You are done with homework, please mark this lesson as completed then
          continue with the next lesson.
        </Text>
        {isLocked && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleMarkAsCompleted}
            >
              <Text style={styles.buttonText}>Mark as completed</Text>
            </TouchableOpacity>
          </View>
        )}
        {!isLocked && (
          <TouchableOpacity onPress={() => navigation.navigate("Volume")}>
            <View style={styles.card}>
              <Icon
                name="book-outline"
                size={30}
                color={isLocked ? "grey" : "orange"}
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Volume</Text>
                <Text style={styles.cardTime}>Time: 04:00 min</Text>
              </View>
              <TouchableOpacity>
                <Icon name="play-circle" size={30} color="orange" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
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
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontFamily: "outfit-bold",
    textAlign: "center",
    fontSize: 16,
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
