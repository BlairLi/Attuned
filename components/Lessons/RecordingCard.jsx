import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/constants/Colors";
import { RecordingsContext } from "../../contexts/RecordingsContext";
import Toast from "react-native-toast-message";
const RecordingCard = () => {
  const [recording, setRecording] = useState(null);
  const { recordings, setRecordings } = useContext(RecordingsContext);
  const [hasPermission, setHasPermission] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [recordingName, setRecordingName] = useState("Recording");
  const [recordingUri, setRecordingUri] = useState(null);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Audio.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    requestPermissions();
  }, []);

  const startRecording = async () => {
    if (!hasPermission) {
      Alert.alert("No permission to record audio");
      return;
    }
    if (recording) {
      console.log("Stopping existing recording before starting a new one");
      await stopRecording(); // Ensure the existing recording is stopped before starting a new one
    }
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(newRecording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    try {
      await recording.stopAndUnloadAsync();
      const { status } = await recording.createNewLoadedSoundAsync();
      const duration = getDurationFormatted(status.durationMillis);
      console.log("Duration:", duration);

      if (duration === "0:00") {
        Alert.alert("Your recording is too short! Please try again.");
        setRecording(null);
        setModalVisible(false);
        return;
      }

      const uri = recording.getURI();
      setRecordingUri(uri);
      console.log("Recording stopped and stored at", uri);
      setModalVisible(true);
    } catch (error) {
      console.error("Failed to stop recording", error);
      setRecording(null);
    }
  };

  const saveRecording = async () => {
    if (!recordingUri) return;

    try {
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      const duration = getDurationFormatted(status.durationMillis);

      const newRecording = {
        id: new Date().toISOString(),
        title: recordingName,
        time: new Date().toLocaleString(),
        sound: sound,
        duration: duration,
        file: recordingUri,
      };

      const updatedRecordings = [...recordings, newRecording];
      setRecordings(updatedRecordings);
      await AsyncStorage.setItem(
        "recordings",
        JSON.stringify(updatedRecordings)
      );

      // Show toast message
      Toast.show({
        type: "success",
        text1: "Recording saved successfully!",
        visibilityTime: 3000,
      });

      setRecording(null);
      setRecordingUri(null);
      setModalVisible(false);
    } catch (error) {
      console.error("Failed to save recording", error);
    }
  };

  const cancelRecording = () => {
    if (recording) {
      recording.stopAndUnloadAsync().catch(() => {}); // Ensure recording is stopped
      setRecording(null);
      setRecordingUri(null);
    }
    setModalVisible(false);
  };

  const getDurationFormatted = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 1000 / 60);
    const seconds = Math.round((milliseconds / 1000) % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={[
          styles.roundButton,
          recording ? styles.stopRecordingButton : styles.startRecordingButton,
        ]}
        onPress={recording ? stopRecording : startRecording}
      >
        <Text style={styles.recordButtonText}>
          {recording ? "Stop" : "Start"}
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Enter the name of your Recording
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setRecordingName}
              value={recordingName}
              placeholder="Recording Name"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={cancelRecording}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonSave]}
                onPress={saveRecording}
              >
                <Text style={styles.textStyle}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  roundButton: {
    backgroundColor: Colors.secondary,
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderColor: "lightgrey",
    borderWidth: 5,
  },
  recordButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "outfit-bold",
  },
  startRecordingButton: {
    backgroundColor: Colors.secondary,
  },
  stopRecordingButton: {
    backgroundColor: "red",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    margin: 5,
    flex: 1,
  },
  buttonCancel: {
    backgroundColor: Colors.secondaryLight,
  },
  buttonSave: {
    backgroundColor: Colors.secondaryLight,
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontFamily: "outfit-bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  textInput: {
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    fontFamily: "outfit-regular",
  },
});

export default RecordingCard;
