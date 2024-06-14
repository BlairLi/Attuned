import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

const whiteKeyWidth = 25;
const blackKeyWidth = 15;
export default function Piano() {
    const [activeKeys, setActiveKeys] = useState({});
    const blackKeyPositions = [25, 50, 75, 125, 150, 200, 225, 250, 300, 325];
    const whiteKeys = ['F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4'];
    

    const handleKeyPress = (note) => {
        setActiveKeys((prev) => ({
            ...prev,
            [note]: !prev[note]
        }));
    };

    return (
        <View style={styles.piano}>
            {/* White keys */}
            {whiteKeys.map((note, index) => (
                <TouchableOpacity
                    key={note}
                    style={[styles.whiteKey, activeKeys[note] && styles.whiteKeyActive]}
                    onPress={() => handleKeyPress(note)}
                />
            ))}
            {/* Black keys */}
            {blackKeyPositions.map((left, index) => (
                <View
                    key={index}
                    style={[styles.blackKey, { left: left - blackKeyWidth / 2 }]}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    piano: {
        flexDirection: 'row',
        position: 'relative',
    },
    whiteKey: {
        backgroundColor: 'white',
        borderColor: '#333',
        borderWidth: 1,
        width: whiteKeyWidth,
        height: whiteKeyWidth * 4,
    },
    whiteKeyActive: {
        backgroundColor: '#CCC',
    },
    blackKey: {
        position: 'absolute',
        backgroundColor: 'black',
        width: blackKeyWidth,
        height: blackKeyWidth * 4,
        zIndex: 2,
    },
});
