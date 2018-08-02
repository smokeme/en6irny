const defaults = {
    selections: [],
    orders: [],
    selectionLoaded: false,
    orderLoaded: false,
    fetchingOrder: false,
    fetchingSelection: false,
    errorFetching: false,
    currentOrder: {},
    currentSelection: {},
}
export default function reducer(state=defaults , action){
    switch(action.type){
        case "FETCHING_ORDER": {
            return {...state, fetchingOrder: true}
            break;
        }
        case "FETCH_ORDER_REJECTED": {
            return {...state, fetchingOrder: false, errorFetching: action.payload}
            break;
        }
        case "FETCH_ORDER_FULFILLED": {
            return {
                ...state,
                orderLoaded: true,
                fetchingOrder: false,
                orders: action.payload.results
            }
        }
        case "FETCHING_SELECTION": {
            return {...state, fetchingSelection: true}
            break;
        }
        case "REMOVE_CURRENT_ERROR": {
            return {
                ...state,
                errorFetching: false,
            }
        }
        case "FETCH_SELECTION_REJECTED": {
            return {...state, fetchingSelection: false, errorFetching: action.payload}
            break;
        }
        case "FETCH_SELECTION_FULFILLED": {
            return {
                ...state,
                selectionLoaded: true,
                fetchingSelection: false,
                selections: action.payload.results
            }
        }
        case "SET_ORDER": {
            return {
                ...state,
                currentOrder: action.payload.order
            }
        }

    }
    return state
}