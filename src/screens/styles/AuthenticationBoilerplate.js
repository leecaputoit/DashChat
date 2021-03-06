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
  nextButtonStyle: {
    flexDirection: "row",
    flex: 1,
    alignSelf: "flex-end",
    marginTop: 30,
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 18,
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
  errorMessageWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default styles;