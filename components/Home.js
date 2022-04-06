import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Wantlist from "./Wantlist.js";
import Search from "./Search.js";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
  return (
    
      <Tab.Navigator
        style={styles.container}
        screenOptions={{
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          
        }}
      >
        <Tab.Screen name="Wantlist" component={Wantlist} />
        <Tab.Screen name="Search" component={Search} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
