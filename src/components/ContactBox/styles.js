import { StyleSheet, Platform, Dimensions } from 'react-native';

const headerHeight = Platform.OS === 'ios' ? 76 : 56; // Header yüksekliği iOS ise 76 değilse 56
const screenWidth = Dimensions.get('window').width; // full screen width
const screenHeight = Dimensions.get('window').height; // full screen width

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  contentArea: {
    height: 60,
    width: screenWidth,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  subContentArea: {
    flex: 1,
    flexDirection: 'row',
    width: screenWidth,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 4600 / 2,
    backgroundColor: '#367f8f',
  },
  circleText: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center'
  },
  left: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flexDirection: 'column',
    width: screenWidth - 140,
    alignSelf: 'center',
  },
  divider: {
    height: 1,
    opacity: 0.2,
    backgroundColor: "black",
  },
  textViewStyle: {
    height: 40
  },
  textStyle: {
    fontSize: 25,
    marginHorizontal: 20,
    marginTop: 5,
  },
};

export default styles;