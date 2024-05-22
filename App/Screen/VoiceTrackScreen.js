import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import { Audio } from 'expo-av';
import { RecordingsContext } from './RecordingsContext';
import Piano from '../Components/Piano';
import NoteDetector from '../Components/note-detector/note-detector';
import FFT from 'fft.js';

export default function VoiceTrackScreen() {
  const [recording, setRecording] = useState(null);
  const {recordings, setRecordings} = useContext(RecordingsContext);
  const [note, setNote] = useState('Null');
  const [hasPermission, setHasPermission] = useState(false);
  const noteDetector = useRef(null);


  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Audio.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    requestPermissions();
  }, []);


  // useEffect(() => {
  //   if (recording) {
  //     // TODO
  //     note = null
  //     setNote(note);
  //   }
  // }, [recording]);

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
    console.log('Stopping recording..');
    setRecording(null);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    let allRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    allRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: uri
    });
    setRecordings(allRecordings);
    // const buffer = await fetch(uri).then(response => response.arrayBuffer());
    // processAudio(buffer);
    // console.log("ProcessAudio End");
    console.log('Recording stopped');
  };

  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
  }


  return (
    <View style={styles.container}>
      <Piano/>
      {/* <Text>{(note && note.stable) ? hzToNoteString(note.freq): ''}</Text> */}
      <Button title={recording ? 'Stop Recording' : 'Start Recording'} onPress={recording ? stopRecording : startRecording} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#143F6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
});