import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import styles from "../../css/piano";
import { useState } from 'react';
import { Audio } from 'expo-av';

// const noteAudioFiles = {
//   C: 'c_note.mp3',
//   Db: 'db_note.mp3',
//   // ... other notes
// };

export default function VoiceTrackScreen() {
  const [activeKeys, setActiveKeys] = useState({});

  const playNote = async (note) => {
    // Set the key as active
    setActiveKeys((prevActiveKeys) => ({
      ...prevActiveKeys,
      [note]: true,
    }));

    // Create and load the sound
    const { sound } = await Audio.Sound.createAsync(
      noteAudioFiles[note],
      { shouldPlay: true }
    );

    // Play the sound
    await sound.playAsync();

    // When the sound is done playing, reset the active key and unload the sound
    sound.setOnPlaybackStatusUpdate(async (playbackStatus) => {
      if (playbackStatus.didJustFinish) {
        setActiveKeys((prevActiveKeys) => ({
          ...prevActiveKeys,
          [note]: false,
        }));
        await sound.unloadAsync();
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.screenTitle}>VoiceTrackScreen</Text> */}
      <View style={styles.piano}>
        {/* White keys */}
        {/* <View style={[styles.whiteKey, { marginLeft: 60 }]} /> */}
        {['F2','G2','A2','B2','C3','D3','E3','F3','G3','A3','B3','C4','D4','E4'].map((note) => (
          <TouchableOpacity
            key={note}
            style={[styles.whiteKey, activeKeys[note] && styles.whiteKeyActive]}
            onPress={() => playNote(note)}
          />
        ))}
        {/* Black keys */}
        {/* These black keys should be positioned absolutely over the white keys,
            the positioning may need to be adjusted based on your layout */}
        <View style={[styles.blackKey, { position: 'absolute', left: 25 }]} />
        <View style={[styles.blackKey, { position: 'absolute', left: 50 }]} />
        <View style={[styles.blackKey, { position: 'absolute', left: 75 }]} />
        <View style={[styles.blackKey, { position: 'absolute', left: 125 }]} />
        <View style={[styles.blackKey, { position: 'absolute', left: 150 }]} />
        <View style={[styles.blackKey, { position: 'absolute', left: 200 }]} />
        <View style={[styles.blackKey, { position: 'absolute', left: 225 }]} />
        <View style={[styles.blackKey, { position: 'absolute', left: 250 }]} />
        <View style={[styles.blackKey, { position: 'absolute', left: 300 }]} />
        <View style={[styles.blackKey, { position: 'absolute', left: 325 }]} />
      </View>
    </View>
  );
}