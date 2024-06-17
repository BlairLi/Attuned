import { View, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Audio } from 'expo-av';

const whiteKeyWidth = 25;
const blackKeyWidth = 15;

const soundPath = '../../../assets/sounds/';

const soundFiles = {
    'F2': require(soundPath + 'F2.mp3'),
    'F#2': require(soundPath + 'Gb2.mp3'),
    'G2': require(soundPath + 'G2.mp3'),
    'G#2': require(soundPath + 'Ab2.mp3'),
    'A2': require(soundPath + 'A2.mp3'),
    'A#2': require(soundPath + 'Bb2.mp3'),
    'B2': require(soundPath + 'B2.mp3'),
    'C3': require(soundPath + 'C3.mp3'),
    'C#3': require(soundPath + 'Db3.mp3'),
    'D3': require(soundPath + 'D3.mp3'),
    'D#3': require(soundPath + 'Eb3.mp3'),
    'E3': require(soundPath + 'E3.mp3'),
    'F3': require(soundPath + 'F3.mp3'),
    'F#3': require(soundPath + 'Gb3.mp3'),
    'G3': require(soundPath + 'G3.mp3'),
    'G#3': require(soundPath + 'Ab3.mp3'),
    'A3': require(soundPath + 'A3.mp3'),
    'A#3': require(soundPath + 'Bb3.mp3'),
    'B3': require(soundPath + 'B3.mp3'),
    'C4': require(soundPath + 'C4.mp3'),
    'C#4': require(soundPath + 'Db4.mp3'),
    'D4': require(soundPath + 'D4.mp3'),
    'D#4': require(soundPath + 'Eb4.mp3'),
    'E4': require(soundPath + 'E4.mp3'),
};


export default function Piano() {
    const [activeKeys, setActiveKeys] = useState({});
    const [sound, setSound] = useState(null);

    //   const blackKeyPositions = [25, 50, 75, 125, 150, 200, 225, 250, 300, 325];
    const whiteKeys = [
        { note: 'F2', freq: 87 },
        { note: 'G2', freq: 97 },
        { note: 'A2', freq: 110 },
        { note: 'B2', freq: 123 },
        { note: 'C3', freq: 130 },
        { note: 'D3', freq: 146 },
        { note: 'E3', freq: 164 },
        { note: 'F3', freq: 174 },
        { note: 'G3', freq: 195 },
        { note: 'A3', freq: 220 },
        { note: 'B3', freq: 246 },
        { note: 'C4', freq: 261 },
        { note: 'D4', freq: 293 },
        { note: 'E4', freq: 329 },
      ];
    const blackKeyPositions = {
        1: 'F#2',
        2: 'G#2',
        3: 'A#2',
        5: 'C#3',
        6: 'D#3',
        8: 'F#3',
        9: 'G#3',
        10: 'A#3',
        12: 'C#4',
        13: 'D#4',
    };



    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const handleKeyPress = async (note) => {
        setActiveKeys((prev) => ({
            ...prev,
            [note]: !prev[note]
        }));

        const { sound } = await Audio.Sound.createAsync(soundFiles[note]);
        setSound(sound);
        console.log('Playing Sound');
        await sound.playAsync();
        setActiveKeys((prev) => ({
            ...prev,
            [note]: !prev[note]
        }));
    };

    return (
        <View style={styles.piano}>
            {/* White keys */}
            {whiteKeys.map(({ note, freq }, index) => (
                <TouchableOpacity
                    key={note}
                    style={[styles.whiteKey, activeKeys[note] && styles.whiteKeyActive]}
                    onPress={() => handleKeyPress(note)}
                >
                    <Text style={styles.keyLabel}>{note}</Text>
                    <Text style={styles.freqLabel}>{freq}</Text>
            </TouchableOpacity>
            ))}
            {/* Black keys */}
            {Object.keys(blackKeyPositions).map((key, index) => (
                <TouchableOpacity
                    key={blackKeyPositions[key]}
                    style={[
                        styles.blackKey,
                        { left: key * whiteKeyWidth - blackKeyWidth / 2 },
                        activeKeys[blackKeyPositions[key]] && styles.blackKeyActive
                    ]}
                    onPress={() => handleKeyPress(blackKeyPositions[key])}
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
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 5,
        position: 'relative',
      },
    whiteKeyActive: {
        backgroundColor: '#CCC',
    },
    keyLabel: {
        fontSize: 10,
        color: 'black',
    },
    freqLabel: {
        fontSize: 10,
        color: 'black',
        position: 'absolute',
        bottom: -15,
      },      
    blackKey: {
        position: 'absolute',
        backgroundColor: 'black',
        width: blackKeyWidth,
        height: blackKeyWidth * 4,
        zIndex: 2,
    },
});
