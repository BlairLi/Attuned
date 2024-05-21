import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RecordingsContext } from './RecordingsContext';

export default function RecordingScreen() {
  const { recordings } = useContext(RecordingsContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recordings</Text>
      <FlatList
        data={recordings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.recordingItem}>
            <Text style={styles.recordingText}>{item}</Text>
          </View>
        )}
      />
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
