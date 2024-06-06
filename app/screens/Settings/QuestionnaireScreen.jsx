import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import GenderIdentityScreen from "../../../components/Questionnaire/GenderIdentityScreen";
import PronounSelectionScreen from "../../../components/Questionnaire/PronounSelectionScreen";
import SuccessScreen from "../../../components/Questionnaire/SuccessScreen";
import VoiceGoalsScreen from "../../../components/Questionnaire/VoiceGoalsScreen";
import WorkVoiceScreen from "../../../components/Questionnaire/WorkVoiceScreen";
import SocialVoiceScreen from "../../../components/Questionnaire/SocialVoiceScreen";
import SpeakingScreen from "../../../components/Questionnaire/SpeakingScreen";
import SymptomScreen from "../../../components/Questionnaire/SymptomScreen";
import TalkInNoiseScreen from "../../../components/Questionnaire/TalkInNoiseScreen";
const QuestionnaireScreen = ({ navigation }) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const questions = [
    <GenderIdentityScreen
      goToNext={() => setCurrentScreen(currentScreen + 1)}
      goToPrevious={() => setCurrentScreen(currentScreen - 1)}
      isFirstScreen={true}
    />,
    <PronounSelectionScreen
      goToNext={() => setCurrentScreen(currentScreen + 1)}
      goToPrevious={() => setCurrentScreen(currentScreen - 1)}
    />,
    <VoiceGoalsScreen
      goToNext={() => setCurrentScreen(currentScreen + 1)}
      goToPrevious={() => setCurrentScreen(currentScreen - 1)}
    />,
    <WorkVoiceScreen
      goToNext={() => setCurrentScreen(currentScreen + 1)}
      goToPrevious={() => setCurrentScreen(currentScreen - 1)}
    />,
    <SocialVoiceScreen
      goToNext={() => setCurrentScreen(currentScreen + 1)}
      goToPrevious={() => setCurrentScreen(currentScreen - 1)}
    />,
    <SpeakingScreen
      goToNext={() => setCurrentScreen(currentScreen + 1)}
      goToPrevious={() => setCurrentScreen(currentScreen - 1)}
    />,
    <TalkInNoiseScreen
      goToNext={() => setCurrentScreen(currentScreen + 1)}
      goToPrevious={() => setCurrentScreen(currentScreen - 1)}
    />,
    <SymptomScreen
      goToNext={() => setCurrentScreen(currentScreen + 1)}
      goToPrevious={() => setCurrentScreen(currentScreen - 1)}
    />,
    <SuccessScreen
      goToPrevious={() => setCurrentScreen(currentScreen - 1)}
      goBack={() => navigation.goBack()}
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
