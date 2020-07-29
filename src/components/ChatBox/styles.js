import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = {
  container: {
    transform: [{ scaleY: -1 }],
    flexDirection: 'column',
    borderWidth: 0.5,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 500,
    maxWidth: screenWidth / 1.7,
    minHeight: 40,
    minWidth: 60,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  title: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    color: '#FFF',
    fontSize: 14,
  },
  hourText: {
    alignSelf: 'center',
    width: 32,
    marginTop: 2,
    marginBottom: 8,
    color: '#000000',
    fontStyle: 'italic',
    opacity: 0.80,
  },
  rightTalkBubbleTriangle: {
    position: 'absolute',
    right: -7,
    bottom: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 15,
    borderLeftWidth: 12,
    borderLeftColor: '#6E48AA',
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
  },
  leftTalkBubbleTriangle: {
    position: 'absolute',
    left: -7,
    bottom: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 15,
    borderRightWidth: 12,
    borderRightColor: '#A9A9A9',
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
  },
};

export default styles;
