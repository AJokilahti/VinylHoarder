import "firebase/database";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth, database } from "../firebase.js";
import ItemSeparator from "./ItemSeparator";

import { addTo, deleteFrom, validateValues } from "./Service"

export default function Wantlist({ navigation }) {
  const [items, setItems] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const itemsRef = ref(database, "wantlist/");
    onValue(itemsRef, (snapshot) => {
      
      setItems(validateValues(snapshot));
    });
  }, []);

  const leftActions = (item) => {
    /*const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })*/
    return (
      <TouchableOpacity
        style={styles.leftAction}
        onPress={() => {
          if(addTo(item, "collection"))
            deleteFrom(item, "wantlist")
          
        }}
      >
        <Ionicons name="disc" size={40} color="white" />
      </TouchableOpacity>
    );
  };

  const rightActions = (item) => {
    /*const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })*/
    return (
      <TouchableOpacity
        style={styles.rightAction}
        onPress={() => deleteFrom(item, "wantlist")} // addToCollection(item)
      >
        <Ionicons name="trash" size={40} color="white" />
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ItemSeparator />
      <FlatList
        style={styles.list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          if (item.user === auth.currentUser.uid) {
            return (
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
                  <ItemSeparator />
                </Swipeable>
              </GestureHandlerRootView>
            );
          }
        }}
        data={items}
      />
      <ItemSeparator />
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
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
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
    width: "100%",
    backgroundColor: "white",
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
    backgroundColor: "green",
    justifyContent: "center",
  },
  rightAction: {
    backgroundColor: "red",
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
