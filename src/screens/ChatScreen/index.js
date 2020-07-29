import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
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
      const { roomName, person, userName, conversation } = route.params;
      if (conversation.length > 0) {
        setConversation(reverseChat(conversation));
      } else {
        firebase.database().ref(`/users/${userName}/${roomName}`).once('value')
        .then(snapshot => {
            console.log('snapshot.val()', snapshot.val());
  
            if (snapshot.val().conversation) { // daha önce yapılmış bir konuşma var
              setConversation(reverseChat(snapshot.val().conversation));
            }
        });
      }
      
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

  useEffect(() => {interval = setInterval(() => {
    getInfo();
   }, 4000);}, []);

  const addConversation = (message, type) => {
    let tempArray = [];
    if (conversation.length > 0) tempArray = reverseChat(conversation);
    const messageBox = { message, type };
    tempArray.push(messageBox);
    setConversation(reverseChat(tempArray));
    console.log('tempArray', tempArray);
    console.log('conversation', conversation);
    writedb(reverseChat(tempArray));
    setText('');
  }

  const renderList = () =>  {
    // return (
    return (
      <ScrollView
        style={styles.listView}
      >
        {conversation.length > 0 ?
          conversation.map((item, value) => (
            <View key={Number(value)} style={{ right: item.type === 'user' ? 10 : null, alignSelf: item.type === 'user' ? 'flex-end' : null, left: item.type === 'user' ? null : 10 }}>
              {ChatBox(item.type, item.message, Number(value))}
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
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#eee' }} behavior="padding">
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
            <TouchableOpacity onPress={() => { addConversation(text, 'user') }}>
              <Text style={styles.send}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    </View>
  );
}