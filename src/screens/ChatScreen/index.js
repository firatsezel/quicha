import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import Geolocation from '@react-native-community/geolocation';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import { ChatBox } from '../../components/index';
import { reverseChat } from '../../lib/index'; 
import styles from './styles';

export default function ChatScreen({ route, navigation }) {
  const [text, setText] = useState('');
  const [conversation, setConversation] = useState([]);
  var interval = null;

  const getInfo = async () => {
      const { roomName, person, userName } = route.params;
      firebase.database().ref(`/users/${userName}/${roomName}`).once('value')
      .then(snapshot => {
          console.log('snapshot.val()', snapshot.val());

          if (snapshot.val().conversation) { // daha önce yapılmış bir konuşma var
            setConversation((snapshot.val().conversation));
          }
      });
  }

  const writedb = (chatArray) => {
    const { roomName, person, userName } = route.params;
    firebase.database()
    .ref(`/users/${userName}/${roomName}`)
    .update({
      conversation: chatArray,
    })
    .then(() => console.log('Data set'));
  }

  useEffect(() => {
    if (route.params.conversation.length > 0) {
      setConversation(route.params.conversation);
    }
    interval = setInterval(() => { getInfo(); }, 4000);
    return () => { clearInterval(interval); }
  }, []);

  const addConversation = (message, type, location) => {
    console.log(message)
    if (message.length > 0) {
      let tempArray = [];
      if (conversation.length > 0) tempArray = reverseChat(conversation);
      const messageBox = { message, type, location };
      tempArray.push(messageBox);
      setConversation(reverseChat(tempArray));
      writedb(reverseChat(tempArray));
      setText('');
    }
  }

  const renderList = () =>  {
    const userName = route.params.userName;
    return (
      <ScrollView
        style={styles.listView}
      >
        {conversation.length > 0 ?
          conversation.map((item, value) => (
            <View key={Number(value)} style={{ right: item.type === userName ? 10 : null, alignSelf: item.type === userName ? 'flex-end' : null, left: item.type === userName ? null : 10 }}>
              {ChatBox(item.type, item.message, Number(value), userName, item.location)}
            </View>
            ))
            :
            null
        }
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.panelContainer} behavior="padding">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : null} style={[styles.container, { position: 'absolute' }]}>
          {renderList()}
          <View style={styles.textBox}>
            <AutoGrowingTextInput
              autoCorrect={false}
              value={text}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Type something nice"
              onChangeText={(newtxt) => {
                setText(newtxt);
              }}
            />
            <TouchableOpacity
              style={{ alignSelf: 'center', padding: 10 }} 
              onPress={() => { 
                Geolocation.getCurrentPosition(info => addConversation(`${info.coords.latitude},${info.coords.longitude}`, route.params.userName, true));
              }}>
              <Image 
                resizeMode = "contain"
                style={styles.image}
                source={require('../../resources/cursor.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { addConversation(text, route.params.userName, false) }}>
              <Text style={styles.send}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    </View>
  );
}