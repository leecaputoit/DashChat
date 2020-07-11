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
  headerText: {
    fontSize: headingTextSize,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 40,
  },
  nextButtonSyle: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 100,

  },
  nextButtonText: {
    color: colors.white,
    fontWeight: '300',
    marginRight: 5,
  },
  nextButtonWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    top: 20,
    right: 20,
    bottom: 20,
  },
  createAccountButtonSyle: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: 20,

  },
  createAccountButtonText: {
    color: colors.white,
    fontWeight: '300',
    marginRight: 5,
  },
  loginButton: {
    marginTop: 10,
    alignSelf: "flex-end",
    marginEnd: 40,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  
});

export default styles;