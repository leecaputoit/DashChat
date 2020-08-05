import { API, graphqlOperation } from 'aws-amplify'
import { updateUser } from '../graphql/mutations'
import * as Location from 'expo-location'
import { Auth } from 'aws-amplify'
import { AppState } from 'react-native'
import { listUsers } from '../graphql/queries'
import haversine from 'haversine'
import *  as TaskManager from 'expo-task-manager'
 
//-------------------Relevant functions for civilian location tracking-----------------
let tmpTimeStamp = 0; //for foreground tracking, records the timestamp of each rapid location update
let tmpTimeCount = 0; //for foreground tracking, determines when a location update should be uploaded to the backend
const Config = {
    updateInterval: 60000, //how often should location updates be captured and synced to the backend in miliseconds
    selectionDistanceThreshold: 62, //in meters, if a user's distance from the police officer is larger than the threshold, he/she will not be selected and returned by proximity search
};

//necessary
export const defineLocationTrackingTask = () => {
    //Defines the background task 'userLocationTracking' which Location.startLocationUpdatesAsync use, invokes the function passed as argument whenver task activates
    TaskManager.defineTask('userLocationTracking', uploadUserLocation);
    //also sets up AppState change listener
    manageTransitionBetweenAppState();
}

//Check for location permission, if not, ask for it, and returns whehter location was granted
export const configureLocationPermission = async () => {
    const { status } = await Location.getPermissionsAsync();

    if(status !== 'granted'){
        const {status: newStatus} = await Location.requestPermissionsAsync();

        if(newStatus !== 'granted'){
            console.log("location permission denied");
            return false;
        }
    }
    return true;
};

//Sets up location tracking for the entire app
export const initLocationTracking = async () => {
    let granted = await configureLocationPermission();
    if(!granted){
        return; 
    }

    let locationTrackingOptions = {
        accuracy: Location.Accuracy.Highest,
        distanceInterval:0,     //inconsistent location update interval if not set to 0, at least for our purpose
        timeInterval: 0, //same comment as above
        deferredUpdatesInterval: Config.updateInterval, //one minute
        foregroundService:{
            notificationTitle: 'DashChat',
            notificationBody:'Tracking location',
            notificationColor:'#5fb2f2'
        }
    };

    await Location.startLocationUpdatesAsync('userLocationTracking', locationTrackingOptions);
    console.log("Location tracking started")
    
};

//Handles syncing the location coordinate to the backend
const uploadUserLocation = async ({data: { locations }, error }) => {
    if(error){
        //any error thrown by expo-location
        console.log(JSON.stringify(error));
        return;
    }

    try{
        //check whether there is an active user, if not, throws an error and function proceeds to catch block
        let user = await Auth.currentAuthenticatedUser();
        
        let mostRecentLoc = locations.pop(); //gets the last location object in the array provided
        //if the app is currently active, handles what to do when active since rate of location update when app is in foreground cannot be set manually
        if(AppState.currentState === 'active'){
            tmpTimeCount += mostRecentLoc.timestamp - tmpTimeStamp
            if(tmpTimeCount > (Config.updateInterval + 10000) ){
                //So that no update is performed every time a user returns from background
                tmpTimeCount = 0;
            }
            tmpTimeStamp = mostRecentLoc.timestamp; 
            if(tmpTimeCount >= Config.updateInterval){
                console.log('Proceeds To foreground update')
                tmpTimeCount = 0;
            }else{
                return;
            }
        }

        let updateObject = { id: user.signInUserSession.idToken.payload.sub };
        let update = {
            lat: mostRecentLoc.coords.latitude,
            lng: mostRecentLoc.coords.longitude
        };
        updateObject.location = update;

        await API.graphql(graphqlOperation(updateUser, {input: updateObject}));
        console.log("location update performed : " + JSON.stringify(mostRecentLoc));
        
    }catch(error){
        if(AppState.currentState === "background"){
            console.log("background: " + JSON.stringify(error))
        }else{
            console.log('foreground: ' + JSON.stringify(error))
        }
    }


};

const manageTransitionBetweenAppState = () => {
    AppState.addEventListener('change', () => {
        if(AppState.currentState === 'active'){
            //reset time count to 0 so everytime returning from background to foreground timer recounts from 0
            tmpTimeCount = 0;
        }
    });
}

//-------------------------Police Search Functionalities----------------------
export const getUserByLicensePlateNumber = async (licensePlateNumber) => {
    const fetchedData = await API.graphql(graphqlOperation(listUsers));
    const userList = fetchedData.data.listUsers.items;
    const filteredUsers = userList.filter((user) => {
        if(user.vehicles){
            let result = false;
            user.vehicles.forEach((vehicle) => {
                if(vehicle.licensePlateNumber === licensePlateNumber){
                    result = true;
                }
            });
            return result;
        }
        return false;
    });

    let user = await selectUserByProximity(filteredUsers);
    console.log(JSON.stringify(user));

    return user;
};

const selectUserByProximity = async (users) => {
    let granted = await configureLocationPermission();
    if(!granted){
        return;
    }

    let selfLocation = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
    let startLocation = {
        latitude: selfLocation.coords.latitude,
        longitude: selfLocation.coords.longitude
    };

    let user;
    let distance = Number.MAX_VALUE;

    users.forEach((curUser) => {
        let location = {
            latitude: curUser.location.lat,
            longitude: curUser.location.lng
        };

        tmpDistance = haversine(startLocation, location, { unit: 'meter' }); //calculates the great-circle distance between two points on a sphere given their lat and lng in meters

        if(tmpDistance < distance){
            distance = tmpDistance;
            user = curUser;
        }
        console.log("distances: " + tmpDistance);
    });

    //if distance to user is not within 62 meters, do not return the user for privacy reasons
    if(distance <= Config.selectionDistanceThreshold){
        return user;
    }else{
        return null;
    }
}
