import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../styles/colors';

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
    marginBottom: 10
  },
  nameContainer:{
    marginBottom: 40,
  },
  buttonContainer:{
  },
  imageStyles:{
    borderRadius:250/2,
    height:250,
    width:250,
  },
  nameStyles:{
    color:colors.white,
    fontSize:36,
  },
  buttonStyles:{
    borderRadius:15,
    backgroundColor:colors.white,
    width:Dimensions.get('window').width * 0.45,
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
  },
  vehiclesTitle:{
    color:colors.white,
    fontSize:18,
    alignSelf:"center",
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
  imagePicker:{
    alignSelf:"flex-end"
  }
});

export default styles;