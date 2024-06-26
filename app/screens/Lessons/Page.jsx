import React from "react";
import { View, StyleSheet } from "react-native";
import VideoPlayer from "expo-video-player";
import { ResizeMode } from "expo-av";

// TODO: Fixed Warning: VideoPlayer: Support for defaultProps will be removed
// from function components in a future major release.
// Use JavaScript default parameters instead.
const Page = ({ navigation, video }) => {
  const videoSource = video ? video : { uri: "" };
  return (
    <View style={styles.container}>
      {videoSource.uri ? (
        <VideoPlayer
          videoProps={{
            shouldPlay: false,
            resizeMode: ResizeMode.CONTAIN,
            source: videoSource,
          }}
          style={{ height: 220 }}
        />
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>No video available</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  video: {
    width: "100%",
    height: 200,
  },
  playButton: {
    zIndex: 1,
  },
  card: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: 10,
    padding: 20,
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "outfit-semibold",
  },
  cardTime: {
    fontSize: 16,
    color: "grey",
    fontFamily: "outfit-light",
  },
  placeholderContainer: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: "grey",
    fontFamily: "outfit-light",
  },
});

export default Page;
