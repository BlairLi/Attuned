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

  const screenWidth = Dimensions.get("window").width;

  // Helper function to format data based on range
  const formatChartData = () => {
    console.log("Current frequencyData:", frequencyData);
    let labels = [];
    let data = frequencyData.average;

    // If no valid data is present, set default labels and data
    if (data.length === 0 || data.some((d) => !isFinite(d))) {
      labels = ["N/A"];
      data = [0];
    } else {
      switch (range) {
        case "weekly":
          labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
          data = data.slice(-7);
          break;
        case "monthly":
          labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
          data = data.slice(-4);
          break;
        case "yearly":
          labels = [
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
          data = data.slice(-12);
          break;
        default:
          break;
      }
    }

    return {
      labels,
      datasets: [
        {
          data,
          color: (opacity = 1) => `#6acdd1`,
          strokeWidth: 1.5,
        },
      ],
    };
  };

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
        <TouchableOpacity
          title="Past Week"
          onPress={() => setRange("yearly")}
          style={[
            styles.rangeButton,
            range === "yearly" && styles.selectedButton,
          ]}
        >
          <Text style={styles.rangeButtonText}>Past Year</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.graphHeader}>Pitch Tracker (Hz)</Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={formatChartData()}
          width={screenWidth * 0.95}
          height={280}
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
    width: "30%",
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

export default PitchTrackerScreen;
