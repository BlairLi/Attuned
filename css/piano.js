import { StyleSheet } from 'react-native';

const whiteKeyWidth = 25; // Since we can't use CSS variables, define width as a constant
const blackKeyWidth = 15;

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#143F6B', // Applied to the body in CSS
    justifyContent: 'center',
    alignItems: 'center',
  },
  piano: {
    flexDirection: 'row', // This is the default, but it's equivalent to 'display: flex' in CSS
  },
  key: {
    // The height calculation would need to be done dynamically or set as a fixed value in React Native
    // 'height' could be a calculated value based on the width or a fixed value
    // 'width' will be set in the specific key styles below
  },
  whiteKey: {
    backgroundColor: 'white',
    borderColor: '#333',
    borderWidth: 1,
    width: whiteKeyWidth,
    height: whiteKeyWidth * 4, // Assuming you want to maintain the aspect ratio
  },
  whiteKeyActive: {
    backgroundColor: '#CCC', // would apply this style conditionally when the key is active
  },
  blackKey: {
    backgroundColor: 'black',
    width: blackKeyWidth,
    height: blackKeyWidth * 4, // Assuming want to maintain the aspect ratio
    marginLeft: -blackKeyWidth / 2,
    marginRight: -blackKeyWidth / 2,
    zIndex: 2,
  },
  blackKeyActive: {
    backgroundColor: '#333', //  would apply this style conditionally when the key is active
  },
  glview: {
    width: 300,
    height: 150,
    backgroundColor: '#FFF',
    marginTop: 20,
  },
});
