import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EditScreenInfo from '@/components/EditScreenInfo';

const EntryPage = () => {
const [code, setCode] = useState('');
const navigation = useNavigation();

const handleCodeSubmit = () => {
    const isValidCode = code === 'CORNELL123';

    if (isValidCode) {
      return (<EditScreenInfo path="app/(tabs)/two.tsx" />);
    } else {
        Alert.alert('Invalid Code', 'The code you entered is not valid. Please try again.');
    }
};

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>
        If you are currently enrolled in the research study, please enter your access code below to access the app:
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setCode}
        value={code}
        placeholder="Enter your access code"
        keyboardType="default" // Change this to numeric if your code is numeric
      />
      <Button title="Done" onPress={handleCodeSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  instructionText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%', // Set the width as per your design
    borderRadius: 5, // Optional: if you want rounded corners
  },
});

export default EntryPage;
