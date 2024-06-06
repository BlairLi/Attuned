import React from "react";
import { StyleSheet, View } from "react-native";
import HomeworkCard from "../../../components/Lessons/HomeworkCard";

export default function HomeworkScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <HomeworkCard
        title="Voice Assessment"
        time="Time: 01:00 min"
        onPress={() => navigation.navigate("HomeworkDetail")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
});
