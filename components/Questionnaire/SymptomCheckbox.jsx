import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

const SymptomCheckbox = ({ label, value, onValueChange, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.checkboxContainer, disabled && styles.disabled]}
      onPress={() => onValueChange(!value)}
      disabled={disabled}
    >
      <Text style={styles.label}>{label}</Text>
      <Checkbox
        value={value}
        onValueChange={() => onValueChange(!value)}
        style={styles.checkbox}
        disabled={disabled}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  disabled: {
    opacity: 0.5,
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: 'outfit',
  },
});

export default SymptomCheckbox;