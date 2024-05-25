import { View, Text, TextInput, Modal, Pressable, StyleSheet, Button, TurboModuleRegistry } from 'react-native';
import React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import { Audio } from 'expo-av';
import { RecordingsContext } from './RecordingsContext';
import Piano from '../Components/Piano';
// import { PitchDetector } from 'react-native-pitch-detector';


// // To get current status
// await PitchDetector.isRecording(); // Promise<true | false>

// // To listener results
// const subscription = PitchDetector.addListener(console.log) // { frequency: 440.14782, tone: "C#" }

// // To stop listen results
// PitchDetector.removeListener()


export default function VoiceTrackScreen() {
  const [recording, setRecording] = useState(null);
  const {recordings, setRecordings} = useContext(RecordingsContext);
  const [note, setNote] = useState('Null');
  const [hasPermission, setHasPermission] = useState(false);
  const noteDetector = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [recording_name, setRecordingName] = useState('Recording');


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
      console.log('Requesting permissions..');
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access microphone is required!');
        return;
      }

      console.log('Starting recording..');


      // To start recording - PitchDetector
      // await PitchDetector.start(); // Promise<void>

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');

      // const recordingInterval = setInterval(async () => {
      //   const { sound } = await recording.createNewLoadedSoundAsync();
      //   const audioBuffer = await sound.getAudioBufferAsync();

      //   const fft = new FFT(audioBuffer.length);
      //   const input = audioBuffer.getChannelData(0);
      //   const out = fft.createComplexArray();
        
      //   fft.realTransform(out, input);
      //   fft.completeSpectrum(out);  // Complete the spectrum if needed

      //   console.log('Frequencies:', out);
        
      //   await sound.unloadAsync();  // Clean up sound instance
      // }, 1000);
      // return () => {
      //   clearInterval(recordingInterval);
      // };
    } catch (err) {
      console.error('Failed to start recording', err);
    };
  }
  
  const stopRecording = async () => {
    setRecordingName(recording_name);
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    let allRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    allRecordings.push({
      name: recording_name,
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: uri
    });
    setRecordings(allRecordings);
    // const buffer = await fetch(uri).then(response => response.arrayBuffer());
    // processAudio(buffer);
    // console.log("ProcessAudio End");
    setRecording(null);
    console.log('Recording stopped');
    setModalVisible(!modalVisible)
  };

  const openModal = async () => {
    setModalVisible(true);
    console.log('Stopping recording..');
    // setRecording(null);
    // To stop recording - PitchDetector
    // await PitchDetector.stop(); // Promise<void>
    await recording.stopAndUnloadAsync();
  }

  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
  }


  return (
    <View style={styles.container}>
      <Text style={styles.textBox}>
        Please use the piano keys below to visuliase and practice identifying your baseline pitch and working towards your target pitch by using the skills demonstrated in the exercises.
      </Text>
      <Piano/>
      {/* <Text>{(note && note.stable) ? hzToNoteString(note.freq): ''}</Text> */}
      <Button title={recording ? 'Stop Recording' : 'Start Recording'} onPress={recording ? openModal : startRecording} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter the name of your Recording</Text>
            <TextInput
              style={styles.textBox}
              onChangeText={setRecordingName}
              value={recording_name}
              placeholder="Recording Name"/>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={stopRecording}>
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
    // backgroundColor: '#143F6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    width: 300,
    height: 150,
    marginTop: 40,
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