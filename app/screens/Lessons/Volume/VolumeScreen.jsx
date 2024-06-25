import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";
import Page from "../Page";
import VolumeThankyouScreen from "./VolumeThankyouScreen";
import React, { useState, useRef } from "react";
import { Colors } from "@/constants/Colors";

export default function VolumeScreen({ navigation }) {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef(null);
  const videos = [
    { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667400204163.mp4" },
    { uri: "https://d1gkwtfyd0cwcv.cloudfront.net/common/1667400229408.mp4" },
  ];

  const pages = [
    ...videos.map((video) => <Page navigation={navigation} video={video} />),
    <VolumeThankyouScreen navigation={navigation} />,
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
    width: "100%",
    bottom: 0,
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
    textAlign: "center",
    fontSize: 16,
    fontFamily: "outfit-bold",
  },
});
