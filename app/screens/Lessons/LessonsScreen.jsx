import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import {
  query,
  where,
  collection,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../../configs/FirebaseConfig";
import Header from "../../../components/Lessons/Header";
import LessonCard from "../../../components/Lessons/LessonCard";
import { Colors } from "@/constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import { LessonsContext } from "@/contexts/LessonsContext";
import { useUserData } from "@/contexts/UserContext"; // Import the context
const bannerImage = require("../../../assets/images/banner.png");

export default function LessonsScreen({ navigation }) {
  const { user } = useUser();
  const userEmailAddress = user?.primaryEmailAddress.emailAddress;
  const [locked, setLocked] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const { completedLessons } = useContext(LessonsContext);
  const { userData, setUserData } = useUserData(); // Use the context

  useEffect(() => {
    const checkQuestionnaireCompletion = async () => {
      if (userEmailAddress) {
        try {
          const userRef = collection(db, "questionnaireAnswers");
          const q = query(
            userRef,
            where("user", "==", userEmailAddress),
            orderBy("timestamp", "desc"),
            limit(1)
          );
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            // No such user, show the modal
            setModalVisible(true);
          } else {
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              const { genderIdentity } = userData;
              console.log(`User gender identity: ${genderIdentity}`);
              // Store genderIdentity in context
              setUserData(userData);
              setLocked(false); // Unlock the lessons
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    if (isInitialLoad) {
      checkQuestionnaireCompletion();
      setIsInitialLoad(false);
    }
  }, [userEmailAddress, navigation, isInitialLoad]);

  const closeModalAndNavigate = () => {
    setModalVisible(false);
    navigation.navigate("Questionnaire");
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.header}>
              Please complete the Questionnaire before continuing with Lessons
            </Text>
            <Icon
              name="exclamation-triangle"
              size={100}
              color={Colors.orange}
              style={{
                marginTop: 20,
              }}
            />
            <View style={modalStyles.bottomButtonContainer}>
              <TouchableOpacity
                style={modalStyles.saveButton}
                onPress={closeModalAndNavigate}
              >
                <Text style={modalStyles.saveButtonText}>
                  Go to Questionnaire
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.container}>
        <View>
          <View style={styles.headerContainer}>
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
          onPress={() => navigation.navigate("Introduction")}
        />
        <LessonCard
          title="Basics"
          time="Time: 04:00 min"
          icon={
            completedLessons.includes("Intro") ? "book-outline" : "lock-outline"
          }
          locked={!completedLessons.includes("Intro")}
          onPress={() => navigation.navigate("Basics")}
        />
        <LessonCard
          title="Pitch"
          time="Time: 04:00 min"
          icon={
            completedLessons.includes("Basics")
              ? "book-outline"
              : "lock-outline"
          }
          locked={!completedLessons.includes("Basics")}
          onPress={() => navigation.navigate("Pitch")}
        />
        <LessonCard
          title="Intonation"
          time="Time: 04:00 min"
          icon={
            completedLessons.includes("Pitch") ? "book-outline" : "lock-outline"
          }
          locked={!completedLessons.includes("Pitch")}
          onPress={() => navigation.navigate("Intonation")}
        />
        <LessonCard
          title="Resonance"
          time="Time: 04:00 min"
          icon={
            completedLessons.includes("Intonation")
              ? "book-outline"
              : "lock-outline"
          }
          locked={!completedLessons.includes("Intonation")}
          onPress={() => navigation.navigate("Resonance")}
        />
        <LessonCard
          title="Put Basics together"
          time="Time: 04:00 min"
          icon={
            completedLessons.includes("Resonance")
              ? "book-outline"
              : "lock-outline"
          }
          locked={!completedLessons.includes("Resonance")}
          onPress={() => navigation.navigate("PutBasic")}
        />
        <LessonCard
          title="Advanced Pitch"
          time="Time: 04:00 min"
          icon={
            completedLessons.includes("PutBasic")
              ? "book-outline"
              : "lock-outline"
          }
          locked={!completedLessons.includes("PutBasic")}
          onPress={() => navigation.navigate("AdvancedPitch")}
        />
        <LessonCard
          title="Volume"
          time="Time: 04:00 min"
          icon={
            completedLessons.includes("AdvancedPitch")
              ? "book-outline"
              : "lock-outline"
          }
          locked={!completedLessons.includes("AdvancedPitch")}
          onPress={() => navigation.navigate("Volume")}
        />
        <LessonCard
          title="Articulation"
          time="Time: 04:00 min"
          icon={
            completedLessons.includes("Volume")
              ? "book-outline"
              : "lock-outline"
          }
          locked={!completedLessons.includes("Volume")}
          onPress={() => navigation.navigate("Articulation")}
        />
        <LessonCard
          title="Syntax"
          time="Time: 04:00 min"
          icon={
            completedLessons.includes("Articulation")
              ? "book-outline"
              : "lock-outline"
          }
          locked={!completedLessons.includes("Articulation")}
          onPress={() => navigation.navigate("Syntax")}
        />
        <LessonCard
          title="Put everything together"
          time="Time: 04:00 min"
          icon={
            completedLessons.includes("Syntax")
              ? "book-outline"
              : "lock-outline"
          }
          locked={!completedLessons.includes("Syntax")}
          onPress={() => navigation.navigate("PutEverything")}
        />
      </ScrollView>
    </>
  );
}

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "outfit-bold",
    marginVertical: 40,
  },
  bottomButtonContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    width: "100%",
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: Colors.orange,
    width: "100%",
    padding: 15,
    borderRadius: 10,
  },
  saveButtonText: {
    fontFamily: "outfit-semibold",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    backgroundColor: "white",
    height: 90,
    padding: 20,
  },
  bannerImage: {
    width: "95%",
    alignItems: "center",
    height: 150,
    margin: 10,
    padding: 20,
    borderRadius: 10,
  },
});
