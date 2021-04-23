import groupchatActionTypes from "./groupchat.types";

const INITIAL_STATE = {
  groupmessages: null,
  group: null,
  groupchats: null,
  pending: false,
  failed: null,
  currentGroup: null,
  message: null,
  groupData: null
};

const groupChatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case groupchatActionTypes.FETCH_GMESSAGE_PENDING:
    case groupchatActionTypes.SEND_GMESSAGE_PENDING:
    case groupchatActionTypes.CREATE_GROUP_PENDING:
    case groupchatActionTypes.GET_GROUPS_PENDING:
    case groupchatActionTypes.FETCH_GROUPDATA_PENDING:
      return {
        ...state,
        pending: true,
        failed: null,
      };

    case groupchatActionTypes.CREATE_GROUPS_SUCCESS:
      return {
        ...state,
        pending: false,
        group: action.payload,
      };

    case groupchatActionTypes.GET_GROUPS_SUCCESS:
      return {
        ...state,
        pending: false,
        groupchats: action.payload,
      };
    case groupchatActionTypes.SET_CURRENT_GROUP:
      return {
        ...state,
        pending: false,
        currentGroup: action.payload,
      };
    case groupchatActionTypes.FETCH_GMESSAGE_SUCCESS:
      return {
        ...state,
        pending: false,
        groupmessages: action.payload,
      }
    case groupchatActionTypes.SEND_GMESSAGE_SUCCESS:
      return {
        ...state,
        pending: false,
        message: action.payload
      }
    case groupchatActionTypes.FETCH_GROUPDATA_SUCCESS:
      return {
        ...state,
        pending: false,
        groupData: action.payload
      }
    case groupchatActionTypes.FETCH_GMESSAGE_FAILED:
    case groupchatActionTypes.CREATE_GROUP_FAILED:
    case groupchatActionTypes.GET_GROUPS_FAILED:
    case groupchatActionTypes.SEND_GMESSAGE_FAILED:
    case groupchatActionTypes.FETCH_GROUPDATA_FAILED:
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
