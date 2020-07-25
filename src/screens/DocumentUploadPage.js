import React, { Component } from 'react'
import styles from './styles/DocumentUpload'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../redux/actions';
import DocumentSelector from '../common-components/DocumentSelector'
import { uploadFileToStorage } from '../Utility/FileStorageAPI'

class DocumentUploadPage extends Component {

    render(){
        return (
            <View style={styles.mainWrapper}>
                <Text style={styles.headerText}> 
                    Upload Documents
                </Text>
                <View style={styles.blockTextContainer}>
                    <Text style={styles.blockText}>
                        Upload Documents so that officers can identify
                        you virtually during a traffic stop
                    </Text>
                </View>
                <DocumentSelector style={styles.buttonStyles} handleResult={uploadFileToStorage} documentType="DriversLicence">
                    <Text style={styles.buttonText}>Upload Driver's License</Text>
                </DocumentSelector>
                
                <DocumentSelector style={styles.buttonStyles} handleResult={uploadFileToStorage} documentType="VehicleRegistration">
                    <Text style={styles.buttonText}>Upload Vehicle Registration</Text>
                </DocumentSelector>
                
                <TouchableOpacity 
                    style={styles.skipButton}
                    onPress={() => this.props.setLoggedIn(true)}
                >
                    <Text style={styles.skipText}>Skip for now</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
      user: state.user,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(DocumentUploadPage); 