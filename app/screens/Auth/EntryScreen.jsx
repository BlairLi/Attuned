import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
const image = require("../../../assets/images/Splash.jpg");


const EntryScreen = ({ onAccessGranted }) => {
  const [code, setCode] = useState('');

  const verifyAccessCode = () => {
    if (code === 'CORNELL123') {
      onAccessGranted();
    } else {
      alert('Incorrect access code. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={image}
      style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>
          If you are currently enrolled in the research study, please enter your access code below to access the app:
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setCode}
          value={code}
          placeholder="Access code"
        />
        <Button title="Enter" onPress={verifyAccessCode} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    // styles for the instructional text
  },
  input: {
    // styles for the text input
  },
});

export default EntryScreen;
