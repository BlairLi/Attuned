import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const LessonDetailScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.carouselContainer}>
          {/* <Image
            style={styles.image}
            source={{ uri: "https://via.placeholder.com/350x150" }}
          />
          <TouchableOpacity style={styles.playButton}>
            <Icon name="play-circle" size={64} color="#FFFFFF" />
          </TouchableOpacity> */}
          {/* <Video
            source={{ uri: "https://www.w3schools.com/html/mov_bbb.mp4" }} 
            style={styles.video}
            controls={true}
            
            onError={(error) => console.error("Video Error: ", error)}
          /> */}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Homework")}>
          <View style={styles.card}>
            <Icon name="book-outline" size={30} color="grey" />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Homework</Text>
              <Text style={styles.cardTime}>Time: 04:00 min</Text>
            </View>
            <TouchableOpacity>
              <Icon name="play-circle" size={30} color="orange" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  carouselContainer: {
    flex: 1,
    height: 200,
    width: "100%",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  playButton: {
    zIndex: 1,
  },
  card: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: 10,
    padding: 20,
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "outfit-semibold",
  },
  cardTime: {
    fontSize: 16,
    color: "grey",
    fontFamily: "outfit-light",
  },
});

export default LessonDetailScreen;
