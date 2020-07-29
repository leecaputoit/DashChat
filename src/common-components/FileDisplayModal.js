import * as React from 'react';
import { Modal, View, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../redux/actions';
import { retrieveFileURI } from '../Utility/FileStorageAPI'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { WebView } from 'react-native-webview'
import ImageViewer from 'react-native-image-zoom-viewer'


const FileDisplayModal = (props) => {
    let fileType = props.resource.resourceKey.split('.').pop();
    let isPDF = fileType === 'pdf';
    let uri; //file uri
    let webView; //reference to webview when loading pdf

    const [source, setSource] = React.useState({uri:''}); 
    React.useEffect(() => {
      const getURI = async () => {
        uri = await retrieveFileURI(props.resource.name, props.user);
        if(isPDF){
          uri = 'https://docs.google.com/gview?embedded=true&url=' + encodeURIComponent(uri);
        }
        setSource({uri});
      }
      getURI();
    }, [props.user.store]);

    //small loading bar at the bottom, useless but felt like leaving it here
    const loadingView = (
      <View style={styles.loadingViewStyles}>
        <Text style={styles.loadingViewText}>loading</Text>
      </View>
    )
    
    return (
    <Modal visible={ props.isVisible } animationType = "slide" style={styles.modalStyle} >
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {props.resource.resourceKey}
        </Text>
        <View style={styles.exitIconContainer}>
          <TouchableOpacity onPress={props.toggleVisibility}>
            <MaterialCommunityIcons name="close" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {
        isPDF?
        <WebView 
          ref={(ref) => {webView = ref}}
          source={source}
          startInLoadingState={true}
          renderLoading={() => {return loadingView} }
          
          onLoadEnd={syntheticEvent => {
            const { nativeEvent } = syntheticEvent;
            if(nativeEvent.title.length <= 0){
              webView.reload();
            }
          }}
        />
          :
        <ImageViewer imageUrls={[{url:source.uri}]}/>   
      }
    </Modal>
  );
}
  
  const styles = StyleSheet.create({
    modalStyle:{
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
    headerContainer:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'black'
    },
    headerText:{
      color:'white',
      fontSize:20,
      flex:1,
      paddingLeft:10
    },
    exitIconContainer:{
      
    },
    loadingViewStyles:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'gray'
    },
    loadingViewText:{
      color:'white'
    },
  })

  const mapStateToProps = state => {
    return {
      user: state.user,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(FileDisplayModal); 