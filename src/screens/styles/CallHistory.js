import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../styles/colors';
import { color } from 'react-native-reanimated';

let headingTextSize = 30;

const styles = StyleSheet.create({
  mainWrapper: {
    position: "absolute",
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    backgroundColor: colors.background
  },
  headerText: {
    marginTop: 50,
    marginBottom: 30,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,
    display: 'flex',
    alignItems: 'center',
    color: colors.white
  },
  cellContainer: {
    flex:1,
    flexDirection: 'column'
  },
  cellHeaderContainer: {
    width: Dimensions.get("window").width*.75,
    flex:1, 
    flexDirection: 'row',
    alignSelf: "center",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  videoDescriptionContainer: {
    flex:1,
    flexDirection: 'column'
  },
  nameText:{
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    display: 'flex',
    marginBottom: 5,
    color: colors.white
  },
  dateText:{
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    display: 'flex',
    color: colors.white
  },
  docsIcon: {
    fontFamily: 'FontAwesome',
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 36,
    display: 'flex',
    color: colors.white,
    marginRight: 15,
    alignSelf: "center"
  },
  playIcon: {
    
    width: 169,
    height: 50,
    // Find center from video width, self height, and spacing from middle border
    bottom: Dimensions.get("window").width*.75*9/16/2 + 50/2 + 5,

    fontFamily: 'FontAwesome',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 48,
    lineHeight: 55,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',

    color: colors.white
  },
  videoContainer: {
    flex: 1, 
    flexDirection: 'column', 
    alignSelf: "center",
    alignItems: "center",
  },
  separator: {
    width: 375,
    height: 0,
    bottom: 20,

    borderColor: '#C6C0C0',
    borderWidth: 1,
  },
  videoRec: {
    width: Dimensions.get("window").width*.75,
    height: Dimensions.get("window").width*.75*9/16,
    backgroundColor: colors.secondaryText
  },
});

export default styles;