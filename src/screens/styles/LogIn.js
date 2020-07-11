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
  
});

export default styles;