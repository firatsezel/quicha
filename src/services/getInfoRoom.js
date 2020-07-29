import firebase from '@react-native-firebase/app';

export default async function getInfoRoom(data, params) {
    let isDataFound = false;
    let navParams = {};
    const userName = params.username;
    const roomName = `${data}${params.username}`;
    const roomNameReverse = `${params.username}${data}`;
    await firebase.database().ref(`/users/${userName}/${roomName}`).once('value')
    .then(snapshot => {
        if (snapshot.val()) {
            isDataFound = true;
            navParams = { roomName, person: data, userName, conversation: snapshot.val().conversation };
        } else {
            firebase.database().ref(`/users/${userName}/${roomNameReverse}`).once('value')
            .then(snapshotRev => {
                if (snapshotRev.val()) {
                    isDataFound = true;
                    navParams = { roomName, person: data, userName, conversation: snapshot.val().conversation };
                }
            });
        }
    });

    return { result: isDataFound, params: navParams };
}