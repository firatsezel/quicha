import firebase from '@react-native-firebase/app';

export default async function getInfo(url) {
    firebase.database().ref(url).once('value')
    .then(snapshot => {
        return snapshot.val();
    });
}