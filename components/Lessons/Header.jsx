import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";

export default Header = () => {
  const { isLoaded, user } = useUser();
  const navigation = useNavigation();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (isLoaded && user) {
      setImageUrl(user.imageUrl);
    }
  }, [isLoaded, user]);

  return (
    isLoaded && (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              source={{
                uri: user?.imageUrl,
              }}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Text style={styles.profileText}>
              Good{" "}
              {new Date().getHours() < 12
                ? "Morning"
                : new Date().getHours() < 18
                ? "Afternoon"
                : "Evening"}
            </Text>
            <Text style={styles.profileName}>
              {user?.username || user?.primaryEmailAddress.emailAddress}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <Icon name="notifications" size={30} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  image: { width: 50, height: 50, borderRadius: 50 / 2 },
  profileText: {
    fontSize: 18,
    fontFamily: "outfit",
  },
  profileName: {
    fontSize: 20,
    fontFamily: "outfit-semibold",
  },
});
