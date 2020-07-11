import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

let termsTextSize = 13;
let headingTextSize = 30;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    backgroundColor: colors.black,
    paddingTop:10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  welcomeText: {
    fontSize: headingTextSize,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 40,
  },
  buttonSyle: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 100,

  },
  buttonText: {
    color: colors.white,
    fontWeight: '300',
    marginRight: 5,
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    top: 20,
    right: 20,
    bottom: 20,
  }
  
});

export default styles;