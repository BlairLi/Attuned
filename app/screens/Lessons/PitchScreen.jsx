import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";
import Page from "./Page";
import ThankYouPage from "./ThankYouPage";
import React, { useState, useRef } from "react";
import { Colors } from "@/constants/Colors";
export default function PitchScreen({ navigation }) {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef(null);
  const videos = [
    { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1626191028009.mp4" },
    { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667304408670.mp4" },
    { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667305544906.mp4" },
  ];

  const pages = [
    ...videos.map((video) => <Page navigation={navigation} video={video} />),
    <ThankYouPage navigation={navigation} />,
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
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    width: "100%",
    justifyContent: "space-between",
  },
  button: {
    width: "40%",
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
