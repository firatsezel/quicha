import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function ContactBox(name, onPress) {
    if (name) {
        return (
            <TouchableOpacity onPress={onPress} style={styles.contentArea}>
                <View style={styles.container}>
                    <View style={styles.subContentArea}>
                    <View style={styles.left}>
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>{name.substring(0, 2).toUpperCase()}</Text>
                        </View>
                    </View>
                    <View style={styles.center}>
                        <View style={styles.textViewStyle}>
                            <Text style={styles.textStyle}>{name}</Text>
                        </View>
                    </View>
                    </View>
                    <View style={styles.divider} />
                </View>
              </TouchableOpacity>
          );
    }
    return null;
}