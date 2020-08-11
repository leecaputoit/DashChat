import requestCameraAndAudioPermission from '../screens/Permission';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform, NativeModules } from 'react-native';
import RtcEngine, { RtcLocalView, RtcRemoteView } from 'react-native-agora';
import styles from './styles/VideoCall';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons'

let LocalView = RtcLocalView.SurfaceView;
let RemoteView = RtcRemoteView.SurfaceView;
let engine;

class VideoCall extends Component {

  constructor(props) {
    super(props);
    this.state = {
      peerIds: [],                                       //Array for storing connected peers
      appid: this.props.AppID,
      channelName: this.props.ChannelName,               //Channel Name for the current session
      joinSucceed: false,                                //State variable for storing success
      vidMute: false,
      audMute: false,
      content: true,
    };
  }

  componentDidMount() {
    let self = this;
    /**
    * @name init
    * @description Function to initialize the Rtc Engine, attach event listeners and actions
    */
    async function init() {
      engine = await RtcEngine.create(self.state.appid);
      engine.enableVideo();

      engine.addListener('UserJoined', (data) => {          //If user joins the channel
        const { peerIds } = self.state;                     //Get currrent peer IDs
        if (peerIds.indexOf(data) === -1) {                 //If new user
          self.setState({ peerIds: [...peerIds, data] });   //add peer ID to state array
        }
      });

      engine.addListener('UserOffline', (data) => {                 //If user leaves
        self.setState({
          peerIds: self.state.peerIds.filter(uid => uid !== data), //remove peer ID from state array
        });
      });

      engine.addListener('JoinChannelSuccess', (data) => {          //If Local user joins RTC channel
        self.setState({ joinSucceed: true });                       //Set state variable to true
      });
    }
    init();
  }

  /**
  * @name startCall
  * @description Function to start the call
  */
  startCall = () => {
    //console.log("The state: " + JSON.stringify(this.state));
    this.setState({ joinSucceed: true }); //Set state variable to true
    engine.joinChannel(null, this.state.channelName, null, 0);  //Join Channel using null token and channel name
    this.setState(previousState => ({content: !previousState.content}))
  }

  /**
  * @name endCall
  * @description Function to end the call
  */
  endCall = () => {
    engine.leaveChannel();
    this.setState({ peerIds: [], joinSucceed: false });
    if (this.props.userType == 'civilian') {
      Actions.calls(); // Returns to Calls screen
    }
    else {
      Actions.search();
    }
  }

  toggleAudio = () => {
    let mute = this.state.audMute;
    console.log('Audio toggled: ', mute);
    engine.muteLocalAudioStream(!mute);
    this.setState({
        audMute: !mute
    });
  }

  swapCamera = () => {
      engine.switchCamera();
  }

  /**
  * @name videoView
  * @description Function to return the view for the app
  */
  videoView() {
    return (
      <View style={styles.max}>
        {
          <View style={styles.max}>
            <View style={styles.buttonHolder}>
              {/* <TouchableOpacity title="Start Call" onPress={this.startCall} style={styles.button}> */}
                {/* <Text style={styles.buttonText}> Start Call </Text> */}
                { //hide it when pressed
                  this.state.content 
                  ? <Icon.Button
                      name="call"
                      backgroundColor="transparent"
                      onPress={this.startCall}
                      style={styles.button}
                    />
                  : null
                }
              {/* </TouchableOpacity> */}
              {/* <TouchableOpacity title="End Call" onPress={this.endCall} style={styles.button}>
                <Text style={styles.buttonText}> End Call </Text>
              </TouchableOpacity> */}
            </View>
            
            {
              !this.state.joinSucceed ?
                <View />
                :
                <View style={styles.fullView}>
                  <View style={styles.buttonBar}>
                    <Icon.Button
                      style={styles.iconStyle}
                      backgroundColor='transparent'
                      name={this.state.audMute ? 'mic-off' : 'mic'}
                      onPress={() => this.toggleAudio()}
                    />
                    <Icon.Button
                      style={styles.iconStyle}
                      backgroundColor="red"
                      name="call-end"
                      onPress={() => this.endCall()}
                    />
                    <Icon.Button
                      style={styles.iconStyle}
                      backgroundColor="transparent"
                      name={this.state.vidMute = 'switch-video'}
                      onPress={() => this.swapCamera()}
                    />
                  </View>
                  {/* <View>
                    <TouchableOpacity style={styles.testStyle}>
                      <Icon.Button
                        style={styles.circle}
                        backgroundColor='red'
                        name={this.state.audMute ? 'mic-off' : 'mic'}
                        onPress={() => this.toggleAudio()}
                      />
                    </TouchableOpacity>
                  </View> */}

                  {
                    this.state.peerIds.length > 3                   //view for four videostreams
                      ? <View style={styles.full}>
                        <View style={styles.halfViewRow}>
                          <RemoteView style={styles.half} channelId={this.state.channelName}
                            uid={this.state.peerIds[0]} renderMode={1} />
                          <RemoteView style={styles.half} channelId={this.state.channelName}
                            uid={this.state.peerIds[1]} renderMode={1} />
                        </View>
                        <View style={styles.halfViewRow}>
                          <RemoteView style={styles.half} channelId={this.state.channelName}
                            uid={this.state.peerIds[2]} renderMode={1} />
                          <RemoteView style={styles.half} channelId={this.state.channelName}
                            uid={this.state.peerIds[3]} renderMode={1} />
                        </View>
                      </View>
                      : this.state.peerIds.length > 2                   //view for three videostreams
                        ? <View style={styles.full}>
                          <View style={styles.half} channelId={this.state.channelName}>
                            <RemoteView style={styles.full}
                              uid={this.state.peerIds[0]} renderMode={1} />
                          </View>
                          <View style={styles.halfViewRow}>
                            <RemoteView style={styles.half} channelId={this.state.channelName}
                              uid={this.state.peerIds[1]} renderMode={1} />
                            <RemoteView style={styles.half} channelId={this.state.channelName}
                              uid={this.state.peerIds[2]} renderMode={1} />
                          </View>
                        </View>
                        : this.state.peerIds.length > 1                   //view for two videostreams
                          ? <View style={styles.full}>
                              <RemoteView style={styles.full}
                                uid={this.state.peerIds[0]} renderMode={1} />
                              <RemoteView style={styles.full}
                                uid={this.state.peerIds[1]} renderMode={1} />
                          </View>
                          : this.state.peerIds.length > 0                   //view for videostream
                            ? <View style={styles.max}>
                                <RemoteView style={styles.full}
                                uid={this.state.peerIds[0]} renderMode={1} />
                              </View>

                            : <View>
                                <Text style={styles.noUserText}> No users connected </Text>
                            </View>
                  }
                  <LocalView style={styles.localVideoStyle}               //view for local videofeed
                    channelId={this.state.channelName} renderMode={1} zOrderMediaOverlay={true} />
                </View>
            }
          </View>
        }
      </View>
    );
  }
  render() {
    //setTimeout(this.startCall, 2500);
    //this.startCall();
    return this.videoView();
  }
}

export default VideoCall;