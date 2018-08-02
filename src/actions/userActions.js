import axios from 'axios';
import { Toast } from "native-base";
import { AsyncStorage } from 'react-native'

const _saveItem = async (item, selectedValue) => {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      throw error;
    }
  };
export function fetchedUser(){
    return {
        type: 'FETCHING_USER_FULFILLED',
        payload: {
            loggedIn: true,

        }
    }
}
export function fetchingUser(payload){
    return function(dispatch){
        dispatch({type: 'FETCHING_USER', payload: {}})
        axios.post('http://en6irny.com/api/login/',
            {
                username: payload.username,
                password: payload.password
            }
        ).then((response) => {
            dispatch({type: 'FETCH_USER_FULFILLED', payload: response.data})
            _saveItem('token', response.data.token)
            _saveItem('username', response.data.username)
        }).catch((err) => {
            Toast.show({
                text: "Username or Password is WRONG!",
                duration: 2500,
                position: "top",
                textStyle: { textAlign: "center" }
              })
            dispatch({type: 'FETCH_USER_REJECTED', payload: err})
        })
    }
}


export function removeUser(payload){
    return {
        type: 'REMOVE_CURRENT_USER',
        payload: {
            username: "",
            token: "",
            loggedIn: false
        }
    }
}
export function fetchUser(payload){
    return {
        type: 'FETCHING_USER_FAIL',
        payload: {
            username: payload.username,
            token: payload.token
        }
    }
}
export function asyncUser(payload){
    return {
        type: 'ASYNC_USER_FULFILLED',
        payload: {
            username: payload.username,
            token: payload.token
        }
    }
}

export function removeUserError(){
    return {
        type: 'USER_ERROR_REMOVE',
        payload: {}
    }
}