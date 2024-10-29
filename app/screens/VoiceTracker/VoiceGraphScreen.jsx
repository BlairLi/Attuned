import React, { useState } from "react";
import { View, Text, Button } from "react-native";
// import useVoiceHistory from "../../hooks/useVoiceHistory";
// import { LineChart } from "react-native-chart-kit";

function VoiceGraphScreen() {
//   const [range, setRange] = useState("weekly");
//   const { frequencyData } = useVoiceHistory(range);

  return (
    <View>
      <Text>Select Time Range:</Text>
      {/* <Button title="Past Day" onPress={() => setRange("daily")} />
      <Button title="Past Week" onPress={() => setRange("weekly")} />
      <Button title="Past Month" onPress={() => setRange("monthly")} />

      <Text>Frequency Chart</Text>
      <LineChart
        data={{
          labels: frequencyData.min.map((_, index) => `#${index + 1}`),
          datasets: [
            { data: frequencyData.min, label: "Min Frequency" },
            { data: frequencyData.average, label: "Average Frequency" },
            { data: frequencyData.max, label: "Max Frequency" },
          ],
        }}
        width={300}
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
      /> */}
    </View>
  );
}

export default VoiceGraphScreen;
