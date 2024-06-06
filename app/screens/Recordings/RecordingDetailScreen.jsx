import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const RecordingDetailScreen = ({ navigation }) => {
  // const handlePlay = () => {
  //   try {
  //     // Play a sound file from the app bundle
  //     SoundPlayer.playSoundFile('my_sound', 'mp3');
  //   } catch (e) {
  //     console.log(`cannot play the sound file`, e);
  //   }
  // };

  // const handleStop = () => {
  //   SoundPlayer.stop();
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recording Detail</Text>
      <Text style={styles.description}>This is a detailed view of your recording.</Text>
      <Button title="Play Recording" />
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