import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = () => {
  const { user, isLoaded, setProfileImage } = useUser();
  const [isEditingName, setIsEditingName] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.username || "");
  const [isLoading, setIsLoading] = useState(false);

  if (!isLoaded) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    setIsLoading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const imageResource = await user.setProfileImage({ file: blob });
      Alert.alert("Success", "Profile picture updated successfully!");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      Alert.alert("Error", `Failed to update profile picture:${error.message}`);
    }
    setIsLoading(false);
  };

  const handleEditUsername = async () => {
    if (newUsername.trim() === "") {
      Alert.alert("Error", "Username cannot be empty.");
      return;
    }
    try {
      await user.update({ username: newUsername });

      setIsEditingName(false);
      Alert.alert("Success", "Username updated successfully!");
    } catch (error) {
      console.error("Error updating username:", error);
      console.log(user.username);
      Alert.alert("Error", `Failed to update username:${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: user?.imageUrl }} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={pickImage}>
          <Text style={styles.editButtonText}>Edit Picture</Text>
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          {isEditingName ? (
            <>
              <TextInput
                style={styles.input}
                value={newUsername}
                onChangeText={setNewUsername}
                placeholder="Enter new username"
              />
              <TouchableOpacity onPress={handleEditUsername}>
                <Icon name="checkmark" size={25} color="green" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsEditingName(false)}>
                <Icon name="close" size={25} color="red" />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.nameContainer}
              onPress={() => setIsEditingName(true)}
            >
              <Text style={styles.name}>
                {user?.username || "Click to add your username"}
              </Text>
              <Icon name="create" size={25} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>
        {isLoading && <Text style={styles.loading}>Updating...</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  profileSection: {
    alignItems: "center",
    padding: 20,
    alignContent: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 99,
  },
  editButton: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "lightgray",
    padding: 15,
    borderRadius: 10,
  },
  editButtonText: {
    fontFamily: "outfit-semibold",
    color: "gray",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontFamily: "outfit-light",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    width: 200,
    fontFamily: "outfit-light",
  },
  nameContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  loading: {
    fontFamily: "outfit-semibold",
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
});

export default ProfileScreen;
