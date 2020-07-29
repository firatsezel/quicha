import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    middleView: { width: '90%', height: '50%' },
    flexView: { flex: 1 },
    textView: { alignSelf: 'center', color: 'white', fontSize: 25 },
    buttonView: { borderRadius: 30, marginVertical: 10, backgroundColor: 'blue', width: '100%', height: 50, alignItems: 'center', justifyContent: 'center' },
});

module.exports = styles;