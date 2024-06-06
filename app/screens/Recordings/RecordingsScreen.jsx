import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  Platform,
  Alert,
  TextInput,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// replace with data fetched from API
const RecordingsScreen = ({ navigation }) => {
  const [recordings, setRecordings] = useState([
    {
      id: "1",
      title: "Recording 1",
      time: "2 hours ago",
      duration: "2:30 min",
    },
    {
      id: "2",
      title: "Recording 2",
      time: "1 day ago",
      duration: "5:30 min",
    },
    {
      id: "3",
      title: "Recording 3",
      time: "1 week ago",
      duration: "10:30 min",
    },
  ]);
  // search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(recordings);
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const newData = recordings.filter((item) => {
        return item.title.toLowerCase().includes(query.toLowerCase());
      });
      setSearchResults(newData);
    } else {
      setSearchResults(recordings);
    }
  };

  // delete functionality
  const deleteItem = (id, rowMap) => {
    if (rowMap[id]) {
      rowMap[id].closeRow();
    }
    const newData = [...recordings].filter((item) => item.id !== id);
    setRecordings(newData);
  };
  // render recording item
  const renderItem = (data) => (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={1}
      onPress={() => navigation.navigate("RecordingDetail")}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={styles.title}>{data.item.title}</Text>
          <Text style={styles.detail}>{data.item.time}</Text>
          <Text style={styles.detail}>Time: {data.item.duration}</Text>
        </View>
        <View>
          <Icon name="play-circle" size={30} color="orange" />
        </View>
      </View>
    </TouchableOpacity>
  );

  // Delete item on swipe
  const renderHiddenItem = (data, rowMap) => {
    const handleDelete = () => {
      Alert.alert(
        "Delete Recording",
        "Are you sure you want to delete this recording?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "Delete", onPress: () => deleteItem(data.item.id, rowMap) },
        ]
      );
    };
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity style={styles.backRightBtn} onPress={handleDelete}>
          <Text>
            <Icon name="delete" size={30} color="#DD2C00" />
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search here..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <SwipeListView
        data={searchResults}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        disableRightSwipe
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    height: "100%",
  },
  itemContainer: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontFamily: "outfit-semibold",
    fontSize: 18,
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    margin: 10,
    borderRadius: 10,
  },
  detail: {
    fontFamily: "outfit-light",
    color: "grey",
    fontSize: 16,
    marginTop: 5,
  },
  rowBack: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    right: 0,
  },
});

export default RecordingsScreen;
