import { takeLatest, call, put, all } from "redux-saga/effects";


import {createGroupFailure,createGroupSuccess
} from "./groupchat.actions";
import groupchatActionTypes from "./groupchat.types";

export function* sendMessageAsync({
    payload: { groupId, groupName, creatorId, name, userId },
  }) {
    try {
    //   const response = yield fetch(
    //     // "https://aamirproject-api.herokuapp.com/addgroupchat",
        
          const response = yield fetch('http://localhost:4000/addgroupchat',{
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            groupId: groupId,
            groupName: groupName,
            creatorId: creatorId,
            name:name,
            userId: userId,
          
          }),
        }
      );
      const data = yield response.json();
      if (data.groupId) {
        yield put(
          createGroupSuccess({
            payload: { groupId, groupName, creatorId, name, userId},
          })
        );
      }
    } catch (error) {
      yield put(createGroupFailure(error));
    }
  }


  export function* onCreateGroupChatPending() {
    yield takeLatest(
     groupchatActionTypes.CREATE_GROUP_PENDING,
     sendMessageAsync
    );
  }
  
  export function* groupchatSagas() {
    yield all([
      call(onCreateGroupChatPending),
 
    ]);
  }
  

  