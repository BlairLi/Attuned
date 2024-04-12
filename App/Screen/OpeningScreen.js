import React from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
const image = require("./../../assets/images/Splash.jpg");


function OpeningScreen({ navigation }) {
  
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
    <ImageBackground
      source={image}
      style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: "100%",
      }}
    >
      
        <View>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 30,
              color: "white",
                textAlign: "center",
            }}
          >
            Welcome to Attuned
          </Text>
        </View> 
        </ImageBackground>
      </TouchableOpacity>
  );
}

export default OpeningScreen;
