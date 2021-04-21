import groupchatActionTypes from "./groupchat.types";

const INITIAL_STATE = {
  groupmessages: null,
  group: null,
  groupchats : null,
  pending: false,
  failed: null,
};

const groupChatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case groupchatActionTypes.FETCH_MESSAGE_PENDING:
      case  groupchatActionTypes.SEND_MESSAGE_PENDING:
    case groupchatActionTypes.CREATE_GROUP_PENDING:
    case groupchatActionTypes.GET_GROUPS_PENDING:

      return {
        ...state,
        pending: true,
        failed: null,
      };

      case groupchatActionTypes.CREATE_GROUPS_SUCCESS:
   
        return {
          ...state,
          pending: false,
          groupchats: action.payload,
        };

        case groupchatActionTypes.FETCH_MESSAGE_FAILED:
            case groupchatActionTypes.CREATE_GROUP_FAILED:
                case groupchatActionTypes.GET_GROUPS_FAILED:
                    case groupchatActionTypes.SEND_MESSAGE_FAILED:
   
            return {
              ...state,
              pending: false,
              failed: action.payload,
            };

    default:
      return state;
  }
};

export default groupChatReducer;