import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    let errors = {};

    // Current password shouldn't be empty
    if (!currentPassword) {
      errors.currentPassword = "Current password is required";
      valid = false;
    }

    // Check new password length and if it's not the same as the current password
    if (!newPassword || newPassword.length < 8) {
      errors.newPassword = "New password must be at least 8 characters long";
      valid = false;
    } else if (newPassword === currentPassword) {
      errors.newPassword =
        "New password must be different from the current password";
      valid = false;
    }

    // Check if confirmation matches the new password
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handlePasswordChange = () => {
    if (validateForm()) {
      // Call API to change password
      Alert.alert("Success", "Password successfully changed.");
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 20,
        }}
      >
        <Text style={styles.label}>Current Password:</Text>
        <TextInput
          style={[styles.input, errors.currentPassword && styles.errorInput]}
          value={currentPassword}
          onChangeText={(text) => {
            setCurrentPassword(text);
            setErrors((prev) => ({ ...prev, currentPassword: null }));
          }}
          secureTextEntry
          placeholder="Enter current password"
        />
        {errors.currentPassword && (
          <Text style={styles.errorText}>{errors.currentPassword}</Text>
        )}

        <Text style={styles.label}>New Password:</Text>
        <TextInput
          style={[styles.input, errors.newPassword && styles.errorInput]}
          value={newPassword}
          onChangeText={(text) => {
            setNewPassword(text);
            setErrors((prev) => ({ ...prev, newPassword: null }));
          }}
          secureTextEntry
          placeholder="Enter new password"
        />
        {errors.newPassword && (
          <Text style={styles.errorText}>{errors.newPassword}</Text>
        )}

        <Text style={styles.label}>Confirm New Password:</Text>
        <TextInput
          style={[styles.input, errors.confirmPassword && styles.errorInput]}
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setErrors((prev) => ({ ...prev, confirmPassword: null }));
          }}
          secureTextEntry
          placeholder="Confirm new password"
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontFamily: "outfit-semibold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    fontFamily: "outfit-regular",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    fontFamily: "outfit-regular",
    fontSize: 14,
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontFamily: "outfit-bold",
    color: "white",
    fontSize: 16,
  },
});

export default ChangePasswordScreen;
