import profileActionTypes from "./profile.types";

const INITIAL_STATE = {
  profileImage: null,
  profileInfo: null,
  error: null,
  pending: false,
};
const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case profileActionTypes.FETCH_PROFILEIMAGE_PENDING:
    case profileActionTypes.FETCH_PROFILEINFO_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case profileActionTypes.FETCH_PROFILEIMAGE_SUCCESS:
      return {
        ...state,
        pending: false,
        profileImage: action.payload,
      };
    case profileActionTypes.FETCH_PROFILEINFO_SUCCESS:
      return {
        ...state,
        pending: false,
        profileInfo: action.payload,
      };
    case profileActionTypes.FETCH_PROFILEIMAGE_FAILED:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    case profileActionTypes.NULLIFY_PROFILEIMAGE:
      return {
        ...state,
        profileImage: null,
      };

    default:
      return state;
  }
};

export default profileReducer;
