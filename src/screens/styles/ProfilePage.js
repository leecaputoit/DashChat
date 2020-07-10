import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../styles/colors';

let headingTextSize = 30;

const styles = StyleSheet.create({
  mainWrapper: {
    display:'flex',
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    backgroundColor: colors.background,
    alignItems:"center",
    paddingTop:50,
    
  },
  imageContainer:{
    flex:1.5,
    justifyContent:"center"
    
  },
  nameContainer:{
    flex:0.5,
    justifyContent:"center"
  },
  buttonContainer:{
    flex:1,
    display:"flex",
    justifyContent:"flex-start",
    marginBottom:150
  },
  imageStyles:{
    borderRadius:35,
    height:292,
    width:270,
  },
  nameStyles:{
    color:colors.white,
    fontSize:48
  },
  buttonStyles:{
    borderRadius:15,
    backgroundColor:colors.white,
    width:Dimensions.get('window').width * 0.65,
    height:56,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:20
  },
  textStyles:{
    fontSize:24,
  }
});

export default styles;