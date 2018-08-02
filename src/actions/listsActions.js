import axios from 'axios';
import { Toast } from "native-base";

export function itemsOrderData(payload){
    return function(dispatch){
        dispatch({type: 'FETCHING_ORDER', payload: {}})
        axios.get('http://en6irny.com/api/order/list/',
        { headers: { Authorization: "JWT "+payload.token } }
        ).then((response) => {
            dispatch({type: 'FETCH_ORDER_FULFILLED', payload: response.data})
        }).catch((err) => {
            Toast.show({
                text: "Something went wrong!",
                duration: 2500,
                position: "top",
                textStyle: { textAlign: "center" }
              })
            dispatch({type: 'FETCH_ORDER_REJECTED', payload: err})
        })
    }
}

export function removeListError(payload){
    return function(dispatch){
        dispatch({type: 'REMOVE_CURRENT_ERROR', payload: {}})
    }
}

export function itemsSelectionData(payload){
    return function(dispatch){
        dispatch({type: 'FETCHING_SELECTION', payload: {}})
        axios.get('http://en6irny.com/api/selection/list/',
        { headers: { Authorization: "JWT "+payload.token } }
        ).then((response) => {
            dispatch({type: 'FETCH_SELECTION_FULFILLED', payload: response.data})
        }).catch((err) => {
            Toast.show({
                text: "Something went wrong!",
                duration: 2500,
                position: "top",
                textStyle: { textAlign: "center" }
              })
            dispatch({type: 'FETCH_SELECTION_REJECTED', payload: err})

        })
    }
}

export function setOrder(payload){
    return function(dispatch){
        dispatch({type: 'SET_ORDER', payload: {
            order: payload
        }})
    }
}