import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import GetStartedScreen from "../../../components/Questionnaire/GetStartedScreen";
import GenderIdentityScreen from "../../../components/Questionnaire/GenderIdentityScreen";
import PronounSelectionScreen from "../../../components/Questionnaire/PronounSelectionScreen";
import SuccessScreen from "../../../components/Questionnaire/SuccessScreen";
import VoiceGoalsScreen from "../../../components/Questionnaire/VoiceGoalsScreen";
import WorkVoiceScreen from "../../../components/Questionnaire/WorkVoiceScreen";
import SocialVoiceScreen from "../../../components/Questionnaire/SocialVoiceScreen";
import SpeakingScreen from "../../../components/Questionnaire/SpeakingScreen";
import SymptomScreen from "../../../components/Questionnaire/SymptomScreen";
import TalkInNoiseScreen from "../../../components/Questionnaire/TalkInNoiseScreen";
import { db } from "../../../configs/FirebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";


const QuestionnaireScreen = ({ navigation }) => {
  const { user } = useUser();
  const userEmailAddress = user?.primaryEmailAddress.emailAddress;
  const [currentScreen, setCurrentScreen] = useState(0);
  const [answers, setAnswers] = useState({
    genderIdentity: null,
    pronoun: null,
    voiceGoals: null,
    workVoice: null,
    socialVoice: null,
    speaking: null,
    talkInNoise: null,
    symptoms: null,
  });

  const handleAnswerUpdate = (key, value) => {
    console.log(`Updating ${key} to ${value}`); // Add this line
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [key]: value,
    }));
  };

  const handleUpload = async () => {
    // Remove fields with undefined values
    const sanitizedAnswers = Object.fromEntries(
      Object.entries(answers).filter(([_, value]) => value !== undefined)
    );
  

    try {
      await addDoc(collection(db, "questionnaireAnswers"), {
        ...sanitizedAnswers,
        timestamp: serverTimestamp(),
        user: userEmailAddress,
      });
      console.log("Answers uploaded successfully!");
    } catch (error) {
      console.error("Error uploading answers:", error);
    }
  };

  const questions = [
    <GetStartedScreen goToNext={() => setCurrentScreen(currentScreen + 1)} />,
    <GenderIdentityScreen
      goToNext={() => setCurrentScreen(currentScreen + 1)}
      updateAnswer={(value) => handleAnswerUpdate("genderIdentity", value)}
      currentAnswer={answers.genderIdentity}
    />,
    <PronounSelectionScreen
      goToNext={() => setCurrentScreen(currentScreen + 1)}
      goToPrevious={() => setCurrentScreen(currentScreen - 1)}
      updateAnswer={(value) => handleAnswerUpdate("pronoun", value)}
      currentAnswer={answers.pronoun}
    />,
    <VoiceGoalsScreen
      goToNext={() => setCurrentScreen(currentScreen + 1)}
      goToPrevious={() => setCurrentScreen(currentScreen - 1)}
      updateAnswer={(value) => handleAnswerUpdate("voiceGoals", value)}
      currentAnswer={answers.voiceGoals}
    />,
    <WorkVoiceScreen
      goToNext={() => setCurrentScreen(currentScreen + 1)}
      goToPrevious={() => setCurrentScreen(currentScreen - 1)}
      updateAnswer={(value) => handleAnswerUpdate("workVoice", value)}
      currentAnswer={answers.workVoice}
    />,
    <SocialVoiceScreen
      goToNext={() => setCurrentScreen(currentScreen + 1)}
      goToPrevious={() => setCurrentScreen(currentScreen - 1)}
      updateAnswer={(value) => handleAnswerUpdate("socialVoice", value)}
      currentAnswer={answers.socialVoice}
    />,
    <SpeakingScreen
      goToNext={() => setCurrentScreen(currentScreen + 1)}
      goToPrevious={() => setCurrentScreen(currentScreen - 1)}
      updateAnswer={(value) => handleAnswerUpdate("speaking", value)}
      currentAnswer={answers.speaking}
    />,
    <TalkInNoiseScreen
      goToNext={() => setCurrentScreen(currentScreen + 1)}
      goToPrevious={() => setCurrentScreen(currentScreen - 1)}
      updateAnswer={(value) => handleAnswerUpdate("talkInNoise", value)}
      currentAnswer={answers.talkInNoise}
    />,
    <SymptomScreen
      goToNext={() => setCurrentScreen(currentScreen + 1)}
      goToPrevious={() => setCurrentScreen(currentScreen - 1)}
      updateAnswer={(value) => handleAnswerUpdate("symptoms", value)}
      currentAnswer={answers.symptoms}
    />,
    <SuccessScreen
      goToPrevious={() => setCurrentScreen(currentScreen - 1)}
      goBack={() => {
        handleUpload();
        navigation.goBack();
      }}
    />,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        {questions.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentScreen === index ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>
      {questions[currentScreen]}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: "#d3d3d3",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: Colors.orange,
  },
});

export default QuestionnaireScreen;
