import modalActionTypes from "./modal.types";

const INITIAL_STATE = {
  showModal: false,
  showChatModal: false,
  showMessageBox: false,
  successMessage: false,
};
const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case modalActionTypes.TOGGLE_MODAL:
      return {
        ...state,
        showModal: !state.showModal,
      };
    case modalActionTypes.OPEN_MODAL:
      return {
        ...state,
        showModal: true,
      };
    case modalActionTypes.TOGGLE_CHAT_MODAL:
      return {
        ...state,
        showChatModal: !state.showChatModal,
      };
    case modalActionTypes.OPEN_CHAT_MODAL:
      return {
        ...state,
        showChatModal: !state.showChatModal,
      };
    case modalActionTypes.TOGGLE_MESSAGE_BOX:
      return {
        ...state,
        showMessageBox: !state.showMessageBox,
      };

    case modalActionTypes.OPEN_MESSAGE_BOX:
      return {
        ...state,
        showMessageBox: true,
      };
    case modalActionTypes.OPEN_VIDEO_BOX:
      return {
        ...state,
        showVideoBox: true,
      };
    case modalActionTypes.TOGGLE_VIDEO_BOX:
      return {
        ...state,
        showVideoBox: !state.showVideoBox,
      };
      case modalActionTypes.TOGGLE_SUCCESS_BOX:
        return {
          ...state,
          showVideoBox: !state.successMessage,
        };
    default:
      return state;
  }
};

export default modalReducer;
