import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SelectedRecordingContext } from "@/contexts/SelectedRecordingContext";
import { Colors } from "@/constants/Colors";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/Ionicons";

const RecordingDetailScreen = () => {
  const { selectedRecording } = useContext(SelectedRecordingContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const loadSound = async () => {
      if (selectedRecording) {
        try {
          const { sound: newSound, status } = await Audio.Sound.createAsync(
            { uri: selectedRecording.file },
            { shouldPlay: false }
          );
          setSound(newSound);
          setDuration(status.durationMillis);
        } catch (error) {
          console.error("Error loading sound:", error);
        }
      }
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [selectedRecording]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound && isPlaying) {
        sound.getStatusAsync().then((status) => {
          setPosition(status.positionMillis);
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sound, isPlaying]);

  const togglePlayback = async () => {
    try {
      if (sound) {
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
        setIsPlaying(!isPlaying);
      }
    } catch (error) {
      console.error("Failed to toggle playback:", error);
    }
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 1000 / 60);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!selectedRecording) {
    return (
      <View style={styles.container}>
        <Text style={styles.noRecordingText}>No recording selected</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedRecording.title}</Text>
      <Text style={styles.detail}>{selectedRecording.time}</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.detail}>
          Min Frequency: {selectedRecording.min_frequency} Hz
        </Text>
        <Text style={styles.detail}>
          Max Frequency: {selectedRecording.max_frequency} Hz
        </Text>
      </View>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          minimumTrackTintColor={Colors.secondaryLight}
          maximumTrackTintColor="black"
          thumbTintColor={Colors.secondaryLight}
          onValueChange={async (value) => {
            if (sound) {
              await sound.setPositionAsync(value);
              setPosition(value);
            }
          }}
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
        <Icon
          name={isPlaying ? "pause-circle" : "play-circle"}
          size={64}
          color={Colors.secondaryLight}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  noRecordingText: {
    fontSize: 18,
    color: "grey",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  detailContainer: {
    alignItems: "center",
  },
  detail: {
    fontSize: 16,
    color: "grey",
    marginVertical: 4,
  },
  sliderContainer: {
    width: "80%",
    alignItems: "center",
    marginVertical: 20,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  timeText: {
    fontSize: 14,
    color: "grey",
  },
  playButton: {
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RecordingDetailScreen;
