import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { SelectedRecordingContext } from './SelectedRecordingContext';

const RecordingDetailScreen = ({ navigation }) => {
  // const { recording } = route.params;
  const { selectedRecording } = useContext(SelectedRecordingContext);

  if (!selectedRecording) {
    return (
      <View style={styles.container}>
        <Text>No recording selected</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Recording Detail</Text>
      <Text style={styles.description}>This is a detailed view of your recording.</Text> */}
      <Text style={styles.title}>{selectedRecording.title}</Text>
      <Text style={styles.detail}>Time: {selectedRecording.time}</Text>
      <Text style={styles.detail}>Min Frequency: {selectedRecording.min_frequency}</Text>
      <Text style={styles.detail}>Max Frequency: {selectedRecording.max_frequency}</Text>
      <Text style={styles.detail}>Duration: {selectedRecording.duration}</Text>
      <Button title="Play Recording" onPress={() => selectedRecording.sound.replayAsync()}/>
      <Button title="Stop Recording" />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default RecordingDetailScreen;