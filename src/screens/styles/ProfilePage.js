import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

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
});

export default styles;