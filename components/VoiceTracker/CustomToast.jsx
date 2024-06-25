import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomToast = ({ text1, text2, ...rest }) => (
  <View style={styles.container}>
    <Ionicons name="checkmark-circle" size={24} color="green" />
    <View style={styles.textContainer}>
      <Text style={styles.text1}>{text1}</Text>
      {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
  text1: {
    fontSize: 16,
    fontFamily: 'outfit-bold',
  },
  text2: {
    fontSize: 14,
    color: 'gray',
    fontFamily: 'outfit',
  },
});

export default CustomToast;