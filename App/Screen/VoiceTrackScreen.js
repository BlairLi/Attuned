import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import React from 'react';
import styles from "../../css/piano";
import { useState, useEffect, useRef, useContext } from 'react';
import { Audio } from 'expo-av';
import { GLView } from 'expo-gl';
import FFT from 'fft.js';
import { RecordingsContext } from './RecordingsContext';


export default function VoiceTrackScreen() {
  const [activeKeys, setActiveKeys] = useState({});
  const [recording, setRecording] = useState(null);
  const {recordings, setRecordings} = useContext(RecordingsContext);
  const [note, setNote] = useState('');
  const [hasPermission, setHasPermission] = useState(false);
  const glContextRef = useRef(null);
  const blackKeyPositions = [25, 50, 75, 125, 150, 200, 225, 250, 300, 325];


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

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            Recording #{index + 1} | {recordingLine.duration}
          </Text>
          <Button onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
        </View>
      );
    });
  }

  // TODO: it only remove the recording, not removing the recording from storage
  function clearRecordings() {
    setRecordings([])
  }
  
  const processAudio = async (buffer) => {
    // Helper function to find the nearest power of two
    const nearestPowerOfTwo = (n) => {
      return Math.pow(2, Math.ceil(Math.log2(n)));
    };

    // Convert ArrayBuffer to Float32Array
    const originalBuffer = new Float32Array(buffer);

    const bufferLength = nearestPowerOfTwo(originalBuffer.length);
    const floatBuffer = new Float32Array(bufferLength);

    // Copy the buffer into a new Float32Array, zero-padding if necessary
    for (let i = 0; i < bufferLength; i++) {
      floatBuffer[i] = originalBuffer[i] || 0;
    }

    const fft = new FFT(bufferLength);
    const out = fft.createComplexArray();
    fft.realTransform(out, floatBuffer);
    fft.completeSpectrum(out);

    // Here you would process the FFT data to detect the note
    // For simplicity, we are just logging the data
    // TODO: No output for this console.log
    console.log('processAudio-out: ', out);

    drawGL(out);
  };

  const drawGL = (data) => {
    const gl = glContextRef.current;
    if (!gl) return;

    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;

    // Clear the canvas
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Set up viewport
    gl.viewport(0, 0, width, height);

    // Example to draw the FFT data
    // This is just an example. You need to write shaders and buffer the data correctly
    // Refer to WebGL documentation for detailed steps

    // Initialize shaders, buffers, and other WebGL setups here...

    // Example code for drawing a simple line using FFT data
    gl.lineWidth(2);
    gl.begin(gl.LINE_STRIP);
    for (let i = 0, n = data.length / 2; i < n; i++) {
      const x = (i / n) * width;
      const y = height - (data[2 * i] + data[2 * i + 1]) * height / 2;
      gl.vertex2f(x, y);
    }
    gl.end();
    gl.flush();
  };


  return (
    <View style={styles.container}>
      {/* <Text style={styles.screenTitle}>VoiceTrackScreen</Text> */}
      <View style={styles.piano}>
        {/* White keys */}
        {/* <View style={[styles.whiteKey, { marginLeft: 60 }]} /> */}
        {['F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4'].map((note) => (
          <TouchableOpacity
            key={note}
            style={[styles.whiteKey, activeKeys[note] && styles.whiteKeyActive]}
          />
        ))}
        {/* Black keys */}
        {/* These black keys should be positioned absolutely over the white keys,
            the positioning may need to be adjusted based on your layout */}
        {blackKeyPositions.map((left, index) => (
          <View key={index} style={[styles.blackKey, { position: 'absolute', left }]} />
        ))}
      </View>
        {note && <Text style={styles.note}>Detected Note: {note}</Text>}
      <View >
        <Button title={recording ? 'Stop Recording' : 'Start Recording'} onPress={recording ? stopRecording : startRecording} />
        {getRecordingLines()}
        <Button title={recordings.length > 0 ? 'Clear Recordings' : ''} onPress={clearRecordings} />
      </View>
      {/* <GLView
        style={styles.glview}
        onContextCreate={(gl) => {
          glContextRef.current = gl; // Correct reference name here
          // Initialize GL settings here if needed
        }}
      /> */}
    </View>
  );
}