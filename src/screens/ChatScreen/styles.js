import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width; //full screen width
const screenHeight = Dimensions.get('window').height; //full screen width

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  newInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    padding: 10,
    height: 50,
  },
  panel: {
    flexDirection: 'column',
    height: screenHeight,
    paddingVertical: 7,
    paddingHorizontal: 7,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // backgroundColor: '#e6f2ff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
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
  /* footer: {
    flexDirection: 'row',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: '#b78b9e',
    height: 40,
  }, */
  newInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    padding: 10,
    height: 50,
  },
  lightning: {
    fontSize: 26,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
    height: 40,
  },
  textBox: {
    flexDirection: 'row',
    //bottom: 0,
    backgroundColor: '#ccc', // b78b9e
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  textInput: {
    width: screenWidth / 1.25,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#9ab',
    height: 30,
    marginTop: 3,
    bottom: 3,
    marginLeft: 5,
    marginRight: 10,
  },
  listView: {
    transform: [{ scaleY: -1 }],
    width: screenWidth,
    height: screenHeight - 60,
  },
  sentenceListView: {
    //backgroundColor: '#e6f2ff',
    flexWrap: 'wrap',
    bottom: 30,
    position: 'absolute',
    width: screenWidth,
    maxHeight: 500,
    marginBottom: 0,
  },
});
