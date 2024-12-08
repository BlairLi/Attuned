import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Colors } from "@/constants/Colors";
import useVoiceHistory from "@/hooks/useVoiceHistory";

function PitchTrackerScreen() {
  const [range, setRange] = useState("weekly");
  const { frequencyData } = useVoiceHistory(range);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    value: "",
    label: "",
  });
  const screenWidth = Dimensions.get("window").width;

  // 修改格式化数据的函数
  const formatChartData = () => {
    // 确保有数据
    if (!frequencyData.average || frequencyData.average.length === 0) {
      return {
        labels: ["No Data"],
        datasets: [{ data: [0] }],
      };
    }

    return {
      labels: frequencyData.timestamps,
      datasets: [
        {
          data: frequencyData.average,
          color: (opacity = 1) => `rgba(106, 205, 209, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.TrackerContainer}>
        <Text style={styles.chartHeader}>Pitch Tracker (Hz)</Text>
        <View style={styles.chartContainer}>
          <LineChart
            data={formatChartData()}
            width={screenWidth}
            height={280}
            chartConfig={{
              backgroundGradientFrom: "white",
              backgroundGradientTo: "white",
              fillShadowGradientToOpacity: 0,
              fillShadowGradientFromOpacity: 0,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: Colors.primary,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            onDataPointClick={(data) => {
              const label = frequencyData.timestamps[data.index];
              setTooltip({
                visible: true,
                x: data.x,
                y: data.y,
                value: `${Math.round(data.value)} Hz`,
                label,
              });
            }}
          />
          {tooltip.visible && (
            <View
              style={[
                styles.tooltip,
                { top: tooltip.y - 300, left: tooltip.x },
              ]}
            >
              <Text style={styles.tooltipText}>{tooltip.label}</Text>
              <Text style={styles.tooltipText}>{tooltip.value}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.rangeContainer}>
        <TouchableOpacity
          style={[
            styles.rangeButton,
            range === "daily" && styles.selectedButton,
          ]}
          onPress={() => setRange("daily")}
        >
          <Text style={styles.rangeButtonText}>Day</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.rangeButton,
            range === "weekly" && styles.selectedButton,
          ]}
          onPress={() => setRange("weekly")}
        >
          <Text style={styles.rangeButtonText}>Week</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.rangeButton,
            range === "monthly" && styles.selectedButton,
          ]}
          onPress={() => setRange("monthly")}
        >
          <Text style={styles.rangeButtonText}>Month</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.rangeButton,
            range === "yearly" && styles.selectedButton,
          ]}
          onPress={() => setRange("yearly")}
        >
          <Text style={styles.rangeButtonText}>Year</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  TrackerContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  chartHeader: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: "outfit-bold",
  },
  chartContainer: {
    marginTop: 20,
    marginRight: 20,
  },
  rangeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "95%",
    position: "absolute",
    bottom: 50,
  },
  rangeButton: {
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 5,
    width: "20%",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: Colors.secondary,
  },
  rangeButtonText: {
    fontFamily: "outfit",
    fontSize: 15,
  },
  tooltip: {
    width: 65,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  tooltipText: {
    fontFamily: "outfit",
  },
});

export default PitchTrackerScreen;
