import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
const image = require("./../../assets/images/Splash.jpg");


// function OpeningScreen({ navigation }) {

//   return (
//     <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//     <ImageBackground
//       source={image}
//       style={{
//         flex: 1,
//         resizeMode: "cover",
//         justifyContent: "center",
//         width: "100%",
//       }}
//     >

//         <View>
//           <Text
//             style={{
//               fontFamily: "outfit-bold",
//               fontSize: 30,
//               color: "white",
//                 textAlign: "center",
//             }}
//           >
//             Welcome to Attuned
//           </Text>
//         </View> 
//         </ImageBackground>
//       </TouchableOpacity>
//   );
// }

// export default OpeningScreen;


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
        <Button title="Done" onPress={verifyAccessCode} />
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

