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

export const initiateSetProfileImg = () => (dispatch, getState) =>{
                                      readFromStorage(getState().userIdentifier).then(result => {
                                        dispatch(setProfileImage(result));
                                      })
                                    };

export const setProfileImage =  profileImageURI => {
 return {
    type: constants.SET_PROFILE_IMAGE,
    profileImageURI
  };
};

export const setUserIdentifier = id => ({
  type: constants.SET_USER_IDENTIFIER,
  id
});