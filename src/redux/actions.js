import * as constants from './constants'
import { readFromStorage } from '../Utility/FileStorageAPI'

export const setUserType = userType => (
  {
    type: constants.SET_USER_TYPE,
    userType,
  }
);

export const setLoggedIn = loggedIn => (
  {
    type: constants.SET_LOGGED_IN,
    loggedIn,
  }
);

export const setProfileImageThunk = () => (dispatch, getState) =>{
                                      readFromStorage(getState().user).then(result => {
                                       dispatch(setProfileImage(result));
                                                                           
                                      }); 
                                     
                                    };


export const setUser = user => ({
  type: constants.SET_USER,
  user
});

export const setProfileImage = profileImageURI => ({
  type: constants.SET_PROFILE_IMAGE,
  profileImageURI
});