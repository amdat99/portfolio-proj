import modalActionTypes from "./modal.types";

export const toggleModal = () => ({
  type: modalActionTypes.TOGGLE_MODAL,
});

export const openModal = () => ({
  type: modalActionTypes.OPEN_MODAL,
});

export const toggleChatModal = () => ({
  type: modalActionTypes.TOGGLE_CHAT_MODAL,
});

export const openChatModal = () => ({
  type: modalActionTypes.OPEN_CHAT_MODAL,
});

export const toggleMessageBox = () => ({
  type: modalActionTypes.TOGGLE_MESSAGE_BOX,
})
