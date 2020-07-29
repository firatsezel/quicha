import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from './styles';

export default function ChatScreen({ route, navigation }) {
  return (
    <View style={styles.container}>
      <Text>Chat Screen</Text>
    </View>
  );
}