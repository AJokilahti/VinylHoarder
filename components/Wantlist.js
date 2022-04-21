import React, { useState, useEffect } from "react";
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
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { discogsApi as key } from "../utils/keys";
import { auth, database } from "../firebase.js";
import { getDatabase, push, ref, onValue } from "firebase/database";
import "firebase/database";
import ItemSeparator from "./ItemSeparator";

export default function Wantlist({ navigation }) {

  const [items, setItems] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const itemsRef = ref(database, "wantlist/");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      setItems(Object.values(data));
    });
  }, []);

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
          <Ionicons name="disc" size="40px" color="white" />
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
        onPress={() => console.log(`DELETE FROM WANTLIST`)} // addToCollection(item)
      >
          <Ionicons name="trash" size="40px" color="white" />
      </TouchableOpacity>
    );
  };

  const ItemSep = () => {
    return(
      <View style={styles.separator} />
    )
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      
      <FlatList
        style={styles.list}
        keyExtractor={(item, index) => index.toString()}
        
        renderItem={({ item }) => {
          if (item.user === auth.currentUser.uid) {
            return(
          <GestureHandlerRootView>
            <Swipeable
              renderLeftActions={() => leftActions(item)}
              renderRightActions={() => rightActions(item)}
            >
              <ItemSeparator/>
              <View style={styles.listItem}>
                <Text style={styles.listText}>{item.itemTitle}</Text>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: "contain",
                  }}
                  source={{
                    uri: `${item.itemImg}`,
                  }}
                />
                
              </View>
              
            </Swipeable>
          </GestureHandlerRootView>
          
            )
        }}}
        data={items}
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
