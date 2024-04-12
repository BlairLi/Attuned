import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useUser } from "@clerk/clerk-react";
import Icon from "react-native-vector-icons/Ionicons"; // Choose the correct icon set
const PersonalTab = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={{ uri: user?.imageUrl }}
            style={{ width: 80, height: 80, borderRadius: 99 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={() => {}}>
          <Text
          style={{
            fontFamily: "outfit-semibold",
          }}>Edit Picture</Text>
        </TouchableOpacity>
        {/* edit name */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 30,
          }}
        >
          <Text style={styles.name}>{user.fullName}</Text>
          <Icon name="create" size={25} onPress={() => {}} />
        </View>
        {/* edit emailAddress */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 20,
          }}
        >
          <Text style={styles.name}>
            {user.primaryEmailAddress.emailAddress}
          </Text>
          <Icon name="create" size={25} onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontFamily: "outfit",
  },
  profileSection: {
    alignItems: "center",
    padding: 20,
  },
  editButton: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontFamily: "outfit-light",
  },
});

export default PersonalTab;
