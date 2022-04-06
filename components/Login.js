import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import HomeScreen from "./Home.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { withTheme } from "react-native-elements";
import { auth } from "../firebase.js";

const Stack = createNativeStackNavigator();

export default function Login({ navigation }) {
  // Add login screen implementing Firebase auth

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user.userEmail);
      })
      .catch(error => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={userEmail}
          onChangeText={text=> setUserEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={userPassword}
          onChangeText={text=> setUserPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {  }} style={styles.loginButton}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.registerButton, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: '80%',
    
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: "center",
    alignItems: "center",
    marginTop:40,
  },
  loginButton: {
    backgroundColor: "green",
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  registerButton: {
    backgroundColor: "blue",
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight:'700',
    fontSize: 16,
  },
  
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight:'700',
    fontSize: 16,
  },
});
