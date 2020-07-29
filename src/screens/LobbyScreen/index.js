import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import { ContactBox } from '../../components/index';
import styles from './styles';

const credentials = {
    clientId: '708721798217-q21i9fuonigsimj0jipe7noof9qmpdov.apps.googleusercontent.com',
    appId: '1:708721798217:ios:0ac6e691eb7c4f6e82639',
    apiKey: 'AIzaSyCitQXz93CbQRJzvqKHnfkPtpXufJFM7TY',
    databaseURL: 'https://quicha-25dc8.firebaseio.com',
    storageBucket: 'quicha-25dc8.appspot.com',
    messagingSenderId: '708721798217',
    projectId: 'quicha-25dc8',
};

const config = {
  name: 'quicha',
};

export default function LobbyScreen({ navigation }) {
    const [users, setUsers] = useState([]);

    const getInfo = async () => {
        await firebase.initializeApp(credentials, config);
        firebase.database().ref('/users').once('value')
        .then(snapshot => {
            setUsers(snapshot.val().name);
        });
    }

    useEffect(() => {getInfo()}, []);

    userList = () => {
        console.log(users);
        return users.map((data) => ContactBox(data, () => {
            navigation.navigate('Chat');
        }));
    
    }

    return (
      <View style={styles.container}>
        {userList()}
      </View>
    );
}