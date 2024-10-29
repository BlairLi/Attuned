import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Helper function to filter recordings by date range
const filterRecordingsByDateRange = (recordings, range) => {
  const now = new Date();
  let filteredRecordings = [];

  switch (range) {
    case "daily":
      filteredRecordings = recordings.filter((recording) => {
        const recordingDate = new Date(recording.time);
        return recordingDate >= new Date(now.setDate(now.getDate() - 1));
      });
      break;

    case "weekly":
      filteredRecordings = recordings.filter((recording) => {
        const recordingDate = new Date(recording.time);
        return recordingDate >= new Date(now.setDate(now.getDate() - 7));
      });
      break;

    case "monthly":
      filteredRecordings = recordings.filter((recording) => {
        const recordingDate = new Date(recording.time);
        return recordingDate >= new Date(now.setMonth(now.getMonth() - 1));
      });
      break;

    default:
      filteredRecordings = recordings;
  }

  return filteredRecordings;
};

function useVoiceHistory(range = "weekly") {
  const [recordingData, setRecordingData] = useState([]);
  const [frequencyData, setFrequencyData] = useState({
    min: [],
    average: [],
    max: [],
  });

  useEffect(() => {
    const fetchRecordingData = async () => {
      const data = await AsyncStorage.getItem("recordings");
      if (data) {
        const parsedData = JSON.parse(data);
        const filteredRecordings = filterRecordingsByDateRange(
          parsedData,
          range
        );
        setRecordingData(filteredRecordings);

        // Extract frequency data for graphing
        const minFrequencies = filteredRecordings.map(
          (rec) => rec.min_frequency
        );
        const averageFrequencies = filteredRecordings.map(
          (rec) => rec.average_frequency
        );
        const maxFrequencies = filteredRecordings.map(
          (rec) => rec.max_frequency
        );

        setFrequencyData({
          min: minFrequencies,
          average: averageFrequencies,
          max: maxFrequencies,
        });
      }
    };

    fetchRecordingData();
  }, [range]);

  return { frequencyData, setRecordingData };
}

export default useVoiceHistory;