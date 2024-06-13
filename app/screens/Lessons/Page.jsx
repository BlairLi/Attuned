import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import VideoPlayer from 'expo-video-player'
import { ResizeMode } from 'expo-av'

const Page = ({ navigation, video }) => {

  return (
    <View style={styles.container}>
      <VideoPlayer
        videoProps={{
          shouldPlay: false,
          resizeMode: ResizeMode.CONTAIN,
          source: video,
        }}
        style={{ height: 220 }}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
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
});

export default Page;
