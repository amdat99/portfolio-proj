import { takeLatest, call, put, all } from "redux-saga/effects";
import { sendMessageFailed } from "../messages/messages.actions";

import {
  createGroupFailure,
  createGroupSuccess,
  getGroupsSuccess,
  getGroupsFailed,
  fetchGroupMessagesSuccess,
  fetchGroupMessagesFailure,
  sendGroupMessageSuccess,
  sendGroupMessageFailure,
  fetchGroupDataSuccess,
  fetchGroupDataFailure
} from "./groupchat.actions";
import groupchatActionTypes from "./groupchat.types";

export function* sendGroupAsync({
  payload: { groupId, groupName, creatorId, name, userId },
}) {
  try {
    const response = yield fetch(
      "https://aamirproject-api.herokuapp.com/addgroupchat",
      {
        // const response = yield fetch('http://localhost:4000/addgroupchat',{
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId: groupId,
          groupName: groupName,
          creatorId: creatorId,
          name: name,
          userId: userId,
        }),
      }
    );
    const data = yield response.json();
    if (data.groupId) {
      yield put(
        createGroupSuccess({
          payload: { groupId, groupName, creatorId, name, userId },
        })
      );
    }
  } catch (error) {
    yield put(createGroupFailure(error));
  }
}

export function* fetchGroupChatAsync({ payload: userId }) {
  try {
    const response = yield fetch(
      "https://aamirproject-api.herokuapp.com/fetchgroupchats",
      {
        // const response = yield fetch('http://localhost:4000/fetchmessages',{
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
        }),
      }
    );
    const data = yield response.json();
    yield put(getGroupsSuccess(data));
  } catch (error) {
    yield put(getGroupsFailed(error));
  }
}

export function* sendMessageAsync({
  payload: { groupId, message, userName, messageId, userId, image, video },
}) {
  try {
    const response = yield fetch(
      "https://aamirproject-api.herokuapp.com/addgroupmessages",
      {
        // const response = yield fetch('http://localhost:4000/addgroupchat',{
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId: groupId,
          userId: userId,
          messageId: messageId,
          video: video,
          image: image,
          userName: userName,
          message: message,
        }),
      }
    );
    const data = yield response.json();
    if (data.groupId) {
      yield put(
        sendGroupMessageSuccess({
          payload: { groupId, message, userName, messageId, userId, image, video},
        })
      );
    }
  } catch (error) {
    yield put(sendGroupMessageFailure(error));
  }
}

export function* fetchgroupDataAsync({ payload: groupid }) {
  try {
    const response = yield fetch(
      "https://aamirproject-api.herokuapp.com/fetchgroupdata",
      {
        // const response = yield fetch('http://localhost:4000/fetchmessages',{
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupid: groupid,
        }),
      }
    );
    const data = yield response.json();
    yield put(fetchGroupDataSuccess(data));
  } catch (error) {
    yield put(fetchGroupDataFailure(error));
  }
}
 

export function* fetchMessageAsync({ payload: groupid }) {
  try {
    const response = yield fetch(
      "https://aamirproject-api.herokuapp.com/fetchgroupmessages",
      {
        // const response = yield fetch('http://localhost:4000/fetchmessages',{
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupid: groupid,
        }),
      }
    );
    const data = yield response.json();
    yield put(fetchGroupMessagesSuccess(data));
  } catch (error) {
    yield put(fetchGroupMessagesFailure(error));
  }
}
export function* onCreateGroupChatPending() {
  yield takeLatest(groupchatActionTypes.CREATE_GROUP_PENDING, sendGroupAsync);
}
export function* onGetGroupChatPending() {
  yield takeLatest(
    groupchatActionTypes.GET_GROUPS_PENDING,
    fetchGroupChatAsync
  );
}

export function * onSendMessagePending() {
  yield takeLatest(
    groupchatActionTypes.SEND_GMESSAGE_PENDING, 
    sendMessageAsync
  )
}
export function * onFetchMessagePending() {
  yield takeLatest(
    groupchatActionTypes.FETCH_GMESSAGE_PENDING, 
    fetchMessageAsync
  )
}

export function * onFetchGroupDataPending() {
  yield takeLatest(
    groupchatActionTypes.FETCH_GROUPDATA_PENDING,
    fetchgroupDataAsync
  )
}


export function* groupchatSagas() {
  yield all([
    call(onCreateGroupChatPending), 
    call(onGetGroupChatPending),
    call(onSendMessagePending),
    call(onFetchMessagePending),
    call(onFetchGroupDataPending)
  ]);
}
