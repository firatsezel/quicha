import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width; //full screen width
const screenHeight = Dimensions.get('window').height; //full screen width

export default StyleSheet.create({
  container: {
    flex: 1,
    bottom: 0,
  },
  panelContainer: {
    flex: 1,
    backgroundColor: '#eee',
  },
  image: {
    width: 24,
    height: 24,
  },
  send: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },
  input: {
    alignSelf: 'center',
    paddingHorizontal: 15,
    fontSize: 14,
    flex: 1,
  },
  textBox: {
    flexDirection: 'row',
    //bottom: 0,
    backgroundColor: '#ccc', // b78b9e
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  listView: {
    transform: [{ scaleY: -1 }],
    width: screenWidth,
    height: screenHeight - 60,
  },
});
