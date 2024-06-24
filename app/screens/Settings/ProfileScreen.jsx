import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { Colors } from "@/constants/Colors";
import { storage } from "@/configs/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ProfileScreen = () => {
  const { user, isLoaded } = useUser();
  const [isEditingName, setIsEditingName] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.username || "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Sorry, we need camera roll permissions to make this work!"
        );
      }
    };
    requestPermission();
  }, []);

  if (!isLoaded) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets ? result.assets[0].uri : result.uri;
        if (typeof uri !== "string") {
          throw new Error("Invalid URI");
        }
        const resizedImage = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width: 300, height: 300 } }], // Resize image
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        uploadImage(resizedImage.uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", `Failed to pick image: ${error.message}`);
    }
  };

  const uploadImage = async (uri) => {
    setIsLoading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `profileImages/${user.id}`);

      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Update user profile with the new image URL
      user.imageUrl = downloadURL;

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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileSection}>
          <TouchableOpacity>
            <Image source={{ uri: user?.imageUrl }} style={styles.image} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.editButton} onPress={pickImage}>
            <Text style={styles.editButtonText}>Edit Picture</Text>
          </TouchableOpacity> */}
          <View style={styles.infoContainer}>
            {isEditingName ? (
              <>
                <TextInput
                  style={styles.input}
                  value={newUsername}
                  autoCapitalize="none"
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
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
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    borderColor: Colors.secondary,
    borderWidth: 1,
  },
  editButtonText: {
    fontFamily: "outfit-bold",
    color: Colors.secondary,
  },
  name: {
    fontSize: 22,
    textDecorationLine: "underline",
    fontFamily: "outfit-bold",
    color: Colors.secondary,
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
