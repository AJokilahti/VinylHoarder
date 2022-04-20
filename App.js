import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from'@react-navigation/native-stack';
import HomeScreen from './components/Home.js';
import LoginScreen from './components/Login.js';

const Stack = createNativeStackNavigator();

export default function App() {
  


  return (
    <NavigationContainer >
        <Stack.Navigator style={styles.container}>
          <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{headerShown: false}}/>
          <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{headerShown: false}}/>
        </Stack.Navigator>
        <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
