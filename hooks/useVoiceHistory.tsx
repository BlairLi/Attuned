import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Recording {
  id: string;
  title: string;
  time: string; // ISO timestamp
  sound: null;
  duration: number;
  file: string;
  min_frequency: number;
  average_frequency: number;
  max_frequency: number;
}

// const generateMockData = (): Recording[] => {
//   const now = new Date();
//   const mockData: Recording[] = [];

//   for (let i = 0; i < 30; i++) {
//     const date = new Date(now);
//     date.setMinutes(now.getMinutes() - i * 30); // Generate a recording every 30 minutes
//     mockData.push({
//       id: date.toISOString(),
//       title: `Recording ${i + 1}`,
//       time: date.toISOString(),
//       sound: null,
//       duration: Math.floor(Math.random() * 300) + 60,
//       file: `mockUri_${i}`,
//       min_frequency: Math.floor(Math.random() * 100) + 100,
//       average_frequency: Math.floor(Math.random() * 100) + 150,
//       max_frequency: Math.floor(Math.random() * 100) + 200,
//     });
//   }

//   return mockData;
// };

function useVoiceHistory(range: string = "weekly") {
  const [recordingData, setRecordingData] = useState<Recording[]>([]);
  const [frequencyData, setFrequencyData] = useState({
    average: [] as number[],
    timestamps: [] as string[],
  });

  // 添加新的录音数据
  const addNewRecording = async (newRecording: Recording) => {
    try {
      // 确保时间格式一致
      const formattedRecording = {
        ...newRecording,
        time: new Date(newRecording.time).toLocaleString(), // 使用一致的时间格式
      };

      const existingData = await AsyncStorage.getItem("recordings");
      let updatedRecordings: Recording[] = [];
      
      if (existingData) {
        updatedRecordings = [...JSON.parse(existingData), formattedRecording];
      } else {
        updatedRecordings = [formattedRecording];
      }

      await AsyncStorage.setItem('recordings', JSON.stringify(updatedRecordings));
      setRecordingData(updatedRecordings);
    } catch (error) {
      console.error('Error adding new recording:', error);
    }
  };

  // 获取所有录音数据
  useEffect(() => {
    const fetchRecordingData = async () => {
      try {
        const data = await AsyncStorage.getItem("recordings");
        console.log("data", data);
        if (data) {
          const parsedData = JSON.parse(data) as Recording[];
          setRecordingData(parsedData);
        } else {
          setRecordingData([]);
        }
      } catch (error) {
        console.error('Error fetching recording data:', error);
        setRecordingData([]);
      }
    };

    fetchRecordingData();
  }, []);

  useEffect(() => {
    const calculateAverages = () => {
      // 过滤掉没有频率数据的记录
      const validRecordings = recordingData.filter(rec => rec.average_frequency !== null);
      
      const now = new Date();
      let aggregatedData: { average: number; timestamp: string }[] = [];

      // 辅助函数：将时间字符串转换为 Date 对象
      const parseDate = (timeStr: string) => {
        // 处理 "2024/12/8, 15:33:59" 格式
        const [datePart, timePart] = timeStr.split(", ");
        const [year, month, day] = datePart.split("/").map(Number);
        const [hours, minutes, seconds] = timePart.split(":").map(Number);
        return new Date(year, month - 1, day, hours, minutes, seconds);
      };

      switch (range) {
        case "daily":
          const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          const dailyRecordings = validRecordings
            .filter((rec) => {
              const recTime = parseDate(rec.time);
              return recTime >= last24Hours;
            })
            .sort((a, b) => {
              const timeA = parseDate(a.time).getTime();
              const timeB = parseDate(b.time).getTime();
              return timeA - timeB;
            });

          aggregatedData = dailyRecordings.map((rec) => ({
            average: rec.average_frequency,
            timestamp: parseDate(rec.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }));
          break;

        case "weekly":
          const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          const oneWeekAgo = new Date(now);
          oneWeekAgo.setDate(now.getDate() - 7);

          for (let i = 6; i >= 0; i--) {
            const dayStart = new Date(now);
            dayStart.setDate(now.getDate() - i);
            dayStart.setHours(0, 0, 0, 0);

            const dayEnd = new Date(dayStart);
            dayEnd.setDate(dayStart.getDate() + 1);

            const dayRecordings = validRecordings.filter((rec) => {
              const recTime = parseDate(rec.time);
              return recTime >= dayStart && recTime < dayEnd;
            });

            const avgFrequency =
              dayRecordings.length > 0
                ? dayRecordings.reduce(
                    (sum, rec) => sum + rec.average_frequency,
                    0
                  ) / dayRecordings.length
                : 0;

            aggregatedData.push({
              average: avgFrequency,
              timestamp: weekDays[dayStart.getDay()],
            });
          }
          break;

        case "monthly":
          // 获取过去4周的数据
          for (let week = 4; week >= 1; week--) {
            const weekStart = new Date(now);
            weekStart.setDate(now.getDate() - week * 7);

            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 7);

            const weekRecordings = validRecordings.filter((rec) => {
              const recTime = parseDate(rec.time);
              return recTime >= weekStart && recTime < weekEnd;
            });

            const avgFrequency =
              weekRecordings.length > 0
                ? weekRecordings.reduce(
                    (sum, rec) => sum + rec.average_frequency,
                    0
                  ) / weekRecordings.length
                : 0;

            aggregatedData.push({
              average: avgFrequency,
              timestamp: `Week ${5 - week}`,
            });
          }
          break;

        case "yearly":
          // 获取过去12个月的数据
          const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];

          for (let i = 11; i >= 0; i--) {
            const monthStart = new Date(now);
            monthStart.setMonth(now.getMonth() - i, 1);
            monthStart.setHours(0, 0, 0, 0);

            const monthEnd = new Date(monthStart);
            monthEnd.setMonth(monthStart.getMonth() + 1);

            const monthRecordings = validRecordings.filter((rec) => {
              const recTime = parseDate(rec.time);
              return recTime >= monthStart && recTime < monthEnd;
            });

            const avgFrequency =
              monthRecordings.length > 0
                ? monthRecordings.reduce(
                    (sum, rec) => sum + rec.average_frequency,
                    0
                  ) / monthRecordings.length
                : 0;

            aggregatedData.push({
              average: avgFrequency,
              timestamp: months[monthStart.getMonth()],
            });
          }
          break;
      }

      console.log("Valid Recordings:", validRecordings); // 添加这行来调试
      console.log("Aggregated Data:", aggregatedData);

      setFrequencyData({
        average: aggregatedData.map((d) => d.average),
        timestamps: aggregatedData.map((d) => d.timestamp),
      });
    };

    calculateAverages();
  }, [range, recordingData]);

  return { 
    frequencyData, 
    setRecordingData,
    addNewRecording, // 导出 addNewRecording 函数
    recordingData    // 导出 recordingData 以便查看当前数据
  };
}

export default useVoiceHistory;
