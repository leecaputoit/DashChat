import { registerRootComponent } from 'expo';
import App from './App';
import Amplify from '@aws-amplify/core'
import config from './aws-exports'


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately

Amplify.configure(config);
registerRootComponent(App);
