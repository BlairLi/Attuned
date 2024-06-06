import React from "react";
import Header from "../../../components/Lessons/Header";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from "react-native";
import LessonCard from "../../../components/Lessons/LessonCard";

const bannerImage = require("../../../assets/images/banner.png");
const backgroundImage = require("../../../assets/images/Splash.jpg");

export default function LessonsScreen({ navigation }) {
  return (
    <ImageBackground source={backgroundImage} style={styles.imageBackground}>
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
          onPress={() => navigation.navigate("LessonDetail")}
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: "white",
    height: 90,
    padding: 20,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
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
