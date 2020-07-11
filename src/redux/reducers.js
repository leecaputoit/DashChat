import { combineReducers } from 'redux';

const INITIAL_STATE = {
    loggedIn: false,
    userType: 'civilian',
}

const loggedInReducer = (state = false, action) => {
    switch (action.type) {
      default:
        return state
    }
};

const userTypeReducer = (state = 'civillian', action) => {
    switch (action.type) {
      default:
        return state
    }
};

export default combineReducers({
    loggedIn: loggedInReducer,
    userType: userTypeReducer
})