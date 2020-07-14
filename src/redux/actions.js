import * as constants from './constants'

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

export const setProfileImage = profileImageURI => ({
  type: constants.SET_PROFILE_IMAGE,
  profileImageURI
});