import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../styles/colors';

let termsTextSize = 13;
let headingTextSize = 30;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    backgroundColor: colors.background,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    paddingLeft: 20,
    paddingRight: 20,
  },
  welcomeText: {
    fontSize: headingTextSize,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 40,
  },
  facebookButtonIcon: {
    color: colors.white,
    position: 'relative',
    left: 20,
    zIndex: 8,
  },
  appleButtonIcon: {
    color: colors.black,
    position: 'relative',
    left: 20,
    zIndex: 8,
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
  policeLoginButton: {
    alignSelf: "center",
    marginTop: 250,
  },
  policeLoginButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  termsText: {
    color: colors.white,
    fontSize: termsTextSize,
    fontWeight: '600',
  },
  verificationModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;