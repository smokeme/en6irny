
const defaults = {
    username: '',
    token: '',
    loggedIn: false,
    fetchingUser: false,
    errorUser: false,
}
export default function reducer(state=defaults , action){
    switch(action.type){
        case "FETCHING_USER": {
            return {...state, fetching: true}
            break;
        }
        case "RECEIVE_LIST": {
            return {
                ...state, 
                fetching: false,
                fetched: true,
                users: action.payload
            }
            break;
        }
        case "FETCH_USER_REJECTED": {
            return {...state, fetching: false, errorUser: action.payload}
            break;
        }
        case "FETCH_USER_FULFILLED": {
            return {
                ...state,
                loggedIn: true,
                fetching: false,
                username: action.payload.username,
                token: action.payload.token
            }
        }
        case "ASYNC_USER_FULFILLED": {
            return {
                ...state,
                loggedIn: true,
                fetching: false,
                username: action.payload.username,
                token: action.payload.token
            }
        }
        case "REMOVE_CURRENT_USER": {
            return {
                ...state,
                username: "",
                token: "",
                loggedIn: false,
            }
        }
        case 'USER_ERROR_REMOVE': {
            return {
                ...state,
                errorUser: false
            }
        }
    }
    return state
}