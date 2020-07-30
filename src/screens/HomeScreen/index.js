import React, { useState, useEffect } from 'react';
import { Button, View, Text, TouchableOpacity, Alert, Platform, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DropdownAlert from 'react-native-dropdownalert';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
  } from 'react-native-material-textfield';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';;
import styles from './styles';

const credentialsIOS = {
    clientId: '708721798217-q21i9fuonigsimj0jipe7noof9qmpdov.apps.googleusercontent.com',
    appId: '1:708721798217:ios:0ac6e691eb7c4f6e82639',
    apiKey: 'AIzaSyCitQXz93CbQRJzvqKHnfkPtpXufJFM7TY',
    databaseURL: 'https://quicha-25dc8.firebaseio.com',
    storageBucket: 'quicha-25dc8.appspot.com',
    messagingSenderId: '708721798217',
    projectId: 'quicha-25dc8',
};

const credentialsAndroid = {
    clientId: '708721798217-ss5dbnl0aap5t8p2brajvi06fs4e4ffg.apps.googleusercontent.com',
    appId: '1:708721798217:android:1c05b2f1c37de891826398',
    apiKey: 'AIzaSyDunIXUzyLWqNel5H5beGm_4yhpoPmUpBA',
    databaseURL: 'https://quicha-25dc8.firebaseio.com',
    storageBucket: 'quicha-25dc8.appspot.com',
    messagingSenderId: '708721798217',
    projectId: 'quicha-25dc8',
};

const config = {
  name: 'quicha',
};

function checkFormat(value, array) {
    if (array.includes(value)) return { result: false, message: 'This name already taken' };
    if (value.length < 3 || value.length > 15) return { result: false, message: 'Please enter the longest 15 shortest 3-character name.' };
    return { result: true };
}

export default function HomeScreen({ navigation }) {
    const [users, setUsers] = useState([]);
    const [definedUser, setDefinedUser] = useState(false);
    const [username, setUsername] = useState('');

    const getInfo = async () => {
        try {
            if (!firebase.apps.length) {
                await firebase.initializeApp(Platform.OS === 'android' ? credentialsAndroid : credentialsIOS, config);
            }
            firebase.database().ref('/users').once('value')
            .then(snapshot => {
              setUsers(snapshot.val().name);
            });
            const value = await AsyncStorage.getItem('username');
            if(value !== null) {
                setUsername(value);
                setDefinedUser(true);
            } else {
                
            }
        } catch(e) {
            // error reading value
        }
    }

    function handleBackButton() { return true; }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        getInfo();
        return () => { BackHandler.removeEventListener('hardwareBackPress', handleBackButton); }
    }, []);

    const writedb = () => {
        let tempArray = users;
        tempArray.push(username);
        firebase.database()
        .ref(`/users`)
        .update({
          name: tempArray,
        })
        .then(async () => {
            try {
                await AsyncStorage.setItem('username', username);
                navigation.navigate("Lobby", { username });
            } catch (e) {
                // saving error
            }
        });
    }

    return (
        <View style={styles.container}>
            {!definedUser ? 
                <View style={styles.middleView}>
                    <OutlinedTextField
                        style={styles.flexView}
                        label='Username'
                        formatText={username}
                        onChangeText={(value) => setUsername(value)}
                    />
                    <TouchableOpacity
                        style={styles.buttonView}
                        onPress={() => {
                            const info = checkFormat(username, users);
                            info.result ? writedb()
                            : this.dropDownAlertRef.alertWithType('error', "Error", info.message);}}
                    ><Text style={styles.textView}>Continue</Text>
                    </TouchableOpacity>
                </View>  : 
                <View style={styles.middleView}>
                <TouchableOpacity
                    style={styles.buttonView}
                    onPress={() => navigation.navigate("Lobby", { username })}
                ><Text style={styles.textView}>Continue with {username}</Text>
                </TouchableOpacity>
                <Text style={styles.orText}>OR</Text>
                <TouchableOpacity
                    style={styles.newButtonView}
                    onPress={() => { 
                        setUsername('');
                        setDefinedUser(false);
                    }}
                ><Text style={styles.textView}>Take a new nickname</Text>
                </TouchableOpacity>
            </View> }
                
            <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
        </View>
    );
}