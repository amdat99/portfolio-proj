import messagesActionTypes from "./messages.types";

const INITIAL_STATE = {
  messageData: null,
  error: null,
  pending: false,
  messagesData: null,
  searchField: null,
  videoData : null
};
const messagesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case messagesActionTypes.SEND_MESSAGE_PENDING:
    case messagesActionTypes.FETCH_MESSAGE_PENDING:
    case messagesActionTypes.SEND_IMAGE_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case messagesActionTypes.INCREMENT_LIKES_PENDING:
      return {
        ...state,
        pending: true,
      };
    case messagesActionTypes.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        pending: false,
        messageData: action.payload,
      };
    case messagesActionTypes.FETCH_MESSAGE_SUCCESS:
      return {
        ...state,
        pending: false,
        messagesData: action.payload,
      };

      case messagesActionTypes.SET_VIDEO_DATA:
        return {
          ...state,
          pending: false,
          videoData: action.payload
        };

    case messagesActionTypes.SEND_MESSAGE_FAILED:
    case messagesActionTypes.FETCH_MESSAGE_FAILED:
    case messagesActionTypes.INCREMENT_LIKES_FAILED:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    case messagesActionTypes.FILTER_MESSAGES:
      return {
        ...state,
        searchField: action.payload,
      };

    default:
      return state;
  }
};

export default messagesReducer;
