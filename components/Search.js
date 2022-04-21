import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { ListItem } from "react-native-elements";
import { discogsApi as key } from "../utils/keys";
import { auth, database } from "../firebase.js";
import { getDatabase, push, ref, onValue } from "firebase/database";
import "firebase/database";
import Ionicons from "react-native-vector-icons/Ionicons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Search({ navigation }) {
  const [vinyls, setVinyls] = useState([]);
  const [artist, setArtist] = useState("");
  const apiUrl = `https://api.discogs.com/database/search?type=master&artist=${artist}&format=vinyl&${key}`;

  const getVinyls = () => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setVinyls(data.results))
      .catch((error) => {
        Alert.alert("Error", error);
      });
  };

  const addToWantList = (item) => {
    console.log(`Added to WANTLIST ${item.title}`);

    push(ref(database,'wantlist/'), {
      'itemTitle': item.title,
      'itemImg': item.thumb,
      'user': auth.currentUser.uid,
    });
  };

  const addToCollection = (item) => {
    console.log(`Added to COLLECTION ${item.title}`);

    push(ref(database,'collection/'), {
      'itemTitle': item.title,
      'itemImg': item.thumb,
      'user': auth.currentUser.uid,
    });
  };

  const leftActions = (item) => {
    /*const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })*/
    console.log(item.title);
    return (
      <TouchableOpacity
        style={styles.leftAction}
        onPress={() => addToWantList(item)}
      >
        
          <Ionicons name="eye" size="40px" color="white" />
      </TouchableOpacity>
    );
  };

  const rightActions = (item) => {
    /*const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })*/
    console.log(item.title);
    return (
      <TouchableOpacity
        style={styles.rightAction}
        onPress={() => addToCollection(item)}
      >
        
          <Ionicons name="disc" size="40px" color="white" />
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Artist"
          onChangeText={(text) => setArtist(text)}
        />
      </View>
      <View style={styles.searchButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={getVinyls}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        renderItem={({ item }) => (
          <GestureHandlerRootView>
            <Swipeable
              renderLeftActions={() => leftActions(item)}
              renderRightActions={() => rightActions(item)}
            >
              <View style={styles.listItem}>
                <Text style={styles.listText}>{item.title}</Text>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: "contain",
                  }}
                  source={{
                    uri: `${item.thumb}`,
                  }}
                />
              </View>
            </Swipeable>
          </GestureHandlerRootView>
        )}
        data={vinyls}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  searchButtonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "green",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  blueButton: {
    backgroundColor: "blue",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  list: {
    marginTop: 10,
    width: "100%",
  },

  listItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 10,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  leftAction: {
    backgroundColor: "#0782F9",
    justifyContent: "center",
  },
  rightAction: {
    backgroundColor: "green",
    justifyContent: "center",
  },
  slideButton: {
    backgroundColor: "green",
    width: "40%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE",
    justifyContent: "center",
  },
});
