import React, { useEffect, useContext, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LessonsContext } from "@/contexts/LessonsContext";
import { Colors } from "@/constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import ConfettiCannon from "react-native-confetti-cannon";

const HomeworkThankyouScreen = ({ navigation }) => {
  const { setLessonCompleted, completedLessons } = useContext(LessonsContext);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const confettiRef = useRef(null);

  useEffect(() => {
    if (completedLessons.includes("PutEverything")) {
      setIsCompleted(true);
    }
  }, [completedLessons]);

  const handleMarkAsCompleted = () => {
    setLessonCompleted("PutEverything");
    setIsCompleted(true);
    setIsLocked(false);
    confettiRef.current.start();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {isLocked ? (
          <>
            <Text style={styles.title}>Congratulations!</Text>
            <Text style={styles.message}>
              You've completed all lessons and homework, please go back to
              lessons screen.
            </Text>
          </>
        ) : (
          <Icon
            name="glass-cheers"
            size={100}
            color={Colors.primary}
            style={{
              marginTop: 20,
              marginBottom: 20,
            }}
          />
        )}
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
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Lessons")}
            >
              <Text style={styles.buttonText}>Go Back To Lessons</Text>
            </TouchableOpacity>
          </>
        )}
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          ref={confettiRef}
          fadeOut={true}
        />
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
