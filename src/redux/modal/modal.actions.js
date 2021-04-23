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
});

export const openMessageBox = () => ({
  type: modalActionTypes.OPEN_MESSAGE_BOX,
});

export const openVideoBox = () => ({
  type: modalActionTypes.OPEN_VIDEO_BOX,
});

export const toggleVideoBox = () => ({
  type: modalActionTypes.TOGGLE_VIDEO_BOX,
});

export const toggleSucBox = () => ({
  type: modalActionTypes.TOGGLE_SUCCESS_BOX,
});
