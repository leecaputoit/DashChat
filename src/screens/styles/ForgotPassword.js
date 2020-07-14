import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

let termsTextSize = 13;
let headingTextSize = 30;

const styles = StyleSheet.create({
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
  forgotPasswordSubheading: {
    flex: 1,
    color: colors.white,
    fontWeight: '600',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 60,
  },
  policeLoginButton: {
    alignSelf: "center",
    marginTop: 50,
  },
  policeLoginButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  
});

export default styles;