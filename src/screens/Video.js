import React, { Component } from 'react';
import { View, StyleSheet, NativeModules, Platform } from 'react-native';
import { RtcEngine, AgoraView } from 'react-native-agora';
import Icon from 'react-native-vector-icons';

const { Agora } = NativeModules;

const { 
    FPS30,
    AudioProfileDefault,
    AudioScenarioDefault,
    Adaptative,
} = Agora;

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peerIds: [],
            uid: Math.floor(Math.random() * 100),
            appid: this.props.AppID,
            channelName: this.props.ChannelName,
            vidMute: false,
            audMute: false,
            joinSucceed: false,
        };
    }
}