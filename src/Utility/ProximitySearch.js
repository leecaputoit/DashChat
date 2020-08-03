import { API, graphqlOperation } from 'aws-amplify'
import { updateUser } from '../graphql/mutations'
import * as Location from 'expo-location'
import { Auth } from 'aws-amplify'
import AsyncStorage from '@react-native-community/async-storage'
import { AppState } from 'react-native'
import * as TaskManager from 'expo-task-manager'
import { listUsers } from '../graphql/queries'
import * as CalculateDistance from 'haversine'
 
//-------------------Relevant functions for civilian location tracking-----------------
let subscription;


export const configureLocationPermission = async () => {
    const { status } = await Location.getPermissionsAsync();
    if(status !== 'granted'){
        const {status: newStatus} = await Location.requestPermissionsAsync();
        if(newStatus !== 'granted'){
            console.log("permission denied");
            return false;
        }
    }
    return true;
};

export const initBackgroundLocationTracking = async () => {
    let granted = await configureLocationPermission();
    if(!granted){
        return;
    }

    let locationTrackingOptions = {
        accuracy: Location.Accuracy.Highest,
        distanceInterval:0,
        timeInterval: 0,
        deferredUpdatesInterval: 60000,
        foregroundService:{
            notificationTitle: 'DashChat',
            notificationBody:'Tracking location',
            notificationColor:'#5fb2f2'
        }
    };
    await Location.startLocationUpdatesAsync('userLocationTracking', locationTrackingOptions);
    console.log("background locatin tracking started")
    
};

export const initForegroundLocationTracking = async () => {
    console.log("init foreground")
    let granted = await configureLocationPermission();
    if(!granted){
        return;
    }

    const locationTrackingOptions = {
        accuracy: Location.Accuracy.High,
        timeInterval: 60000,
        distanceInterval:0
    };
    const unSubscribe = await Location.watchPositionAsync(locationTrackingOptions, uploadUserLocationForeground);
    return unSubscribe;
};


export const uploadUserLocationBackground = async ({data: { locations }, error }) => {
    if(error){
        console.log(JSON.stringify(error));
        return;
    }

    try{
        let user = await Auth.currentAuthenticatedUser();
        
        //stopLocationUpdateAsync clears the previously defined task and causes errors, this is a temporary workaround
        if(AppState.currentState === 'active'){
            return;
        }
        let updateObject = { id: user.signInUserSession.idToken.payload.sub };
        let mostRecentLoc = locations.pop(); //get last location object from provided locations array
        let update = {
            lat: mostRecentLoc.coords.latitude,
            lng: mostRecentLoc.coords.longitude
        };
        updateObject.location = update;

        await API.graphql(graphqlOperation(updateUser, {input: updateObject}));
        console.log("backround upload complete : " + mostRecentLoc);
        
    }catch(error){
        if(AppState.currentState !== "active"){
            console.log("this is background")
            console.log(JSON.stringify(error))
        }
        ;
        //if user is not logged in, stop background tracking
       // await Location.stopLocationUpdatesAsync('userLocationTracking');
    }


};

export const uploadUserLocationForeground = async (location) => {
    try{
        let user = await Auth.currentAuthenticatedUser(); 

        let updateObject = { id: user.signInUserSession.idToken.payload.sub };
        let update = {
            lat: location.coords.latitude,
            lng: location.coords.longitude
        };
        updateObject.location = update;

        await API.graphql(graphqlOperation(updateUser, {input: updateObject}));
        console.log("foreground upload complete: " + location);
        
    }catch(error){
        console.log(JSON.stringify(error));
    }


};

// export const helperSaveToAsyncStorage = async (key, value) => {
//     try {
//       const jsonValue = JSON.stringify(value)
//       await AsyncStorage.setItem(key, jsonValue)
//     } catch (e) {
//       console.log(e);
//     }
// };

// export const helperGetDataFromAsyncStorage = async (key) => {
//     try {
//       const jsonValue = await AsyncStorage.getItem(key)
//       return jsonValue != null ? JSON.parse(jsonValue) : null;
//     } catch(e) {
//       console.log(e);
//     }
// };

export const handleAppActivationState = () => {
    //handle which tracking method to use when app transitions between foreground and background
    AppState.addEventListener('change', async () => {
        //define the userlocationtracking task if not already defined
        //checkBackgroundLocationTrackingTaskDefinition();
        if (AppState.currentState === 'active')
        {
            //await Location.stopLocationUpdatesAsync('userLocationTracking');
           subscription =  await initForegroundLocationTracking();
        }else if(AppState.currentState === 'background')
        {
            try{
                await Auth.currentAuthenticatedUser();
            }catch(error){
                console.log("no user currenly availableo")
                return;
            }
            // let removeForegroundSubscription = await helperGetDataFromAsyncStorage('locationUnSubscribe')
            // removeForegroundSubscription.remove();
            subscription.remove();
            await initBackgroundLocationTracking();
        }
    });
};

// export const checkBackgroundLocationTrackingTaskDefinition = () => {
//     if(!TaskManager.isTaskDefined('userLocationTracking')){
//         TaskManager.defineTask('userLocationTracking', uploadUserLocationBackground);
//     }
// };




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
            return true;
        }
        return false;
    });

    let user = await selectUserByProximity(filteredUsers);

    return user;


};


export const selectUserByProximity = async (users) => {
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
        tmpDistance = CalculateDistance(startLocation, location);
        if(tmpDistance < distance){
            distance = tmpDistance;
            user = curUser;
        }
    });
    return user;

}
