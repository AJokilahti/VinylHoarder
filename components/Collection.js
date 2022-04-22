import { useNavigation } from "@react-navigation/core";
import "firebase/database";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
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

const Collection = () => {
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsRef = ref(database, "collection/");
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
    console.log(item.title);
    return (
      <TouchableOpacity
        style={styles.rightAction}
        onPress={() => console.log(`DELETE FROM WANTLIST`)} // addToCollection(item)
      >
        <Ionicons name="trash" size={40} color="white" />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text>Email: {auth.currentUser?.email}</Text>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
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
                  <ItemSeparator />
                </Swipeable>
              </GestureHandlerRootView>
            );
          }
        }}
        data={items}
      />
    </View>
  );
};

export default Collection;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "red",
    width: "40%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
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
    backgroundColor: "#0782F9",
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
