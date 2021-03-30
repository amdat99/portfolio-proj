import modalActionTypes from "./modal.types";

const INITIAL_STATE = {
  showModal: false,
  showChatModal: false,
  showMessageBox: false,
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
    default:
      return state;
  }
};

export default modalReducer;
