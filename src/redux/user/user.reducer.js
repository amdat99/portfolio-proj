import userActionTypes from './user.types'

const INITIAL_STATE = {
  pending: false,
    currentUser: null,
    error: null,
   
    
}
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case userActionTypes.SIGN_UP_START:
        case userActionTypes.EMAIL_SIGNIN_PENDING:
        case userActionTypes.GOOGLE_SIGNIN_PENDING:
        case userActionTypes.SIGNOUT_PENDING:
      return{
        ...state,
        pending: true,
        error: null
      }
      
      case userActionTypes.SIGNIN_SUCCESS:
        
        return {
          ...state,
          currentUser: action.payload,
          error: null,
        };
      case userActionTypes.SIGNOUT_SUCCESS:
      
        return {
          ...state,
          currentUser: null,
          pending: false,
          error: null
        };
    
      case userActionTypes.SIGNIN_FAILED:
      case userActionTypes.SIGNOUT_FAILED:
        case userActionTypes.SIGN_UP_FAILURE:
        return {
          ...state,
          pending: false,
          error: action.payload
        }
      default:
        return state;
    }}

export default userReducer;