import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 0,
        padding: 20,
        flex: 1,
        backgroundColor: '#000000',
      },
      formLabel: {
        paddingBottom: 10,
        paddingTop: 10,
        color: '#0093E9',
      },
      buttonContainer: {
        alignItems: 'center',
        paddingTop: 20,
      },
      submitButton: {
        paddingHorizontal: 60,
        paddingVertical: 10,
        backgroundColor: '#0093E9',
        borderRadius: 25,
      },
      formInput: {
        height: 40,
        backgroundColor: '#f5f5f5',
        color: '#0093E9',
        borderRadius: 4,
        paddingLeft: 20,
      },
      white: {
        color: '#fff',
      },
});

export default styles;