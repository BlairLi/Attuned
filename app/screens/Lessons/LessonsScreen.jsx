import React from "react";
import Header from "../../../components/Lessons/Header";
import { View, Image, ScrollView, StyleSheet } from "react-native";
import LessonCard from "../../../components/Lessons/LessonCard";

const bannerImage = require("../../../assets/images/banner.png");
export default function LessonsScreen({ navigation }) {
  return (
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
        icon="lock-outline"
        // locked={true}
        locked={false}
        onPress={() => navigation.navigate("Basics")}
      />
      <LessonCard
        title="Pitch"
        time="Time: 04:00 min"
        icon="lock-outline"
        // locked={true}
        locked={false}
        onPress={() => navigation.navigate("Pitch")}
      />
      <LessonCard
        title="Intonation"
        time="Time: 04:00 min"
        icon="lock-outline"
        // locked={true}

        locked={false}
        onPress={() => navigation.navigate("Intonation")}
      />
      <LessonCard
        title="Resonance"
        time="Time: 04:00 min"
        icon="lock-outline"
        // locked={true}

        locked={false}
        
        onPress={() => navigation.navigate("Resonance")}
      />
      <LessonCard
        title="Put Basics together"
        time="Time: 04:00 min"
        icon="lock-outline"
        // locked={true}

        locked={false}
        // icon={locked ? "lock-outline" : "book-outline"}
        onPress={() => navigation.navigate("PutBasic")}
      />
      <LessonCard
        title="Advanced Pitch"
        time="Time: 04:00 min"
        icon="lock-outline"
        // locked={true}

        locked={false}
        // icon={locked ? "lock-outline" : "book-outline"}
        onPress={() => navigation.navigate("AdvancedPitch")}
      />
      <LessonCard
        title="Volume"
        time="Time: 04:00 min"
        icon="lock-outline"
        // locked={true}

        locked={false}
        // icon={locked ? "lock-outline" : "book-outline"}
        onPress={() => navigation.navigate("Volume")}
      />
      <LessonCard
        title="Articulation"
        time="Time: 04:00 min"
        icon="lock-outline"
        // locked={true}

        locked={false}
        // icon={locked ? "lock-outline" : "book-outline"}
        onPress={() => navigation.navigate("Articulation")}
      />
      <LessonCard
        title="Syntax"
        time="Time: 04:00 min"
        icon="lock-outline"
        // locked={true}

        locked={false}
        // icon={locked ? "lock-outline" : "book-outline"}
        onPress={() => navigation.navigate("Syntax")}
      />
      <LessonCard
        title="Put everything together"
        time="Time: 04:00 min"
        icon="lock-outline"
        // locked={true}

        locked={false}
        // icon={locked ? "lock-outline" : "book-outline"}
        onPress={() => navigation.navigate("PutEverything")}
      />
    </ScrollView>
  );
}

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
