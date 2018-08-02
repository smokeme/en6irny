import { combineReducers } from 'redux';
import lists from './lists.js';
import user from './user.js';
import { reducer as formReducer } from "redux-form";

export default combineReducers({
    lists,
    user,
    form: formReducer,

})