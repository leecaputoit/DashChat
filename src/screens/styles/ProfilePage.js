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
    fontSize:36
  },
  buttonStyles:{
    borderRadius:15,
    backgroundColor:colors.white,
    width:Dimensions.get('window').width * 0.55,
    height:48,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:20
  },
  logOutButtonStyle:{
    display:"flex",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    marginEnd: 20,
    marginBottom:20,
  },

  logOutTextStyle: {
    color: "#ffff",
    fontSize:14,
  },
  textStyles:{
    fontSize:18,
  }
});

export default styles;