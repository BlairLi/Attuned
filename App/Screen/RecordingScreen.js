import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { RecordingsContext } from './RecordingsContext';

export default function RecordingScreen() {
  const { recordings, setRecordings } = useContext(RecordingsContext);


  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            {recordingLine.name} | {recordingLine.duration}
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recordings</Text>
      {getRecordingLines()}
      <Button title={recordings.length > 0 ? 'Clear Recordings' : ''} onPress={clearRecordings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  recordingItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  recordingText: {
    fontSize: 16,
  },
});
