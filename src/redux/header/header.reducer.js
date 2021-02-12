import headerActionTypes from './header.types'

const INITIAL_STATE = {
    route: null
}

const headerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case headerActionTypes.CHECK_USER_LOCATION:
            return{
                ...state,
                route: action.payload
            }
        default:
            return state
    }
}

export default headerReducer