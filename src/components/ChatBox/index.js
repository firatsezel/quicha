import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function ChatBox(type, message, key) {
    if (type === 'user') {
        return (
          <View key={key} style={[styles.container, { borderColor: '#6E48AA', backgroundColor: '#6E48AA', borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }]}>
            <View>
              <Text
                multiline
                style={styles.title}
                // fontWeight="semibold"
              >
                {message}
              </Text>
            </View>
            <View style={styles.rightTalkBubbleTriangle} />
          </View>
        );
    } else if (type === 'machine') {
        return (
          <View style={[styles.container, { borderColor: '#A9A9A9', backgroundColor: '#A9A9A9', borderTopRightRadius: 16, borderBottomRightRadius: 16 }]} key={key}>
            <View>
              <Text
                multiline
                style={styles.title}
                // fontWeight="semibold"
              >
                {message}
              </Text>
            </View>
            <View style={styles.leftTalkBubbleTriangle} />
          </View>
        );
    }
    return null;
}
