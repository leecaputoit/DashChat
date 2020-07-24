import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
    mainWrapper: {
        display:'flex',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor: colors.background,
        alignItems:"center",
        
        
      },
    headerText: {
        fontSize: 30,
        color: colors.white,
        fontWeight: '300',
        marginBottom: 50,
        alignSelf:"flex-start",
        marginLeft:10
    },
    blockTextContainer: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        width:Dimensions.get('window').width * 0.60,
        padding:10,
        marginBottom:50
    },
    blockText: {
        color: colors.white,
        fontSize: 15
    },
    buttonStyles:{
        borderRadius:15,
        backgroundColor:colors.white,
        width:Dimensions.get('window').width * 0.60,
        height:70,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginBottom:30,
      },
      buttonText: {
          fontSize: 20
      },
      skipButton: {
       alignSelf: "flex-end",
       marginRight:25
      },
      skipText:{
        color: colors.white,
        fontSize: 15,
        fontWeight: '300',
      }
});

export default styles;