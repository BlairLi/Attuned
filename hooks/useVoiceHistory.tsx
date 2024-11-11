import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Recording {
  id: string;
  title: string;
  time: string;
  sound: null;
  duration: number;
  file: string;
  min_frequency: number;
  average_frequency: number;
  max_frequency: number;
}

const generateMockData = (): Recording[] => {
  const now = new Date();
  const mockData: Recording[] = [];

  for (let i = 0; i < 30; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    mockData.push({
      id: date.toISOString(),
      title: `Recording ${i + 1}`,
      time: date.toISOString(),
      sound: null,
      duration: Math.floor(Math.random() * 300) + 60,
      file: `mockUri_${i}`,
      min_frequency: Math.floor(Math.random() * 100) + 100,
      average_frequency: Math.floor(Math.random() * 100) + 150,
      max_frequency: Math.floor(Math.random() * 100) + 200,
    });
  }

  return mockData;
};

function useVoiceHistory(range: string = "weekly") {
  const [recordingData, setRecordingData] = useState<Recording[]>([]);
  const [frequencyData, setFrequencyData] = useState({
    min: [] as number[],
    average: [] as number[],
    max: [] as number[],
  });

  useEffect(() => {
    const fetchRecordingData = async () => {
      const data = await AsyncStorage.getItem("recordings");
      if (!data) {
        const mockData = generateMockData();
        await AsyncStorage.setItem("recordings", JSON.stringify(mockData));
        setRecordingData(mockData);
      } else {
        const parsedData = JSON.parse(data) as Recording[];
        setRecordingData(parsedData);
      }
    };

    fetchRecordingData();
  }, []);

  useEffect(() => {
    const filterAndSetFrequencyData = () => {
      const now = new Date();
      let filteredRecordings: Recording[] = [];

      switch (range) {
        case "weekly":
          filteredRecordings = recordingData.filter((recording) => {
            const recordingDate = new Date(recording.id); // 使用 ISO 格式字段进行日期解析
            return recordingDate >= new Date(now.setDate(now.getDate() - 7));
          });
          break;
        case "monthly":
          filteredRecordings = recordingData.filter((recording) => {
            const recordingDate = new Date(recording.id);
            return recordingDate >= new Date(now.setMonth(now.getMonth() - 1));
          });
          break;
        case "yearly":
          filteredRecordings = recordingData.filter((recording) => {
            const recordingDate = new Date(recording.id);
            return (
              recordingDate >= new Date(now.setFullYear(now.getFullYear() - 1))
            );
          });
          break;
        default:
          filteredRecordings = recordingData;
      }

      const minFrequencies = filteredRecordings
        .map((rec) => rec.min_frequency)
        .filter((value) => isFinite(value));
      const averageFrequencies = filteredRecordings
        .map((rec) => rec.average_frequency)
        .filter((value) => isFinite(value));
      const maxFrequencies = filteredRecordings
        .map((rec) => rec.max_frequency)
        .filter((value) => isFinite(value));

      setFrequencyData({
        min: minFrequencies.length > 0 ? minFrequencies : [0],
        average: averageFrequencies.length > 0 ? averageFrequencies : [0],
        max: maxFrequencies.length > 0 ? maxFrequencies : [0],
      });
    };

    filterAndSetFrequencyData();
  }, [range, recordingData]);

  return { frequencyData, setRecordingData };
}

export default useVoiceHistory;
