import messagesActionTypes from "./messages.types";

export const sendMessagePending = (messageData) => ({
  type: messagesActionTypes.SEND_MESSAGE_PENDING,
  payload: messageData,
});

export const sendImagePending = (messageData) => ({
  type: messagesActionTypes.SEND_IMAGE_PENDING,
  payload: messageData,
});

export const sendMessageSuccess = (messageData) => ({
  type: messagesActionTypes.SEND_MESSAGE_SUCCESS,
  payload: messageData,
});

export const sendMessageFailed = (error) => ({
  type: messagesActionTypes.SEND_MESSAGE_FAILED,
  payload: error,
});

export const fetchMessagePending = () => ({
  type: messagesActionTypes.FETCH_MESSAGE_PENDING,
});

export const fetchMessageSuccess = (messagesData) => ({
  type: messagesActionTypes.FETCH_MESSAGE_SUCCESS,
  payload: messagesData,
});

export const fetchMessageFailed = (error) => ({
  type: messagesActionTypes.FETCH_MESSAGE_FAILED,
  payload: error,
});

export const incrementLikesPending = (messageData) => ({
  type: messagesActionTypes.INCREMENT_LIKES_PENDING,
  payload: messageData,
});

export const incrementLikesSuccess = () => ({
  type: messagesActionTypes.INCREMENT_LIKES_SUCCESS,
});

export const incrementLikesFailed = () => ({
  type: messagesActionTypes.INCREMENT_LIKES_FAILED,
});

export const setSearchField = (event) => ({
  type: messagesActionTypes.FILTER_MESSAGES,
  payload: event,
});

export const setVideoData = (videoData) => ({
  type: messagesActionTypes.SET_VIDEO_DATA,
  payload: videoData,
})
