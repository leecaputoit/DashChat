import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import { color } from 'react-native-reanimated';

let headingTextSize = 30;

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    
    backgroundColor: colors.background
  },
  headerText: {
    left: 0,
    right: 0,
    top: 0,
    padding: 10,

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,
    display: 'flex',
    alignItems: 'center',
    color: colors.white
  },
  nameText:{
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 21,
    display: 'flex',
    alignItems: 'center',
    padding: 5,

    color: colors.white
  },
  dateText:{
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 21,
    display: 'flex',
    alignItems: 'center',
    padding: 5,

    color: colors.white
  },
  docsIcon: {
    width: 70,
    height: 70,

    fontFamily: 'FontAwesome',
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 48,
    lineHeight: 55,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',

    color: colors.iconColor
  },
  playIcon: {
    
    width: 169,
    height: 50,
    left: 40,
    bottom: 90,

    fontFamily: 'FontAwesome',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 48,
    lineHeight: 55,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',

    color: colors.iconColor
  },
  separator: {
    width: 375,
    height: 0,
    bottom: 20,

    borderColor: '#C6C0C0',
    borderWidth: 1,
  },
  videoRec: {
    width: 255,
    height: 125,
    backgroundColor: colors.secondaryText
  },
});

export default styles;