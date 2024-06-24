import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LessonsContext = createContext();

export const LessonsProvider = ({ children }) => {
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    const loadCompletedLessons = async () => {
      try {
        const storedCompletedLessons = await AsyncStorage.getItem(
          "completedLessons"
        );
        if (storedCompletedLessons) {
          setCompletedLessons(JSON.parse(storedCompletedLessons));
        }
      } catch (error) {
        console.error(
          "Failed to load completed lessons from local storage",
          error
        );
      }
    };

    loadCompletedLessons();
  }, []);

  const setLessonCompleted = async (lesson) => {
    const updatedCompletedLessons = [...completedLessons, lesson];
    setCompletedLessons(updatedCompletedLessons);
    try {
      await AsyncStorage.setItem(
        "completedLessons",
        JSON.stringify(updatedCompletedLessons)
      );
    } catch (error) {
      console.error("Failed to save completed lessons to local storage", error);
    }
  };

  return (
    <LessonsContext.Provider value={{ completedLessons, setLessonCompleted }}>
      {children}
    </LessonsContext.Provider>
  );
};
