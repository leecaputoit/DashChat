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
  headerText: {
    fontSize: headingTextSize,
    color: colors.white,
    fontWeight: '300',
    marginTop: 20,
    marginBottom: 40,
  },
  nextButtonSyle: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
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
  forgotPassword: {
    flex: 1,
    color: colors.white,
    fontSize: 14,
  },
});

export default styles;