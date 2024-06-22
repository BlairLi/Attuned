import React, { useState, useContext, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RecordingsContext } from "./RecordingsContext";
import { SelectedRecordingContext } from "./SelectedRecordingContext";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const RecordingsScreen = ({ navigation }) => {
  const { recordings, setRecordings } = useContext(RecordingsContext);
  const { setSelectedRecording } = useContext(SelectedRecordingContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(recordings);

  // Load recordings from AsyncStorage when component mounts
  useEffect(() => {
    const loadRecordings = async () => {
      try {
        const storedRecordings = await AsyncStorage.getItem("recordings");
        if (storedRecordings) {
          setRecordings(JSON.parse(storedRecordings));
        }
      } catch (error) {
        console.error("Failed to load recordings from AsyncStorage", error);
      }
    };
    loadRecordings();
  }, []);

  // Update search results when recordings change
  useEffect(() => {
    setSearchResults(recordings);
  }, [recordings]);

  // Search recordings by title
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const newData = recordings.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(newData);
    } else {
      setSearchResults(recordings);
    }
  };

  // Delete recording from list and AsyncStorage
  const deleteItem = async (id, rowMap) => {
    console.log("Deleting item with id: ", id);
    if (rowMap[id]) {
      rowMap[id].closeRow();
    }
    const newData = recordings.filter((item) => item.id !== id);
    setRecordings(newData);
    await AsyncStorage.setItem("recordings", JSON.stringify(newData));
  };

  const renderItem = (data) => (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={1}
      onPress={() => {
        setSelectedRecording(data.item);
        navigation.navigate("RecordingDetail");
      }}
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
      {searchResults.length === 0 ? (
        <View style={styles.noRecordingsContainer}>
          <Text style={styles.noRecordingsText}>No recordings</Text>
        </View>
      ) : (
        <SwipeListView
          data={searchResults}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-75}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          disableRightSwipe
          contentContainerStyle={styles.listContainer}
        />
      )}
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
  noRecordingsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noRecordingsText: {
    fontSize: 20,
    color: "gray",
    fontFamily: "outfit-light",
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
