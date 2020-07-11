import { combineReducers } from 'redux';
import * as constants from './constants'

const INITIAL_STATE = {
    userType: 'civilian',
    loggedIn: false,
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
          return action.userType
        default:
          return state
      }
};


export default combineReducers({
    userType: userTypeReducer,
    loggedIn: loggedInReducer
})