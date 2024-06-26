import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";
import Page from "../Page";
import HomeworkThankyouScreen from "./HomeworkThankyouScreen";
import React, { useState, useRef } from "react";
import { Colors } from "@/constants/Colors";
import RecordingCard from "@/components/Lessons/RecordingCard";
import { useUserData } from "@/contexts/UserContext";

export default function ArticulationHomework({ navigation }) {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef(null);
  const { userData } = useUserData(); // Use the context to get user data
  const allVideos = {
    default: [
      // Exercises - Onset & Linking
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667319230358.mp4" },
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667319275887.mp4" },
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667389413071.mp4" },
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667389435765.mp4" },
      // Swipe left to proceed to the next section: "Vowel Production"
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667318813802.mp4" },
      // Exercises - Vowel Production
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667318931171.mp4" },
      // Swipe left to proceed to the next section: "Articulatory Precision"
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667318999188.mp4" },
    ],
    transFemale: [
      // Exercises - Vowel Production
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667389547030.mp4" },
      // Swipe left to proceed to the next section: "Articulatory Precision"
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667318973390.mp4" },
      // Exercises – Precision
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667389714097.mp4" },
    ],
    transMale: [
      // Swipe left to proceed to the next section: "Vowel Production"
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667318865788.mp4" },
      // Exercises - Vowel Production
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667389591339.mp4" },
      // Swipe left to proceed to the next section: "Articulatory Precision"
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667318983732.mp4" },
      // Exercises – Precision
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667389800415.mp4" },
    ],
    nonBinary: [
      // Swipe left to proceed to the next section: "Vowel Production"
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667318865788.mp4" },
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667318851656.mp4" },
      // Exercises - Vowel Production
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667389547030.mp4" },
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667389591339.mp4" },
      // Swipe left to proceed to the next section: "Articulatory Precision"
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667318973390.mp4" },
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667318983732.mp4" },
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667318999188.mp4" },
      // Exercises – Precision
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667389714097.mp4" },
      { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667389800415.mp4" },
    ],
  };

  // Determine the set of videos to use based on gender identity
  let videos;
  switch (userData?.genderIdentity) {
    case "Trans Female":
      videos = [...allVideos.default, ...allVideos.transFemale];
      break;
    case "Trans Male":
      videos = [...allVideos.default, ...allVideos.transMale];
      break;
    case "Non-Binary":
    case "Gender Non-Conforming":
      videos = [...allVideos.default, ...allVideos.nonBinary];
      break;
    default:
      videos = allVideos.default;
      break;
  }
  const pages = [
    ...videos.map((video) => <Page navigation={navigation} video={video} />),
    <HomeworkThankyouScreen navigation={navigation} />,
  ];

  const handlePageChange = (position) => {
    pagerRef.current.setPage(position);
    setCurrentPage(position);
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        {pages.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentPage === index && styles.activeDot]}
          />
        ))}
      </View>

      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        {pages.map((page, index) => (
          <View key={index} style={styles.page}>
            {page}
          </View>
        ))}
      </PagerView>

      <View style={styles.buttonContainer}>
        {currentPage < pages.length - 1 && <RecordingCard />}
        {currentPage > 0 && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePageChange(currentPage - 1)}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}
        {currentPage < pages.length - 1 && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePageChange(currentPage + 1)}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: "#d3d3d3",
    borderRadius: 5,
    margin: 5,
  },
  activeDot: {
    backgroundColor: Colors.primary,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    padding: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "80%",
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontFamily: "outfit-bold",
    textAlign: "center",
    fontSize: 16,
  },
});
