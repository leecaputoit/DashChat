import { Router, Scene, ActionConst } from 'react-native-router-flux'
import React from 'react'
import VideoCall from '../screens/VideoCall'
import Calls from '../screens/Calls'

const RouterComponent = () => {
    return (
        <Router>
            <Scene key = "root">
                <Scene
                    key="calls"
                    component={Calls}
                    title="Video Call"
                    initial = {true}
                    hideNavBar = {true}
                    type={ActionConst.RESET}
                />
                <Scene
                    key="videoCall"
                    component={VideoCall}
                    title="Video Feed"
                    type={ActionConst.RESET}
                    hideNavBar={true}
                />
                <Scene
                    key="search"
                    component={Search}
                    title="Video Feeder"
                    initial = {true}
                    type={ActionConst.RESET}
                    hideNavBar={true}
                />
            </Scene>
        </Router>

    );
}

export default RouterComponent;