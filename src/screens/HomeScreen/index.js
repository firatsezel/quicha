import React, { useState, useEffect } from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
  } from 'react-native-material-textfield';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
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

function checkFormat(value) {
    return (value.length > 1 && value.length < 13);
}

export default function HomeScreen({ navigation }) {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');

    const getInfo = async () => {
        await firebase.initializeApp(credentials, config);
        firebase.database().ref('/users').once('value')
        .then(snapshot => {
          setUsers(snapshot.val().name);
        });
    }

    useEffect(() => {getInfo()}, []);

    const writedb = () => {
        let tempArray = users;
        tempArray.push(username);
        firebase.database()
        .ref(`/users`)
        .update({
          name: tempArray,
        })
        .then(() => navigation.navigate("Lobby", {
            username
        }));
    }

    return (
        <View style={styles.container}>
            <View style={styles.middleView}>
                <OutlinedTextField
                    style={styles.flexView}
                    label='Username'
                    formatText={username}
                    onChangeText={(value) => setUsername(value)}
                />
                <TouchableOpacity
                    style={styles.buttonView}
                    onPress={() => checkFormat(username) ? writedb() : null}
                ><Text style={styles.textView}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}