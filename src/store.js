import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducer from './reducers/index.js';

const middleware = applyMiddleware(promise(), thunk, createLogger())
export default createStore(reducer,middleware)

// const reducers = combineReducers(
//     {
//         user: userReducer,
//         list: listReducer,
//     }
// )
// const initialState = {
//     fetching: false,
//     fetched: false,
//     users: [],
//     error: null,
// }
// const reducer = (state=initialState, action) => {
//     switch(action.type){
//         case "FETCH_LIST_START": {
//             return {...state, fetching: true}
//             break;
//         }
//         case "RECEIVE_LIST": {
//             return {
//                 ...state, 
//                 fetching: false,
//                 fetched: true,
//                 users: action.payload
//             }
//             break;
//         }
//         case "FETCH_LIST_ERROR": {
//             return {...state, fetching: false, error: action.payload}
//             break;
//         }
//     }
//     return state
// }
// const middleware = applyMiddleware(promise(), thunk, logger())
// const store = createStore(reducers,middleware);
// store.subscribe(
//     () => {
//         console.log('store changed', store.getState())
//     }
// )

// store.dispatch(
//     (dispatch) => {
//         dispatch({type: 'FETCH_LIST_START'})
//         axios.get('http://rest.learncode.academy/api/wstern/users')
//         .then((response) => {
//             dispatch({type: 'RECEIVE_LIST', payload: response.data})
//         })
//         .catch((err) => {
//             dispatch({type: 'FETCH_LIST_ERROR', payload:err})
//         })
//     }
// )
