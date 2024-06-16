import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TextInput, Modal, Pressable, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';
import { RecordingsContext } from '../Recordings/RecordingsContext';
import Piano from './Piano';

export default function VoiceTrackScreen() {
  const [recording, setRecording] = useState(null);
  const { recordings, setRecordings } = useContext(RecordingsContext);
  const [hasPermission, setHasPermission] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [recordingName, setRecordingName] = useState('Recording');

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Audio.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    requestPermissions();
  }, []);

  const startRecording = async () => {
    if (!hasPermission) {
      console.log('No permission to record audio');
      return;
    }
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access microphone is required!');
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    setRecordingName(recordingName);
    
    let allRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    const duration = getDurationFormatted(status.durationMillis);
    console.log('Duration:', duration);
    
    // Check if the recording duration is 0:00
    if (duration == '0:00') {
      alert('Your recording is too short! Please try again.');
      setRecording(null);
      setModalVisible(!modalVisible);
      return;
    }

    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
      
    // Upload the recording
    const [min, max] = await uploadRecording(uri);
    console.log('Min:', min, 'Max:', max);
    
    allRecordings.push({
      id: allRecordings.length + 1,
      title: recordingName,
      time: new Date().toLocaleString(),
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: uri,
      min_frequency: min,
      max_frequency: max,
    });
    setRecordings(allRecordings);
    setRecording(null);
    console.log('Recording stopped');
    setModalVisible(!modalVisible);
  };

  const uploadRecording = async (uri) => {
    const formData = new FormData();
    formData.append('file', {
      uri,
      name: 'recording.m4a',
      type: 'audio/m4a',
    });
    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Frequency analysis:', response.data);
      const frequency= response.data
      const min = frequency['min_frequency']
      const max = frequency['max_frequency']
      return [min, max];
    } catch (error) {
      console.error('Failed to upload recording:', error);
    }
  };

  const openModal = async () => {
    setModalVisible(true);
    console.log('Stopping recording..');
    await recording.stopAndUnloadAsync();
  };

  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textBox}>
        Please use the piano keys below to visualize and practice identifying your baseline pitch and working towards your target pitch by using the skills demonstrated in the exercises.
      </Text>
      <Piano />
      <Button title={recording ? 'Stop Recording' : 'Start Recording'} onPress={recording ? openModal : startRecording} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter the name of your Recording</Text>
            <TextInput
              style={styles.textBox}
              onChangeText={setRecordingName}
              value={recordingName}
              placeholder="Recording Name"
            />
            <Pressable style={[styles.button, styles.buttonClose]} onPress={stopRecording}>
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    fontFamily: "Outfit-Light",
    fontSize: 18,
    width: 300,
    height: 150,
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
