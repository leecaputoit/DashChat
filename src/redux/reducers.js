import { combineReducers } from 'redux';
import * as constants from './constants'

const INITIAL_STATE = {
    userType: 'civilian',
    loggedIn: false,
    user:{

    },
    profileImageURI:''
}


const userTypeReducer = (state = INITIAL_STATE.userType, action) => {
    switch (action.type) {
      case constants.SET_USER_TYPE:
        return action.userType
      default:
        return state
    }
};

const loggedInReducer = (state = INITIAL_STATE.loggedIn, action) => {
    switch (action.type) {
        case constants.SET_LOGGED_IN:
          return action.loggedIn
        default:
          return state
      }
};


const userReducer = (state = INITIAL_STATE.user, action) => {
  switch (action.type) {
      case constants.SET_USER:
        return action.user
      default:
        return state
    }
};

const profileImageReducer = (state = INITIAL_STATE.profileImageURI, action) => {
  switch (action.type) {
      case constants.SET_PROFILE_IMAGE:
        return action.profileImageURI
      default:
        return state
    }
};

export default combineReducers({
    userType: userTypeReducer,
    loggedIn: loggedInReducer,
    user:userReducer,
    profileImageURI: profileImageReducer
})