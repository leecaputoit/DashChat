import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../styles/colors';

let termsTextSize = 13;
let headingTextSize = 30;

const styles = StyleSheet.create({
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
});

export default styles;