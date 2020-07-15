import * as React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../redux/actions';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class ImageSelector extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;
    return  (
        <TouchableOpacity onPress={this._pickImage}>
            <MaterialCommunityIcons  style={this.props.style} name="square-edit-outline" size={24} color="white" />
        </TouchableOpacity>
    );
}

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      await this.getPermissionAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri })
        
        this.props.handleResult(result.uri,'',this.props.user).then( result => {
          this.props.setUser(result);
          this.props.setProfileImageThunk();
            
        });
        
      }

      
      
    } catch (E) {
      console.log(E);
    }
  };
}


  const mapStateToProps = state => ({
    user: state.user
  });

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ImageSelector);