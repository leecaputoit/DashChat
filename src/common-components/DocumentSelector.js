import * as React from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../redux/actions';

class DocumentSelector extends React.Component{

    pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: false});
        if(result.type !== 'cancel'){
            this.props.handleResult(result.uri, this.props.documentType, this.props.user, result.name.split('.').pop()).then(result => {
                this.props.setUser(result);
            });
        }
        
    }

    render(){
        return (
            <TouchableOpacity onPress={this.pickDocument} style={this.props.style}>
                {this.props.children}
            </TouchableOpacity>
        );
    }
}
 
const mapStateToProps = state => ({
    user: state.user
  });

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(DocumentSelector);