import styles from "../../css/piano";
import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function Piano() {
    const [activeKeys, setActiveKeys] = useState({});
    const blackKeyPositions = [25, 50, 75, 125, 150, 200, 225, 250, 300, 325];

    return (
        <View style={styles.piano}>
            {/* White keys */}
            {['F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4'].map((note) => (
            <TouchableOpacity
                key={note}
                style={[styles.whiteKey, activeKeys[note] && styles.whiteKeyActive]}
            />
            ))}
            {/* Black keys */}
            {blackKeyPositions.map((left, index) => (
            <View key={index} style={[styles.blackKey, { position: 'absolute', left }]} />
            ))}
        </View>
    );
}