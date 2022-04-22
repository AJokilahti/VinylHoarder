import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import Collection from "./Collection.js";
import Search from "./Search.js";
import Wantlist from "./Wantlist.js";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      style={styles.container}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Wantlist") {
            iconName = focused ? "eye" : "eye";
          } else if (route.name === "Collection") {
            iconName = focused ? "disc" : "disc";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",

        initialRouteName: "Search",
      })}
    >
      <Tab.Screen name="Wantlist" component={Wantlist} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Collection" component={Collection} />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "red",
    width: "40%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
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
});
