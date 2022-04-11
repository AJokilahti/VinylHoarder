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
} from "react-native";
import { discogsApi as key } from "../utils/keys";

export default function Wantlist({ navigation }) {

  const [vinyls, setVinyls] = useState([]);
  const [artist, setArtist] = useState("Nirvana");
  const apiUrl = `https://api.discogs.com/database/search?type=master&artist=${artist}&format=vinyl&${key}`;

  const getVinyls = () => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setVinyls(data.results))
      .catch((error) => {
        Alert.alert("Error", error);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={artist}
          placeholder="Artist"
          onChangeText={(text) => setArtist}
        />
      </View>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={getVinyls}>
              <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.title}
            </Text>
            <Image
              style={{
                width: 30,
                height: 30,
                resizeMode: "contain",
              }}
              source={{
                uri: `${item.thumb}`,
              }}
            />
          </View>
        )}
        data={vinyls}
      />
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
});
