import { Audio } from 'expo-av';
import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';  
import FFT from 'fft.js';
import { decode } from 'wav-decoder';

export default function App() {
  const [recording, setRecording] = useState(null);


  async function analyzeAudio(uri) {
    try {
      const filePath = RNFS.DocumentDirectoryPath + '/temp.wav';
      await RNFS.copyFile(uri, filePath);
      const player = new Play.er(filePath);
      player.prepare((err) => {
        if (err) {
          console.error('Failed to prepare player:', err);
        } else {
          player.play();
          const frequency = performFFT(player);
          setFrequency(frequency);
          console.log('Detected frequency:', frequency);
        }
      });
    } catch (err) {
      console.error('Failed to analyze audio', err);
    }
  }


  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          interruptionModeIOS: 1,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: 1,
          playThroughEarpieceAndroid: false,
          staysActiveInBackground: true,
        });
        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await recording.startAsync();
        setRecording(recording);
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('Recording stopped and stored at', uri);
      setRecording(null);
      // Pass audio data to FFT analysis
      analyzeAudio(uri);
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  }


  return (
    <View>
      <Button title="Start Recording" onPress={startRecording} />
      <Button title="Stop Recording" onPress={stopRecording} />
    </View>
  );
}
