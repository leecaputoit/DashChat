import { StyleSheet, Dimensions } from 'react-native'
import colors from '../../styles/colors'

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
        backgroundColor: 'white',
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
      black: {
        color: '#000000',
      },
      buttonStyles:{
        borderRadius:15,
        backgroundColor:colors.white,
        width:Dimensions.get('window').width * 0.45,
        height:48,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginBottom:20,
      },
});

export default styles;