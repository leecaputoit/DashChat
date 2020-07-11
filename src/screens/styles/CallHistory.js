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
  welcomeWrapper: {
    flex: 1,
    display: 'flex',
    marginTop: 50,
    padding: 20,
  },
  welcomeText: {
    fontSize: headingTextSize,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 40,
  },
  incomingCallText: {
    position: 'absolute',
    width: 300,
    height: 255,
    left: 31,
    top: 133,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 24, 
    lineHeight: 28,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: colors.white
  },
  callHistoryText: {
    position: 'absolute',
    left: '0%',
    right: '0%',
    top: '0%',
    bottom: '0%',

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,
    display: 'flex',
    alignItems: 'center',
    color: colors.white
  },
  docsIcon: {
    position: 'absolute',
    width: 70,
    height: 70,
    left: 0,
    top: 68,

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
  docsIcon2: {
    position: 'absolute',
    width: 70,
    height: 70,
    left: 0,
    top: 320,

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
  docsIcon3: {
    position: 'absolute',
    width: 70,
    height: 70,
    left: 0,
    top: 575,

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
    position: "absolute",
    width: 169,
    height: 78,
    left: 110,
    top: 170,

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
  playIcon2: {
    position: "absolute",
    width: 169,
    height: 78,
    left: 110,
    top: 425,

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
  dateText: {
    position: 'absolute',
    left: '19.94%',
    right: '41.6%',
    top: '10.29%',
    bottom: '83.62%',

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 21,
    display: 'flex',
    alignItems: 'center',

    color: colors.white
  },
  dateTwoText: {
    position: 'absolute',
    left: '19.94%',
    right: '41.6%',
    top: 320,
    bottom: 0,

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 21,
    display: 'flex',
    alignItems: 'center',

    color: colors.white
  },
  dateThreeText: {
    position: 'absolute',
    left: '19.94%',
    right: '41.6%',
    top: 570,
    bottom: 0,

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 21,
    display: 'flex',
    alignItems: 'center',

    color: colors.white
  },
  officerOneText: {
    position: 'absolute',
    left: '19.94%',
    right: '27.07%',
    top: '15.09%',
    bottom: '74.57%',

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 21,
    display: 'flex',
    alignItems: 'center',

    color: colors.white
  },
  officerTwoText: {
    position: 'absolute',
    left: '19.94%',
    right: '27.07%',
    top: 350,
    bottom: 0,

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 21,
    display: 'flex',
    alignItems: 'center',

    color: colors.white
  },
  officerThreeText: {
    position: 'absolute',
    left: '19.94%',
    right: '27.07%',
    top: 605,
    bottom: 0,

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 21,
    display: 'flex',
    alignItems: 'center',

    color: colors.white
  },
  borderLine: {
    position: 'absolute',
    width: 375,
    height: 0,
    left: 0,
    top: 290,

    borderColor: '#C6C0C0',
    borderWidth: 1,
    transform: [{rotate: '-0.15deg'}],
  },
  borderLine2: {
    position: 'absolute',
    width: 375,
    height: 0,
    left: 0,
    top: 545,

    borderColor: '#C6C0C0',
    borderWidth: 1,
    transform: [{rotate: '-0.15deg'}],
  },
  videoRec: {
    position: 'absolute',
    width: 255,
    height: 125,
    left: '19%',
    top: 135,

    backgroundColor: colors.secondaryText
  },
  videoRec2: {
    position: 'absolute',
    width: 255,
    height: 125,
    left: '19%',
    top: 390,

    backgroundColor: colors.secondaryText
  },
  videoRec3: {
    position: 'absolute',
    width: 255,
    height: 125,
    left: '19%',
    top: 645,

    backgroundColor: colors.secondaryText
  }
  
});

export default styles;