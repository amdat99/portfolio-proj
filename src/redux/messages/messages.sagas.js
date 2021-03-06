import { takeLatest, call, put, all } from "redux-saga/effects";

import messagesActionTypes from "./messages.types";
import {
  sendMessageSuccess,
  sendMessageFailed,
  fetchMessageSuccess,
  fetchMessageFailed,
  incrementLikesSuccess,
  incrementLikesFailed,
} from "./messages.actions";

export function* sendMessageAsync({
  payload: { message, userName, messageId, userId, image, video },
}) {
  try {
    const response = yield fetch(
      "https://aamirproject-api.herokuapp.com/addmessages",
      {
        // const response = yield fetch('http://localhost:4000/addmessages',{
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message,
          userName: userName,
          messageId: messageId,
          userId: userId,
          image: image,
          video: video,
        }),
      }
    );
    const data = yield response.json();
    if (data.messageid) {
      yield put(
        sendMessageSuccess({
          payload: { message, userName, messageId, userId, image, video },
        })
      );
    }
  } catch (error) {
    yield put(sendMessageFailed(error));
  }
}

export function* fetchMessageAsync() {
  try {
    const response = yield fetch(
      "https://aamirproject-api.herokuapp.com/fetchmessages",
      {
        // const response = yield fetch('http://localhost:4000/fetchmessages',{
        method: "post",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = yield response.json();
    yield put(fetchMessageSuccess(data));
  } catch (error) {
    yield put(fetchMessageFailed(error));
  }
}



export function* incrementLikesAsync({ payload:  messageid  }) {
  try {
    const response = yield fetch(
      "https://aamirproject-api.herokuapp.com/incrementlikes",
      {
        // const response = yield fetch('http://localhost:4000/incrementlikes',{

        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageid: messageid }),
      }
    );
    const data = yield response.json();
    yield put(incrementLikesSuccess(data));
  } catch (error) {
    yield put(incrementLikesFailed(error));
  }
}

export function* onSendMessagePending() {
  yield takeLatest(messagesActionTypes.SEND_MESSAGE_PENDING, sendMessageAsync);
}

export function* onFetchMessagePending() {
  yield takeLatest(
    messagesActionTypes.FETCH_MESSAGE_PENDING,
    fetchMessageAsync
  );
}

export function* onIncrementLikesPending() {
  yield takeLatest(
    messagesActionTypes.INCREMENT_LIKES_PENDING,
    incrementLikesAsync
  );
}

export function* messagesSagas() {
  yield all([
    call(onSendMessagePending),
    call(onFetchMessagePending),
    call(onIncrementLikesPending),
  ]);
}
