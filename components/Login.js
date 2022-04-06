import React, {useState} from 'react';
import { View, Text, Button, TextInput, Image } from 'react-native';
import HomeScreen from './Home.js'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from'@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Login({navigation}){
    // Add login screen implementing Firebase auth

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    
    return (

        <View>
        <TextInput label></TextInput>
        
        <Button 
          title="Sign in"
          onPress={() => navigation.navigate('Home')}
          />
        </View>
    )
}