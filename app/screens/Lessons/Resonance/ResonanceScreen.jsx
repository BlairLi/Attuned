import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";
import Page from "../Page";
import IntonationThankyouScreen from "./ResonanceThankyouScreen";
import React, { useState, useRef } from "react";
import { Colors } from "@/constants/Colors";
export default function ResonanceScreen({ navigation }) {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef(null);
  const videos = [
    { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667307335565.mp4" },
    { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667307400435.mp4" },
  ];

  const pages = [
    ...videos.map((video) => <Page navigation={navigation} video={video} />),
    <IntonationThankyouScreen navigation={navigation} />,
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
