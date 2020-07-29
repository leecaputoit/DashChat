import { Router, Scene, ActionConst } from 'react-native-router-flux'
import React from 'react'
import Video from '../screens/Video'
import Calls from '../screens/Calls'
import About from '../screens/About'
import VideoTest from '../screens/VideoTest'

const RouterComponent = () => {
    return (
        <Router>
            <Scene key = "root">
                <Scene
                    key="calls"
                    component={Calls}
                    title="Video Call"
                    initial = {true}
                    type={ActionConst.RESET}
                />
                {console.log("Before videos scene")}
                <Scene
                    key="videos"
                    component={Video}
                    title="Video Feed"
                    type={ActionConst.RESET}
                    hideNavBar={true}
                />
                <Scene 
                    key="about"
                    component={About}
                />
                <Scene
                    key="videoTest"
                    component={VideoTest}
                    title="Video Call Test"
                    type={ActionConst.RESET}
                    hideNavBar={true}
                />
            </Scene>
        </Router>

    );
}

export default RouterComponent;