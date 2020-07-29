import React from 'react';
import { View, Text, TouchableOpacity, Platform, Linking } from 'react-native';
import styles from './styles';

export default function ChatBox(type, message, key, userName, location) {
    if (location) {
      return (
        <View key={key} style={[styles.container, { borderColor: '#367f8f', backgroundColor: '#367f8f', borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }]}>
          <TouchableOpacity onPress={() => {
                const lat = message.split(',')[0];
                const lng = message.split(',')[1];
                var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
                var url = scheme + `${lat},${lng}`;
                Linking.openURL(url);
              }}>
            <Text style={styles.locationStyle}
            >
              Click to see my location
            </Text>
          </TouchableOpacity>
          <View style={styles.rightTalkBubbleTriangle} />
        </View>
      );
    } else {
      if (type === userName) {
        return (
          <View key={key} style={[styles.container, { borderColor: '#367f8f', backgroundColor: '#367f8f', borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }]}>
            <View>
              <Text
                multiline
                style={styles.title}
              >
                {message}
              </Text>
            </View>
            <View style={styles.rightTalkBubbleTriangle} />
          </View>
        );
    } else {
        return (
          <View style={[styles.container, { borderColor: '#A9A9A9', backgroundColor: '#A9A9A9', borderTopRightRadius: 16, borderBottomRightRadius: 16 }]} key={key}>
            <View>
              <Text
                multiline
                style={styles.title}
              >
                {message}
              </Text>
            </View>
            <View style={styles.leftTalkBubbleTriangle} />
          </View>
        );
      }
    }
    return null;
}
