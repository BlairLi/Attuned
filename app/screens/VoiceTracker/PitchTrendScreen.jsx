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
const weeklyData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [10, 45, 28, 80, 99, 43, 50],
      color: (opacity = 1) => `#6acdd1`, // optional
      strokeWidth: 1.5, // optional
    },
  ],
};

const monthlyData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      data: [10, 45, 28, 80],
      color: (opacity = 1) => `#6acdd1`, // optional
      strokeWidth: 1.5, // optional
    },
  ],
};
function PitchTrendScreen() {
  const [range, setRange] = useState("weekly");

  const screenWidth = Dimensions.get("window").width;
  return (
    <View style={styles.container}>
      <View style={styles.rangeContainer}>
        <TouchableOpacity
          title="Past Week"
          onPress={() => setRange("weekly")}
          style={[
            styles.rangeButton,
            range === "weekly" && styles.selectedButton,
          ]}
        >
          <Text style={styles.rangeButtonText}>Past Week</Text>
        </TouchableOpacity>
        <TouchableOpacity
          title="Past Month"
          onPress={() => setRange("monthly")}
          style={[
            styles.rangeButton,
            range === "monthly" && styles.selectedButton,
          ]}
        >
          <Text style={styles.rangeButtonText}>Past Month</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.graphHeader}>Picth Frequency Graph</Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={range === "weekly" ? weeklyData : monthlyData}
          width={screenWidth * 0.9}
          height={250}
          yAxisSuffix="Hz"
          chartConfig={{
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            fillShadowGradientToOpacity: 0,
            fillShadowGradientFromOpacity: 0,
            decimalPlaces: 2, // optional, defaults to 2dp
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
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  graphHeader: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "outfit",
    marginBottom: 30,
  },
  chartContainer: {
    marginVertical: 8,
    borderRadius: 16,
  },
  rangeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    position: "absolute",
    top: 40,
  },
  rangeButton: {
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: Colors.secondary,
  },
  rangeButtonText: {
    fontFamily: "outfit",
    fontSize: 16,
  },
});

export default PitchTrendScreen;
