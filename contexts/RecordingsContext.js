// RecordingsContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

export const RecordingsContext = createContext();

export const RecordingsProvider = ({ children }) => {
  const [recordings, setRecordings] = useState([]);

  // 加载保存的录音数据
  useEffect(() => {
    const loadRecordings = async () => {
      try {
        const storedRecordings = await AsyncStorage.getItem('recordings');
        if (storedRecordings) {
          const parsedRecordings = JSON.parse(storedRecordings);
          // 重新创建 sound 对象
          const loadedRecordings = await Promise.all(
            parsedRecordings.map(async (rec) => {
              if (rec.file) {
                try {
                  const { sound } = await Audio.Sound.createAsync({ uri: rec.file });
                  return { ...rec, sound };
                } catch (error) {
                  console.log('Error loading sound:', error);
                  return rec;
                }
              }
              return rec;
            })
          );
          setRecordings(loadedRecordings);
        }
      } catch (error) {
        console.error('Error loading recordings:', error);
      }
    };

    loadRecordings();
  }, []);

  // 监听 recordings 变化并保存到 AsyncStorage
  useEffect(() => {
    const saveRecordings = async () => {
      try {
        // 在保存之前移除 sound 对象（因为它不能被序列化）
        const recordingsToSave = recordings.map(rec => ({
          ...rec,
          sound: null
        }));
        await AsyncStorage.setItem('recordings', JSON.stringify(recordingsToSave));
      } catch (error) {
        console.error('Error saving recordings:', error);
      }
    };

    if (recordings.length > 0) {
      saveRecordings();
    }
  }, [recordings]);

  // 添加一个包装函数来处理录音的添加
  const addRecording = async (newRecording) => {
    try {
      const updatedRecordings = [...recordings, newRecording];
      setRecordings(updatedRecordings);
    } catch (error) {
      console.error('Error adding recording:', error);
      throw error;
    }
  };

  return (
    <RecordingsContext.Provider value={{ 
      recordings, 
      setRecordings,
      addRecording 
    }}>
      {children}
    </RecordingsContext.Provider>
  );
};
