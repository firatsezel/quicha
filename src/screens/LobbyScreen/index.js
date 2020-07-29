import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import { ContactBox } from '../../components/index';
import { getInfoRoom, getInfo } from '../../services/index';
import styles from './styles';


export default function LobbyScreen({ route, navigation }) {
    const [users, setUsers] = useState([]);

    const getInfo = async () => {
        firebase.database().ref('/users').once('value')
        .then(snapshot => {
            setUsers(snapshot.val().name);
        });
    }

    function roomInfo(data) {
        getInfoRoom(data, route.params).then(info => {
            if (info.result) {
                navigation.navigate('Chat', {
                    ...info.params,
                });
            } else { writedb(data); } 
        })
    }

    useEffect(() => {getInfo()}, []);

    const writedb = (person) => {
        let tempArray = [];
        const userName = route.params.username;
        const roomName = `${person}${route.params.username}`;
        firebase.database()
        .ref(`/users/${userName}/${roomName}`)
        .set({
          roomName,
          conversation: tempArray,
        })
        .then(() => navigation.navigate('Chat', {
            roomName,
            person,
            userName,
            conversation: [],
        }));
    }

    userList = () => { return users.filter(item => item !== route.params.username).map((data) => ContactBox(data, () => { roomInfo(data); })); }

    return (
      <View style={styles.container}>
        {userList()}
      </View>
    );
}