import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-react";
export default function Header({ navigation }) {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    isLoaded && (
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TouchableOpacity>
            <Image
              source={{ uri: user?.imageUrl }}
              style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
            />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "outfit",
              }}
            >
              Hello,
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontFamily: "outfit-semibold",
              }}
            >
              {user?.firstName}
            </Text>
          </View>
        </View>
      </View>
    )
  );
}
