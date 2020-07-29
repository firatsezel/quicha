import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import styles from './styles';

export default function ChatScreen({ route, navigation }) {
  const [text, setText] = useState('');
  const [conversation, setConversation] = useState([]);

  const getInfo = async () => {
      const { roomName, person, userName } = route.params;
      firebase.database().ref(`/users/${userName}/${roomName}`).once('value')
      .then(snapshot => {
          console.log('snapshot.val()', snapshot.val());

          if (snapshot.val().conversation) { // daha önce yapılmış bir konuşma var
            setConversation(snapshot.val().conversation);
          } else { // yeni açılan bir chat
            
          }
      });
  }

  useEffect(() => {getInfo()}, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#eee' }} behavior="padding">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : null} style={[styles.container, { position: 'absolute' }]}>
          {/*this.renderList()*/}
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
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.send}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    </View>
  );
}