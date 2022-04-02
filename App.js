import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from'@react-navigation/native-stack';
//import HomeScreen from '.components/Home.js';
import LoginScreen from '.components/Login.js';

const Stack = createNativeStackNavigator();

export default function App() {
  


  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>VinylHoarder</Text>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen}/>
        </Stack.Navigator>
        <StatusBar style="auto" />
      </View>
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
